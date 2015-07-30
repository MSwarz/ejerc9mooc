//el controlador importa el modelo para acceder a la BD
var models = require('../models/models.js');

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

// controlador de index  GET /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes) {
    res.render('quizes/index.ejs', { quizes: quizes });
  }
).catch(function(error){next(error)});
};

// GET quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', { quiz: req.quiz })
})
};

// GET quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = "Incorrecta"
  if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    resultado = "Correcta";
  }
  res.render('quizes/answer',{ quiz: req.quiz, respuesta: resultado});
};

// GET quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(  // crea un objeto quiz
    { Pregunta: "Pregunta", Respuesta: "Respuesta" }
  );
  res.render('quizes/new', { quiz: quiz });
};

// POST quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );
  // save: Guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');   // res.redirect: RedirecciÃ³n HTTP a lista de preguntas
  });
};
