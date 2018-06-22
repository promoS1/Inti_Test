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

	contenu_fichier = fs.readFileSync("../Inti_Test/questions.json", 'utf-8');
	listeQuestions = JSON.parse(contenu_fichier);

	questions = "";

	if(trouve === true) {

		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('page_cree_q.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : cette question existe déjà";
		marqueurs.question = query.question;
		page = page.supplant(marqueurs);

	} else { 
		contenu_fichier = JSON.stringify(listeQuestions);

		fs.writeFileSync("questions.json", contenu_fichier, 'utf-8');

		contenu = JSON.stringify(questions);
		fs.writeFileSync(query.questions+".json",contenu,"utf-8");

		page = fs.readFileSync('page_confirmation_q.html','UTF-8');
	}

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
