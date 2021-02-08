var express = require('express');
var router = express.Router();
var Teams = require('../controllers/teams')
var jwt = require('jsonwebtoken')


router.get('/token', function(req,res){
	var s = "Exame"
	var d = new Date().toISOString().substring(0,10)
	jwt.sign({ sub: s, data: d},
		"DAW-PRI-2020-recurso",
		{ expiresIn: 3600 },
		function(e, token){
			if(e)
				res.jsonp({error: e})
			else{
				res.jsonp({token: token})
			}
		}
	)
})

router.get('/teams', function(req, res, next) {
	Teams.list()
		.then(dados => {
      res.jsonp(dados)
    })
		.catch(err => res.json({error: err}))
});

router.get('/teams/:id/members/:idMember', function(req, res, next) {
	Teams.member(req.params.id, req.params.idMember)
    .then(dados => res.jsonp(dados))
    .catch(err => res.json({error: err}))
});

router.get('/teams/:id', function(req, res, next) {
  console.log(req.params.id)
	Teams.lookUp(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(err => res.json({error: err}))
});



router.post('/teams/:id/members', function(req, res, next) {
	Teams.insertMember(req.params.id, req.body)
		.then(dados => {
      res.jsonp(dados)
    })
		.catch(err => res.json({error: err}))
});

router.post('/teams', function(req, res, next) {
	Teams.insert(req.body)
		.then(dados => {
      //dados.data.nmembers = dados.data.members.length
      res.jsonp(dados)
    })
		.catch(err => res.json({error: err}))
});

router.delete('/teams/:id', function(req, res, next) {
	Teams.delete(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(err => res.json({error: err}))
});

router.delete('/teams/:id/members/:idMember', function(req, res, next) {
	Teams.deleteMember(req.params.id, req.params.idMember)
    .then(dados => res.jsonp(dados))
    .catch(err => res.json({error: err}))
});

module.exports = router;