const fileDetailsHeader = document.getElementById("file-details-title");
const fileDetailsContent = document.getElementById("file-details-content");
let isDatabaseConnected = true;

const sendNewFile = function() {
    let submittedText = document.forms["new-file-form"]["new-file-content"].value;
        let processedText = "";
        for (let i = 0; i < submittedText.length; i++) {
            if (submittedText[i] == "\n" || submittedText[i] == "\r") {
                processedText += "\\n";
                continue;
            }
            processedText += submittedText[i];
        }

        fetch("/new_file_request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fileTitle: document.forms["new-file-form"]["new-file-title"].value,
                fileContent: processedText,
                dateContent: (new Date()).toLocaleDateString(),
                date: new Date()
            })
        })
            .then(res => {
                if( res.status === 201 ) window.location.reload();
                else alert("File name " + document.forms["new-file-form"]["new-file-title"].value + " already exists");
            });
        // End of Fetch
} 

fetch("/files")
    .then(response => {
        if (response.status === 404) {
            alert("Could not connect to database");
            isDatabaseConnected = false;
            return -1;
        };
        return response.json();
    })
    .then(filesList => {
        if (filesList == -1) {
            return;
        };
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

document.getElementById("new-file-button").addEventListener("click", () => {
    if (!isDatabaseConnected) {
        alert("No connection to database");
        return;
    }
    document.getElementById("new-file-modal").style.display = "flex";
    document.getElementById("new-file-modal").style.zIndex = "2";
});

document.getElementById("new-file-form").addEventListener("submit", () => sendNewFile());

document.getElementById("close-new-file-modal-button").addEventListener("click", () => {
    document.getElementById("new-file-modal").style.display = "none";
    document.getElementById("new-file-modal").style.zIndex = -1;
})

document.getElementById("delete-file-button").addEventListener("click", () => {
    if (!isDatabaseConnected) {
        alert("No connection to database");
        return;
    }
    fetch("/delete_file_request", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fileName: localStorage.getItem("selectedFile"),
            date: new Date()
        }),
    })
        .then(res => res.text())
        .then(() => window.location.reload())
        .catch(() => {
            alert("Could not delete file.");
        });
    // End of Fetch
});