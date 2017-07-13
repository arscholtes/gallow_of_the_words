const express = require('express');
const Router = require('./routes/routes');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const session = require('express-session');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('/'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressValidator());

app.use('/', Router);

app.listen(3000, function() {
  console.log('Initializing Hangman Protocol');
});
