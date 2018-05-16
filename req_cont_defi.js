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

	page = fs.readFileSync('page_reponse_q.html', 'utf-8');
	console.log(query.pseudo);
	console.log(query.opposant);
//ON OUVRE LES DEUX JSON 	
	profil_user = fs.readFileSync(query.pseudo+".json", "UTF-8");
	contenu = JSON.parse(profil_user);

	profil_opposant = fs.readFileSync(query.opposant+".json", "UTF-8");
	contenu_opposant = JSON.parse(profil_opposant);

//AFFICHE QUESTION
	for(h = 0 ; h < contenu.length && contenu_opposant.length ; h++){ 
	 
	 }
	 marqueurs = {};
	 marqueurs.opposant = query.opposant;
     marqueurs.pseudo = query.pseudo;
     page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;
