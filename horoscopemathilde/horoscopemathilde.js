var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;

exports.action = function(data, callback, config,SARAH){

phrasehoroscope=data.phrasehoroscope.toLowerCase()
console.log('on a recu '+phrasehoroscope)
SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('horoscope mathilde');
config = config.modules.horoscopemathilde;
signe = config.signe.toLowerCase();//default

function signes(phrasehoroscope,signe){
if (phrasehoroscope.search('cancer')>-1){signe='cancer'}
if (phrasehoroscope.search('lion')>-1){signe='lion'}
 if (phrasehoroscope.search('scorpion')>-1){signe='scorpion'}
if (phrasehoroscope.search('balance')>-1){signe='balance'}
if (phrasehoroscope.search('poisson')>-1){signe='poissons'}
if (phrasehoroscope.search('vierge')>-1){signe='vierge'}
 if (phrasehoroscope.search('bélier')>-1){signe='belier'}
 if (phrasehoroscope.search('taureau')>-1){signe='taureau'}
if (phrasehoroscope.search('gémeaux')>-1){signe='gemeaux'}
 if (phrasehoroscope.search('sagittaire')>-1){signe='sagittaire'}
if (phrasehoroscope.search('capricorne')>-1){signe='capricorne'}
if (phrasehoroscope.search('verseau')>-1){signe='verseau'}

scrap(signe)
}



function scrap(signe){

console.log(signe)
request = require('request'); cheerio = require('cheerio');

var url = 'http://www.horoscope-gratuit.org/horoscope-'+signe+'.php';
 
   request({ 'uri' : url , 'headers':{'Accept-Charset': 'utf-8'}, 'encoding':'binary' }, function (err, response, body){
   
 $ = require('cheerio').load(body, { xmlMode: true, ignoreWhitespace: false, lowerCaseTags: false });
    

  a= $('div:nth-child(1)').text();
b=''

for(i=a.search(':')+2;i<a.length;i++){b=b+a[i]}
//console.log(b) 
ScribeSpeak('pour les '+signe+' ; '+b)

callback({'tts' : " "});
return false

})//fin request


}//fin fnct scrap

signes(phrasehoroscope,signe)

}    
