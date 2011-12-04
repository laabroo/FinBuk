// FinBuk -- backend.js
log.info('Hello from backend bootstrap.');

var http = require('blaast/simple-http');
var QS = require('querystring');


app.message(function(client, action, data) {
    console.log('Action dari client : '+action);
    console.log('Data yang dikirim dari client : '+data.text);

    if (action === 'getBuku') {
        console.log('Data : '+data);
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
                
                console.log('Data parsing json : '+ data);
                client.msg('getBuku', {
                    text: data.data
                });


            },
            error: function(err) {
                console.log(err);
            }

        });

    }

});