{
  const filesInput = document.querySelector(".js-input");
  const filesElement = document.querySelector(".js-filesList");

  const handleInputFiles = () => {
    const chosenFiles = [...filesInput.files];
    console.log(chosenFiles);
    console.log(chosenFiles.files);
  };

  const init = () => {
    filesInput.addEventListener("change", handleInputFiles);
  };

  init();
}
