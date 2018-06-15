//============
// req retour home
//==============

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {

	var marqueurs;
	var pseudo;
	var affichage_attente;
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
	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");
	listeMembres = JSON.parse(contenu_fichier);

		pseudos = "";
		contacts= "";
		opposant="";

		page = fs.readFileSync('page_home.html','UTF-8');

		profil_user = fs.readFileSync(query.pseudo+".json","UTF-8");
		contenu = JSON.parse(profil_user);


		// AFFICHAGE DES MEMBES A DEFIER

		for(j = 0 ; j <listeMembres.length ; j++ ) {
			tout = "";
			tout =(j+1) + " joueur " + listeMembres[j].pseudo +"\n";
			if (query.pseudo !== listeMembres[j].pseudo){
				pseudos = pseudos + tout + "<a href=req_init_defi?pseudo="+query.pseudo+"&opposant="+listeMembres[j].pseudo+">defier</a> " + "<br>";

				var lien = "<a href=req_cont_defi?pseudo="+query.pseudo+"&opposant="+ listeMembres[j].pseudo +">defier</a> "+"<br>" ;

			}opposant = listeMembres[j].pseudo ;
		}
		//AFFICHAGE DES MEMBRES EN ATTENTE
		var nom = "";
		var autre_nom = "";

		for(h = 0 ; h < contenu.length ; h++) {
			attente     =   contenu[h].contact  +"\n";
			attente_r   =   contenu[h].reponse;
			ma_reponse  =   contenu[h].ra;
			attente_q   =   contenu[h].questions;
			score       =   contenu[h].score;
			donne       =   (h+1) + " Joueur " + attente +"votre score est de " + score +" Reponse Attendu " + attente_r + " Question " + attente_q + "\n" ;
			contacts    = contacts +" "+ donne +"<br> " ;
			if(attente_r !== "") {
				nom  = nom + " " + attente+"<br>" ;
				affichage_attente = nom ;
			} else if(attente_r === ""){
				autre_nom = autre_nom + " " + attente + "<a href=req_cont_defi?pseudo="+query.pseudo+"&opposant="+  attente+">defier</a> "+"<br>" ;
			var affichage_que = autre_nom +" ";

				console.log(lien);
			}

		}


	marqueurs = {};
	marqueurs.affichage_attente = affichage_attente;
	marqueurs.affichage_que = affichage_que;
	marqueurs.pseudo = query.pseudo;
	marqueurs.pseudos = pseudos;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};


//===========

module.exports = trait;
