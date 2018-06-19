  //==================//
 // req confirmation //
//==================//

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var i,j,k,h;
	var contenu;
	var question;
	var pseudos;
	var tout;
	var listeMembres;
	var lien;
	var nom;
	var affichage_attente;
	var profil_joueur;
	var contact;
	var contenu_joueur;
	var numero_question;
	var profil_opposant;
	var attente_r;
	var attente_q;
	var trouve;
	var donne;
	var attente;
	var contenu_opposant;
	var contenu_fichier;
	var pseudo;
	var opposant;
	var ma_reponse;
	var score;
	var contacts;
	var autre_nom;
	var reponse_attendu;

	question = Number(query.question);
	pseudo = query.pseudo;
	opposant = query.opposant;
	reponse_attendu	= Number(query.reponse);

	//LECTURE DES JSON DU JOUEUR ET DE L OPPOSANT

	profil_joueur = fs.readFileSync(query.pseudo +".json","UTF-8");
	contenu_joueur  = JSON.parse(profil_joueur);
	profil_opposant = fs.readFileSync(query.opposant+".json","UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);
	console.log(contenu_opposant);
	console.log(question);
	console.log("la reponse est"+reponse_attendu)

		for(i = 0 ; i < contenu_joueur.length ; i++) {
			if(contenu_joueur[i].contact === query.opposant){
				console.log(contenu_joueur[i].questions);
				contenu_joueur[i].questions.push(question);
				contenu_joueur[i].ra = reponse_attendu;
				console.log(reponse_attendu);
			}
		}
	for( j = 0 ; j < contenu_opposant.length ; j++) {
		console.log("test");
		if(contenu_opposant[j].contact === query.pseudo){
			contenu_opposant[j].reponse = reponse_attendu;
		}
	}
	profil_joueur=JSON.stringify(contenu_joueur);
	fs.writeFileSync(query.pseudo+".json",profil_joueur,"utf-8");

	profil_opposant = JSON.stringify(contenu_opposant);
	fs.writeFileSync(query.opposant+".json",profil_opposant,"UTF-8");









	//================================ AFFICHAGE DE LA PAGE HOME============================
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	profil_joueur=JSON.stringify=fs.readFileSync(query.pseudo + ".json","utf-8");
	contenu = JSON.parse(profil_joueur);
	pseudos="";
	page = fs.readFileSync('page_confirmation.html', 'utf-8');
	for(j=0;j<listeMembres.length ;j++) {
		tout = "";
		tout =j + " joueur " + listeMembres[j].pseudo +"\n";
		pseudos = pseudos + tout +"<a href=req_cont_defi?pseudo="+query.pseudo+">defier</a> " + "<br>";
	}
	for(h = 0 ; h < contenu.length ; h++) {
		attente     =   contenu[h].contact  +"\n";
		attente_r   =   contenu[h].reponse;
		ma_reponse  =   contenu[h].ra;
		attente_q   =   contenu[h].questions;
		score       =   contenu[h].score;
		donne       =   (h+1) + " Joueur " + attente +"votre score est de " + score +" Reponse Attendu " + attente_r + " Question " + attente_q + "\n" ;
		contacts    = contacts +" "+ donne +"<br> " ;
		if(attente_r !== "X") {
			nom  = nom + " " + attente+"<br>" ;
			affichage_attente = nom ;
		} else if(attente_r === "X"){
			autre_nom = autre_nom + " " + attente;
			var affichage_que = autre_nom +" "+ "<a href=req_cont_defi?pseudo="+query.pseudo+"&opposant="+  attente+">defier</a> "+"<br>" ;

			console.log(lien);
		}

	}

	marqueurs = {}; 
	marqueurs.pseudo = query.pseudo;
	marqueurs.question = question;
	marqueurs.opposant = query.opposant;
	marqueurs.reponse = query.reponse;
	marqueurs.pseudos = pseudos;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//==============

module.exports = trait;
