document.getElementById("new-file-button").addEventListener("click", () => {
    document.getElementById("new-file-modal").style.display = "flex";
    document.getElementById("new-file-modal").style.zIndex = "2";

    document.getElementById("new-file-form").addEventListener("submit", () => {
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
            .then(() => {
                window.location.reload();
            });
    // End of Fetch
    })
});

// Modal for creating a new file
document.getElementById("close-new-file-modal-button").addEventListener("click", () => {
    document.getElementById("new-file-modal").style.display = "none";
    document.getElementById("new-file-modal").style.zIndex = -1;
})