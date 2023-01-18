let bookName = document.querySelector(".bookname");
let author = document.querySelector(".author");
let category = document.querySelector(".category");

let cardContainer = document.querySelector(".card-container");
let card = document.querySelector(".card");

let image = document.querySelector(".image");
let title = document.querySelector(".title");

let authorName = document.querySelector(".author-name");
let categoryBook = document.querySelector(".category-book");

// ********************************************************
async function getData(link) {
  let data = await fetch(link);
  let d = data.json();
  return d;
}
let mydata = getData("./books/books.json");
mydata
  .then((data) => {
    let book = data.books;
    return book;
  })
  .then((book) => {
    image.src = book[0].image;
    title.innerHTML = book[0].name;
    authorName.innerHTML = book[0].author;
    category.innerHTML = book[0].category;

    for (let i = 1; i < book.length; i++) {
      let clone = card.cloneNode(true);
      let cardTitle = clone.children[1];
      let info = clone.children[2];
      clone.children[0].src = book[i].image;
      cardTitle.children[0].innerHTML = book[i].name;
      info.children[0].innerHTML = book[i].author;
      info.children[1].innerHTML = book[i].category;

      cardContainer.appendChild(clone);
    }
    let arrayCardContainer = Array.from(cardContainer.children);
    document.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
    });

    document.querySelector(".btn").addEventListener("click", search);
    function search() {
      // console.log(`${bookName.value} + ${author.value} + ${category.value}`);
      arrayCardContainer.forEach((e) => {
        if (
          bookName.value != "" &&
          author.value == "" &&
          category.value == ""
        ) {
          if (
            e.childNodes[3].children[0].innerHTML.toUpperCase() !=
            bookName.value.toUpperCase().trim()
          )
            e.classList.add("display");
        } else if (
          bookName.value == "" &&
          author.value != "" &&
          category.value == ""
        ) {
          if (
            e.childNodes[5].children[0].innerHTML.toUpperCase() !=
            author.value.toUpperCase().trim()
          )
            e.classList.add("display");
        } else if (
          bookName.value == "" &&
          author.value == "" &&
          category.value != ""
        ) {
          if (
            e.childNodes[5].children[1].innerHTML.toUpperCase() !=
            category.value.toUpperCase().trim()
          )
            e.classList.add("display");
        } 
        else {
          e.classList.add("display");
          if (
            e.childNodes[3].children[0].innerHTML.toUpperCase() ===
              bookName.value.toUpperCase().trim() &&
            e.childNodes[5].children[0].innerHTML.toUpperCase() ===
              author.value.toUpperCase().trim() &&
            e.childNodes[5].children[1].innerHTML.toUpperCase() ===
              category.value.toUpperCase().trim()
          ) {
            e.classList.remove("display");
          }
        }
      });
    }
  });

