var _ = require('common/util');
var app = this;

_.extend(exports, {
	':load': function() {
		console.log('View was loaded');

		var view = this;

		view.get('textJudul').on('submit', function() {
			console.log('Data dari textJudul : '+view.get('textJudul').value());
		//	view.get('result').label(view.get('textJudul').value());

			app.msg('getBuku', {
				text: view.get('textJudul').value()
			});
		});

		app.on('message', function(action, data) {
			console.log(action);

			if (action === 'getBuku') {
				console.log(data.text);
				view.get('result').label(data.text);
			}
		});
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