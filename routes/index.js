var express = require('express');
var router = express.Router(); // generamos un enrutador basico

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//atender peticiones
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author', function(req, res) {
  res.render('author', { hechopor: 'Manuel Suárez' });
});



module.exports = router;
