const calcuPreview = document.getElementById("calculation-preview");
const ansPreview = document.getElementById("answer-preview");
const label = document.getElementById("input-label");

setInterval(() => {
  if (calcuPreview.value.trim() !== "") {
    label.style.transitionDelay = "0ms";
    label.style.top = "0";
    label.style.padding = "0 2rem";
  } else {
    label.style.transitionDelay = "300ms";
    label.style.top = "50%";
    label.style.padding = "0 0";
    ansPreview.value = "";
  }
}, 100);

const calcSize = calcuPreview.style.fontSize;
const ansSize = ansPreview.style.fontSize;

function fitSize(inputField) {
  const scroll = inputField.clientWidth;
  const width = inputField.scrollWith;
  console.log(width);
}
/* function fitFontSize(inputField) {
  const scrollWidth = inputField.scrollWidth;
  const clientWidth = inputField.clientWidth;

  if (scrollWidth > clientWidth) {
    const fontSize = parseFloat(getComputedStyle(inputField).fontSize);
    const newFontSize = (clientWidth / scrollWidth) * fontSize + "px";
    inputField.style.fontSize = newFontSize;
  }
}

calcuPreview.addEventListener("input", fitFontSize(calcuPreview));
ansPreview.addEventListener("input", fitFontSize(ansPreview));

// Call the function on page load to set the initial font size
fitFontSize(calcuPreview);
fitFontSize(ansPreview); */

let changeSign = "+";

function clearScreen() {
  calcuPreview.value = "";
  ansPreview.value = "";
  changeSign = "+";
}

/* function del() {
  let value = calcuPreview.value;

  if (currentInput === currentFirstNum) {
    firstNumVal = value.slice(0, -1);
    value = firstNumVal;
  } else if (currentInput === currentSecondNum) {
    secondNumVal = value.slice(0, -1);
    value = secondNumVal;
  }

  // Check if the value is not empty and is a number
  const parsedValue = parseFloat(value);

  if (!isNaN(parsedValue)) {
    currentInput = parsedValue;
    calcuPreview.value = currentInput;
  }

  console.log(calcuPreview.value);
} */

function del() {
  const currentValue = calcuPreview.value;

  if (currentValue.length > 0) {
    calcuPreview.value = currentValue.slice(0, -1);
  }
}

function input(value) {
  if (changeSign === "-") {
    const valuesInParentheses = calcuPreview.value.match(/\(([^)]+)\)/g);

    if (valuesInParentheses) {
      const lastValueInParentheses =
        valuesInParentheses[valuesInParentheses.length - 1];
      calcuPreview.value = calcuPreview.value.replace(
        lastValueInParentheses,
        `(${lastValueInParentheses.slice(1, -1)}${value})`
      );
    } else {
      calcuPreview.value += `(${value})`;
    }
  } else {
    calcuPreview.value += value;
  }
}

function operator(value) {
  if (calcuPreview.value !== "") {
    if (
      !calcuPreview.value.endsWith("+") &&
      !calcuPreview.value.endsWith("-") &&
      !calcuPreview.value.endsWith("*") &&
      !calcuPreview.value.endsWith("/")
    ) {
      changeSign = "+";
      calcuPreview.value += value; // Append the value
    } else {
      changeSign = "+";
      calcuPreview.value = calcuPreview.value.slice(0, -1) + value; // Replace the last operator
    }
  }
}

function update() {}

function performCalculation() {
  try {
    if (calcuPreview.value.trim() === "") {
      /* nothing to do */
    } else {
      const result = eval(calcuPreview.value);
      if (Math.abs(result) >= 1e12) {
        ansPreview.value = result.toExponential();
      } else {
        ansPreview.value = result.toLocaleString();
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    ansPreview.value = "Error";
  }
}

function changeSigns() {
  if (changeSign === "-") {
    changeSign = "+";
    /*     calcuPreview.value = calcuPreview.value.replace(/^\(\)|\(\)$/g, ""); // Remove empty parentheses from the beginning and end
     */
  } else {
    changeSign = "-";
    if (!calcuPreview.value.endsWith("(-)")) {
      calcuPreview.value += `(-)`;
    }
  }
}
function changeValueInParentheses(newValue) {
  const currentValue = calcuPreview.value;
  if (/\(.+\)/.test(currentValue)) {
    const newValueInParentheses = `(-${newValue})`;
    const updatedValue = currentValue.replace(/\(.+\)/, newValueInParentheses);
    calcuPreview.value = updatedValue;
    return updatedValue;
  }
}

setInterval(() => {
  if (ansPreview.value === "Error") {
    ansPreview.style.transition = "border-color 0ms ease";
    ansPreview.style.borderColor = "#ff0000";
  } else {
    ansPreview.style.transition = "border-color 0.5s ease";
    ansPreview.style.borderColor = "#565656";
  }
}, 100);
