var express = require('express');
var path = require('path');
// importamos paquetes con middlewares, instalados con npm install tras leer json
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
// midlseware para gestión de usuarios, sesiones, etc
var session = require('express-session');

//importamos enrutadores
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

//instalamos midlewares que importamos antes:
//de login, analisis de json, ..., cookies, ...
app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());   // lo dejamos asi para añadir registros...para gestionar bien parametros en el body con propiedades de objeto tipo quiz[pregunta]...quiz[respuesta]

app.use(cookieParser('semilla Quiz 2015')); //cookieParser: añadir semilla ‘Quiz 2015’ para cifrar cookie
//app.use(session);
app.use(session({
secret: 'semilla Quiz 2015',
resave: false,
saveUninitialized: true
}));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

//Control de tiempo sin actividad => logout
app.use(function(req, res, next){
    var tMaximo = 120000; // 2 minutos
    var tActual = new Date().getTime();
    var tTranscurrido = 0;

    // gestión de sesiones, sólo si ya he iniciado sesión (if req.session) y no es la primera, controlaré el tiempo de actividad
    if(req.session && req.session.tAcceso) {
        tTranscurrido = tActual - req.session.tAcceso;
        if (tMaximo <= tTranscurrido){
            delete req.session.user;
        }
    }

    req.session.tAcceso = tActual;
    // Hacer visible tTranscurrido en las vistas
    res.locals.tTranscurrido = tTranscurrido;
    next();
});


// Helpers dinamicos:
app.use(function(req, res, next) {

  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }

  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

//instalamos los enrutadores
app.use('/', routes); // asocia las rutas a los gestores

//este midleware para responder a cualquier otra ruta no atendida
// por enrutadores anteriores: genera error 404 de http
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},// no imprime el error
        errors: []
    });
});

//exportar app para comando de arranque
module.exports = app;
