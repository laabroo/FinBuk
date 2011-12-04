var _ = require('common/util');
var app = this;
var ui = require('ui');
var TextView = ui.TextView;

var content = null;

_.extend(exports, {
	':load': function() {
		console.log('View was loaded');

		var view = this;

		content = new TextView({
			'style': {
				width: 'fill-parent',
				height: 'wrap-content'
			}
		});

		view.get('textJudul').on('submit', function() {
			console.log('Data dari textJudul : ' + view.get('textJudul').value());
			//	view.get('result').label(view.get('textJudul').value());
			app.msg('getBuku', {
				text: view.get('textJudul').value()
			});
		});

		app.on('message', function(action, data) {
			console.log(action);

			if (action === 'getBuku') {
				console.log(data.text);
				//	view.get('result').label(data.text);
				//var i = 0;
				//for (i = 0; i < 9; i++) {
				//	content.label(data.text);
				//
				//}
				content.label(data.text);

			}
		});
		view.add(content);


		//view.add(this);
	},

	':resized': function(width, height) {
		console.log('View was resized to ' + width + 'x' + height);
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
	}
});