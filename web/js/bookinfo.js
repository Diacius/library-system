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
    bookData = books[barcode]
    if (bookData) {
    isbn = bookData["isbn"]
    title = bookData["title"]
    author = bookData["author"];
    outputTable = document.querySelector("#outputTable")
    row = outputTable.insertRow(-1)
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
  });
function moreInfo(barcode) {
    const myModal = new bootstrap.Modal(document.getElementById('myModal'), options)


}