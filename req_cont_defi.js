//====================
// req_init_defi.js
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
	var contenu_questions;
	var question;
	var h,a;
	var trouver;
	var nv_opposant;
	var nv_pseudo;

	page = fs.readFileSync('page_reponse_q.html', 'utf-8');
	console.log(query.pseudo);
	console.log(query.opposant);
	//ON OUVRE LES DEUX JSON 	

	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);

	console.log("Contenu :");
	console.log(contenu);

	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);

	//VERIFIER SI JOUER AVEC LA PERSONNE 

	for(h = 0;h<contenu.length;h++) {
		if(query.opposant===contenu[h].contact) {
			if(contenu[h].reponse==="X") {
				page=fs.readFileSync("page_repond_q.html","utf-8");
			} else if(contenu[h].reponse!=="X") {
				page=fs.readFileSync("page_reponse_q.html","utf-8");
			}
		}
	}
	// ON OUVRE LE JSON DES QUESTIONS 

	console.log("bite");
	contenu_questions = fs.readFileSync("questions.json","UTF-8");
	choix_question = JSON.parse(contenu_questions);

	question = choix_question[0].question;

	marqueurs = {};
	marqueurs.question = question;
	marqueurs.opposant = query.opposant;
	marqueurs.pseudo = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;
