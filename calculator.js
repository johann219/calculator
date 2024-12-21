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

const isFraction = (displayNumber) => displayNumber.includes('.');
const isNegative = (displayNumber) => displayNumber.includes('-');

const updateActiveDisplay = () => {
  activeDisplayElement.textContent = activeValue === undefined ? '' : activeValue;
};
const updateHoldDisplay = () => {
  holdDisplayElement.textContent = holdValue === undefined ? '' : holdValue;
};

const updateHoldOnOperation = () => {
  if (activeValue === undefined) return;
  
  holdValue = holdValue === undefined ? activeValue : operate(holdValue, activeValue, holdOperator);

  updateHoldDisplay();
};

const resetActive = () => {
  activeValue = undefined;
  updateActiveDisplay();
};

const resetHold = () => {
  holdValue = undefined;
  updateHoldDisplay();
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

const clearDisplayAndValues = () => {
  resetActive();
  resetHold();
  holdOperator = undefined;
};

const changeActiveSign = () => {
  activeDisplayElement.textContent = activeDisplayElement.textContent.at(0) === '-' ? 
    activeDisplayElement.textContent = activeDisplayElement.textContent.slice(1) :
    activeDisplayElement.textContent = `-${activeDisplayElement.textContent}`;

  activeValue *= -1;
};

const deleteLastCharacter = () => {
  const activeValueLength = activeDisplayElement.textContent.length;
  
  if (activeValueLength === 0) return;

  activeDisplayElement.textContent = activeDisplayElement.textContent.slice(0, activeValueLength - 1);
  activeValue = Number(activeDisplayElement.textContent);
};

const addFloatingPoint = () => {
  if (isFraction(activeDisplayElement.textContent)) return;

  activeDisplayElement.textContent += '.';
};

btnNumberElementList.forEach((numBtn) => {
  numBtn.addEventListener('click', () => {
    activeDisplayElement.textContent += numBtn.textContent;
    activeValue = Number(activeDisplayElement.textContent);
  });
});

btnOperatorElementList.forEach((operator) => {
  operator.addEventListener('click', () => {
    updateHoldOnOperation();
    resetActive();
    
    holdOperator = operator.classList.contains('btn-eval') ? undefined : operator.textContent;
  });
});

btnClearElement.addEventListener('click', () => clearDisplayAndValues());

btnSignElement.addEventListener('click', () => changeActiveSign());

btnBackElement.addEventListener('click', () => deleteLastCharacter());

btnPointElement.addEventListener('click', () => addFloatingPoint());