// requete afficher liste membres 


"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var listeMembres;
	var i;
	var membre;
	var pseudo;
// LECTURE DE LA LISTE MEMBRES

	contenu_fichier = fs.readFileSync("../Inti_Test/membres.json" , "utf-8");
	listeMembres = JSON.parse(contenu_fichier);
	
	pseudo = "";
	membre = "";
	for( i = 0; i < listeMembres.length; i++) {
		membre =  listeMembres[i].pseudo
	pseudo = pseudo + membre + "<a href=req_supprimer?pseudo=" + listeMembres[i].pseudo + ">supprimer</a> " + "<br>";	
		
	}



	// AFFICHAGE DE LA PAGE D'ACCUEIL

	page = fs.readFileSync('page_liste_membres.html', 'utf-8');

	marqueurs = {};
	marqueurs.membre = pseudo;
	marqueurs.erreur = "";
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//------------------------------------------------------------------

module.exports = trait;
