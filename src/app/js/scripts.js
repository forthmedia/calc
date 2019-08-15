// scripts.js
document.getElementById('calc').addEventListener('click', e => {
    if (e.target.dataset.operation) {
        console.log(e.target.dataset.operation);
    } else if (e.target.dataset.numeral) {
        console.log(e.target.dataset.numeral)
    }
});