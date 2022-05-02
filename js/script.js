{
  let files = [];
  const filesInput = document.querySelector(".js-input");

  const addNewFile = (newFile) => {
    files = [...files, newFile];
    renderFilesList();
    console.log(files);
  };

  const renderFilesList = () => {
    const filesList = files
      .map(
        (file, index) =>
          `
          <li class="list__item">
            <span>${index + 1}.</span>
            <span>${file.name}</span
            <span>
            Latitude: ${file.latitude ? file.latitude : "Unknown"}
            </span>
            <span>
            Longitude: ${file.longitude ? file.longitude : "Unknown"}
            </span>
          </li>
        `
      )
      .join("");

    const filesElement = document.querySelector(".js-filesList");
    filesElement.innerHTML = filesList;
  };

  const clearInput = (filesInput) => {
    filesInput.value = "";
  };

  const coordsToDecimalDegrees = (coords, coordsRef) => {
    const degrees = coords[0].numerator / coords[0].denominator;
    const minutes = coords[1].numerator / coords[1].denominator;
    const seconds = coords[2].numerator / coords[2].denominator;

    const decimalDegrees = degrees + minutes / 60 + seconds / 3600;
    const symbol = coordsRef === "N" || coordsRef === "E" ? "+" : "-";

    return `${symbol}${decimalDegrees.toFixed(4)}°`;
  };

  const handleInputFiles = () => {
    const chosenFiles = [...filesInput.files];

    for (const chosenFile of chosenFiles) {
      const getExifData = () => {
        return new Promise((resolve) => {
          EXIF.getData(chosenFile, resolve);
        });
      };

      getExifData().then(() => {
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
        addNewFile(chosenFile);
      });
    }

    clearInput(filesInput);
  };

  const init = () => {
    renderFilesList();
    filesInput.addEventListener("change", handleInputFiles);
  };

  init();
}
