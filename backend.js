// FinBuk -- backend.js
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

                        client.msg('getBuku', {text :
                                   {
                            title: item.items[c].volumeInfo.title,
                            selfLink: item.items[c].selfLink,
                            author: item.items[c].volumeInfo.authors[0]
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