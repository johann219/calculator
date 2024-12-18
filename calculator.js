const btnNumberElementList = document.querySelectorAll('.btn-num');
const btnOperatorElementList = document.querySelectorAll('.btn-oper');
const btnClearElement = document.querySelector('.btn-clear');
const btnEvalElement = document.querySelector('.btn-eval');

const activeDisplayElement = document.querySelector('.display-active');
const holdDisplayElement = document.querySelector('.display-hold');

let activeValue;
let holdValue;
let holdOperator;

const updateActiveDisplay = (value) => {
  activeDisplayElement.textContent += value;
};

const updateActiveValue = (value) => {
  activeValue = value;
};

const updateHold = () => {
  if (activeValue === undefined) return;
  
  holdValue = holdValue === undefined ? activeValue : operate(holdValue, activeValue, holdOperator);
  holdDisplayElement.textContent = holdValue;
};

const resetActive = () => {
  activeValue = undefined;
  activeDisplayElement.textContent = '';
};

const resetHold = () => {
  holdValue = undefined;
  holdDisplayElement.textContent = '';
};

const setHoldOperator = (operator) => {
  holdOperator = operator;
};

const operate = (firstValue, secondValue, operator) => {
  switch (operator) {
    case '+':
      return firstValue + secondValue;
      break;
    case '-':
      return firstValue - secondValue;
      break;
    case '*':
      return firstValue * secondValue;
      break;
    case '/':
      return firstValue / secondValue;
      break;
  }
};

btnNumberElementList.forEach((number) => {
  number.addEventListener('click', () => {
    updateActiveDisplay(number.textContent);
    updateActiveValue(Number(activeDisplayElement.textContent));
  });
});

btnOperatorElementList.forEach((operator) => {
  operator.addEventListener('click', () => {
    updateHold();
    resetActive();
    if (operator.classList.contains('btn-eval')) {
      setHoldOperator(undefined);
    } else {
      setHoldOperator(operator.textContent);
    }
  });
});

const clearDisplayAndValues = () => {
  resetActive();
  resetHold();
  setHoldOperator(undefined);
};

btnClearElement.addEventListener('click', () => clearDisplayAndValues());