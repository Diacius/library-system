let url = localStorage.getItem("url")
const form = document.querySelector("#form")
async function createUser(usersName, requestedUserID) {
    let response = fetch(url + "/addUser", {
        method: "POST",
        cache: "no-cache",
        body:"username="+usersName+"&requestedID="+requestedUserID,
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return (await response).json()
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    username = document.querySelector('#username').value
    requestedUserID = document.querySelector('#userid').value
    createUser(username, requestedUserID)

});