//=========================================================================
// Traitement de "req_afficher_formulaire_inscription"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================
"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;

	// AFFICHAGE DE LA modele_formulaire_inscription

	page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//--------------------------------------------------------------------------

module.exports = trait;
