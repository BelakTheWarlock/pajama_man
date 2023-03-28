import "./new_file.js";

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
// End of Fetch

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
        });
    // End of Fetch
});