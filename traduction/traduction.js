var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;


//request({ 'uri' : url, 'headers':{'Accept-Charset': 'utf-8'}, 'encoding':'binary' }, function(){//ma fonction...});﻿

exports.action = function(data, callback, config, SARAH){

nomchercher=data.chercher
console.log('chercher : *'+nomchercher+'*')



reponse=""; fs = require('fs');exec = require('child_process').exec; 
//filePath = './plugins/scribe/memoire/memoire.json'; // Chemin vers bases de mots.json
maConfig = config.modules.scribe; util = require('util');

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;

SCRIBE.activePlugin('traduction');

anglaisfrancais= function(nomchercher){

nomchercher = nomchercher.trim(); nomchercher =nomchercher.toLowerCase()
nomcherchercomplet='https://translate.google.com/?q='+nomchercher+'&sl=en&tl=fr#en/fr/'+nomchercher

console.log(nomcherchercomplet)
b='';x=0
url=nomcherchercomplet
request({ 'uri' : url, 'headers':{'Accept-Charset': 'utf-8'}, 'encoding':'binary' }, function(error, response, html){//ma fonction...});﻿
//request(nomcherchercomplet, function (error, response, html) {

    var $ = cheerio.load(html, { xmlMode: false, ignoreWhitespace: false, lowerCaseTags: false });
    //console.log(response)
 
$('div span:nth-child(1)').each(function(i, element){var a = $(this);
b=b+a.text();x=x+1
//console.log(a.text())
if (i==18){
c=(a.text().toLowerCase().split(' '));d=(nomchercher.toLowerCase().split(' '))
//c=c;d=d;
if (c[0]==d[0]){console.log('idemmmmmmmmmmmmmmmmmmmmmm');console.log('alerte  francais anglais');francaisanglais(nomchercher);callback({'tts' : " "});return false}
console.log('anglais francais')
console.log(i+a.text()) ;ScribeSpeak(a.text())
//SARAH.run('cortana', { 'reco' : 'Mathilde '+a.text()});callback({'tts' : " "});return false
//SARAH.run('cortana', { 'reco' : 'Mathilde '+nomchercher});
//callback({'tts' : " "});return false

callback({'tts' : " "});return false

}//fin if
})//fin each

         });//fin $

} //fin fnct anglaisfrancais

francaisanglais= function(nomchercher){

nomchercher = nomchercher.trim(); 
nomcherchercomplet='https://translate.google.com/?q='+nomchercher+'&sl=fr&tl=en#fr/en/'+nomchercher
//https://translate.google.fr/?hl=fr#fr/en/salut
console.log(nomcherchercomplet)
b='';x=0

request(nomcherchercomplet, function (error, response, html) {

    var $ = cheerio.load(html, { xmlMode: false, ignoreWhitespace: false, lowerCaseTags: false });
    //console.log(response)
 
$('div span:nth-child(1)').each(function(i, element){var a = $(this);
b=b+a.text();x=x+1

if (i==18){
c=(a.text().toLowerCase().split(' '));d=(nomchercher.toLowerCase().split(' '))
//c=c;d=d;
//if (c[0]==d[0]){console.log('idemmmmmmmmmmmmmmmmmmmmmm');francaisanglais(nomchercher);callback({'tts' : " "});return false}

console.log(i+a.text()) ;ScribeSpeak(a.text())

callback({'tts' : " "});return false

}//fin if
})//fin each

         });//fin $

} //fin fnct anglaisfrancais


anglaisfrancais(nomchercher)
}