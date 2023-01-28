const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const port = process.env.PORT || 3000;
const routes = require('./routes');
const errorController = require('./controllers/error.controller');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/rater', express.static(__dirname + '/node_modules/rater-js'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`
  )
  .then(result => {
    app.listen(port, () => {
        console.log(`Book app listening on port ${port}`)
      })
  })
  .catch(err => console.log(err));