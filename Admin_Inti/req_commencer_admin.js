// requete commencer pour l'administration de notre jeu InTi'Test


"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;



	////////////////

	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('page_accueil_admin.html', 'utf-8');

	marqueurs = {};
	marqueurs.erreur = "";
	marqueurs.pseudo = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//------------------------------------------------------------------

module.exports = trait;
