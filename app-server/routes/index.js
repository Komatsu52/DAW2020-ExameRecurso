var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET página inicial */
router.get('/', function(req, res, next) {
	axios.get('http://localhost:8000/api/teams?token=' + req.cookies.token)
		.then(dados => res.render('index', {teams: dados.data}))
		.catch(erro => res.render('error', {error: erro}))
})

/* GET formulario de adicao de team */
router.get('/adicionarTeam', function(req, res, next) {
	res.render('adicionarTeam')
})

/* GET formulario de adicao de membro */
router.get('/adicionarMember/:id', function(req, res, next) {
	res.render('adicionarMember', {team: req.params.id})
})

/* GET remover team */
router.get('/remover/:id', function(req, res, next) {
	axios.delete('http://localhost:8000/api/teams/' + req.params.id + '?token=' + req.cookies.token)
		.then(dados => res.redirect("/"))
		.catch(erro => res.render('error', {error: erro}))
})

/* GET página team */
router.get('/:id', function(req, res, next) {
	axios.get('http://localhost:8000/api/teams/' + req.params.id + '?token=' + req.cookies.token)
		.then(dados => res.render('team', {team: dados.data}))
		.catch(erro => res.render('error', {error: erro}))
})

/* POST adicionar team */
router.post('/team', function(req, res, next) {
  console.log(JSON.stringify(req.body))
	axios.post('http://localhost:8000/api/teams?token=' + req.cookies.token, req.body)
		.then(dados => res.redirect('/'))
		.catch(erro => res.render('error', {error: erro}))
})

/* POST adicionar member */
router.post('/team/:id', function(req, res, next) {
  console.log(JSON.stringify(req.body))
	axios.post('http://localhost:8000/api/teams/' + req.params.id + '?token=' + req.cookies.token, req.body)
		.then(dados => res.redirect('/'))
		.catch(erro => res.render('error', {error: erro}))
})

module.exports = router;
