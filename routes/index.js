var express = require('express');
var router = express.Router(); // generamos un enrutador basico

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

module.exports = router;
