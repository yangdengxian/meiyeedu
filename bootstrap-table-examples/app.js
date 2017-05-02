var express = require('express');
var app = express();
var shops = require('./serverFiles/routes/shop');

app.use(express.static('.'));
app.use('/shops', shops);
app.get('/examples/:project/:func', require('./examples'));


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Examples app listening at http://%s:%s', host, port);
});
