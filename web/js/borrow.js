// first get the requested books info then borrow it to the user
let url = localStorage.getItem("url")
const form = document.querySelector("#loanInput")
const barcode = document.querySelector("#barcode")
const loaner = document.querySelector("#loaner")
const statusOutput = document.querySelector('#status')
function getJsonResponse(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true)
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            callback(JSON.parse(xhr.response));
        }
    }
}
function borrow(barcode, user) {

}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    bookInfoJSON = getJsonResponse(url + "/bookinfo?barcode=" + barcode);
    isbn = bookInfoJSON[1];
    title = bookInfoJSON[2];
    author = bookInfoJSON[3];
    outputTable = document.querySelector("#outputTable").querySelector('#tbody')
    row = outputTable.insertRow()
    barcodeCell = row.insertCell(0);
    barcodeCell.innerHTML = barcode;
    isbnCell = row.insertCell(1);
    isbnCell.innerHTML = isbn;
    titleCell = row.insertCell(2);
    titleCell.innerHTML = title;
    authorCell = row.insertCell(3);
    authorCell.innerHTML = author;
    statusOutput.innerHTML = `<div class="alert alert-success" role="alert">Book found: ${title} by ${author}</div>`
    moreInfoCell= row.insertCell(4);
    moreInfoCell.innerHTML = `<a href="javascript:moreInfo(${barcode})">More Info</a>`
    loanedToCell
    dueOnCell
});