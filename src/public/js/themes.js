// START OF UGLY
document.getElementById("themes-button").style.border = "none";
document.getElementById("themes-button").style.padding = "2px";
document.getElementById("current-theme").innerText = localStorage.getItem("currentTheme");
if (localStorage.getItem("currentTheme") == "DARK") {
    localStorage.setItem("currentTheme", "DARK");
    document.getElementById("current-theme").innerText = localStorage.getItem("currentTheme");
    document.getElementById("cssbadpractice").innerHTML = '<link rel="stylesheet" href="./css/darkstyle.css">';
}
else {
    localStorage.setItem("currentTheme", "LIGHT");
    document.getElementById("current-theme").innerText = localStorage.getItem("currentTheme");
    document.getElementById("cssbadpractice").innerHTML = '<link rel="stylesheet" href="./css/lightstyle.css">';
}

document.getElementById("themes-button")
    .addEventListener("click", () => {
        if (localStorage.getItem("currentTheme") == "DARK") {
            localStorage.setItem("currentTheme", "LIGHT");
            document.getElementById("current-theme").innerText = localStorage.getItem("currentTheme");
            document.getElementById("cssbadpractice").innerHTML = '<link rel="stylesheet" href="./css/lightstyle.css">'
        }
        else {
            localStorage.setItem("currentTheme", "DARK");
            document.getElementById("current-theme").innerText = localStorage.getItem("currentTheme");
            document.getElementById("cssbadpractice").innerHTML = '<link rel="stylesheet" href="./css/darkstyle.css">'
        }
    });
// END OF UGLY