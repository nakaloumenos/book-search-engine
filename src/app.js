const express = require('express');
const hbs = require('hbs');
const app = express();
const indexRouter = require('./routes/index');
const searchResultRouter = require('./routes/searchResult');

// view engine setup
app.set('view engine', 'hbs');
// Set handlebars partials folder
hbs.registerPartials(__dirname + '/views/partials');

// Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/searchResult', searchResultRouter);
app.use('/', indexRouter);

const port = 3000;
app.listen(port, () => console.log(`Server listening at: ${port}!`));
