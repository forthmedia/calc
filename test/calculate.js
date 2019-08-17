let calculate = (operator, value1, value2) => {
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
module.exports = calculate;