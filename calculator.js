const numberButtonElementList = document.querySelectorAll('.num');
const displayElement = document.querySelector('.display');

const updateDisplay = (value) => {
  displayElement.textContent += value;
};

const onNumberButtonClick = () => {};

numberButtonElementList.forEach((element) => {
  element.addEventListener('click', () => {
    console.log(`Hurray! You clicked ${element.textContent}`);
    updateDisplay(element.textContent);
  });
});

