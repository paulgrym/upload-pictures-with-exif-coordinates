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
            <span>${file.name}</span>
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

  const handleInputFiles = () => {
    const chosenFiles = [...filesInput.files];

    for (const chosenFile of chosenFiles) {
      addNewFile(chosenFile);
    }

    clearInput(filesInput);
  };

  const init = () => {
    renderFilesList();
    filesInput.addEventListener("change", handleInputFiles);
  };

  init();
}
