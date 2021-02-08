var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

var mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

/* Configuração do Mongo */
//----------------------------------------------------------------------------
//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PEI2020';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});
//---------------------------------------------------------------------------


var indexRouter = require('./routes/index');

var app = express();

app.use(function(req, res, next){
  if(req.originalUrl != '/api/token'){
      const token = req.query.token || req.body.token
      if (!token) 
          return res.status(401).json({ error: 'Token Inexistente.' });
  
      jwt.verify(token, "DAW-PRI-2020-recurso", function(err, decoded) {
          if (err) 
              return res.status(500).json({error: err});
          
          next();
      })
  }
  else 
    next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
