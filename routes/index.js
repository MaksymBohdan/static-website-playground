var express = require('express');
var router = express.Router();

/* GET home page. */
router
  .get('/', function (req, res, next) {
    res.render('pages/home', {
      title: 'Main Express-Static',
      isHome: true,
    });
  })
  .get('/menu', function (req, res, next) {
    res.render('pages/menu', {
      title: 'Menu Express-Static',
      isMenu: true,
    });
  })
  .get('/reservation', function (req, res, next) {
    res.render('pages/reservation', {
      title: 'Reservation Express-Static',
      isReservation: true,
    });
  })
  .get('/recipe', function (req, res, next) {
    res.render('pages/recipe', {
      title: 'Recipe Express-Static',
      isRecipe: true,
    });
  })
  .get('/blog', function (req, res, next) {
    res.render('pages/blog', {
      title: 'Blog Express-Static',
      isBlog: true,
    });
  })
  .get('/pages', function (req, res, next) {
    res.render('pages/pages', {
      title: 'Pages Express-Static',
      isPages: true,
    });
  })
  .get('/contact', function (req, res, next) {
    res.render('pages/contact', {
      title: 'Contact Express-Static',
      isContact: true,
    });
  });

module.exports = router;
