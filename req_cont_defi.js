//====================
// req_cont_defi.js
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

	page = fs.readFileSync('page_reponse_q.html', 'utf-8');
	//ON OUVRE LES DEUX JSON 	
	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);
	console.log("Contenu :");	
	console.log(contenu);
	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);
	contenu_questions = fs.readFileSync("questions.json","UTF-8");
	question = JSON.parse(contenu_questions);

	//VERIFIER SI JOUER AVEC LA PERSONNE 
	console.log(query.opposant);
	console.log(query.pseudo);

	for(h = 0 ; h < contenu.length ; h++) {
		console.log("la" );
		console.log("opposant: "+contenu[h].contact);
		if(query.opposant === contenu[h].contact) {
			console.log("opposant trouve !!!: "+contenu[h].contact);
			// on a deja joué avec l'opposant
			// ici on affiche le score, la precedente question, ...
			if(contenu_opposant[h].reponse !== "X") {
				var	attente     =   contenu[h].contact  +"\n";
				var	attente_r   =   contenu[h].reponse;
				var	ma_reponse  =   contenu[h].ra;
				var	attente_q   =   contenu[h].questions;
				var	score       =   contenu[h].score;
				var	donne =(h+1) + " Joueur " + attente +"votre score est de " + score +" Reponse Attendu " + attente_r + " Question " + attente_q + "\n" ;
				console.log(donne);
				// si c'est la premiere fois qu'on joue avec, on va directement lui poser la question
			} else if(contenu_opposant[h].reponse === "X"/* || Number.isInteger(contenu[h].ra) === true*/ ) {
				page=fs.readFileSync("page_repond_q.html","utf-8");
				nbr_question = contenu_opposant[h].questions.length;
				console.log(nbr_question);
				i= contenu_opposant[h].questions[contenu_opposant[h].questions.length-1];
				console.log(i);
				console.log(contenu_opposant[h].questions);
				var numero_question = i;
				choix_question = question[i].question;
				console.log("Num de question : "+choix_question);
				reponse = "";

				for (j=0;j<question[i].reponses.length;j++) {
					reponse1 = question[i].reponses[j];
					contenu_questions= JSON.stringify(question);
					reponse = reponse + "<a href=req_confirmation_suivante?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
				}

				/*do { 
				  i = Math.random(Math.floor() * question[h].question
				  } while( i === contenu[h].questions)l
				 */

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
