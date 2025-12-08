const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

const DEFAULT_PASS_LENGTH = 8;
const MAX_PASS_LENGTH = 64;

const passwordLengthInput = document.getElementById("password-length");
const generateBtn = document.querySelector(".generate-btn");
const passwordBoxes = document.querySelectorAll(".password-box");
const errorBox = document.querySelector(".error");

const numbersCheckbox = document.getElementById("include-numbers");
const symbolsCheckbox = document.getElementById("include-symbols");

const letters = characters.slice(0, 52);
const numbers = characters.slice(52, 62);
const symbols = characters.slice(62);

function getValidLength() {
  let lengthValue = passwordLengthInput.value;
  let warnMsg = "";
  if (lengthValue === "") {
    warnMsg = `Default length set to ${DEFAULT_PASS_LENGTH}`;
    errorBox.textContent = warnMsg;
    errorBox.style.opacity = 1;
    setTimeout(() => {
      errorBox.textContent = "";
    }, 2000);
    return DEFAULT_PASS_LENGTH;
  } else if (isNaN(Number(lengthValue))) {
    warnMsg = `Invalid password length value, defaulting to ${DEFAULT_PASS_LENGTH}`;
    console.warn(warnMsg);
    errorBox.textContent = warnMsg;
    errorBox.style.opacity = 1;
    setTimeout(() => {
      errorBox.textContent = "";
    }, 2000);
    return DEFAULT_PASS_LENGTH;
  } else {
    lengthValue = Math.floor(Number(lengthValue));
    if (lengthValue < DEFAULT_PASS_LENGTH || lengthValue > MAX_PASS_LENGTH) {
      warnMsg = `Password length out of bounds (8 - 64 char). Setting to default length of ${DEFAULT_PASS_LENGTH}`;
      console.warn(warnMsg);
      errorBox.textContent = warnMsg;
      errorBox.style.opacity = 1;
      setTimeout(() => {
        errorBox.textContent = "";
      }, 3000);
      return DEFAULT_PASS_LENGTH;
    }
  }
  errorBox.textContent = "";
  errorBox.style.opacity = 0;
  console.log(`Password length set to: ${lengthValue}`);
  return lengthValue;
}

function getCharPool(isNumbers, isSymbols) {
  let pool = [...letters];

  if (isNumbers) {
    pool = pool.concat(numbers);
  }

  if (isSymbols) {
    pool = pool.concat(symbols);
  }

  return pool;
}

function createPassword(length, pool) {
  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * pool.length);
    password += pool[randomIndex];
  }
  return password;
}

function handleGenerateClick() {
  passwordBoxes.forEach((box) => (box.textContent = ""));

  const length = getValidLength();

  const isNumbersIncluded = numbersCheckbox.checked;
  const isSymbolsIncluded = symbolsCheckbox.checked;

  const charPool = getCharPool(isNumbersIncluded, isSymbolsIncluded);

  passwordBoxes.forEach((box) => {
    box.textContent = createPassword(length, charPool);
  });
}

function copyPassword(event) {
  const passwordText = event.target.textContent;

  if (!passwordText) {
    return;
  }

  navigator.clipboard
    .writeText(passwordText)
    .then(() => {
      errorBox.textContent = `Copied: ${passwordText}`;

      setTimeout(() => {
        errorBox.textContent = "";
      }, 2000);
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
      errorBox.textContent =
        "Copy failed. Browser may not support clipboard API.";
    });
}

function init() {
  generateBtn.addEventListener("click", handleGenerateClick);
  passwordBoxes.forEach((box) =>
    box.addEventListener("dblclick", copyPassword)
  );
}

init();
