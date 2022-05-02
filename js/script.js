{
  let files = [];
  const filesInput = document.querySelector(".js-input");
  const filesElement = document.querySelector(".js-filesList");

  const addNewFile = (newFile) => {
    files = [...files, newFile];
    console.log(files);
  };

  const handleInputFiles = () => {
    const chosenFiles = [...filesInput.files];
    console.log(filesInput.files);

    for (const chosenFile of chosenFiles) {
      addNewFile(chosenFile);
    }
  };

  const init = () => {
    filesInput.addEventListener("change", handleInputFiles);
  };

  init();
}
