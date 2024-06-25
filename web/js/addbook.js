let url = localStorage.getItem("url")
const form = document.querySelector("#form")
async function createBook(ISBN, title, author) {
    let response = fetch(url + "/addBook", {
        method: "POST",
        cache: "no-cache",
        body:"isbn="+ISBN+"&title="+title+"&author="+author,
        headers: {"Content-Type":"application/x-www-form-urlencoded"}
    })
    return (await response).json()
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(form);
    ISBN = formData.get("isbn");
    title = formData.get("title");
    author = formData.get("author");
    createBook(ISBN, title, author)

});