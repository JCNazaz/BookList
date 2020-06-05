/* Book Constructor */
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/* UI Constructor */
function UI() {}

/* Add Book to List */
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  /* Create tr Eletement */
  const row = document.createElement("tr");
  /* Insert Cols */
  row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="x" class="delete">X</a></td>`;

  list.appendChild(row);
};
/* Show Alert */
UI.prototype.showAlert = function (messege, className) {
  /* Create Div */
  const div = document.createElement("div");
  /* Add Class */
  div.className = `alert${className}`;
  /* Add Text */
  div.appendChild(document.createTextNode(messege));
  /* Get Parent */
  const container = document.querySelector(".container");
  /* Get Form */
  const form = document.querySelector("#book-form");
  /* Insert Alert */
  container.insertBefore(div, form);
  /* Timeout After 3 Sec */
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

/* Delete Book */
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

/* Clear Fields */
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

/* Event Listener to Add Book*/
document.getElementById("book-form").addEventListener("submit", function (e) {
  /* Get Form Values */
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  /* Instantiate book */
  const book = new Book(title, author, isbn);

  /* Instantiate UI */
  const ui = new UI();

  /* Validate */
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", " error");
  } else {
    /* Add Book To The List */
    ui.addBookToList(book);

    /* Show Success */
    ui.showAlert("Book Added!", " success");
    /* Clear Fileds */
    ui.clearFields();
  }

  e.preventDefault();
});
/* Event Listener For Delete */
document.getElementById("book-list").addEventListener("click", function (e) {
  /* Instantiate UI */
  const ui = new UI();

  /* Delete Book */
  ui.deleteBook(e.target);

  /* Show Messege */
  ui.showAlert("Book Removed!", " success");
  e.preventDefault();
});
