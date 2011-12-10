var _ = require('common/util');
var app = this;
var ui = require('ui');
var TextView = ui.TextView;
//var ListView = require('../lib/ListView').ListView;
var title = null;
var author = null;

_.extend(exports, {
	':load': function() {
		console.log('View was loaded');

		var view = this;

		title = new TextView({
			'style': {
				width: 'fill-parent',
				height: 'wrap-content',
				'font-weight': 'bold',
				'font-size': 'small'
			}
		});

		author = new TextView({
			'style': {
				width: 'fill-parent',
				height: 'wrap-content'
			}
		});

		view.get('textJudul').on('submit', function() {
			console.log('Data dari textJudul : ' + view.get('textJudul').value());
			app.msg('getBuku', {
				text: view.get('textJudul').value()
			});
		});

		app.on('message', function(action, data) {

			if (action === 'getBuku') {
				clearInterval(view.intervalId);
				delete view.intervalId;
				var i = 1;
				var temp;
				
				var dataArray = [data.text.title];
				dataArray.forEach(function(item) {
					console.log('Item : ' + item);
					if (i % 2 === 0) {
						temp = new TextView({
							label: item,
							style: {
								color: 'black',
								width: 'fill-parent',
								'background-color': 'transparent'
							}

						});

						temp.on('blur', function() {
							this.style({
								'color': 'black',
								'font-weight': 'normal',
								'background-color': 'transparent'
							});
						});
					} else {
						temp = new TextView({
							label: item,
							style: {
								color: 'black',
								width: 'fill-parent',
								'background-color': '#5F9EAD'
							}
						});

						temp.on('blur', function() {
							this.style({
								'color': 'black',
								'background-color': '#5F9EAD',
								'font-weight': 'normal'

							});

						});
					}

					temp.on('activate', function() {
						app.setContent('details', {
							title: data.text.title,
							thumbnail: data.text.thumbnail,
							description: data.text.description
						});
						
						console.log('data.text.thumbnail : '+data.text.thumbnail);
					});
					temp.on('focus', function() {
						this.style({
							'color': 'black',
							'background-color': '#3682b0',
							'font-weight': 'bold'
						});
					});
					view.add(item, temp);
					i++;
				});
				view.focusItem(1);
				//end 
			}

			console.log(data.text.title, data.text.selfLink, data.text.description, data.text.author, data.text.thumbnail, data.text.smallThumbnail);

		});



	},


	':keypress': function(key) {
		console.log('Key press: ' + key);
		this.get('textJudul').emit('keypress', key);
		if (this.index === undefined) {
			if (this.size() > 0) {
				this.focusItem(1);
			}
		} else if (key === 'up' || key === 'down') {
			var next = this.index + (key === 'up' ? -1 : 1);

			if (next < 1) {
				next = 1;
			} else if (next > (this.size() - 1)) {
				next = this.size() - 1;
			}

			if (this.index === next) {
				return;
			}

			this.focusItem(next);
		} else if (key === 'fire') {
			this.get(this.index).emit('activate');
		} else if (key === 'back') {
			console.log('back');
		}

	},

	':active': function() {
		console.log('View is active');
	},

	':inactive': function() {
		console.log('View is inactive');
	},

	focusItem: function(index) {
		if (this.index !== undefined) {
			this.get(this.index).emit('blur');
		}
		this.index = index;
		this.get(index).emit('focus');
		if (index === 1) {
			this.scrollTop(0);
		}
		console.log(index);
		this.scrollTo(index);
	}
});