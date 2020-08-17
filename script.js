const operate = (a, operator, b) => {
  //need parse float for .fixed(2) to work
  switch (operator) {
    case "add":
      return parseFloat(a) + parseFloat(b);
    case "subtract":
      return parseFloat(a) - parseFloat(b);
    case "multiply":
      return parseFloat(a) * parseFloat(b);
    case "divide":
      return parseFloat(a) / parseFloat(b);
  }
};

const display = document.getElementById("display");
const calculator = document.querySelector(".calculator");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const decimal = document.getElementById("decimal");

let firstNum = 0;
let secondNum = 0;
let opSelection;
let result;

let displayValue = 0;
const buttonClicks = calculator.addEventListener("click", (e) => {
  const button = e.target;
  let action = button.dataset.action;

  if (!action) {
    //is number
    if (displayValue === 0 || displayValue === "") {
      //replace initial zero, "" makes it work after clear
      displayValue = button.textContent;
      display.textContent = button.textContent;
    } else if (displayValue > 0 && firstNum === 0) {
      //concatenate addt'l numbers
      displayValue += button.textContent;
      display.textContent = displayValue;
    } else if (firstNum > 0) {
      //new display numbers after firstNum has stored value
      displayValue = display.textContent;
      display.textContent += button.textContent;
    }
  }
  if (action === "decimal") {
    //decimal functionality, need to prevent multi decimals
    displayValue += button.textContent;
    display.textContent = displayValue;
  }
  if (
    //operator selected
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    if (firstNum === 0) {
      //once operator clicked, store first number
      firstNum = display.textContent;
      display.textContent = button.textContent;
      //replace number with operator clicked
      opSelection = action;
    } else if (secondNum > 0) {
      //secondNum has value after calculation clicked
      firstNum = result;
      display.textContent = button.textContent;
      //replace number with operator clicked
      opSelection = action;
      secondNum = 0;
    }
    if (firstNum > 0) {
      //display cleared for new numbers after firstNum has value
      displayValue = 0;
    }
    if (firstNum > 0 && display.textContent > 0 && secondNum === 0) {
      //functionality for stringed calculations
      secondNum = display.textContent;
      display.textContent = button.textContent;
      runningTotal = operate(firstNum, opSelection, secondNum);
      opSelection = action;
      firstNum = runningTotal;
      secondNum = 0;
    }
  }
  if (action === "calculate") {
    secondNum = display.textContent;
    result = operate(firstNum, opSelection, secondNum);
    result = +result.toFixed(2);
    //result rounded to 2 decimal places, unary operator makes it only when necessary
    display.textContent = result;
    displayValue = result;
  }
});

const clearAll = () => {
  display.textContent = 0;
  displayValue = "";
  firstNum = 0;
  secondNum = 0;
  opSelection = "";
};

clear.addEventListener("click", () => {
  clearAll();
});

//TODO
//-->needs to start new calculation cycle when hitting number while result is displayed
//-->prevent more than 7 characters on display
//-->display 'nope!' if division by 0
//-->make calculator body unresponsive
