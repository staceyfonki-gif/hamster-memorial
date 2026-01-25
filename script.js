// selecting HTML elements by ID for form validation

const form = document.getElementById("memoryForm");
const errorParagraph = document.getElementById("formError");

//listens for the submit event
form.addEventListener("submit", function (event) {
event.preventDefault(); // stop form from submitting immediately since we must validate first

// get input elements
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const dateInput = document.getElementById("date");
const messageInput = document.getElementById("message");
const ratingInput = document.getElementById("rating");

// get values for checking
//trim() to remove unnecessary spaces
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const date = dateInput.value;
const message = messageInput.value.trim();
const rating = ratingInput.value;

// reset previous errors and prevents error messages stacking
errorParagraph.textContent = "";
nameInput.classList.remove("input-error");
emailInput.classList.remove("input-error");
messageInput.classList.remove("input-error");

let hasError = false;

// mandatory fields
if (name === "") {
nameInput.classList.add("input-error");
  hasError = true;
}

if (email === "") {
emailInput.classList.add("input-error");
 hasError = true;
}

if (message === "") {
messageInput.classList.add("input-error");
 hasError = true;
}

if (hasError) {
errorParagraph.textContent = "Please fill in all required fields (name, email, message).";
return;
}

// email format check
if (!email.includes("@")) {
emailInput.classList.add("input-error");
errorParagraph.textContent = "Please enter a valid email address.";
return;
}

// date validation
if (date === "") {
errorParagraph.textContent = "Please select a valid date.";
return;
}

// rating range validation
if (rating < 1 || rating > 5) {
errorParagraph.textContent = "Rating must be between 1 and 5.";
return;
}

// if everything is correct, submit form
form.submit();
});


//show or hide sections DOM manipulations

const messageSection = document.getElementById("messages");

const toggleButton = document.createElement("button");
toggleButton.textContent = "Show / Hide Message Form";
messageSection.prepend(toggleButton);

toggleButton.addEventListener("click", function () {
form.classList.toggle("hidden");
});const heartBtn = document.getElementById("heartBtn");
const heartCountSpan = document.getElementById("heartCount");

// get saved count or start at 0
let heartCount = localStorage.getItem("heartCount");
heartCount = heartCount ? parseInt(heartCount) : 0;

heartCountSpan.textContent = heartCount;

heartBtn.addEventListener("click", function () {
  heartCount++;
  heartCountSpan.textContent = heartCount;
  localStorage.setItem("heartCount", heartCount);
});



// Create DOM elements from JSON

const messagesData = [
{ author: "Anonymous", text: "Forever loved 🌈" },
{ author: "A Friend", text: "Rest peacefully, little angel 🤍" }
];

const messagesList = document.createElement("div");
messagesList.id = "messagesList";
messageSection.appendChild(messagesList);

messagesData.forEach(function (item) {
const messageBox = document.createElement("p");
messageBox.textContent = item.author + ": " + item.text;
messagesList.appendChild(messageBox);
});