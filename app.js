// Movie constructor
function Movie(title, director, star, year) {
  this.title = title;
  this.director = director;
  this.star = star;
  this.year = year;
}

// UI Constructor
function UI() {}

// Add Movie
UI.prototype.addMovie = function (movie) {
  const tableBody = document.getElementById("movie-list");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.director}</td>
        <td>${movie.star}</td>
        <td>${movie.year}</td>
        <td><a href="#" class="delete"></a></td>
    `;
  tableBody.appendChild(row);
};

// Clear Fields Prototype
UI.prototype.clearFields = function () {
  title = document.getElementById("title").value = "";
  director = document.getElementById("director").value = "";
  star = document.getElementById("star").value = "";
  year = document.getElementById("year").value = "";
};

// Delete Movie Prototype
UI.prototype.deleteMovie = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Show Alert Prototype
UI.prototype.showAlert = function (message, classToAdd) {
  // Create Message
  const article = document.createElement("article");
  article.className = `message ${classToAdd}`;
  const div = document.createElement("div");
  div.className = "message-body";
  div.appendChild(document.createTextNode(message));
  article.appendChild(div);

  // Get page elements and insert message
  const box = document.querySelector(".box");
  const form = document.querySelector("#movie-form");
  box.insertBefore(article, form);

  // Give it a time limit
  setTimeout(function () {
    document.querySelector(".message").remove();
  }, 3000);
};

// Event Listener for adding a movie
document.getElementById("movie-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value,
    director = document.getElementById("director").value,
    star = document.getElementById("star").value,
    year = document.getElementById("year").value;

  // Instantiate Movie
  const movie = new Movie(title, director, star, year);
  console.log(movie);

  // Instantiate UI
  const ui = new UI();

  // Validation
  if (title === "" || director === "" || star === "" || year === "") {
    ui.showAlert("Please fill in all fields.", "is-danger");
  } else {
    // Add a movie
    ui.addMovie(movie);

    // Show Alert
    ui.showAlert("Movie Added!", "is-success");

    // Clear the fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for Delete
document.getElementById("movie-list").addEventListener("click", function (e) {
  ui = new UI();
  ui.deleteMovie(e.target);
  ui.showAlert("Movie Removed!", "is-success");
  e.preventDefault();
});
