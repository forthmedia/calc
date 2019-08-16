// scripts.js
const output = document.getElementById('output');

//delegate click listener to outer div
document.getElementById('calc').addEventListener('click', e => {
    deselectAll();
    if (e.target.dataset.operation) {
        const current = output.textContent;
        switch(e.target.dataset.operation){
            case 'decimal':
                displayDecimal();
                break;
            case 'equals':
                localStorage.setItem('value2', current);
                calculate();
                break;
            case 'clear':
                localStorage.setItem('keystroke', 'clear');
                output.textContent = '0';
                break;
            case 'add':
                e.target.classList.add('selected');
                localStorage.setItem('keystroke', 'operation');
                localStorage.setItem('operator', e.target.dataset.operation);
                localStorage.setItem('value1', current);
                break;
            case 'subtract':
                e.target.classList.add('selected');
                localStorage.setItem('keystroke', 'operation');
                localStorage.setItem('operator', e.target.dataset.operation);
                localStorage.setItem('value1', current);
                break;
            case 'multiply':
                e.target.classList.add('selected');
                localStorage.setItem('keystroke', 'operation');
                localStorage.setItem('operator', e.target.dataset.operation);
                localStorage.setItem('value1', current);
                break;
            case 'divide':
                localStorage.setItem('keystroke', 'operation');
                e.target.classList.add('selected');
                localStorage.setItem('operator', e.target.dataset.operation);
                localStorage.setItem('value1', current);
        }
    } else if (e.target.dataset.numeral) {
        updateDisplay(e.target.dataset.numeral);
    }
});

let updateDisplay = num => {
    const current = output.textContent;
    const keystroke = localStorage.getItem('keystroke');
    if (current === '0' || keystroke == 'operation') {
        output.textContent = num;
    } else {
        output.textContent = current + num;
    }
    localStorage.setItem('keystroke', 'numeral');
}

let displayDecimal = () => {
    if (! output.textContent.includes('.')) {
        output.textContent += '.';
    }
    localStorage.setItem('keystroke', 'other');
}

let deselectAll = () => {
    const operations = document.querySelectorAll('.operation');
    for (let i = 0; i < operations.length; i++) {
        operations[i].classList.remove('selected');
    }
}

let calculate = () => {
    const operator = localStorage.getItem('operator');
    const value1 = localStorage.getItem('value1');
    const value2 = localStorage.getItem('value2');
    let result;
    switch(operator) {
        case 'add':
            result = parseFloat(value1) + parseFloat(value2);
            break;
        case 'subtract':
            result = parseFloat(value1) - parseFloat(value2);
            break;
        case 'multiply':
            result = parseFloat(value1) * parseFloat(value2);
            break;
        case 'divide':
            result = parseFloat(value1) / parseFloat(value2);
        }
    output.textContent = result;
}
