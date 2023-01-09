const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = ["ONLINE", "RESOURCES"];

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

let buttons = document.querySelectorAll(".saveButton");
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let bandInfo = event.target.closest("tr");

    let td1 = bandInfo.children[0].innerText;
    let td2 = bandInfo.children[1].innerText;
    let td3 = bandInfo.children[2].innerText;
    td3 = td3.slice(0, -4);

    var bandList = [];

    var show = {
      Name: td1,
      Genre: td2,
      Country: td3,
    };
    bandList.push(show);
    bandList = bandList.concat(
      JSON.parse(localStorage.getItem("bandList") || "[]")
    );
    console.log(bandList);
    localStorage.setItem("bandList", JSON.stringify(bandList));
    alert("There are " + bandList.length + " saved items in your save folder.");
  });
});

localStorage.removeItem("bandList");
// localStorage.removeItem("List");
