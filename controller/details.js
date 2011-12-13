var _ = require('common/util');
var ImageView = require('ui').ImageView;
var TextView = require('ui').TextView;
var app = this;

function getTotalHeight(controls) {
    var total = 0;
    controls.forEach(function each(item) {
        total += item.dimensions().height;
    });

    total += 20;
    return total;

}

_.extend(exports, {
    ':load': function() {
        var self = this;
        self.clear();
    },

    ':state': function(data) {
        console.log('Thumbnail : ' + data.thumbnail);
        var self = this;
        var temp = this;

        self.clear();
        temp.clear();
        self.add('title', new TextView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content',
                'font-weight': 'bold',
                'background-color': '#00BFFF    '

            }
        }));
        self.add('thumbnail', new ImageView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content',
                mode: 'centered',
                'background-color': 'white'
            }
        }));

        temp.add('description', new TextView({
            style: {
                width: 'fill-parent',
                height: 'wrap-content'

            }
        }));
        var imageUri = data.thumbnail;
        console.log('imageUri : ' + imageUri);

        //self.get('thumbnail').src(app.resourceURL(imageUri));
        console.log('Details Title : ' + data.title);
        console.log('Details Thumbnail : ' + data.thumbnail);
        console.log('Details Description : ' + data.description);
        self.get('title').label(data.title);
        self.get('thumbnail').resource('http://a1.twimg.com/profile_images/1679096374/ggh.jpg');
        //self.get('thumbnail').resourse(data.thumbnail+' ');
        //self.get('thumbnail').setResource(data.thumbnail);
        temp.get('description').label(data.description);
    },


    ':keypress': function(key) {
        console.log('Key press: ' + key);
        //var self = this;
        //var totalHeight = getTotalHeight(self);
        //
        //if (self.sct === undefined) {
        //    self.sct = 0;
        //    self.scrollTop(0, 1000);
        //} else if (key === 'up' || key === 'down') {
        //    var next = self.sct + (key === 'up' ? 50 : -50);
        //
        //    if (next > 0) {
        //        next = 0;
        //    } else if (next <= ((totalHeight - self.dimensions().height) * -1)) {
        //        next = ((totalHeight - self.dimensions().height) * -1);
        //    }
        //    self.sct = next;
        //    self.scrollTop(next, 1000);
        //}
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
            //this.get(0)[':keypress'](key);
            this.get(this.index).emit('activate');
        } else if (key === 'back') {
            console.log('back');
        }
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