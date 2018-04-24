//============
// req retour home
//==============

"use strict";

var fs = require("fs");
require('remedial');

var trait = function(req, res, query) {
	var page;
	var marqueurs;

	page = fs.readFileSync('page_home.html', 'utf-8');

    marqueurs = {}; 
    marqueurs.pseudo = query.pseudo;
    page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//===========

module.exports = trait;
