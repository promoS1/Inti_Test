//=========================================================================
// Traitement de "req_identifier"
// Auteur : L'équipe de Inti'Test
// Version : 17/04/2018
//=========================================================================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {

	var marqueurs;
	var pseudo;
	var en_attente;
	var pseudos;
	var password;
	var page;
	var adversaires; 
	var membre;
	var contenu_fichier;
	var ligne_nom_joueur;
	var listeMembres;
	var i,j,h;
	var nom;
	var attente_r;
	var attente_q;
	var trouve;
	var donne;
	var attente;	
	var ma_reponse;
	var score;
	var opposant;
	var nom;
	var autre_nom;
	var affichage_que;

	// ON LIT LES COMPTES EXISTANTS

	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");    
	listeMembres = JSON.parse(contenu_fichier);

	// ON VERIFIE QUE LE PSEUDO/PASSWORD EXISTE

	trouve = false;
	i = 0;
	while(i<listeMembres.length && trouve === false) {
		if(listeMembres[i].pseudo === query.pseudo) {
			if(listeMembres[i].password === query.password) {
				trouve = true;
			}
		}
		i++;
	}

	// ON RENVOIT UNE PAGE HTML 

	if(trouve === false) {
		// SI IDENTIFICATION INCORRECTE, ON REAFFICHE PAGE ACCUEIL AVEC ERREUR

		page = fs.readFileSync('page_accueil.html', 'utf-8');

		marqueurs = {};
		marqueurs.erreur = "ERREUR : compte ou mot de passe incorrect";
		marqueurs.pseudo = query.pseudo;
		page = page.supplant(marqueurs);

	} else {
		// SI IDENTIFICATION OK, ON ENVOIE PAGE ACCUEIL MEMBRE
		page = fs.readFileSync('page_home.html','UTF-8');

		adversaires = JSON.parse(fs.readFileSync(query.pseudo+".json","UTF-8"));

		// AFFICHAGE DES MEMBES A DEFIER

		nom = "";
		autre_nom = "";
		affichage_que = "";
		en_attente= "";

		pseudos = "";
		opposant="";
		ligne_nom_joueur = "";
		var trouve = false;
		for(j = 0 ; j <listeMembres.length ; j++ ) {
			if( listeMembres[j].pseudo === query.pseudo){
				continue;
			}
			trouve = false;
			ligne_nom_joueur =" joueur " + listeMembres[j].pseudo + " " +"\n";
			console.log("boucle 1:" + ligne_nom_joueur);

			//AFFICHAGE DES MEMBRES EN ATTENTE 

			for(h = 0 ; h < adversaires.length ; h++) {
				console.log("boucle 2: " + adversaires[h].contact);
				if(listeMembres[j].pseudo ==  adversaires[h].contact ){
					trouve = true;  
					console.log("pseudos trouve : " + pseudos);
					break;
				}
			}
			if (trouve == false){
				pseudos = pseudos + ligne_nom_joueur + "<a href=req_init_defi?pseudo="+query.pseudo+"&opposant="+listeMembres[j].pseudo+">defier</a> " + "<br> \n";
			}
		}

		for(h = 0 ; h < adversaires.length ; h++) {
			console.log("boucle 2: " + adversaires[h].contact);
			attente  	=	adversaires[h].contact  +"\n";
			attente_r	=	adversaires[h].reponse; 
			//si il ya un "X" c'est que nous avons deja defier l'adversaire
			//si c'est un numero c'est que l'adversaire a aumoin repondu une fois 
			if(attente_r === "X" || Number.isInteger(adversaires[h].reponse) === true) {
				nom  = nom + " " + attente+"<br>" ;
				en_attente = nom ;
				console.log("en_attente"+en_attente);
			}
			else if(attente_r == ""){
				autre_nom = autre_nom + " " + attente + "<a href=req_cont_defi?pseudo="+query.pseudo+"&opposant="+  attente+">defier</a> "+"<br>" ;
				affichage_que = autre_nom +" ";
				console.log("boucle 3: " + adversaires[h].contact);

			}
		}
	} 


	marqueurs = {};
	marqueurs.en_attente = en_attente;
	marqueurs.affichage_que = affichage_que;
	marqueurs.pseudo = query.pseudo;
	marqueurs.pseudos = pseudos;
	page = page.supplant(marqueurs);


	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();

};

//---------------------------------------------------------------------------

module.exports = trait;
