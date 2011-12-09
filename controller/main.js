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
			console.log(action);

			if (action === 'getBuku') {
				var i = 1;

				data.text.forEach(function(item) {
					var temp;
					if (i % 2 === 0) {
						temp = new TextView({
							label: item.text,
							style: {
								color: 'black',
								width: 'fill-parent',
								'background-color': 'transparent'
							}

						});
						temp.on('blur', function() {
							this.style({
								'color': 'black',
								'background-color': 'transparent',
								'font-weight': 'normal'
							});

						});

					} else {

						temp = new TextView({
							label: item.text,
							style: {
								color: 'black',
								width: 'fill-parent',
								'background-color': '#009eff'
							}
						});

						temp.on('blur', function() {
							this.style({
								'color': 'black',
								'background-color': '#009eff',
								'font-weight': 'normal'

							});

						});

					}

					temp.on('activate', function() {
						//app.setContent('detail', {url: item.url, title: item.title});
					});
					temp.on('focus', function() {
						this.style({
							'color': 'black',
							'background-color': '#3682b0',
							'font-weight': 'bold'
						});
					});
					view.add(item.text2, temp);
					i++;
				});
				view.focusItem(1);


				//});
			}

		});



	},


	':keypress': function(key) {
		console.log('Key press: ' + key);
		this.get('textJudul').emit('keypress', key);

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