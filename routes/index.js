var express = require('express');
var router = express.Router(); // generamos un enrutador basico

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId  lo instalamos antes de show y answer
router.param('quizId', quizController.load);  // se instala con metodo param sólo si contiene 'quizId' en el url 

//atender peticiones
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/author', function(req, res) {
  res.render('author', { hechopor: 'Manuel Suárez' });
});



module.exports = router;
