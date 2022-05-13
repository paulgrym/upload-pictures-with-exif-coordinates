{
  let files = [];
  const filesInput = document.querySelector(".js-input");
  const dropArea = document.querySelector(".js-dropArea");

  const setImageSource = (file) => URL.createObjectURL(file);

  const active = () => dropArea.classList.add("dropArea--active");
  const inactive = () => dropArea.classList.remove("dropArea--active");

  const prevents = (event) => event.preventDefault();

  const fileSizeToMB = (fileSize) => (fileSize / 1024 / 1024).toFixed(2);

  const coordsToDecimalDegrees = (coords, coordsRef) => {
    const degrees = coords[0].numerator / coords[0].denominator;
    const minutes = coords[1].numerator / coords[1].denominator;
    const seconds = coords[2].numerator / coords[2].denominator;

    const decimalDegrees = degrees + minutes / 60 + seconds / 3600;
    const symbol = coordsRef === "N" || coordsRef === "E" ? "+" : "-";

    return `${symbol}${decimalDegrees.toFixed(4)}&deg;`;
  };

  const validateFileType = (file) => {
    const validFileTypes = ["image/jpeg", "image/jpg"];

    if (!validFileTypes.includes(file.type)) {
      alert("File format should be .jpg or .jpeg");
      return false;
    } else return true;
  };

  const validateFileSize = (file) => {
    const fileSize = fileSizeToMB(file.size);

    if (fileSize > 1) {
      alert("File size exceeds 1 MB");
      return false;
    } else return true;
  };

  const clearInput = (filesInput) => {
    filesInput.value = "";
  };

  const renderFilesList = () => {
    const filesList = files
      .map(
        (file, index) =>
          `
          <li class="list__item">
            <div> 
              <span class="list__index">${index + 1}.</span>
              <img 
                class="list__image js-image" 
                src=${setImageSource(file)} 
              >
            </div>

            <div class="list__container">
              <span class="list__text">
                <span>Name:</span> 
                ${file.name}
              </span>
              <span>
                <span>Size:</span> 
                ${fileSizeToMB(file.size)}&nbsp;MB
              </span>
            </div>

            <div class="list__container">
              <span class="list__text">
                <span>Latitude:</span> 
                ${file.latitude ? file.latitude : "Unknown"}
              </span>
              <span>
                <span>Longitude:</span> 
                ${file.longitude ? file.longitude : "Unknown"}
              </span>
            </div>

            <button class="list__button js-remove"> Delete </button>
          </li>
        `
      )
      .join("");

    const filesElement = document.querySelector(".js-filesList");
    filesElement.innerHTML = filesList;
  };

  const removeFile = (index) => {
    files = [...files.slice(0, index), ...files.slice(index + 1)];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeFile(index);
      });
    });
  };

  const addNewFile = (newFile) => {
    files = [...files, newFile];
    render();
  };

  const getCoords = async (chosenFile) => {
    const getExifData = () => {
      return new Promise((resolve) => {
        EXIF.getData(chosenFile, resolve);
      });
    };

    await getExifData();

    const lat = EXIF.getTag(chosenFile, "GPSLatitude");
    const latRef = EXIF.getTag(chosenFile, "GPSLatitudeRef");
    const lon = EXIF.getTag(chosenFile, "GPSLongitude");
    const lonRef = EXIF.getTag(chosenFile, "GPSLongitudeRef");

    if (lat && latRef && lon && lonRef) {
      const latitude = coordsToDecimalDegrees(lat, latRef);
      const longitude = coordsToDecimalDegrees(lon, lonRef);

      chosenFile.latitude = latitude;
      chosenFile.longitude = longitude;
    }
    return chosenFile;
  };

  const addFiles = (chosenFiles) => {
    for (const chosenFile of chosenFiles) {
      const sizeValidated = validateFileSize(chosenFile);
      const typeValidated = validateFileType(chosenFile);

      if (sizeValidated && typeValidated) {
        (async () => {
          await getCoords(chosenFile);
          addNewFile(chosenFile);
        })();
      }
    }
  };

  const handleDropAreaFiles = (e) => {
    const dropData = e.dataTransfer;
    const chosenFiles = [...dropData.files];

    addFiles(chosenFiles);
  };

  const handleInputFiles = () => {
    const chosenFiles = [...filesInput.files];

    addFiles(chosenFiles);

    clearInput(filesInput);
  };

  const initDropArea = () => {
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, prevents);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, active);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, inactive);
    });

    dropArea.addEventListener("drop", handleDropAreaFiles);
  };

  const initInput = () => {
    filesInput.addEventListener("change", handleInputFiles);
  };

  const render = () => {
    renderFilesList();
    bindRemoveEvents();
  };

  const init = () => {
    render();
    initInput();
    initDropArea();
  };

  init();
}
