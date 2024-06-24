// first get the requested books info then borrow it to the user
let url = localStorage.getItem("url")
const form = document.querySelector("#loanInput")
const barcode = document.querySelector("#barcode")
const loaner = document.querySelector("#loaner")
const statusOutput = document.querySelector('#status')
function getJsonResponse(url, callback, rowObject, rowIndex) {
    if (callback) {
        return callback
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.response, rowObject, rowIndex);
        }
    }
}
function postJsonResponse(url, postData, callback, rowObject, rowIndex) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded')
    xhr.send(postData);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(rowObject, xhr.response, rowIndex);
        }
    }
}
function borrow(barcode, user) {

}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    outputTable = document.querySelector("#outputTable").querySelector('#tbody')
    row = outputTable.insertRow()
    getJsonResponse(url + "/bookinfo?barcode=" + barcode.value, infoFillIn, row, 0);
    
    username = postJsonResponse(url+ "/getusername", "user="+loaner.value, fillInCell, row, 5)
    loanLength = document.querySelector("#loanLength").value
    setLoan = postJsonResponse(url+"/borrow", "loanTo=" + loaner.value + "&loanLength=" + loanLength + "&bookBarcode=" + barcode, fillInCell, row, 6)
    
});
function fillInCell(rowObject, data, index) {
    a = rowObject.insertCell(index)
    b = a.innerHTML = data
}
function infoFillIn(rowObject, data, rowIndex) {
    thisIsStupid = JSON.parse(data)
    a = rowObject.insertCell(0)
    a.innerHTML = thisIsStupid[0]
    a = rowObject.insertCell(1)
    a.innerHTML = thisIsStupid[1]
    a = rowObject.insertCell(2)
    a.innerHTML = thisIsStupid[2]
    a = rowObject.insertCell(3)
    a.innerHTML = thisIsStupid[3]
    moreInfoCell= row.insertCell(4);
    moreInfoCell.innerHTML = `<a href="javascript:moreInfo(${thisIsStupid[0]})">More Info</a>`
    title=thisIsStupid[2]
    author=thisIsStupid[3]
    statusOutput.innerHTML = `<div class="alert alert-success" role="alert">Book found: ${title} by ${author}</div>`
}