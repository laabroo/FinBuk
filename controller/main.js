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
				var i = 1;
				var temp;

				//view.add(temp);
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
						//app.setContent('detail', {url: item.url, title: item.title});
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

		console.log(data.text.title, data.text.selfLink, data.text.author);

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