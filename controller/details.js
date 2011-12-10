var _ = require('common/util');
var ImageView = require('ui').ImageView;
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
        app.on('message', function(action, data) {
            if (action === 'getBuku') {
                clearInterval(self.intervalId);
                delete self.intervalId;
                console.log('Details : ' + data.title);
                console.log('Details : ' + data.thumbnail);
                console.log('Details : ' + data.description);
                self.get('title').label(data.title);
                self.get('imageBook').resource(data.thumbnail);
                self.get('description').label(data.description);
            }
        });


    },
    //':state': function(data) {
    //    var self = this;
    //    self.sct = 0;
    //    self.scrollTop(0);
    //    self.get('title').label(' ');
    //    self.get('imageBook').resource(data.imageurl);
    //    self.get('imageBook').resource(data.text.thumbnail);
    //    self.get('description').label('Silahkan Tunggu');
    //    self.intervalId = setInterval(function() {
    //        if (self.id === undefined) {
    //            self.id = 1;
    //        } else if (self.id < 10) {
    //            self.id++;
    //        } else {
    //            self.id = 1;
    //        }
    //        var temp = '';
    //        for (var i = 0; i < self.id; i++) {
    //            temp = temp + '.';
    //        }
    //
    //        self.get('description').label('Silahkan Tunggu' + temp);
    //    }, 500);
    //
    //    //app.msg('getBuku', {
    //    //    text: data.text.title
    //    //});
    //
    //
    //    app.msg('getBuku', {
    //        action: 'getBuku',
    //        title: data.text.title,
    //        thumbnail: data.text.thumbnail,
    //        description: data.text.description
    //    });
    //},
    ':state': function(data) {
        console.log('Thumbnail : ' + data.thumbnail);
        var self = this;
        var temp;
        self.clear();
        self.add('thumbnail', new ImageView({
            style: {
                width: 'wrap-content',
                height: 'wrap-content',
                mode: 'centered'
            }
        }));
        //self.add('title', new TextView({
        //    style: {
        //        width: 'wrap-content',
        //        height: 'wrap-content',
        //        mode: 'centered'
        //    }
        //}));
        //self.add('description', new TextView({
        //    style: {
        //        width: 'wrap-content',
        //        height: 'wrap-content',
        //        mode: 'centered'
        //    }
        //}));

        //self.get('pic').src(app.resourceURL("'"+data.thumbnail+"'"));
        console.log('Details Title : ' + data.title);
        console.log('Details Thumbnail : ' + data.thumbnail);
        console.log('Details Description : ' + data.description);
        self.get('thumbnail').resource(data.thumbnail);
        //self.get('title').label(data.title);
        ////self.get('imageBook').resource(data.thumbnail);
        //self.get('description').label(data.description);
    },


    ':keypress': function(key) {
        console.log('Key press: ' + key);
        var self = this;
        var totalHeight = getTotalHeight(self);

        if (self.sct === undefined) {
            self.sct = 0;
            self.scrollTop(0, 1000);
        } else if (key === 'up' || key === 'down') {
            var next = self.sct + (key === 'up' ? 50 : -50);

            if (next > 0) {
                next = 0;
            } else if (next <= ((totalHeight - self.dimensions().height) * -1)) {
                next = ((totalHeight - self.dimensions().height) * -1);
            }
            self.sct = next;
            self.scrollTop(next, 1000);
        }
    }


});