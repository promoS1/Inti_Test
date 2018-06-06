// Serveur pour l'administration de Inti'Test


"use strict";

var http = require("http");
var url = require("url");
var querystring = require("querystring");
var fs = require("fs");

// Declaration des differents modules correspondant a chaque action

var req_commencer = require("./req_commencer.js");

//GERER LA CREATION DE QUESTIONS

var req_cree_q = require("./req_cree_q.js");
var req_annuler_q require("./req_annuler.js");
var req_confirmer_q = require("./req_confirmer_q.js");
var req_retour_accueil_admin_q = require("./req_retour_accueil_admin_q.js");

//GERER LA LISTE MEMBRES 

var req_afficher_liste_m = require("./req_afficher_liste_m.js");
var req_supprimer_m = require("./req_supprimer_m.js");
var req_modifier_m = require("./req_modifier_m.js");
var req_annuler_m = require("./req_annuler_m.js");
var req_retour_liste_m = require("./req_retour_liste_m.js");
var req_retour_accueil_admin_m = require("./req_retour_accueil_admin_m.js");

//GERER LA LISTE DES QUESTIONS 

var req_afficher_liste_q = require("./req_afficher_liste_q.js");
var req_modifier_q = require("./req_modifier_q.js");
var req_supp_q = require("./req_supp_q.js");
var req_annuler_liste_q = require("./req_annuler_liste_q.js");
var req_retour_liste_q = require("./req_retour_liste_q.js");
var req_retour_accueil_admin_liste = require("./req_retour_accueil_admin_liste.js");

// Fonction de callback appellee pour chaque requete 

var traite_requete = function ( req, res) {

	var requete;
	var pathname;
	var query;

	console.log("URL reçu : " + req.url);
	requete = url.parse(req.url, true);
	pathname = requete.pathname;
	query = requete.query;

	// Routeur

	try {
		switch (pathname) {
			case '/':
			case '/req_commencer':
				req_commencer(req,res,query);
				break;
			case '/req_cree_q':
				req_cree(req, res, query);
				break;
			case '/req_confirmer_q':
				req_confirmer_q(req, res, query);
				break;
			case '/req_retour_accueil_admin_q':
				req_retour_accueil_admin_q(req, res, query);
				break;
			case '/req_annuler_q':
				req_annuler_q(req,res, query);
				break;
			case '/req_afficher_admin_m':
				req_afficher_admin_m(req, res, query);
				break;
			case '/req_modifier_m':
				req_modifier_m(req, res, query);
				break;
			case '/req_supprimer_m':
				req_supprimer_m(req,res, query);
				break;
			case'/req_retour_liste_m':
				req_retour_liste_m(req,res,query);
				break;
			case'/req_annuler_m':
				req_annuler_m(req,res,query);
				break;
			case '/req_retour_accueil_admin_m':
				req_retour_accueil_admin_m(req, res, query);
				break;
			case '/req_afficher_liste_q':
				req_afficher_liste_q(req, res, query);
				break;
			case '/req_modifier_q':
				req_modifier_q(req,res, query);
				break;
			case '/req_supp_q_q':
				req_supp_q(req,res, query);
				break;
			case'/req_retour_accueil_admin_liste':
				req_retour_accueil_admin_liste(req,res,query);
				break;
			case'/req_annuler_liste_q':
				req_annuler_liste_q(req,res,query);
				break;
			case'/req_retour_liste_q':
				req_retour_liste_q(req,res,query);
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
var port = 3000;
console.log("Serveur en ecoute sur port " + port);
mon_serveur.listen(port);
