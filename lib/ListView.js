var LinearLayout = require('ui').LinearLayout;
var TextView = require('ui').TextView;
var appa = this;

var ListView = LinearLayout.extend({
    initialize: function(listCollection, title) {
        this.style({
            width: 'fill-parent',
            height: 'fill-parent',
            overflow: 'auto'
        });
        
        this.initTitle(title);
        this.initList(listCollection);
    },
    
    /**
     * initTitle is overridable, you can customize your own
     * title bar appearance
     */
    initTitle: function(title) {
        if (title !== undefined) {
            this.add(new TextView({
                label: title,
                style: {
                    'background-color': '#888',
                    'font-weight': 'bold',
                    width: 'fill-parent',
                    align: 'center',
                    border: 8
                }
            }));
            
            this.hasTitle = true;
        }
    },
    
    initList: function(listCollection) {
        var self = this;
        if (listCollection instanceof Array) {
            listCollection.forEach(function(item) {
                self.add(item);
                item.emit('blur');
            });
            
            self.focusTop();
        } else {
            self.add(new TextView({
                label: 'Invalid list'
            }));
        }
        
        self.focusTop();
    },
    
    ':keypress': function(key) {
        var self = this;
        var next;
        
        if (self.index === undefined) {
            if (self.hasTitle) {
                if (self.size() > 1) {
                    self.focusItem(1);   
                }
            } else {
                if (self.size() > 0) {
                    self.focusItem(0);   
                }
            }
        } else if (key === 'up' || key === 'down') {
            next = self.index + (key === 'up' ? -1 : 1);
            
            if (self.hasTitle && next < 1) {
                next = 1;
            } else if (!self.hasTitle && next < 0) { 
                next = 0;
            } else if (next > (self.size() - 1)) {
                next = self.size() - 1;
            }
            
            if (self.index === next) {
                return;
            }
            
            self.focusItem(next);
        } else if (key === 'fire') {
            self.handleFire(self.index);
        } else if (key === '84' || key === '116') {
            self.focusTop();
        } else if (key === '66' || key === '98') {
            next = self.size() - 1;
            
            self.focusItem(next);
        }
    },
    
    /**
     * This fuction can be overriden to serve more complex
     * fire button handling on each list
     */
    handleFire: function(index) {
        var item = this.get(index);
        
        if (item.callback !== undefined) {
            item.callback();
        }
    },
    
    focusTop: function() {
        var self = this;
        
        if (self.hasTitle && self.size() > 1) {
            self.focusItem(1);
        } else {
            self.focusItem(0);
        }  
    },
    
    focusItem: function(index) {
        var self = this;
        
        if (self.index !== undefined) {
            self.get(self.index).emit('blur');
        }

        self.index = index;
        self.get(index).emit('focus');
        if((self.hasTitle && index === 1) || index === 0){
            self.scrollTop(0);
        }
        self.scrollTo(index);
    }
});

exports.ListView = ListView;
