"use strict";

var fs = require("fs");
require('remedial');
module.exports = {
affichage_membre :
	function (listeMembres, query ) {

		var contenu_fichier;
		var listeMembres;
		var contenu;
		var profil_joueur;
		var pseudo;
		var pseudos = "";
		var nom = "";
		var autre_nom = "";
		var adversaires;
		var ligne_nom_joueur = "";
		var opposant = "";
		var j, h;
		var affichage_que = "";
		var en_attente = "";
		var attente;
		var attente_r;
		var trouve = false;
		var resultat = [];

		adversaires = JSON.parse(fs.readFileSync(query.pseudo + ".json","UTF-8"));
	
		// AFFICHAGE DES MEMBES A DEFIER
		for (j = 0; j < listeMembres.length; j++) {
			if (listeMembres[j].pseudo === query.pseudo) {
				continue;
			} 
			trouve = false;
			ligne_nom_joueur = " joueur " + listeMembres[j].pseudo + " " + "\n";
			
			// AFFICHAGE DES MEMBRES EN ATTENTE 
			for (h = 0 ; h < adversaires.length ; h++) {
				if (listeMembres[j].pseudo ==  adversaires[h].contact) {
					trouve = true;  
					break;
				}
			}
			if (trouve == false) {
				pseudos = pseudos + ligne_nom_joueur + "<a href=req_init_defi?pseudo=" + query.pseudo + "&opposant=" + listeMembres[j].pseudo + ">defier</a> " + "<br> \n";
			}
		}
		for (h = 0; h < adversaires.length; h++) {
			attente	= adversaires[h].contact + "\n";
			attente_r = adversaires[h].reponse; 

			// si il ya un "X" c'est que nous avons deja defier l'adversaire
			// si c'est un numero c'est que l'adversaire a aumoin repondu une fois 
			if (attente_r === "X" || Number.isInteger(adversaires[h].reponse) === true) {
				nom  = nom + " " + attente + "<br>";
				en_attente = nom;
			}
			else if (attente_r == "") {
				autre_nom = autre_nom + " " + attente + "<a href=req_cont_defi?pseudo=" + query.pseudo + "&opposant=" + attente + ">defier</a> " + "<br>";
				affichage_que = autre_nom + " ";
			}
		}
		resultat = [en_attente, affichage_que, pseudos];
		return resultat;
	}
};
