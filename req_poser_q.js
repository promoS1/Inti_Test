  //===================//
 //   req_poser_q     //
//===================//
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
	var reponse;
	var reponse1;
	var numero_question;
	var profil_opposant;
	var contenu_opposant;
	var contenu_question;
	var nbr_question;
	var contenu_fichier;
	var choix_question;
	var pseudo;
	var opposant;
	var reponse_attendu;

	page = fs.readFileSync('page_poser_q.html', 'utf-8');
	profil_joueur = fs.readFileSync(query.pseudo +".json","UTF-8");
	contenu = JSON.parse(profil_joueur);

	profil_opposant = fs.readFileSync(query.opposant+".json","UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);

	question = Number(query.question);
	pseudo = query.pseudo;
	opposant = query.opposant;
	reponse_attendu = Number(query.reponse);


	console.log(contenu_opposant);
	console.log(question);
	console.log("la reponse est"+reponse_attendu);

	for(k = 0 ; k < contenu.length ; k++) {
		if(contenu[k].contact === query.opposant){
			console.log(contenu[k].questions);
			contenu[k].reponse= reponse_attendu;
			console.log(reponse_attendu);
		}
	}

	for( j = 0 ; j < contenu_opposant.length ; j++) {
		console.log("test");
		if(contenu_opposant[j].contact === query.pseudo){
			contenu_opposant[j].reponse = "";
		}
	}

	profil_joueur=JSON.stringify(contenu);
	fs.writeFileSync(query.pseudo+".json",profil_joueur,"utf-8");

	profil_opposant = JSON.stringify(contenu_opposant);
	fs.writeFileSync(query.opposant+".json",profil_opposant,"UTF-8");

	//========================affichage quetions ========================
	//POUR L'AFFICHAGE DES QUESTION !!
	contenu_question = fs.readFileSync("questions.json","utf-8");
	question = JSON.parse(contenu_question);
	console.log(question);
	nbr_question = question.length;
	console.log("il ya "+ nbr_question+" questions ");
	i= Math.floor(Math.random()* nbr_question );
	console.log("choix aleatoire"+i);
	var numero_question = i;
	choix_question = question[i].question;
	console.log("la question choisie est : " + choix_question);
	reponse = "";
	for ( j =0; j < question[i].reponses.length; j++) {
		reponse1 = question[i].reponses[j];
		contenu_question = JSON.stringify(question);
		reponse = reponse + "<a href=req_confirmation_suivante?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
	}




		marqueurs = {};
		marqueurs.pseudo = query.pseudo;
		marqueurs.opposant = query.opposant;
		marqueurs.reponse = reponse;
		marqueurs.question = choix_question;
		page = page.supplant(marqueurs);

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(page);
		res.end();
	};

	//=====
	module.exports = trait;
