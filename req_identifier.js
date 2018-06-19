//=========================================================================
// Traitement de "req_identifier"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var en_attente;
	var pseudos;
	var password;
	var page;
	var profil_user; 
	var membre;
	var contenu_fichier;
	var tout;
	var listeMembres;
	var i,j,h;
	var nom;
	var contenu;
	var attente_r;
	var attente_q;
	var trouve;
	var donne;
	var attente;	
	var ma_reponse;
	var contacts;
	var score;
	var opposant;
	var nom;
	var autre_nom;
	var affichage_que;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('page_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE
		page = fs.readFileSync('page_home.html','UTF-8');

		profil_user = fs.readFileSync(query.pseudo+".json","UTF-8");
		contenu = JSON.parse(profil_user);
		// AFFICHAGE DES MEMBES A DEFIER
		
		pseudos = "";
        contacts= "";
		opposant="";
		tout = "";

		for(j = 0 ; j <listeMembres.length ; j++ ) {
			tout =(j+1) + " joueur " + listeMembres[j].pseudo +"\n";
			if (query.pseudo !== listeMembres[j].pseudo){
				pseudos = pseudos + tout + "<a href=req_init_defi?pseudo="+query.pseudo+"&opposant="+listeMembres[j].pseudo+">defier</a> " + "<br>";
			}opposant = listeMembres[j].pseudo ;
		}
		//AFFICHAGE DES MEMBRES EN ATTENTE 
		
		nom = "";
		autre_nom = "";
		affichage_que = "";
		en_attente= "";
		for(h = 0 ; h < contenu.length ; h++) {
			attente  	=	contenu[h].contact  +"\n";
			attente_r	=	contenu[h].reponse; 
			ma_reponse	=	contenu[h].ra;
			attente_q	=	contenu[h].questions;
			score		=	contenu[h].score;
			donne 		=	(h+1) + " Joueur " + attente +"votre score est de " + score +" Reponse Attendu " + attente_r + " Question " + attente_q + "\n" ; 
			contacts	= contacts +" "+ donne +"<br> " ;
			if(attente_r === "X") {
				nom  = nom + " " + attente+"<br>" ;
				en_attente = nom ;
			} else if(attente_r !== "X"){
			autre_nom = autre_nom + " " + attente;
				affichage_que = autre_nom +" "+ "<a href=req_cont_defi?pseudo="+query.pseudo+"&opposant="+  attente+">defier</a> "+"<br>" ;
	
			}

		}

	}


	marqueurs = {};
	marqueurs.en_attente = en_attente;
	marqueurs.affichage_que = affichage_que;
	marqueurs.pseudo = query.pseudo;
	marqueurs.pseudos = pseudos;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
