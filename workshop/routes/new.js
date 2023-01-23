var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new', { titulo: 'Bem-vindo ao Express - página 2!',
paragrafo: 'Segudno parágrafo a adicionar no NEW!' });
});

module.exports = router;
