//=========================================================================
//Traitement de "req_inscrire"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var taille_psd;
	var taille_mdp;
	var page;
	var nouveauMembre;
	var contenu_fichier;
	var listeMembres;
	var i , j ;
	var trouve;
	var joueur;	
	var contenu;
	var profil_user;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE COMPTE N'EXISTE PAS DEJA

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			trouve = true;
		}
		i++;
	}


	if(trouve === false) {
		nouveauMembre = {};
		nouveauMembre.pseudo = query.pseudo;
		nouveauMembre.password = query.password;
		taille_psd = nouveauMembre.pseudo.length;
		taille_mdp = nouveauMembre.password.length;
		listeMembres[listeMembres.length] = nouveauMembre;

	}


	// ON RENVOIT UNE PAGE HTML 

	if(trouve === true) {
		// SI CREATION PAS OK, ON REAFFICHE PAGE FORMULAIRE AVEC ERREUR

		page = fs.readFileSync('modele_formulaire_inscription.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : ce compte existe déjà";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else if(taille_psd < 4) {
		page = fs.readFileSync("modele_formulaire_inscription.html", 'utf-8');
		marqueurs = {};
		marqueurs.erreur = "ERREUR : Veuillez entrez un pseudo qui contient au moins 4 caractères";
		page = page.supplant(marqueurs);

	} else if(taille_mdp < 4){
		page = fs.readFileSync("modele_formulaire_inscription.html", 'utf-8');
		marqueurs = {};
		marqueurs.erreur = "ERREUR : Veuillez entrez un mot de passe qui contient au moins 4 caractères";
		page = page.supplant(marqueurs);


	// SI PAS TROUVE, ON AJOUTE LE NOUVEAU COMPTE DANS LA LISTE DES COMPTES
	// SI CREATION OK, ON ENVOIE PAGE DE CONFIRMATION
	} else{

		contenu_fichier = JSON.stringify(listeMembres);

		fs.writeFileSync("membres.json", contenu_fichier, 'utf-8');
		profil_user =[
					{
					"contact":"",
					"score":0,
					"questions":[0],
					"ra":"",
					"reponse":""
					},
					]
			
		contenu = JSON.stringify(profil_user);
		fs.writeFileSync(query.pseudo+".json",contenu,"utf-8");
		console.log(profil_user);   

		page = fs.readFileSync('modele_confirmation_inscription.html','UTF-8');
	}
		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.password = query.password;
		page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
	};

//---------------------------------------------------------------------------

module.exports = trait;
