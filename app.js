/* model */
let model = {
	currentCat: null,
	cats: [
		{
			name: 'bosy',
			url: 'img/bosy.jpg',
            clicks: 0,
            id: 1
		},
		{
			name: 'cooky',
			url: 'img/cooky.jpg',
            clicks: 0,
            id: 2
		},
		{
			name: 'mesho',
			url: 'img/mesho.jpg',
            clicks: 0,
            id: 3
		},
		{
			name: 'sheka',
			url: 'img/sheka.jpg',
            clicks: 0,
            id: 4
		},
		{
			name: 'zbeda',
			url: 'img/zbeda.jpg',
            clicks: 0,
            id: 5
		}
	],
};


/* octopus */
let octopus = {
	getCats: function() {
		return model.cats;
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	setCurrentCat: function(index) {
		model.currentCat = model.cats[index];
		listView.render();
		displayView.render();
	},

	incrementClicks: function() {
		model.currentCat.clicks++;
		displayView.render();
	},

	init: function() {
		model.currentCat = model.cats[0];
		listView.init();
		displayView.init();
	}
}


/* list view */
let listView = {
	init: function() {
		this.list = document.querySelector('.list ul');
		this.list.addEventListener('click', function(eve){
			if(eve.target.nodeName === 'LI'){
				let targetId = eve.target.getAttribute('data-id');
				octopus.setCurrentCat(targetId-1);
			}
		});

		this.render();
	},

	render: function() {
        let cats = octopus.getCats(),
		currentCat = octopus.getCurrentCat(),
		list = this.list;
		list.innerHTML = '';

		cats.forEach(function(cat) {
			catName = cat.name.charAt(0).toUpperCase() + cat.name.slice(1);
			list.innerHTML += `<li data-id="${cat.id}">${catName}</li>\n`;
		});

        document.querySelector('[data-id="'+currentCat.id+'"').classList.add('selected');
	}
}


/* cat display view */
let displayView = {
	init: function() {
		this.imgContainer = document.querySelector('.img-container');
		this.imgContainer.addEventListener('click', function() {
			octopus.incrementClicks();
		});

		this.render();
	},

	render: function() {
		let currentCat = octopus.getCurrentCat(),
		    header = document.querySelector('.name'),
		    counter = document.querySelector('.counter'),
		    catName = currentCat.name.charAt(0).toUpperCase() + currentCat.name.slice(1);

		header.innerText = catName;
		this.imgContainer.innerHTML = '<img src="' + currentCat.url + '" '+
			'alt="'+ currentCat.name+ ' cat">';
		counter.innerText = currentCat.clicks;
	}
}

octopus.init();