"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var question;
	var reponses;
	var contenu_fichier;
	var listeQuestions;
	var trouve;
	var questions;
	var contenu;


	// ON LIT LES QUESTIONS 


	contenu_fichier = fs.readFileSync("../questions.json", 'utf-8');
	questions = JSON.parse(contenu_fichier);

	question = query.question;
	var reponse1 = query.choix1;
	var reponse2 = query.choix2;
	var reponse3 = query.choix3;
	
		listeQuestions = {};
		listeQuestions.question = query.question;
		listeQuestions.reponses = [];
		listeQuestions.reponses.push(reponse1);
		listeQuestions.reponses.push(reponse2);
		listeQuestions.reponses.push(reponse3);
		questions[questions.length] = listeQuestions

	
	
	
	contenu_fichier = JSON.stringify(listeQuestions);
	fs.writeFileSync("../questions.json", contenu_fichier, 'utf-8');




	page = fs.readFileSync('page_confirmation_q.html','UTF-8');

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('page_confirmation_q.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.question = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//------------------------------------------------------------------

module.exports = trait;
