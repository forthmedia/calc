require('./styles.css');

localStorage.clear();

document.addEventListener("DOMContentLoaded", function() {
    
    const output = document.getElementById('output');

    //delegate click listener to outer div
    document.getElementById('grid').addEventListener('click', e => {
        deselectAll();
        if (!(e.target.id === 'clear')) {
            setClearButton();
        }
        if (e.target.dataset.operation) {
            switch(e.target.dataset.operation){
                case 'decimal':
                    displayDecimal();
                    break;
                case 'equals':
                    doEquals()
                    break;
                case 'clear':
                    doClear()
                    break;
                case 'add':
                    e.target.classList.add('selected');
                    doOperation('add');
                    break;
                case 'subtract':
                    e.target.classList.add('selected');
                    doOperation('subtract');
                    break;
                case 'multiply':
                    e.target.classList.add('selected');
                    doOperation('multiply');
                    break;
                case 'divide':
                    e.target.classList.add('selected');
                    doOperation('divide');
            }
        } else if (e.target.dataset.numeral) {
            updateDisplay(e.target.dataset.numeral);
        }
    });

    document.addEventListener('keyup', (e) => {
        setClearButton();
        const key = e.key;
        switch(key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                updateDisplay(key);
                break;
            case '.':
                displayDecimal();
                break;
            case '=':
                doEquals();
                break;
            case 'c':
            case 'C':
                doClear()
                break;
            case '+':
                doOperation('add');
                break;
            case '-':
                doOperation('subtract');
                break;
            case '*':
                doOperation('multiply');
                break;
            case '/':
                doOperation('divide');
        }
    });

    let updateDisplay = num => {
        const current = output.textContent;
        const keystroke = localStorage.getItem('keystroke');
        if (current === '0' || keystroke === 'operation' || keystroke === 'equals') {
            output.textContent = num;
        } else {
            output.textContent = current + num;
        }
        localStorage.setItem('keystroke', 'numeral');
    }

    let displayDecimal = () => {
        const keystroke = localStorage.getItem('keystroke');
        if (keystroke === 'operation' || keystroke === 'equals') {
            output.textContent = '0.'
        } else if (! output.textContent.includes('.')) {
            output.textContent += '.';
        }

        localStorage.setItem('keystroke', 'decimal');
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

        return result;
    }

    let doOperation = (op) => {
        const current = output.textContent;
        const operator = localStorage.getItem('operator');
        const value1 = localStorage.getItem('value1');
        const previous = localStorage.getItem('keystroke');

        localStorage.setItem('keystroke', 'operation');
        localStorage.setItem('operator', op);

        if (operator && value1 && previous !== 'operation' && previous !== 'equals') {
            localStorage.setItem('value2', current);
            const result = calculate();
            output.textContent = result;
            localStorage.setItem('value1', result);            
        } else {
            localStorage.setItem('value1', current);
        }
    }

    let doEquals = () => {
        const value1 = localStorage.getItem('value1');
        const current = output.textContent;
        localStorage.setItem('value2', current);
        if (value1) {
            if (localStorage.getItem('keystroke') === 'equals') {
                localStorage.setItem('value1', current);
                const repeat = localStorage.getItem('repeat');
                localStorage.setItem('value2', repeat);
            }
            const result = calculate();
            output.textContent = result;
            if (! (localStorage.getItem('keystroke') === 'equals')) {
                localStorage.setItem('repeat', current);
            }
        }
        localStorage.setItem('keystroke', 'equals');
    }

    let doClear = () => {
        localStorage.setItem('keystroke', 'clear');
        output.textContent = '0';
        clearButton = document.getElementById('clear');
        if (clearButton.textContent == 'AC') {
            localStorage.clear();
        } else {
            clearButton.textContent = 'AC';
        }
   }

    let setClearButton = (e) => {
        document.getElementById('clear').innerHTML = 'CE';
    }
})
