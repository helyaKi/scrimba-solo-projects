const headingEl = document.querySelector(".heading");
const quantityNameEl = document.querySelector(".quantity-name");
const conversionDivEl = document.querySelector(".conversion");
const metricInput = document.querySelector("#metric");
const imperialInput = document.querySelector("#imperial");

const metricLabel = document.querySelector("label[for='metric']");
const imperialLabel = document.querySelector("label[for='imperial']");

const convertBtn = document.querySelector(".convert");
const quantitiesDivs = document.querySelectorAll(".quantities");

let category = "";

const conversionMap = {
  Length: {
    toImperial: 3.28084,
    toMetric: 0.3048,
    metricUnit: "Meter",
    imperialUnit: "Feet",
  },
  Volume: {
    toImperial: 0.264172,
    toMetric: 3.78541,
    metricUnit: "Liter",
    imperialUnit: "Gallon",
  },
  Mass: {
    toImperial: 2.20462,
    toMetric: 0.453592,
    metricUnit: "Kilo",
    imperialUnit: "Pound",
  },
};

function autoShrink(inputEl) {
  const maxWidth = inputEl.clientWidth - 25;
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  let fontSizePx = 24;
  inputEl.style.fontSize = fontSizePx / rootFontSize + "rem";

  let span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.position = "absolute";
  span.style.fontFamily = window.getComputedStyle(inputEl).fontFamily;
  document.body.appendChild(span);

  span.textContent = inputEl.value || inputEl.placeholder;

  while (span.offsetWidth > maxWidth && fontSizePx > 10) {
    fontSizePx -= 1;
    const fontSizeRem = fontSizePx / rootFontSize;
    inputEl.style.fontSize = fontSizeRem + "rem";
    span.style.fontSize = fontSizeRem + "rem";
  }

  document.body.removeChild(span);
}

function updateUI(name) {
  if (!name) return;

  quantityNameEl.textContent = name;
  metricLabel.textContent = conversionMap[name].metricUnit;
  imperialLabel.textContent = conversionMap[name].imperialUnit;

  headingEl.classList.add("change");
  conversionDivEl.classList.add("change");
}

function calculate() {
  if (!category) return;

  const data = conversionMap[category];
  const metricVal = metricInput.value.trim();
  const imperialVal = imperialInput.value.trim();

  const metricNum = Number(metricVal);
  const imperialNum = Number(imperialVal);

  if (!isNaN(metricNum) && metricVal !== "" && imperialVal === "") {
    imperialInput.value = (metricNum * data.toImperial).toFixed(3);
    autoShrink(imperialInput);
  } else if (!isNaN(imperialNum) && imperialVal !== "" && metricVal === "") {
    metricInput.value = (imperialNum * data.toMetric).toFixed(3);
    autoShrink(metricInput);
  } else {
    console.warn("Enter a number in only one field, leave the other empty.");
  }
}

function init() {
  quantitiesDivs.forEach((div) => {
    div.addEventListener("click", function () {
      const h3Text = this.querySelector("h3").textContent;
      category = h3Text.split(" ")[0];

      updateUI(category);

      metricInput.value = "";
      imperialInput.value = "";

      metricInput.style.fontSize = "32px";
      imperialInput.style.fontSize = "32px";
    });
  });

  convertBtn.addEventListener("click", calculate);

  [metricInput, imperialInput].forEach((input) => {
    input.addEventListener("input", () => autoShrink(input));
  });
}

init();
