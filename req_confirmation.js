//==================
// req confirmation
//=================

"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;
	var j;
	var pseudos;
	var tout;
	var listeMembres;
	var contenu_fichier;
	

	contenu_fichier = fs.readFileSync("membres.json", 'utf-8');
    listeMembres = JSON.parse(contenu_fichier);

	pseudos="";
	page = fs.readFileSync('page_home.html', 'utf-8');
	for(j=0;j<listeMembres.length ;j++) {
            tout = "";
            tout =j + " joueur " + listeMembres[j].pseudo +"\n";
            pseudos = pseudos + tout +"<a href=req_cont_defi?pseudo="+query.pseudo+">defier</a> " + "<br>";
	}

    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
	marqueurs.pseudos = pseudos;
    page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//==============

module.exports = trait;
