// FinBuk -- backend.js
var ReqLog  = require('blaast/mark').RequestLogger;
var Scaling = require('blaast/scaling').Scaling;
var _  = require('underscore');
var rlog = new ReqLog(app.log);
var scaling = new Scaling(app.config);
log.info('Hello from backend bootstrap.');
var http = require('blaast/simple-http');
var QS = require('querystring');


app.message(function(client, action, data) {
    console.log('Action dari client : ' + action);
    console.log('Data yang dikirim dari client : ' + data.text);

    if (action === 'getBuku') {
        console.log('Data : ' + data);
        var param = QS.stringify({
            key: 'AIzaSyDp5k6BSkkItd3Hfq3rK15BwWlQLEppRVk',
            q: data.text
        });
        var url = "https://www.googleapis.com/books/v1/volumes?" + param;
        console.log(url);
        http.get(url, {
            type: 'binary'
        }, {
            ok: function(data) {
                console.log(data);
                data = JSON.parse(data);
                log.info(data);

                var array = [data];
                array.forEach(function(item) {
                    var c = 0;
                    var panjang = item.items.length;
                    console.log('Panjang : ' + item.items.length);
                    var a = [item.items.authors].length;
                    console.log('Panjang author : ' + a);
                    for (c = 0; c < panjang; c++) {
                        console.log('Title : ' + item.items[c].volumeInfo.title);
                        console.log('Link : ' + item.items[c].selfLink);
                        console.log('Author : ' + item.items[c].volumeInfo.authors[0]);
                        console.log('Description : ' + item.items[c].volumeInfo.description);
                        console.log('ImageLinks S : ' + item.items[c].volumeInfo.imageLinks.smallThumbnail);
                        console.log('ImageLinks L : ' + item.items[c].volumeInfo.imageLinks.thumbnail);

                        client.msg('getBuku', {
                            text: {
                                title: item.items[c].volumeInfo.title,
                                selfLink: item.items[c].selfLink,
                                author: item.items[c].volumeInfo.authors[0],
                                description: item.items[c].volumeInfo.description,
                                smallThumbnail: item.items[c].volumeInfo.imageLinks.smallThumbnail,
                                thumbnail: item.items[c].volumeInfo.imageLinks.thumbnail
                            }
                        });
                    }

                });

            },
            error: function(err) {
                console.log(err);
            }

        });

    } 

});


app.setResourceHandler(function(request, response) {
    var r = rlog.start(request.id);

    function sendReply(response, error, imageType, data) {
        if (error) {
            r.error(error);
            response.failed();
        } else {
            r.done();
            response.reply(imageType, data);
        }
    }
    
    scaling.scale(request.id, request.display_width, request.display_height, 'image/jpeg',
        function(err, data) {
            sendReply(response, err, 'image/jpeg', data);
        }
    );
});