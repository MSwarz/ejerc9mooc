//el controlador importa el modelo para acceder a la BD
var models = require('../models/models.js');

// GET quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', { quizId: req.params.quizId, errors: [] });
};

// POST quizes/:quizId/comments/create con Validación
exports.create = function(req, res) {
  var comment = models.Comment.build(
      { texto: req.body.comment.texto,
        QuizId: req.params.quizId
      });
  comment
  .validate()
  .then(
    function(err){
        if (err) {
          res.render('comments/new',
              {comment: comment, quizId: req.params.quizId, errors: err.errors});
        } else {
          comment // save: guarda en DB el campo texto de Comment
          .save()
          .then( function(){ res.redirect('/quizes/' + req.params.quizId)})
        }      // res.redirect: Redirección HTTP a lista de preguntas
      }
    );
  };
