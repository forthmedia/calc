var assert = require('assert');
clear = require('./clear');
update = require('./update');
calculate = require('./calculate');

describe('clear', () => {
    it ('should clear output', () => {
        let output = {'textContent': '1'};

        clear(output);

        assert.equal(output.textContent, '0');
    });
});

describe('update', () => {
    it ('should replace if output is 0', () => {
        let num = 1;
        let output = {'textContent': '0'};

        output = update(num, output);

        assert.equal(output.textContent, '1');
    });

    it ('should append if output is non-zero', () => {
        let num = 1;
        let output = {'textContent': '1'};

        update(num, output);

        assert.equal(output.textContent, '11');
    });
});

describe('calculate', () => {
    it('should add two values', () => {
        let operator = 'add';
        let value1 = '1';
        let value2 = '2';

        let result = calculate(operator, value1, value2);

        assert.equal(result, '3');
    });

    it('should subtract two values', () => {
        let operator = 'subtract';
        let value1 = '3';
        let value2 = '2';

        let result = calculate(operator, value1, value2);

        assert.equal(result, '1');
    });

    it('should multiply two values', () => {
        let operator = 'multiply';
        let value1 = '3';
        let value2 = '2';

        let result = calculate(operator, value1, value2);

        assert.equal(result, '6');
    });

    it('should divide two values', () => {
        let operator = 'divide';
        let value1 = '6';
        let value2 = '2';

        let result = calculate(operator, value1, value2);

        assert.equal(result, '3');
    });
});