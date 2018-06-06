// CREATION DE QUESTION
// REQUETE CREE_Q


"use strict";

var fs = require("fs");
require('remedial');

var trait = function (req, res, query) {


	page = fs.readFilesSync('page_cree_question.html', 'utf-8');




























	marqueurs = {};
	page = page.supplant(marqueurs);

	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;

