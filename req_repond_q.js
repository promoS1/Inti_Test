//==================
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

	for(h = 0 ; h < contenu_opposant.length ; h++) {
		console.log("opposant: "+contenu_opposant[h].contact);
		if(query.pseudo === contenu_opposant[h].contact) {
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
					reponse = reponse + "<a href=req_poser_q?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
					console.log("etape 2");
					console.log(reponse);
					contenu_questions = JSON.stringify(question);

				}
			}
		}
		//break;




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

