const form = document.querySelector(".formFile"),
    fileInput = document.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area");

// form click event
form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only
    if (file) {
        let fileName = file.name; //getting file name
        if (fileName.length >= 12) { //if file name length is greater than 12 then split it and add ...
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
        }
        uploadFile(fileName); //calling uploadFile with passing file name as an argument
    }
}
// file upload function
function uploadFile(name) {
    let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
    xhr.open("POST", "php/upload.php"); //sending post request to the specified URL

    let data = new FormData(); //FormData is an object to easily send form data
    let files = fileInput.files; //getting all selected files

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileName = file.name; //getting file name
            if (fileName.length >= 12) { //if file name length is greater than 12 then split it and add ...
                let splitName = fileName.split('.');
                fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
            }
            data.append('files[]', file); //append each file to FormData object
            // Display file details before uploading
            let fileSize = (file.size / 1024).toFixed(2) + " KB"; //convert bytes into KB
            let detailsHTML = `<div class="details">
                                  <span class="name">${fileName}</span>
                                  <span class="size">${fileSize}</span>
                                </div>`;
            let progressHTML = `<div class="progress-bar">
                                  <div class="progress"></div>
                                </div>`;
            let listItemHTML = `<li class="row">
                                  <i class="fas fa-file-alt"></i>
                                  ${detailsHTML}
                                  ${progressHTML}
                                  <button class="pendientes-btn">Eliminar</button>
                                </li>`;
            uploadedArea.insertAdjacentHTML("beforeend", listItemHTML); //add file details to uploaded area
        }
    }

    // Event listener to handle delete button click
    uploadedArea.addEventListener('click', (e) => {
        if (e.target.classList.contains('pendientes-btn')) {
            const listItem = e.target.closest('.row');
            listItem.remove(); // Remove the file from the DOM
        }
    });

    xhr.upload.addEventListener("progress", ({ loaded, total }) => { //file uploading progress event
        let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
        let progress = listItem.querySelector(".progress"); //get the progress element of the corresponding file
        progress.style.width = `${fileLoaded}%`; //update progress bar width
        if (loaded == total) {
            progressArea.innerHTML = ""; //clear progress area after uploading
        }
    });


    xhr.send(data); //sending form data
}