//=========================================================================
// Serveur
// Auteur : L'équipe de Inti'Test
// Version : 16/01/2018
//=========================================================================

"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

//-------------------------------------------------------------------------
// DECLARATION DES DIFFERENTS MODULES CORRESPONDANT A CHAQUE ACTION
//-------------------------------------------------------------------------

var req_commencer = require("./req_commencer.js");
var req_afficher_formulaire_inscription = require("./req_afficher_formulaire_inscription.js");
var req_inscrire = require("./req_inscrire.js");
var req_identifier = require("./req_identifier.js");
var req_defier = require("./req_defier.js");
var req_repond_q = require("./req_repond_q.js");
var req_reponse_q = require("./req_reponse_q.js");
var req_poser_q = require("./req_poser_q.js");
var req_confirmation = require("./req_confirmation.js");
var req_retourHome = require("./req_retourHome.js");
var req_static = require("./req_static.js");
var req_erreur = require("./req_erreur.js");


//-------------------------------------------------------------------------
// FONCTION DE CALLBACK APPELLEE POUR CHAQUE REQUETE
//-------------------------------------------------------------------------

var traite_requete = function (req, res) {

	var requete;
	var pathname;;
	var query;

	console.log("URL reçue : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;
	// ROUTEUR

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req, res, query);
				break;
			case '/req_afficher_formulaire_inscription':
				req_afficher_formulaire_inscription(req, res, query);
				break;
			case '/req_inscrire':
				req_inscrire(req, res, query);
				break;
			case '/req_identifier':
				req_identifier(req, res, query);
				break;
			case '/req_defier':
				req_defier(req,res, query);
				break;
			case '/req_reponse_q':
				req_reponse_q(req, res, query);
				break;
			case '/req_repond_q':
				req_repond_q(req, res, query);
				break;
			case '/req_poser_q':
				req_poser_q(req,res, query);
				break;
			case'/req_confirmation':
				req_confirmation(req,res,query);
				break;
			case'/req_retourHome':
				req_retourHome(req,res,query);
				break;
			default:
				req_static(req, res, query);
				break;
		}
	} catch (e) {
		console.log('Erreur : ' + e.stack);
		console.log('Erreur : ' + e.message);
		//console.trace();
		req_erreur(req, res, query);
	}
};

//-------------------------------------------------------------------------
// CREATION ET LANCEMENT DU SERVEUR
//-------------------------------------------------------------------------

var mon_serveur = http.createServer(traite_requete);
var port = 5000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
