books = {
    1: {"title": "big boats and how to sail them", "author": "rich billionaire", "isbn": "fakeisbn_notreal"}
}
const form = document.querySelector("#input")
form.addEventListener("submit", (event) => {
    // prevent a normal form submit and calculate the tickets needed
    event.preventDefault();
    
    let formData = new FormData(form);
    barcode = formData.get("barcode")
    bookData = books[barcode]
    if (bookData) {
    outputTable = document.querySelector("#outputTable")
    row = outputTable.insertRow(-1)
    barcodeCell = row.insertCell(0);
    barcodeCell.innerHTML = barcode;
    isbnCell = row.insertCell(1);
    isbnCell.innerHTML = bookData["isbn"];
    titleCell = row.insertCell(2);
    titleCell.innerHTML = bookData["tile"];
    authorCell = row.insertCell(3);
    authorCell.innerHTML = bookData["isbn"];
    }
  });