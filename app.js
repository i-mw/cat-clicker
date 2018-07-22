let catList = document.querySelector('.list ul'),
    card = {
        header: document.querySelector('.name'),
        imageCont: document.querySelector('.img-container'),
        counter: document.querySelector('.counter')
    },
    catNames = ['bosy', 'cooky', 'mesho', 'sheka', 'zbeda'],
    cats = {},
    currentCat;

function resources(cb) {
    catNames.forEach(function(catName){
        cats[catName] = {};
        cats[catName].name = catName.charAt(0).toUpperCase() + catName.slice(1);
        cats[catName].img = document.createElement('img');
        cats[catName].img.setAttribute('src', `img/${catName}.jpg`);
        cats[catName].img.setAttribute('alt', `${catName} cat`);
        cats[catName].clicks = 0;
    });
    cb();
}

function init() {
    for( cat in cats) {
        let temp = document.createElement('li');
        temp.innerText = cats[cat].name;
        catList.appendChild(temp);
    }

    currentCat = catNames[0];
    catList.querySelector('li:first-child').classList.add('selected');
    card.header.innerText = cats[currentCat].name;
    card.imageCont.appendChild(cats[currentCat].img);
}

resources(init);

catList.addEventListener('click', function(eve){
    if(eve.target.nodeName = 'LI') {
        currentCat = eve.target.innerText.toLowerCase();

        catList.querySelector('.selected').classList.remove('selected');
        eve.target.classList.add('selected');

        card.header.innerText = cats[currentCat].name;
        card.imageCont.innerHTML = ' ';
        card.imageCont.appendChild(cats[currentCat].img);
        card.counter.innerText = cats[currentCat].clicks;
    }
}); 

card.imageCont.addEventListener('click', function() {
    cats[currentCat].clicks++;
    card.counter.innerText = cats[currentCat].clicks;
});