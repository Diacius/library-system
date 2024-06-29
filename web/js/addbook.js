let url = localStorage.getItem("url")
const form = document.querySelector("#form")
async function createBook(ISBN, title, author, moreinfo) {
    let response = fetch(url + "/addBook", {
        method: "POST",
        cache: "no-cache",
        body:"isbn="+ISBN+"&title="+title+"&author="+author+'&moreinfo='+moreinfo,
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return (await response).json()
}
form.addEventListener("submit", (event) => {
    proccess(event)
});
async function proccess(event) {
    event.preventDefault();
    let formData = new FormData(form);
    ISBN = formData.get("isbn");
    title = formData.get("title");
    author = formData.get("author");
    moreinfo = formData.get("moreinfo")
    bb = await createBook(ISBN, title, author)
    console.log(bb)
    outputTable = document.querySelector("#outputTable").querySelector('#tbody')
    row = outputTable.insertRow(-1)
    barcodeCell = row.insertCell(0);
    barcodeCell.innerHTML = bb["finalID"]
    titleCell = row.insertCell(1);
    titleCell.innerHTML = title
}