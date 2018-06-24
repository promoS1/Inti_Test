//=========================================================================
// Traitement de "req_identifier"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');
var affichage = require("./ma_fonction_daffichage");
var trait = function (req, res, query) {

	var marqueurs = {};
	var page;
	var contenu_fichier;
	var listeMembres;
	var i;
	var trouve = false;
	var resultat = [];

	// ON LIT LES COMPTES EXISTANTS
	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE
	i = 0;
	while (i < listeMembres.length && trouve === false) {
		if (listeMembres[i].pseudo === query.pseudo) {
			if (listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 
	if (trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR
		page = fs.readFileSync('page_accueil.html', 'utf-8');
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
	} else {
		page = fs.readFileSync('page_home.html','UTF-8');
		resultat = affichage.affichage_membre(listeMembres, query);
		
		marqueurs.en_attente = resultat[0];
		marqueurs.affichage_que = resultat[1];
		marqueurs.pseudo = query.pseudo;
		marqueurs.pseudos = resultat[2];
}

	page = page.supplant(marqueurs);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//---------------------------------------------------------------------------

module.exports = trait;
