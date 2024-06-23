books = {
    1: {"title": "big boats and how to sail them", "author": "rich billionaire", "isbn": "fakeisbn_notreal"}
}
const form = document.querySelector("#input")
const statusOutput = document.querySelector('#status')
form.addEventListener("submit", (event) => {
    // prevent a normal form submit and calculate the tickets needed
    event.preventDefault();
    
    let formData = new FormData(form);
    barcode = formData.get("barcode")
    var xhr = new XMLHttpRequest();
    url = "http://127.0.0.1:5000/bookinfo?barcode=" + barcode
    xhr.open("GET", url, true)
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            bookData = JSON.parse(xhr.response);
            if (bookData) {
                isbn = bookData[1]
                title = bookData[2]
                author = bookData[3];
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
                }
                else {
                    statusOutput.innerHTML= `<div class="alert alert-danger" role="alert">Lookup Failed: Barcode did not match item in database. Try rescanning the book.</div>`
                }
        }
      };
    
  });
function moreInfo(barcode) {
    
    let moreInfoModal = new bootstrap.Modal(document.getElementById('moreInfoModal'))
    let moreInfoTitle = document.getElementById('moreInfoTitle');
    let moreInfoBody = document.getElementById('moreinfobody')
    var xhr = new XMLHttpRequest();
    url = "http://127.0.0.1:5000/bookinfo?barcode=" + barcode
    xhr.open("GET", url, true)
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            bookData = JSON.parse(xhr.response);
            if (bookData) {
                isbn = bookData[1]
                title = bookData[2]
                author = bookData[3];
            }}}
    moreInfoTitle.innerHTML = `More info about "${bookData["title"]}" by "${bookData["author"]}"`
    
    moreInfoModal.show()


}
function clearOutput() {
    var tbody = document.querySelector("#tbody");
    tbody.innerHTML = ""
}