const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const { readdir, readFile, writeFile, unlink } = require("fs/promises");
const server = express();

const hostname = "127.0.0.1";
const port = 80;

server.use(express.static(path.join(__dirname, "/public")));
// server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());

server.get("/files", (req, res) => {
    console.log("\nRoute: /files\nMethod: GET\n" + (new Date()).toLocaleString());
    let arr = [];
    readdir(path.join(__dirname, "files_db"))
        .then(filesList => {
            filesList.forEach(fileName => {
                arr.push(fileName)
            });
            res.send(arr);
        });
});

server.post("/fetch_file_request", (req, res) => {
    console.log("\nRoute: /fetch_file_request\nMethd: POST\n" + (new Date()).toLocaleString());
    console.log(req.body);

    let filePath = path.join(__dirname, "files_db", req.body.fileName);
    readFile(filePath, { encoding: "utf-8" })
        .then(file => {
            res.send(file);
            res.end();
        });
});

server.post("/new_file_request", (req, res) => {
    console.log("\nRoute: /new_file_request\nMethod: POST\n" + (new Date()).toLocaleString());
    console.log(req.body);

    let fileComposition = `{ "title": "${req.body.fileTitle}", "content":"${req.body.fileContent}" }`

    let filePath = path.join(__dirname, "files_db", req.body.fileName);
    writeFile(filePath, fileComposition, { encoding: "utf-8" })
        .then(() => {
            res.send(req.body.fileName + " added to 'files_db'");
            res.end();
        });
});

server.delete("/delete_file_request", (req, res) => {
    console.log("\nRoute: /delete_file_request\nMethod: DELETE\n" + (new Date()).toLocaleString());
    console.log(req.body);

    unlink(path.join(__dirname, "files_db", req.body.fileName))
        .then(() => res.send("File Deleted"))
        .catch(() => { 
            console.log("Requested file does not exist");
            res.send("ERROR");
        })
})

const startServer = function (){
    server.listen(port, hostname, () => {
        console.log(`Server is running at ${hostname}:${port}`);
    });
};

startServer();