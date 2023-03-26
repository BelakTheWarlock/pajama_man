const fileDetailsHeader = document.getElementById("file-details-title");
const fileDetailsContent = document.getElementById("file-details-content");

fetch("/files")
    .then(response => response.json())
    .then(filesList => {
        filesList.forEach(fileName => {
            let fileListItem = document.createElement("div");
            fileListItem.className = "file-list-item button";
            fileListItem.textContent = fileName;

            fileListItem.addEventListener("click", () => {
                fetch("/fetch_file_request", { 
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            fileName: fileName,
                            date: new Date()
                        }),
                    })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        fileDetailsHeader.innerText = data.title;
                        fileDetailsContent.innerText = data.content;
                    });
                localStorage.setItem("selectedFile", fileName);
                 
            });
            document.getElementById("files-list-container").appendChild(fileListItem);
        });
    });

document.getElementById("new-file-button").addEventListener("click", () => {
    let fileTitle = prompt("Title");
    let fileContent = prompt("Contents");
    fetch("/new_file_request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileName: fileTitle + ".json",
            fileTitle: fileTitle,
            fileContent: fileContent,
            dateContent: (new Date()).toLocaleDateString(),
            date: new Date()
        })
    })
        .then(res => {
            console.log(res);
            window.location.reload();
        });
});

document.getElementById("delete-file-button").addEventListener("click", () => {
    fetch("/delete_file_request", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileName: localStorage.getItem("selectedFile"),
            date: new Date()
        })
    })
        .then(res => res.text())
        .then(() => window.location.reload())
        .catch(() => {
            alert("Could not delete file.");
        })
});