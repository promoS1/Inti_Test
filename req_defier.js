//===============
// req_defier
//===============

"use strict"; 

var fs =  require("fs");
require('remedial');

var trait = function (req, res, query) {
	var page;
	var marqueurs;

	page = fs.readFileSync('page_reponse_q.html', 'utf-8');





	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(page);
	res.end();
};

//=======
module.exports = trait;
