//====================
// req_repond_q.js
//===================

"use strict"; 

var fs =  require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var pseudo; 
	var opposant;
	var profil_user;
	var contenu;
	var profil_opposant;
	var contenu_opposant;
	var choix_question;
	var reponse1;
	var reponse;
	var contenu_questions;
	var question;
	var h,a,i,j;
	var numero_question;
	var nbr_question;
	var trouver;
	var nv_opposant;
	var nv_pseudo;
	var affichage_score = "";

	page = fs.readFileSync('page_repond_q.html', 'utf-8');
	//ON OUVRE LES DEUX JSON 	
	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);
	console.log("Contenu :ccccc");	
	console.log(contenu);
	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);
	contenu_questions = fs.readFileSync("questions.json","UTF-8");
	question = JSON.parse(contenu_questions);

	//VERIFIER SI JOUER AVEC LA PERSONNE 

	for(h = 0 ; h < contenu.length ; h++) {
		console.log("opposant: "+contenu[h].contact);
		if(query.opposant === contenu[h].contact) {
			console.log("opposant trouve !!!: "+contenu[h].contact);
			// on a deja joué avec l'opposant
			// ici on affiche le score, la precedente question, ...
			console.log(contenu[h].reponse);
			if(contenu[h].reponse !== "X") {
				console.log("question: "+question);
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
					contenu_questions = JSON.stringify(question);
					reponse = reponse + "<a href=req_confirmation_suivante?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
					console.log("reponse lien ! " + reponse);
					console.log("etape 1 !!");
				}		
				// si c'est la premiere fois qu'on joue avec, on va directement lui poser la question
			} else if(contenu[h].reponse === "X" || Number.isInteger(contenu[h].ra) === true ) {
				page=fs.readFileSync("page_repond_q.html","utf-8");
				nbr_question = contenu[h].questions.length;
				console.log(nbr_question);
				i= contenu[h].questions[contenu[h].questions.length-1];
				console.log(i);
				console.log(contenu[h].questions);
				var numero_question = i;
				choix_question = question[i].question;
				console.log("Num de question : "+choix_question);
				reponse = "";
				for (j=0;j<question[i].reponses.length;j++) {
					reponse1 = question[i].reponses[j];
					reponse = reponse + "<a href=req_confirmation_suivante?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
				console.log("etape 2");
				console.log(reponse);
				contenu_questions = JSON.stringify(question);
				
				}
			}
		}
		//break;
	}




	marqueurs = {};

	marqueurs.affichage_score= affichage_score;
	marqueurs.question = choix_question;
	marqueurs.reponse = reponse;
	marqueurs.opposant = query.opposant;
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};
//=======
module.exports = trait;
