const btnNumberElementList = document.querySelectorAll('.btn-num');
const btnOperatorElementList = document.querySelectorAll('.btn-oper');
const btnClearElement = document.querySelector('.btn-clear');

const activeDisplayElement = document.querySelector('.display-active');
const holdDisplayElement = document.querySelector('.display-hold');

let activeValue = 0;
let holdValue = 0;

const updateDisplay = (value) => {
  activeDisplayElement.textContent += value;
};

const updateActiveValue = (value) => {
  activeValue = value;
};

const saveActiveValueToHold = () => {
  holdValue = activeValue;
  activeValue = 0;
  holdDisplayElement.textContent = activeDisplayElement.textContent;
  activeDisplayElement.textContent = '';
};

const clearDisplay = () => {
  activeValue = 0;
  holdValue = 0;
  activeDisplayElement.textContent = '';
  holdDisplayElement.textContent = '';
};

btnNumberElementList.forEach((number) => {
  number.addEventListener('click', () => {
    updateDisplay(number.textContent);
    updateActiveValue(Number(activeDisplayElement.textContent));
    console.log(activeValue);
  });
});

btnOperatorElementList.forEach((operator) => {
  operator.addEventListener('click', () => {
    saveActiveValueToHold();
  });
});

btnClearElement.addEventListener('click', () => clearDisplay());