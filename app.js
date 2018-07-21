let catConts = document.getElementsByClassName('cat-cont');

function incrementCounter() {
    let counter = this.parentElement.querySelector('.counter');
    let counterValue = Number(counter.innerText);
    counterValue++
    counter.innerText = counterValue;
}

for(let i=0; i<catConts.length; i++) {
    catConts[i].addEventListener('click', incrementCounter);
}
