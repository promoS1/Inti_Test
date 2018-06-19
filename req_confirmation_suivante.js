  //===========================//
 // req confirmation_suivante //
//===========================//

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var i,j,k;
	var question;
	var pseudos;
	var tout;
	var listeMembres;
	var profil_joueur;
	var contact;
	var contenu;
	var numero_question;
	var profil_opposant;
	var contenu_opposant;
	var contenu_fichier;
	var pseudo;
	var opposant;
	var reponse_attendu;

	question = Number(query.question);
	pseudo = query.pseudo;
	opposant = query.opposant;
	reponse_attendu	= Number(query.reponse);

	//LECTURE DES JSON DU JOUEUR ET DE L OPPOSANT

	profil_joueur = fs.readFileSync(query.pseudo +".json","UTF-8");
	contenu = JSON.parse(profil_joueur);

	profil_opposant = fs.readFileSync(query.opposant+".json","UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);

	console.log(contenu_opposant);

	console.log(question);
	console.log("la reponse est"+reponse_attendu)

	for(i = 0 ; i < contenu.length ; i++) {
		if(contenu[i].contact === query.opposant){
			console.log(contenu[i].questions);
			contenu[i].reponse = reponse_attendu;
			contenu[i].questions.push(question);
			console.log(reponse_attendu);
		}
	}

	for( j = 0 ; j < contenu_opposant.length ; j++) {
		console.log("test");
		if(contenu_opposant[j].contact === query.pseudo){
			contenu_opposant[j].ra = reponse_attendu;
		}
	}

	profil_joueur=JSON.stringify(contenu_joueur);
	fs.writeFileSync(query.pseudo+".json",profil_joueur,"utf-8");

	profil_opposant = JSON.stringify(contenu_opposant);
	fs.writeFileSync(query.opposant+".json",profil_opposant,"UTF-8");








	//================================ AFFICHAGE DE LA PAGE HOME============================
	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
	listeMembres = JSON.parse(contenu_fichier);

	pseudos="";
	page = fs.readFileSync('page_confirmation.html', 'utf-8');
	for(j=0;j<listeMembres.length ;j++) {
		tout = "";
		tout =j + " joueur " + listeMembres[j].pseudo +"\n";
		pseudos = pseudos + tout +"<a href=req_cont_defi?pseudo="+query.pseudo+">defier</a> " + "<br>";
	}
	console.log(pseudo);
	console.log(opposant);

	marqueurs = {}; 
	marqueurs.pseudo = query.pseudo;
	marqueurs.question = question
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
