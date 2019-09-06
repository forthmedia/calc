require('./styles.css');

localStorage.clear();

document.addEventListener("DOMContentLoaded", function() {
    
    const output = document.getElementById('output');

    //delegate click listener to outer div
    document.getElementById('grid').addEventListener('click', e => {
        deselectAll();
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
                    doOperation(e);
                    break;
                case 'subtract':
                    doOperation(e);
                    break;
                case 'multiply':
                    doOperation(e);
                    break;
                case 'divide':
                    doOperation(e);
            }
        } else if (e.target.dataset.numeral) {
            updateDisplay(e.target.dataset.numeral);
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

    let doOperation = (e) => {
        const current = output.textContent;
        const operator = localStorage.getItem('operator');
        const value1 = localStorage.getItem('value1');
        const previous = localStorage.getItem('keystroke');

        e.target.classList.add('selected');
        localStorage.setItem('keystroke', 'operation');
        localStorage.setItem('operator', e.target.dataset.operation);

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
        localStorage.clear();
        localStorage.setItem('keystroke', 'clear');
        output.textContent = '0';
    }
})
