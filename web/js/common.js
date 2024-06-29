let url = localStorage.getItem("url")
async function checkUp() {
    let response = fetch(url + "/", {
        method: "GET",
        cache: "no-cache",
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return ((await response).text)
}
document.addEventListener("DOMContentLoaded", (event) => {
    let url = localStorage.getItem("url")
    if (url == null) {
        console.log("Oh no! there isn't a url configured!")
        let moreInfoModal = new bootstrap.Modal(document.getElementById('moreInfoModal'), "")
        let moreInfoTitle = document.getElementById('moreInfoTitle');
        let moreInfoBody = document.getElementById('moreInfoBody');
        moreInfoTitle.innerHTML = "No Server URL Configured!"
        moreInfoBody.innerHTML = `The app will be broken until you configure one :) The URL you enter will be saved to your computer so you only need to enter it in once! Please enter the server URL provided to you by your admin below:<br /><label for="barcode" class="form-label">Server URL:</label>
                    <input type="text" name="url" id="urlbox" autocomplete="off" class="form-control"><button type="submit" class="btn btn-primary" onclick="javascript:changeURL()">Submit</button>`
        moreInfoModal.show();
    }
    else {
        // Check the server is running
        if (checkUp() !== "Hello, World!") {
            let moreInfoModal = new bootstrap.Modal(document.getElementById('moreInfoModal'), "")
            let moreInfoTitle = document.getElementById('moreInfoTitle');
            let moreInfoBody = document.getElementById('moreInfoBody');
            moreInfoTitle.innerHTML = "Server Connection Check Failed!"
            moreInfoBody.innerHTML = `The app will not work if the server is not running. Please contact your system administrator.`
            moreInfoModal.show();
        }
    }
})
function clearOutput() {
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = ""
}