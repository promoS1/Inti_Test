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

	page = fs.readFileSync('page_reponse_q.html', 'utf-8');
	console.log(query.pseudo);
	console.log(query.opposant);
	//ON OUVRE LES DEUX JSON 	

	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);

	console.log("Contenu :")	
		console.log(contenu);

	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);

	contenu_questions = fs.readFileSync("questions.json","UTF-8");
	question = JSON.parse(contenu_questions);

	//VERIFIER SI JOUER AVEC LA PERSONNE 

	for(h = 0;h<contenu.length;h++) {
		if(query.opposant===contenu[h].contact) {
			if(contenu[h].reponse==="X") {
				page=fs.readFileSync("page_reponse_q.html","utf-8");
				nbr_question = question.length;
				i= Math.floor(Math.random()* nbr_question );
				var numero_question = i
					choix_question = question[i].question;

				reponse = ""
					for (j=0;j<question[i].reponses.length;j++) {
						reponse1 = question[i].reponses[j];
						contenu_questions= JSON.stringify(question);
						reponse = reponse + "<a href=req_confirmation?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
					}


				/*	do {
					i = Math.floor(Math.random() * question.length);
					numero_question = contenu[i].questions
					console.log("test1");
					}while(i === contenu[h].questions)
				 */
			} else if(contenu[h].reponse!=="X") {
				page=fs.readFileSync("page_repond_q.html","utf-8");
				nbr_question = question.length;
				i= Math.floor(Math.random()* nbr_question );
				var numero_question = i
					choix_question = question[i].question;

				reponse = ""
					for (j=0;j<question[i].reponses.length;j++) {
						reponse1 = question[i].reponses[j];
						contenu_questions= JSON.stringify(question);
						reponse = reponse + "<a href=req_poser_q?pseudo=" + query.pseudo +"&question="+numero_question+ "&opposant=" +query.opposant +"&reponse="+j+"><button>"+reponse1+"</button></a>";
					}

				/*	do {
					i = Math.floor(Math.random() * question.length) ;
					console.log(i);
					console.log(question.length);
					numero_question = contenu[i].questions
					console.log(numero_question);
					}while(i === contenu[h].questions || i > question.length)
				 */
			}
		}
	}



	marqueurs = {};
	marqueurs.question = choix_question;
	marqueurs.reponse = reponse
		marqueurs.opposant = query.opposant;
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;
