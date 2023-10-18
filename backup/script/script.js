const calcuPreview = document.getElementById("calculation-preview");
const ansPreview = document.getElementById("answer-preview");
let currentFirstNum = "";
let currentSecondNum = "";
let currentOperator = "";
let display = "";
let currentInput = "";

let firstNumVal = "";
let secondNumVal = "";

let tempVal = "";

calcuPreview.setAttribute("maxlength", "5");

function clearScreen() {
  calcuPreview.value = "";
  ansPreview.value = "";
  currentFirstNum = "";
  currentSecondNum = "";
  currentOperator = "";
  display = "";
  currentInput = "";
  firstNumVal = "";
  secondNumVal = "";
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

function input(value) {
  if (currentOperator !== "") {
    console.log("2");
    secondNumVal += value;
    /* console.log(secondNumVal); */
    currentInput = currentSecondNum;
  } else {
    console.log("1");
    firstNumVal += value;
    /* console.log(firstNumVal); */
    currentInput = currentFirstNum;
  }
  update();
  /* console.log(currentInput); */
}

function update() {
  display = `${firstNumVal}${currentOperator}${secondNumVal}`;
  setInterval(() => {
    calcuPreview.value = display;
  }, 100);

}

/* function tempCalc() {
  try {
    if (firstNumVal === "" && secondNumVal === "") {
      // nothing to do
    } else {
      tempVal = eval(calcuPreview.value);
      firstNumVal = tempVal;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    ansPreview.value = "Error";
  }
}

 */

function performCalculation() {
  try {
    if (firstNumVal === "" && secondNumVal === "") {
      /* nothing to do */
    } else {
      const result = eval(calcuPreview.value);
      /* Check if the result has more than 16 digits */
      if (String(result).replace(/[^0-9]/g, "").length > 8) {
        ansPreview.style.fontSize = "2.5rem";
      }
      if (String(result).replace(/[^0-9]/g, "").length > 10) {
        ansPreview.style.fontSize = "2rem";
      }
      if (String(result).replace(/[^0-9]/g, "").length > 12) {
        ansPreview.style.fontSize = "1.5rem";
      }
      if (String(result).replace(/[^0-9]/g, "").length > 16) {
        ansPreview.value = parseFloat(result).toFixed(16);
      } else {
        ansPreview.value = result.toLocaleString();
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
    ansPreview.value = "Error";
  }
  if (firstNumVal !== "" && secondNumVal !== "") {
    firstNumVal = ansPreview.value;
    secondNumVal = "";
  }
}

function checkResult() {
  if (firstNumVal !== "" && secondNumVal !== "") {
    performCalculation();
  }
}
