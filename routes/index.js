var express = require('express');
var router = express.Router(); // generamos un enrutador basico

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId  lo instalamos antes de show y answer
router.param('quizId', quizController.load);  // se instala con metodo param sólo si contiene 'quizId' en el url

// Definición de rutas de sesión
router.get('/login', sessionController.new);    // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy);  // destruir sesión

//atender peticiones. Definicion de rutas
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/author', function(req, res) {
  res.render('author', { hechopor: 'Manuel Suárez', errors: [] });
});



module.exports = router;
