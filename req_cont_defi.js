//===============
// req_defier
//===============

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

	//VERIFIER SI L'ON AS DEJA JOUER AVEC LA PERSONNE DEFIE SI OUI ON AFFICHE LA QUESTION SINON ON COMMENCE UNE NOUVELLE PARTIE


	/*
	   ma_liste_de_questions = [ ma_question_reponse[0], ma_question_reponse[1], ... ];
	   ma_question_reponse = { 
	   "question": "ma_question",
	   "reponses": ["r1", "r2", "r3"]
	   };
	 */

	trouver = false;
	console.log("query.opposant : " + query.opposant);
	console.log("contenu.length = " + contenu.length);
	for(h = 0; h < contenu.length; h++){ 
		console.log("contenu[h].contact = "+ contenu[h].contact);
		if (query.opposant === contenu[h].contact) {
			trouver = true;
			break;
		}
	}
	// SI UTILISATEUR TROUVER, ON AFFICHE LA QUESTION 
	if (trouver === true) {
		console.log("utilisateur trouve");
	} else {
		//SINON, ON CRÉE LE NOUVELLE OPPOSANT DANS NOTRE JSON 
		console.log("utilisateur non trouve");
		nv_opposant = {"contact":query.opposant ,"score":0,"questions":[0],"ra":"","reponse":""};
		console.log("nv_opposant : ");
		console.log(nv_opposant);
		contenu.push(nv_opposant);
		console.log("mise a jour du contenu : ");
		console.log( contenu);
		profil_user = JSON.stringify(contenu);
		fs.writeFileSync(query.pseudo + ".json", profil_user, "utf-8");
		console.log(profil_user);

		nv_pseudo = {"contact":query.pseudo ,"score":0,"questions":[0],"ra":"","reponse":""};
		contenu_opposant.push(nv_pseudo);
		profil_opposant = JSON.stringify(contenu_opposant);
		fs.writeFileSync(query.opposant + ".json", profil_opposant, "utf-8");
		console.log("test du console ");
		console.log( contenu_opposant);
	}



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
