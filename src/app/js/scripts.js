// scripts.js

const output = document.getElementById('output');

//delegate click listener to outer div
document.getElementById('calc').addEventListener('click', e => {
    deselectAll();
    if (e.target.dataset.operation) {
        console.log(e.target.dataset.operation);
        switch(e.target.dataset.operation){
            case 'decimal':
                displayDecimal();
                break;
            case 'add':
                e.target.classList.add('selected');
                break;
            case 'subtract':
                e.target.classList.add('selected');
                break;
            case 'multiply':
                e.target.classList.add('selected');
                break;
            case 'divide':
                e.target.classList.add('selected');
                break;                
        }
    } else if (e.target.dataset.numeral) {
        console.log(e.target.dataset.numeral);
        updateDisplay(e.target.dataset.numeral);
    }
});

let updateDisplay = num => {
    const current = output.textContent;
    if (current === '0') {
        output.textContent = num;
    } else {
        output.textContent = current + num;
    }
}

let displayDecimal = () => {
    if (! output.textContent.includes('.')) {
        output.textContent += '.';
    }
}

let deselectAll = () => {
    const operations = document.querySelectorAll('.operation');
    console.log("deselectALL ", operations);
    for (let i = 0; i < operations.length; i++) {
        operations[i].classList.remove('selected');
    }
}