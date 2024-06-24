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
function moreInfo(barcode) {
    let moreInfoModal = new bootstrap.Modal(document.getElementById('moreInfoModal'), "")
    let moreInfoTitle = document.getElementById('moreInfoTitle');
    let moreInfoBody = document.getElementById('moreInfoBody');
    getJsonResponse(url + "/bookmoreinfo?barcode=" + barcode, (response) => {
        moreInfoTitle.innerHTML = `More info about ${response[2]} by ${response[3]}`
    })
    getJsonResponse(url + "/bookmoreinfo?barcode=" + barcode, (response) => {
        moreInfoBody.innerHTML = response[1];
        moreInfoModal.show()
    })
}
let url = localStorage.getItem("url")
const form = document.querySelector("#loanInput")
const statusOutput = document.querySelector('#status')

async function getBookInfo(barcode) {
    let response = await fetch(url + "/bookinfo?barcode="+ barcode, {
        method: "GET",
        cache: "no-cache",redirect: "follow",referrerPolicy: "no-referrer"
    })
    
    return response.json()
}
async function getUserInfo(userBarcode) {
    let response = await fetch(url + "/getusername", {
        method: "POST",
        cache: "no-cache",body:"user="+userBarcode,headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return response.text()
}
async function sendBorrow(userBarcode, bookBarcode, loanLength) {
    let response = await fetch(url + "/borrow", {
        method: "POST",
        cache: "no-cache",body:"loanTo="+userBarcode+"&loanLength="+loanLength+"&bookBarcode="+bookBarcode,
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return response.json()
}
form.addEventListener("submit", async (event) => {
    // prevent a normal form submit and calculate the tickets needed
    event.preventDefault();
    
    let formData = new FormData(form);
    barcode = formData.get("barcode")
    bookData = await getBookInfo(barcode);
    console.log(bookData)
    if (bookData[0] == barcode) {
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
        // Get the name of the borrower
        userBarcode = document.querySelector("#loaner").value
        if (userBarcode != ""){
        username = await getUserInfo(userBarcode)
        if (username !== "user not found") {
            loanedToCell = row.insertCell(5);
            loanedToCell.innerHTML = username+":<b>"+userBarcode+"</b>"
            let loanLength = document.querySelector('#loanLength').value
            a = sendBorrow(userBarcode,barcode,loanLength)
            dueOn = row.insertCell(6);
            dueOn.innerHTML = a["loanEnd"]
        }
        else {
            statusOutput.innerHTML = statusOutput.innerHTML + `<div class="alert alert-danger" role="alert">User Invalid: the user barcode provided did not match an item in database.</div>`
        }
        }
        else {
            statusOutput.innerHTML = statusOutput.innerHTML + `<div class="alert alert-danger" role="alert">User Invalid: the user barcode provided did not match an item in database.</div>`
        }
        
        // Process loan

        }
        else {
            statusOutput.innerHTML= `<div class="alert alert-danger" role="alert">Lookup Failed: Barcode did not match item in database. Try rescanning the book.</div>`
        }
    
  });