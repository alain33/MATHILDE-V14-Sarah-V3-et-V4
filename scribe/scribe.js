var __nircmd = __dirname + '/bin/nircmd.exe ';
var say=[];
var maConfig;
var v4=false;

// events names
TIME_ELAPSED = 'TIME_ELAPSED';
PARTIAL_RECO = 'PARTIAL_RECO';
FULL_RECO    = 'FULL_RECO';


// Javascript/Node.JS Sent-Server-Emitter (https://github.com/thibauts/node-sse-emitter)
var sse;

function refreshBrowser() {
	sse.emit('/scribe', {command: "refresh"});	
}

function browserAbort() {
	sse.emit('/scribe', {command: "abort"});	
}

function browserStart() {
	sse.emit('/scribe', {command: "start"});	
}

function forceSendBrowser() {
	// ceci peut être utile si la page dans Chrome n'est plus la page principale
	sse.emit('/scribe', {command: "forceSend"});	
}

function browserTalk(txt) {
	sse.emit('/scribe', {command: "saying", 'html': txt.html, 'timeout': txt.timeout, 'pause':txt.pause})
}

function activePlugin(txt) {
	sse.emit('/scribe', {command: "plugin", plugin: txt});	
}

// copie "globale" de SARAH
var SARAH_scribe;
var micro_ON = true;
var SARAH_speak_queue = 0;

/////////////// GESTION DU MICRO ON/OFF

function microOFF(callback) {
	microMute(1, callback);
}
function microON(callback) {
	microMute(0, callback);
}

function microMute(mute, callback, force) {
//	console.log("MICRO ON:" + micro_ON);
	var ask_micro_on = (mute==0); // est-ce qu'on demande d'allumer le micro ?
//	console.log("ASK MICRO ON:" + ask_micro_on);
	// pas nécessaire d'appeler nircmd si le micro est déjà allumé/éteint ... sauf si on force ...
	if (typeof force === 'undefined' && micro_ON == ask_micro_on) {
		if (typeof callback !== 'undefined') callback();
		return;
	}

	// surtout ne pas attendre que le process soit fini, on considère que le micro changera bel et bien d'état ...
	micro_ON = (mute==0);	
	// remettre le micro au niveau "normal"
	var exec = require('child_process').exec;
	var proc = __nircmd + "mutesysvolume " + mute + " default_record";
//console.log(proc);
	var child = exec(proc, function (error, stdout, stderr) {
		if (typeof callback !=='undefined') callback(error);
	});
}

///////// FONCTIONS DE GESTION DE ASKME

var token_askme;
var _hookScribe = undefined;

// permet de rendre sourd Sarah le temps qu'on recoive la reco de Google
// ce qui évite à Sarah de lancer des grammaires
function SarahEcoute(listen, callback) {
	/*if (v4) {
		if (typeof callback !== 'undefined') return callback(); else return;
	}*/
	if (v4) sarahConfig = Config.http;
	else sarahConfig = SARAH_scribe.ConfigManager.getConfig().http;
	
	var url_client_sarah;
	if (v4) url_client_sarah = sarahConfig.remote + "/?context=" + ( listen ? 'default': '');
	else url_client_sarah = sarahConfig.remote + "/?listen=" + listen;
	var request = require('request');

	request(url_client_sarah, function(err, response) {
		if (err || response.statusCode != 200) {
			// juste pour info mais sinon on s'en fiche un peu ...
			res.write ("Erreur: " + err);
		}
		if (typeof callback !== 'undefined') callback();
	});
	
}

function ScribeAskMe(question, reponses, callback, options) {
	// question: string
	// reponses: [{'regex': regexp, 'match_number': number, 'answer': object}, {...}]
	// options: { 	'timeout':msec, 						// timeout msec
	//				'essais':number, 						// nombre d'essais pour la question
	//				'repeter':true|false|string,			// oui, non ou une autre phrase
	//				'retryIfNoMatch': true|false|string		// si pas de match, faut-il répéter la question, abandonner, poser la question autrement ?
	// 				'partialThreshold': float				// seuil à partir duquel une réponse partielle est considérée valable
	//				'waitForFinal': true|false				// attend une reco 'finale' ou bien une partielle(+confidence) est suffisante ?
	//				'usePartialAfterTimeout': true|false	// en cas de timeout sans réponse 'finale', une réponse partielle(+confidence) peut être utilisée
	// }
	// callback (answer,match,phrase) : 
	//		answer=undefined (pas de réponse), false (pas de match), objet
	//		match=ce qu'on a trouvé
	//		phrase=la phrase détectée
	
	if (typeof options ==='undefined') options = {};
	
	if (typeof options.timeout==='undefined') options.timeout=10000;
	
	if (typeof options.repeter==='undefined') options.repeter=true;
	if (typeof options.partialThreshold==='undefined') options.partialThreshold=0.8;
	if (typeof options.waitForFinal==='undefined') options.waitForFinal=true;
	if (typeof options.usePartialAfterTimeout==='undefined') options.usePartialAfterTimeout=true;
	if (typeof options.essais==='undefined') options.essais=1;
	options.cpt_essais = 1;

	for (i=0;i<reponses.length;i++) {
		if (typeof reponses[i].match_number === 'undefined') reponses[i].match_number=0; // par défaut
		if (typeof reponses[i].answer === 'undefined') reponses[i].answer=i+1; // par défaut
	}
	//console.log(options.timeout);
	startAskMe(question, reponses,options,callback);
}

function startAskMe(question, reponses, options,callback) {
	SarahEcoute(false, function() {
		_ScribeSpeak(question, function() {
			//token_askme = setInterval(function(){checkScribeAskMe(question,reponses,options,callback);}, options.interval);
			_hookScribe = function(event) {
				checkScribeAskMe(event,question,reponses,options,callback);
			};
			token_askme = setTimeout( function() {__hookScribe(TIME_ELAPSED);}, options.timeout )
		})
	});
}

function __hookScribe(event) {
	if (typeof _hookScribe !== 'undefined') _hookScribe(event);
	return;
}

function endAskMe(answer,phrase,match,wholeMatch,callback) {
	_hookScribe=undefined;
	clearTimeout(token_askme);
	SarahEcoute(true);
	return callback(answer,phrase,match, wholeMatch);
}

function checkScribeAskMe(event,question, reponses, options, callback) {
//console.log('hello');
	if (event==FULL_RECO) {
		clearTimeout(token_askme);
		console.log(event);
		return matchAnswers(event, question, reponses, options, SARAH_scribe.context.scribe.lastReco, callback);
	} else if (event==TIME_ELAPSED) {
		console.log(event + ' - ' + question);
		// time out !
		// a t on au moins un résultat partiel valable ?
		if (options.usePartialAfterTimeout == true &&
			SARAH_scribe.context.scribe.compteurPartial > SARAH_scribe.context.scribe.compteur && 
			SARAH_scribe.context.scribe.lastPartialConfidence >= options.partialThreshold) {
			SARAH_scribe.context.scribe.compteurPartial = SARAH_scribe.context.scribe.compteur
			// on a un résultat partiel valable
			return matchAnswers(event, question, reponses, options, SARAH_scribe.context.scribe.lastPartial, callback);
		}
		
		// a-t-on encore droit à un essai ?
		options.cpt_essais++;
		if (options.cpt_essais>options.essais) {
			// non c'était notre dernière chance ...
			// on a rien trouvé parce qu'on a rien dit ...
			return endAskMe(undefined,'','','',callback);
		}
		// faut-il répéter la question ou dire autre chose pour ce nouvel essai ?
		if (options.repeter==true) tts = question;
		else if (options.repeter + ''!='') tts = options.repeter;
		else if (options.repeter==false) tts = '';
//		console.log(tts);
		
		// on relance le tout ...
		startAskMe(tts,reponses,options,callback);
	} else if (event==PARTIAL_RECO && options.waitForFinal == false) {
//		console.log(event);
		// a t on un résultat partiel valable ?
		if (SARAH_scribe.context.scribe.compteurPartial > SARAH_scribe.context.scribe.compteur && 
			SARAH_scribe.context.scribe.lastPartialConfidence >= options.partialThreshold) {
			SARAH_scribe.context.scribe.compteurPartial = SARAH_scribe.context.scribe.compteur
			// on a un résultat partiel valable
			return matchAnswers(event, question, reponses, options, SARAH_scribe.context.scribe.lastPartial, callback);
		}
		// sinon on continue ...
	}
}

function matchAnswers(event, question, reponses, options, phrase, callback) {
//	console.log ("Phrase: " + phrase);
	// SCRIBE retourne toute la phrase dite par l'utilisateur
	// on passe en revue les réponses possibles
	for (i=0;i<reponses.length;i++) {
		var rgxp = reponses[i].regex;	
		// on s'assure que Google a bien compris
		var match = phrase.match(rgxp);
//		console.log("MATCH: " + match);
		if (typeof reponses[i].removeMatch !== 'undefined') {
			for (j=0;j<match.length;j++) {
				remov = match[j].match(reponses[i].removeMatch)
				if (remov && remov.length>=1) {
					console.log("Removing: " + match[j]);
					// on a demandé de ne pas tenir compte de ce match-là, donc on vire
					match.splice(j,1); 
					j--;
				}
			}
		}
		if (match && match.length >= 1) {
			// on a trouvé 
			fnd = match[reponses[i].match_number];
			return endAskMe(reponses[i].answer,phrase, fnd, match, callback);
		}
	}
	// on arrive ici c'est que la phrase ne contient pas ce qu'on cherche ...
	// si on était en PARTIAL_RECO alors ce n'est pas grave, sinon c'est fini ...
	if (event==PARTIAL_RECO) return;
	if (options.retryIfNoMatch!=false) {
		// a-t-on encore droit à un essai ?
		options.cpt_essais++;
		if (options.cpt_essais<=options.essais) {
			// faut-il répéter la question ou dire autre chose pour ce nouvel essai ?
			if (options.retryIfNoMatch!='') tts = options.retryIfNoMatch;
			else if (options.retryIfNoMatch==true) tts = question;
			else if (options.retryIfNoMatch==false) tts = '';
			
			// on relance le tout ...
			return startAskMe(tts,reponses,options,callback);
		}
	}
	return endAskMe(false,phrase,'','',callback);
}

///////////////// SCRIBE SPEAK

function _ScribeSpeak(tts, callback, SARAH_local) {
	if (typeof SARAH_local === 'undefined') SARAH_local = SARAH_scribe;
	if (typeof callback ==="undefined") callback=false;

	
	
	tts = pickOne(tts);
	// protection temporaire de la ponctuation, pour éviter de la "détacher"
	tts = tts.replace(/ !/,"²!");	// " !"
	tts = tts.replace(/ ,/,"²,");	// " ,"
	tts = tts.replace(/ \./,"².");	// " ."
	tts = tts.replace(/ \?/,"²?");	// " ?"
	tts = tts.replace(/ ;/,"²;");	// " ;"
	tts = tts.replace(/ \:/,"²:");	// " :"
	tts = tts.replace(/ \)/,"²)");	// " )"
	tts = tts.replace(/\( /,"(²"); 	// "( "
	//tts = tts.replace(/\) /,"}~");	// ") "
	//tts = tts.replace(/ \(/,"~("); 	// " ("

	// guillemet ?


	// split des mots
	txt = tts.split(" ");
	// clear 
	//say = [];
	say.length = 0
	// remettre le texte original
	tts = tts.replace(/²/g, " ");
	if (callback!=false) {
		for (i=0;i<txt.length;i++) {
			// restaurer les espaces avant la ponctuation
			txt[i] = txt[i].replace(/²/g,' ');
//console.log(txt[i]);
			if (i!=txt.length-1) {
				ponctuation = (txt[i].match(/[!,;\?\.\:]/g) || []).length
				ponctuation2 = (txt[i+1].match(/[!,;\?\.\:]/g) || []).length
				open_p = txt[i].indexOf("(");
				close_p = txt[i].indexOf(")");
				par = (open_p>=0 && close_p==-1) ;
				open_p2 = txt[i+1].indexOf("("); if (open_p2==-1)   open_p2 =9999;
				close_p2 = txt[i+1].indexOf(")"); //if (close_p2==-1) close_p2=99999;
				par2 = (open_p2> close_p2) ;
				if (par && par2) parenthese = true; else parenthese = false;
//console.log(parenthese + ' - ' + ponctuation);				
				// si pas de ponctuation ou/sauf si on a l'opportunité d'ouvrir et fermer des parenthèses
				// ET
				// si longueur du texte + suivant <= 10 ou 
				// si longueur de texte <= 5 ou 
				// si longeur <= 13 (3 mots de 4 lettres + 1 caract.) et au moins 1 espaces, on concatène ...

				if (((ponctuation==0 && open_p2==9999) || parenthese) && ( 
					(txt[i].replace(/[' -]/g,'').length + txt[i+1].replace(/[' -]/g,'').length) <=10 || 
					 txt[i].replace(/[' -]/g,'').length <= 5 ||
					((txt[i].replace(/[' -]/g,'').length + txt[i+1].replace(/[' -]/g,'').length) <= 13 && (txt[i].match(/ /g) || []).length >= 1)
					)) {
					txt[i] += ' ' + txt[i+1];
					txt.splice(i+1,1);
					i--;
				}
			}
		}
		// si le dernier texte ne contient que de la ponctuation, on le concatène avec le précédent
		if (txt[txt.length-1].replace(/[ ,.;!\?\:]/g,'') == '') {
			txt[txt.length-2] += ' ' + txt[txt.length-1];
			txt.splice(txt.length-1,1);
		}
		prevtimeout=0;
		for (i=0;i<txt.length;i++) {
			saying = txt[i];
//console.log(saying);			
			// si pas le dernier mot, on peut ajouter un espace
			if (i!=txt.length-1) saying = saying + ' ';
			if (i==0) {
				left = '';
			}
			else {
				// si pas le premier mot, on peut ajouter un espace
				saying = ' ' + saying;
				left = say[i-1].left + ' ' + say[i-1].saying.trim();
			}
			
			right = '';
			// quels sont les mots qui restent à dire ?
			for (j=i+1;j<txt.length;j++) {
				right += txt[j];
				if (j!=txt.length-1) right+= ' ';
			}

			timeout = maConfig.pause_par_lettre * saying.replace(/[' -]/g,'').length;	
			malus2=0;
			// malus si il y a des "!", "," ou "?"
			malus = (saying.match(/[,]/g) || []).length * maConfig.pause_virgule;
			malus += (saying.match(/[!]/g) || []).length * maConfig.pause_exclamation;
			malus += (saying.match(/[\?]/g) || []).length * maConfig.pause_interrogation;
//console.log(saying + " - malus " + malus);
			// malus si il y a des ";" ou des ":"
			malus += (saying.match(/[;]/g) || []).length * maConfig.pause_point_virgule;
			malus += (saying.match(/[\:]/g) || []).length * maConfig.pause_deux_points;
			// malus si il y a des "..." ou des ".."
			petits_points = (saying.match(/(\.\.)/g) || []).length;
			malus2= petits_points * maConfig.pause_trois_petits_points;
//console.log(saying + " - malus2 " + malus2);
			malus+=malus2
			// si pas de ... alors y a t il des . ?
			if (petits_points==0) malus+= (saying.match(/[\.]/g) || []).length * maConfig.pause_point;

		
			// malus pour les nombres ...
			malus += (saying.match(/([0-9])/g) || []).length * maConfig.pause_par_chiffre;
//console.log(saying + " - malus " + malus);
			
			timeout+=malus;			
			if (i==0) {
				// début de la synthèse ...
				// environ 6 secondes pour 3000+ caractères
				// minimum 1 secondes pour une centaine de car.
				pause = maConfig.pause_minimale_avant_synthese + (tts.length>1000 ? (tts.length*2) : 0);
				timeout += pause;
			} else pause = 0;
//console.log("timeout " + timeout);			
			say.push({'left': left, 'saying': saying, 'right': right, phrase: tts,
					  'html': (left ? '<span>' + left + '</span>': '') + 
							  (saying ? '<span class="saying">' + saying + '</span>' : '') + 
							  (right ? '<span>' + right + '</span>': ''),
					  'timeout' : prevtimeout,
					  'pause': pause,
					  'last': false
					});
			prevtimeout = timeout;
		}
	}

	// encore un ...
	say.push({'left': tts, 'saying': '', 'right': '', phrase: tts,
			  'html':'<span>' + tts + '</span>',
			  'timeout': 1000,
			  'pause': -1,
			  'last': true
			 });

//console.log(say)	;
	scribe_speak(tts,callback,SARAH_local);
	clearTimeout(sloop_token); // des fois que ...
	sloop(0);
}

var sloop_token;

function sloop(i) {
	if (typeof say[i] !== 'undefined') {
		if (say[i].last==false || (say[i].last==true && i==say.length-1)) {
//console.log("i: "+ i);
//console.log("i: " + i + ": " + say[i].timeout + " ------- : " + say[i].saying);
			browserTalk(say[i]);
			i++;
	
			if (i<say.length) {
				sloop_token = setTimeout(function() {sloop(i);},say[i].timeout);
			}  
		} else {
			// on essaye d'afficher le dernier hightlight alors qu'on est déjà en train d'afficher la suite, donc on bypasse
			// voir explication ci-après
		}
	} else {
		// rien
		// il se peut que le dernier Highlight au ScribeSpeak précédent ne soit pas encore enclenché et qu'il y ait moins
		// de mots à highlighter dans ce ScribeSpeak-ci qu'au précédent dans ce cas on a undefined et donc on bypasse
	}
}


// surcharge de speak !
var oldTTS = '|';
var oldASYNC=123456;
var tts_queue=[];

function scribe_speak(tts, async,  SARAH) {
//	console.log("===================================");
//	console.log("TTS: " + tts);
//	console.log("ASYNC: " + async);
//	console.log("SARAH_speak_queue: " + tts_queue.length);
	if (async==false && oldASYNC!=false && oldTTS==tts) {
		// c'est le 2e passage et donc on n'en veut pas
		oldASYNC=false; 
		return false;	
	}

	oldTTS = tts;
	oldASYNC = async;
	
	// à partir d'ici tts est un string ...
	tts_queue.push({'tts':tts,'callback': (async ? async : undefined) });
	
	if (tts_queue.length>1) {
		// on traitera la queue plus tard ...
		return null;	
	}
	
	browserAbort();
	microOFF(function() {
		//browserStart();
		talk();
	});		

	// on ne veut pas laisser faire le moteur TTS de Sarah
	return null;
}


function talk () {
	tts=tts_queue[0].tts;
	console.log("Scribe Speak: " + tts);
	var request = require('request');
	if (v4) sarahConfig = Config.http;
	else sarahConfig = SARAH_scribe.ConfigManager.getConfig().http;
	// pour pouvoir éteindre le micro au bon moment, on doit forcer la synchro de la voix
	var url = sarahConfig.remote + "?tts=" + encodeURI(tts) + "&sync=true"; //(async==true ? "&sync=true" : "");
//	console.log("URL: " + url);
	request(url,	function (err, response, body){
		// voilà une bonne phrase de dite ... s'il y a un callback, on ne l'appelle pas tout de suite
		//if (tts_queue[0].callback != false) 
		cb = tts_queue[0].callback;
		tts_queue.shift();
		if (tts_queue.length==0) {
			microON(function() {
				// rien ?
				if (typeof cb === 'function') return cb();
			});		
		} else talk();
	});
}

function pickOne(tts) {
	// séparation des | s'il y en a
	if (!Array.isArray(tts)) tts = tts.split('|');
	// choix d'un élément au hasard
	if (Array.isArray(tts)) {
		tts = tts[Math.floor(Math.random() * tts.length)];
	}
	return tts;
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;

exports.action = function(data, callback, config, SARAH){
reponse=""; fs = require('fs');exec = require('child_process').exec; 
filePath = './plugins/scribe/memoire/memoire.json'; // Chemin vers bases de mots.json
maConfig = config.modules.scribe; util = require('util');


SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;



//function PluginActif(){	
	
try{
	if ( data.reco.search("Mathilde") >-1){

 SARAH.run('cortana', { 'reco' : data.reco});reponse="";callback({'tts' : " "})		
	}
	//if (query1.search("vidéos") >-1){

else{
		SARAH.context.scribe.lastReco = data.reco;
		SARAH.context.scribe.compteur++;
		SARAH.context.scribe.compteurPartial=SARAH.context.scribe.compteur;
		SARAH.context.scribe.lastConfidence = data.confidence;
		// gestion de la pile des X dernières reconnaissances
		SARAH.context.scribe.lastX.unshift({'compteur' : SARAH.context.scribe.compteur, 'reco': data.reco, 'confidence': data.confidence });
		if (SARAH.context.scribe.lastX.length>maConfig.maxReco) SARAH.context.scribe.lastX.pop();
		
		__hookScribe(FULL_RECO);
		if (typeof SARAH.context.scribe.hook !== 'undefined') SARAH.context.scribe.hook(FULL_RECO);



	 else if (typeof data.partial !== 'undefined') {
		SARAH.context.scribe.lastPartial = data.partial;
		SARAH.context.scribe.compteurPartial++;
		SARAH.context.scribe.lastPartialConfidence = data.confidence;
		
		__hookScribe(PARTIAL_RECO);
		if (typeof SARAH.context.scribe.hook !== 'undefined') SARAH.context.scribe.hook(PARTIAL_RECO);
	



	} else if (typeof data.action !== 'undefined') {
		// grammaires XML
		if (data.action == "relaunch") {
			autorun_browser(true);
		} else if (data.action== "refresh") {
			console.log("ask refresh");
			refreshBrowser();
		} else if (data.action== "forceSend") {
			console.log("force Send");
			forceSendBrowser();
		}
	}

}



}//fin try

catch (Exception) {}

	callback();


	
}//fin export
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

exports.init = function(SARAH) {
//console.log(Config);
	if (typeof Config === "undefined" ) {
		//var SARAH = SARAH_local;
	} else v4=true;
	
console.log('V4: ' + v4);	
	
SARAH.context.scribe = {
	'compteur': 0,
	'lastReco': '',
	'lastConfidence': 0,
	'lastPartial': '',
	'lastPartialConfidence': 0,
	'compteurPartial':0,
	'lastX': [],
	'microOFF': microOFF,
	'microON': microON,
	'hook': undefined,
	'TIME_ELAPSED': TIME_ELAPSED,
	'FULL_RECO': FULL_RECO,
	'PARTIAL_RECO': PARTIAL_RECO,
	'activePlugin': activePlugin,
	'SarahEcoute': SarahEcoute,
	'ScribeSpeak': _ScribeSpeak,
	'ScribeAskMe': ScribeAskMe
	
}
	
	
var fs = require('fs');
var https = require('https');
var express = require('express');
var util = require('util');

if (v4) maConfig = Config.modules.scribe;
else maConfig = SARAH.ConfigManager.getConfig().modules.scribe;

// surcharge de speak (allume/éteint le micro pendant que Sarah parle afin que Chrome ne capte pas l'audio)
if (maConfig.speak_surcharge==true) exports.speak = scribe_speak; 
SARAH_scribe = SARAH;
SARAH.ScribeSpeak = _ScribeSpeak;
SARAH.ScribeAskMe = ScribeAskMe;
SARAH.SarahEcoute = SarahEcoute;

// on s'assure que le micro est allumé ...
microMute(0, undefined,true);

// port HTTPS -- à changer selon les ports disponibles
var port_https = maConfig.port_https;

console.log("Préparation du Serveur HTTPS sur le port " + port_https);
var app = express();
// par défaut les pages sont dans STATIC
app.use(express.static(__dirname  + '/static'));

// on utilise Server-Sent Emitters pour dialoguer avec Chrome et la page d'acquisition audio
var SSE = require('sse-emitter');
sse = new SSE({
  keepAlive: 30000, // in ms, defaults to 10000
});

// la page de dialogue entre le scribe et Chrome
app.get('/scribe', sse.bind());


// la page "sarah" qui recueille le texte reconnu et qui va le renvoyer à Sarah
app.get('/sarah', function(req, res){
	/*
	// ce code-ci est certainement valide mais signifie qu'on a une étape supplémentaire à travers le client
	// or on fait déjà bien assez d'étapes comme ça, autant attaquer le serveur en HTTP directement
	
	if (typeof req.query.reco === 'undefined') {
		// rien ?
		console.log('Pas de paramètre "reco"');
	} else {
		req.query.reco = req.query.reco.trim();
	
		SARAH.call ('scribe',{'reco': req.query.reco}, function(options) {
			// on fait l'appel et on se fiche bien du callback..
		});
	}
	*/
	
	res.writeHead(200,{"Content-Type": "text/html"});
	res.write('<!DOCTYPE html>'+
				'<html><head><meta charset="utf-8" /></head>'+ 
				'<body>');
	if (typeof req.query.reco === 'undefined' && typeof req.query.partial === 'undefined') {
		res.write('Pas de paramètre "reco"');
		res.end('</body></html>');
	} else {
		var params;
		var request = require('request');

		if (typeof req.query.reco !== 'undefined') {
			txt = req.query.reco;
			type = "reco";
			msg = "Reco: " + txt + " (" + req.query.confidence +")" + (req.query.force=='true' ? ' - FORCE': '');
			txt = txt.trim();
			params = {reco:  decodeURI(txt), confidence: req.query.confidence};
		} else {
			txt = req.query.partial;	
			
			type = "partial";
			msg = "Partial: " + txt + " (" + req.query.confidence +")";
			
			txt = txt.trim();
			params = {partial:  decodeURI(txt), confidence: req.query.confidence};
		}
		res.write(msg);
		//console.log(msg);
		if (typeof req.query.force !=='undefined') params.force = req.query.force;
		
		if (v4) sarahConfig = Config.http;
		else sarahConfig = SARAH.ConfigManager.getConfig().http;
		var url_serveur_sarah = "http://" + sarahConfig.ip + ":" + sarahConfig.port + "/sarah/scribe";
 //try{    
   //       var url_serveur_sarah = "http://" + sarahConfig.ip + ":" + sarahConfig.port + "/sarah/cortana?q="+req.query.reco.trim();
//console.log('on aaaaaaaa'+req.query.reco.trim());
//var url_serveur_sarah = 'http://127.0.0.1:8080/sarah/cortana?q='+SARAH.context.scribe.lastReco
//}//fin try
//catch (Exception) {console.log("   erreur       ")}	
		

		request({ 
			url : url_serveur_sarah,
			qs: params
			},
			function (err, response, body){
				if (err || response.statusCode != 200) {
					//res.write ("Erreur: " + err);
					//console.log ("Erreur: " + err);
					if (response != undefined) {
						res.write ("<br/>Response code: " + response.statusCode);
						//console.log("Response code: " + response.statusCode);
						res.write ("<br/>Response headers: " + util.inspect(response.headers));
						//console.log("Response headers: " + util.inspect(response.headers));
					
					}
				} else {
					/*
					res.write ('<br/>Réponse (http) de Sarah: ' + body);
					console.log('Réponse http de Sarah: ' + body);
					*/
				}
				res.end('</body></html>');
			}
		);
		////////////////////////////////////









	
	}
	
});


// création du serveur HTTPS
https.createServer({
	key: fs.readFileSync(__dirname + '/key.pem'),
	cert: fs.readFileSync(__dirname + '/cert.pem')
	}, app).listen(port_https);

console.log("Serveur HTTPS en écoute sur le port " + port_https);

if (maConfig.autorun_browser==true) {
	autorun_browser(maConfig.kill_browser_on_startup);
}

//setTimeout(function() { _ScribeSpeak("Quelle bonne question faut-il poser pour différencier un moineau et un aigle ?",true)},2000);

// tests vocaux

if (maConfig.tests_vocaux) {
setTimeout(function() {
	_ScribeSpeak("Les mathématiques sont un ensemble de connaissances abstraites résultant de raisonnements logiques appliqués à des objets divers tels que les nombres, les figures, les structures et les transformations.", function() {
		setTimeout(function() {
			_ScribeSpeak("J'ai bu un Saint-émilion de 1982. C'était très bon. J'en boirai encore à l'occasion. J'ai 40 ans et donc je fais ce que je veux avec mon argent,hein !", function() {
				setTimeout(function() {
					_ScribeSpeak("les sanglots longs des violons (de l'automne) ... blessent \"mon coeur\" d'une langueur monotone !", function() {
						setTimeout(function() {
							_ScribeSpeak("est-ce que je suis désynchro ? voici une phrase très longue; juste pour voir si ça va le faire. ou pas. car après tout c'est moi qui décide.", function() {
								setTimeout(function() {
									_ScribeSpeak("ceci est une autre phrase très longue; ce n'est pas très intéressant: mais c'est pour passer le temps quoi, non ?", function() {
										setTimeout(function() {
											_ScribeSpeak("et voici encore un peu de temps passé à écouter n'importe quoi, (y en a qui ont rien d'autre à faire, franchement !)", 
											function() {
												_ScribeSpeak("Claude Monet, né le 14 novembre 1840 à Paris et mort le 5 décembre 1926 (à 86 ans) à Giverny, est un peintre français, l’un des fondateurs de l'impressionnisme, peintre de paysages et de portraits.", function() {
												});
											});
										},5000);
									});	
								},5000);
							});
						},5000);
					});
				}, 2000);
			});
		}, 2000);
	});
}, 2000);
}



} // fin de init

function autorun_browser(kill) {
	var exec = require('child_process').exec;
	
	if (kill==true) {
		var proc = __nircmd + 'closeprocess chrome.exe'; 
	} else {
		var proc = 'start chrome --new-window https://127.0.0.1:4300'; 
	}
//	console.log(proc);
	var child = exec(proc, function (error, stdout, stderr) {
		if (error !== null) console.log('exec error: ' + error);
		if (kill==true) setTimeout(function() {autorun_browser(false);},2000);
	});		
	
}