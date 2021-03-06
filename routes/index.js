/// <reference path="../typings/express/express.d.ts"/>

var express = require('express');
var router = express.Router();

var quizController 		= require('../controllers/quiz_controller');
var commentController 	= require('../controllers/comment_controller');
var sessionController 	= require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});


router.get('/author', function(req, res) {
	res.render('author', {errors: []});
});

router.param('quizId', 		quizController.load);
router.param('commentId', 	commentController.load);



// Definicion de rutas de //login
router.get('/login',  						sessionController.newsession);
router.post('/login', 						sessionController.create);
router.get('/logout', 						sessionController.destroysession);

// Definición de rutas de /quizes
router.get('/quizes',                      	quizController.index);
router.get('/quizes/:quizId(\\d+)',        	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 	quizController.answer);
router.get('/quizes/statistics', 			quizController.estadisticas);
router.get('/quizes/new', 				   	sessionController.loginRequired, quizController.newquestion);
router.post('/quizes/create',              	sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   	sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',       	sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     	sessionController.loginRequired, quizController.destroyquestion);


// Definición de rutas de /Comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.newcomment);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);



module.exports = router;
