let catConts = document.getElementsByClassName('cat-cont'),
    catNames = ['Zbeda', 'Bosy'],
    namesHeaders = document.getElementsByClassName('name');

for(let i=0; i<namesHeaders.length; i++) {
    namesHeaders[i].innerText = catNames[i];
}

function incrementCounter() {
    let counter = this.parentElement.querySelector('.counter');
    let counterValue = Number(counter.innerText);
    counterValue++
    counter.innerText = counterValue;
}

for(let i=0; i<catConts.length; i++) {
    catConts[i].addEventListener('click', incrementCounter);
}
