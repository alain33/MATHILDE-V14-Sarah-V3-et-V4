
var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;


exports.action = function(data, callback, config, SARAH){
if (data.item != null) {
//exports.cron = function(callback, task){

fs = require('fs');exec = require('child_process').exec; path = require('path');


filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/lectureenfantmemoire/memoire.json').replace('\\%CD%', '');
//filePath = './plugins/lectureenfant/lectureenfantmemoire/memoire.json'; // Chemin vers bases de phrases.json
maConfig = config.modules.scribe; util = require('util');

  SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
  SCRIBE.activePlugin('lecture enfant');


lecture=fs.readFileSync(filePath)//{ //if (err){console.log('rien');return false}
	
	objet = JSON.parse(lecture); //longueur = objet.memo.length;
	 jsonStr = JSON.stringify(objet)
 //console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'+jsonStr)
 
 










x=objet.phrase[0]
y=JSON.stringify(x)
//console.log('rrrrrrrrrrrrrrrrrrr'+x)
x=x.toLowerCase();console.log(x)
//lo(x)
ask(x)
//})



function lo(x){
console.log(x+'rrrrrrrrrrrrrrr')
callback()
return false
}

function ask(x) {
 ScribeAskMe('répète '+x, [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {

    	//console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'+answer+phrase+match+wholeMatch)
   phrase=phrase.toLowerCase();//x11=x.toLowerCase();
//console.log('ttttttt'+phrase11)
//console.log('eeeeeee'+x11)
//match11=(x111.search(new RegExp("\\b" + phrase + "\\b","gi")))
  //console.log('on yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy est'+x111)   
      //if (phrase==x) {
//if(x.indexOf(petit)>-1){
if (phrase!==undefined){
      
        console.log('okkkkkkkkk');ontest(phrase,x)//;callback({'tts' : " "});
      }
     
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 0}
  );
//callback();return false
}//fin fnct ask


function ontest(phrase,x)
{

console.log('on test'+phrase)
console.log('on test'+x)

match11=(x.search(new RegExp("\\b" + phrase + "\\b","gi")))
console.log(match11)
if (match11==-1){ask(x);return false}

//on test mots/mots
b=(phrase.split(' '))
l=b.length
console.log(b+l)
c=(x.split(' '))
l1=c.length
console.log(c+l1)

suite=''
for (i=0 ; i<l ; i++){
console.log(b[i])

//for (j=0 ; j<l1 ; j++){
console.log(c[i])
//}
}
for(i=l; i<l1;i++){console.log(c[i]);suite=suite+' '+c[i]}
console.log(suite)
suite = suite.trim(); 
//callback({'tts' : " "});
x=suite
if (suite==''){callback({'tts' : " terminé"});;return false}
ask(x)
}//fin fnt ontest
}//fin if

}