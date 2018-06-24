//=========================================================================
// Traitement de "req_retourHome"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');
var affichage = require("./ma_fonction_daffichage");
var trait = function (req, res, query) {

	var marqueurs;
	var page;
	var contenu_fichier;
	var listeMembres;
	var resultat = [];
	
	// ON LIT LES COMPTES EXISTANTS
	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");    
	listeMembres = JSON.parse(contenu_fichier);

	// ON ENVOIE PAGE HOME ET ON AFFICHE LES MEMBRES
	page = fs.readFileSync('page_home.html','UTF-8');
	resultat = affichage.affichage_membre(listeMembres, query);

	marqueurs = {};
	marqueurs.en_attente = resultat[0];
	marqueurs.affichage_que = resultat[1];
	marqueurs.pseudo = query.pseudo;
	marqueurs.pseudos = resultat[2];
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
