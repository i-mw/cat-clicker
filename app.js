/* model */
let model = {
	adminPanelVisible: null,
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
		adminView.render();
	},

	modifyCurrentCat: function(name, url, clicks) {
		model.currentCat.name = name;
		model.currentCat.url = url;
		model.currentCat.clicks = clicks;

		listView.render();
		displayView.render();
		adminView.render();
	},

	incrementClicks: function() {
		model.currentCat.clicks++;

		displayView.render();
		adminView.render();
	},

	getAdminPanelState: function() {
		return model.adminPanelVisible;
	},

	setAdminPanelState: function(state) {
		model.adminPanelVisible = state;

		adminView.render();
	},

	init: function() {
		model.currentCat = model.cats[0];
		model.adminPanelVisible = false;

		listView.init();
		displayView.init();
		adminView.init();
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


/* Admin panel view */
let adminView = {
	init: function() {
		//form
		this.adminePanel = document.querySelector('.admin-board form');
		//buttons
		this.adminBtn = document.getElementById('admin-btn');
		this.saveBtn = document.getElementById('save');
		this.cancelBtn = document.getElementById('cancel');
		//inputs
		this.catName = document.getElementById('cat-name');
		this.catImgURL = document.getElementById('cat-img-url');
		this.catClicks = document.getElementById('cat-clicks');

		this.adminBtn.addEventListener('click', function(eve) {
			eve.preventDefault();
			octopus.setAdminPanelState(!octopus.getAdminPanelState());
		});

		this.saveBtn.addEventListener('click', function(eve) {
			eve.preventDefault();
			let catName = adminView.catName.value,
				catImgURL = adminView.catImgURL.value,
				catClicks = adminView.catClicks.value;
			octopus.modifyCurrentCat(catName, catImgURL, catClicks);
			octopus.setAdminPanelState(false);
		});

		this.cancelBtn.addEventListener('click', function(eve) {
			eve.preventDefault();
			octopus.setAdminPanelState(false);			
		});

		this.render();
	},

	render: function() {
		let cat = octopus.getCurrentCat(),
		adminPanelState = octopus.getAdminPanelState();

		this.catName.value = cat.name;
		this.catImgURL.value = cat.url;
		this.catClicks.value = cat.clicks;

		if(adminPanelState) {
			this.adminePanel.classList.remove('hidden');
		} else {
			this.adminePanel.classList.add('hidden');
		}
	}
}

octopus.init();