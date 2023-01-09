const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = ["SAVED", "FOR", "LATER"];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();

// Below is the code that adds local storage data to the table.
let bandsList = localStorage.getItem("bandList");
console.log(bandsList);

let parseBandsList = JSON.parse(bandsList);
let length = parseBandsList.length;
console.log(length);

let saveData = () => {
  for (i = 0; i < parseBandsList.length; i++) {
    //Below is adding a new row to the table
    let table = document.getElementById("savedTable");
    console.log(table);
    let row = table.insertRow(1);

    //Below here are vriables inseting the new row cells.
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    //Here each cell of the row is being printed with the trail, province and country of each saved hike.
    //TRY CAPITAL LETTERS WHEN THE POWERS BACK ON
    cell1.innerHTML = parseBandsList[i].Name;
    cell2.innerHTML = parseBandsList[i].Genre;
    cell3.innerHTML = parseBandsList[i].Country;
    //Below is adding a new remove button that will have the functionality to remove a table rows information.
    cell4.innerHTML = `<button class="removeBtn">Remove</button> <button id="like-button">Like</button>
    <span id="like-counter">0</span> likes`;
  }
};

saveData();

//Addng a click event listener to target the closest tr element and remove it.

let removeBtn = document.querySelectorAll("removeBtn");
console.log(removeBtn);

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("removeBtn")) {
    const row = event.target.closest("tr");
    let remove = row.parentNode.removeChild(row);
  }
});

// This is the code for handling the comment form submission and adding new comments to the page
const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-text");
const commentsList = document.getElementById("comments-list");

commentForm.addEventListener("submit", (event) => {
  // Prevent the form from reloading the page
  event.preventDefault();

  // Get the comment text from the textarea
  const comment = commentText.value;

  // Clear the textarea
  commentText.value = "";

  // Create a new element to hold the comment
  const newComment = document.createElement("div");
  newComment.innerText = comment;

  // Add the new comment to the list of comments
  commentsList.appendChild(newComment);
});

//Below is the counter for the likes of each saved item.
let likes = 0;

//Below is the function that increments a new like.
function like() {
  likes++;
  document.getElementById("like-counter").innerHTML = likes;
}
// And here an event listener is added to the like button to activate the like function to the like button.
document.getElementById("like-button").addEventListener("click", like);
