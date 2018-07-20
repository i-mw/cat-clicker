let cat = document.getElementById('cat');
let counter = document.getElementById('counter');

function incrementCounter() {
    let counterValue = Number(counter.innerText);
    counterValue++
    counter.innerText = counterValue;

}

cat.addEventListener('click', incrementCounter);