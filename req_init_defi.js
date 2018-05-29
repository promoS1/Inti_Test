//===============
// req_init_defi.js
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
	var afficher;
	var contenu;
	var profil_opposant;
	var contenu_opposant;
	var contenu_question;
	var choix_question;
	var reponse1;
	var reponse;
	var reponse3;
	var question;
	var h,a,i,j;
	var trouver;
	var nv_opposant;
	var nv_pseudo;
	var nbr_question;
	page = fs.readFileSync('page_repond_qn.html', 'utf-8');
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
		afficher = true;
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
		afficher = true;
	}
	if (afficher === true) {

	contenu_question = fs.readFileSync("questions.json","utf-8");
	question = JSON.parse(contenu_question)
	console.log(question);

	nbr_question = question.length;
	console.log("il ya "+ nbr_question+" questions ");
	
	i= Math.floor(Math.random()* nbr_question );
	console.log("choix aleatoire"+i);
	
	choix_question = question[i].question;
	console.log("la question choisie est : " + choix_question);

	reponse = "";
	for ( j =0; j < question[i].reponses.length; j++) {
	reponse1 = question[i].reponses[j];
	console.log("reponse "+ j +" est " + reponse1 );
	//reponse = "";
	reponse = reponse + "<a href=req_confirmation?pseudo=" + query.pseudo + "&opposant=" +query.opposant +"&reponse="+reponse1+"><button>"+reponse1+"</button></a>";
	console.log("reponse lien ! " + reponse);




	//reponse2 = chomx_question[0].reponses[1];
	//reponse3 = choix_question[0].reponses[2];
	}
	}


	marqueurs = {};
	marqueurs.question = choix_question;
	marqueurs.reponse1 = reponse1;
	marqueurs.reponse  = reponse;
	marqueurs.reponse3 = reponse3;
	marqueurs.opposant = query.opposant;
	marqueurs.pseudo   = query.pseudo;
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;
