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
    createUserBase(event)
})
async function createUserBase(event) {
    event.preventDefault();
    username = document.querySelector('#username').value
    requestedUserID = document.querySelector('#userid').value
    userJSON = await createUser(username, requestedUserID)
    outputTable = document.querySelector("#outputTable").querySelector('#tbody')
    userRow = outputTable.insertRow(-1)
    userCell = userRow.insertCell(0);
    userCell.innerHTML = userJSON["finalID"];
    nameCell = userRow.insertCell(1);
    nameCell.innerHTML = username;
}