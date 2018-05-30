//============
// req retour home
//==============

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var marqueurs;
	var pseudos;
	var profil_user;
    var membre;
    var contenu_fichier;
    var tout;
    var listeMembres;
    var i,j,h;
    var nom;
    var contenu;
    var attente_r;
    var attente_q;
    var trouve;
    var donne;
    var attente;
    var ma_reponse;
    var contacts;
    var score;
    var opposant;

	contenu_fichier = fs.readFileSync("membres.json" , "utf-8");
	listeMembres = JSON.parse(contenu_fichier);

	profil_user = fs.readFileSync(query.pseudo+".json","UTF-8");
        contenu = JSON.parse(profil_user);

	for(j = 0 ; j <listeMembres.length ; j++ ) {
		tout = "";
		tout =(j+1) + " joueur " + listeMembres[j].pseudo +"\n";
		if (query.pseudo !== listeMembres[j].pseudo){
			pseudos = pseudos + tout + "<a href=req_init_defi?pseudo="+query.pseudo+"&opposant="+listeMembres[j].pseudo+">defier</a> " + "<br>";
		}opposant = listeMembres[j].pseudo ;
		console.log(opposant);
	}

	page = fs.readFileSync('page_home.html', 'utf-8');
	for(h = 0 ; h < contenu.length ; h++) {
		attente     =   contenu[h].contact  +"\n";
		attente_r   =   contenu[h].reponse;
		ma_reponse  =   contenu[h].ra;
		attente_q   =   contenu[h].questions;
		score       =   contenu[h].score;
		donne       =   (h+1) + " Joueur " + attente +"Score:" + score + "\n" ;
		contacts    = contacts +" "+ donne +"<br> " ;


	}


marqueurs = {};
marqueurs.attente_r = contacts;
marqueurs.attente_q = contacts;
marqueurs.pseudo = query.pseudo;
marqueurs.pseudos = pseudos;
page = page.supplant(marqueurs);

res.writeHead(200, {'Content-Type': 'text/html'});
res.write(page);
res.end();
};

//===========

module.exports = trait;
