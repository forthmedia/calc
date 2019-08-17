let update = (num, output) => {
    const current = output.textContent;
    if (current == '0') {
        output.textContent = num;
    } else {
        output.textContent = current + num;
    }
    return output;
}
module.exports = update;