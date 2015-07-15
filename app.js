var express = require('express');
var path = require('path');
// importamos paquetes con middlewares, instalados con npm install tras leer json
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//importamos enrutadores
var routes = require('./routes/index');

// no vamos a importar users
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

//instalamos midlewares que impotamos antes
//de login, analisis de json, ..., cookies, ...
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//instalamos los enrutadores
app.use('/', routes); // asocia las rutas a los gestores

// no usamos  este
//app.use('/users', users);

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
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {} // no imprime el error
    });
});

//exportar app para comando de arranque
module.exports = app;
