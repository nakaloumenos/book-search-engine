const express = require('express');
const hbs = require('hbs');
const app = express();
const indexRouter = require('./routes/index');
const searchResultRouter = require('./routes/searchResult');

// view engine setup
app.set('view engine', 'hbs');

// Set handlebars partials folder
hbs.registerPartials('./views/partials');

// Routes
app.use('/searchResult', searchResultRouter);
app.use('/', indexRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening at: ${port}!`));
