//====================
// req_cont_defi.js
//===================

"use strict"; 

var fs =  require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var profil_user;
	var affichage_phrase;
	var contenu;
	var profil_opposant;
	var contenu_opposant;
	var choix_question;
	var reponse1;
	var reponse;
	var contenu_questions;
	var question;
	var k,h,a,i,j;
	var numero_question;
	var nbr_question;
	var affichage_score = "";
	var	attente;
	var	attente_r;
	var	ma_reponse;
	var	attente_q; 
	var	score;
	
	page = fs.readFileSync('page_reponse_q.html', 'utf-8');
	
	// ON OUVRE LES DEUX JSON 	
	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);
	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);
	contenu_questions = fs.readFileSync("questions.json","UTF-8");
	question = JSON.parse(contenu_questions);

	// VERIFIER SI JOUER AVEC LA PERSONNE 
	for (h = 0; h < contenu_opposant.length; h++) {
		if (query.pseudo === contenu_opposant[h].contact) {
			// on a deja joué avec l'opposant
			// ici on affiche le score, la precedente question, ...
			for (k = 0; k < contenu.length; k++){
				if (contenu[k].contact === query.opposant) {
					if (contenu[k].ra === contenu_opposant[h].reponse) {
						contenu[k].score = contenu[k].score + 1;
						affichage_phrase = "Felicitation tu as trouvé la reponse de ton ami votre score augmente de 1."
							affichage_score = "Votre score est desormais de :" + contenu[k].score;
					} else if (contenu[k].ra !== contenu_opposant[h].reponse) {
						affichage_phrase = "Mince ! tu n'as pas trouvé la reponse de ton ami votre score n'augmente pas."
					}
				}	
			}

			// si c'est la premiere fois qu'on joue avec, on va directement lui poser la question
			if (contenu_opposant[h].reponse === "X" || Number.isInteger(contenu[h].reponse) === true) {
				page = fs.readFileSync("page_repond_q.html","utf-8");
				nbr_question = contenu_opposant[h].questions.length;
				i = contenu_opposant[h].questions[contenu_opposant[h].questions.length-1];
				numero_question = i;
				choix_question = question[i].question;
				reponse = "";

				for (j=0;j<question[i].reponses.length;j++) {
					reponse1 = question[i].reponses[j];
					reponse = reponse + "<a href=req_poser_q?pseudo=" + query.pseudo + "&question=" + numero_question + "&opposant=" + query.opposant + "&reponse=" + j + "><button>" + reponse1 + "</button></a>";
				}
			}
		}
	}

	profil_user = JSON.stringify(contenu);
	fs.writeFileSync(query.pseudo+".json",profil_user,"UTF-8");
	profil_opposant = JSON.stringify(contenu_opposant);
	fs.writeFileSync(query.opposant+".json",profil_opposant,"UTF-8");

	marqueurs = {};
	marqueurs.affichage_score= affichage_score;
	marqueurs.affichage_phrase = affichage_phrase;
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
