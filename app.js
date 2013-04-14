
/**
 * Module dependencies.
 */

var express = require('express')
  , urlCrawler = require('./routes/urlcrawler')
  , howto = require('./routes/howto')
  , history = require('./routes/history')
  , api = require('./routes/api.js')()
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// routing methods
app.get('/', urlCrawler.show);
app.get('/home',urlCrawler.show);
app.get('/url', urlCrawler.show);
app.get('/url/:url', urlCrawler.ParseThenShow);
app.get('/history',history.show);
app.get('/history/:count',history.show);
app.get('/howto',howto.show);

app.get('/test', urlCrawler.test);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
