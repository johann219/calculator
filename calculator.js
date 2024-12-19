const btnNumberElementList = document.querySelectorAll('.btn-num');
const btnOperatorElementList = document.querySelectorAll('.btn-oper');
const btnClearElement = document.querySelector('.btn-clear');
const btnEvalElement = document.querySelector('.btn-eval');
const btnSignElement = document.querySelector('.btn-sign');
const btnBackElement = document.querySelector('.btn-back');
const btnPointElement = document.querySelector('.btn-point');

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
  updateActiveValue(undefined);
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

const changeActiveSign = () => {
  activeDisplayElement.textContent = activeDisplayElement.textContent.at(0) === '-' ? 
    activeDisplayElement.textContent = activeDisplayElement.textContent.slice(1) :
    activeDisplayElement.textContent = `-${activeDisplayElement.textContent}`;

  activeValue *= -1;
};

const clearDisplayAndValues = () => {
  resetActive();
  resetHold();
  setHoldOperator(undefined);
};

const deleteLastCharacter = () => {
  if (activeDisplayElement.textContent.length === 0) return;

  activeDisplayElement.textContent = activeDisplayElement.textContent.slice(0, activeDisplayElement.textContent.length - 1);
  updateActiveValue(Number(activeDisplayElement.textContent));
};

const addFloatingPoint = () => {
  if (activeDisplayElement.textContent.includes('.')) return;

  updateActiveDisplay('.');
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

btnClearElement.addEventListener('click', () => clearDisplayAndValues());

btnSignElement.addEventListener('click', () => changeActiveSign());

btnBackElement.addEventListener('click', () => deleteLastCharacter());

btnPointElement.addEventListener('click', () => addFloatingPoint());