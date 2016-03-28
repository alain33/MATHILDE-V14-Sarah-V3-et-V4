var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;




exports.action = function(data, callback, config, SARAH) {
maConfig = config.modules.scribe; util = require('util');

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;

SCRIBE.activePlugin('memo');
fs = require('fs');
 path = require('path');

 filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memomemoire/memo.json').replace('\\%CD%', '');


//filePath = './plugins/memo/memomemoire/memo.json'
//nommemo='voikttre'
//phrasememo='acheter une roue pour'
phrasememo=data.phrasememo
console.log('phrase recu en mémo : '+phrasememo)
//memo='{"memo":[]}',"UTF-8"
//filePath = 'c:/'+ nommemo +'.json'


filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memomemoire/memo.json').replace('\\%CD%', '');


//filePath = './plugins/memo/memomemoire/memo.json' 
//filePath ='c:/le chat botté.doc'
//console.log('mémoriser : '+nommemo+" "+phrasememo+" "+memo)
//file.CreateTextFile("c:\\testfile.txt", true);

function lecture(filePath){
  filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memomemoire/memo.json').replace('\\%CD%', '');
 //filePath = './plugins/memo/memomemoire/memo.json'
	fs.readFile(filePath, function(err, data) { if (err){console.log('rien');ScribeSpeak('pas de mémo');return false}
	//console.log(data)
	objet = JSON.parse(data); longueur = objet.memo.length; jsonStr = JSON.stringify(objet)
	//console.log(objet.memo+longueur+jsonStr)
	ScribeSpeak(longueur+' mémo. '+(objet.memo))
	})//fin read file
}//fin fnct lecture
//if (jsonStr.indexOf(nommemo) > -1  ){}// fin on connais le data.q

function ecriture(filePath ,phrasememo){
filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memomemoire/memo.json').replace('\\%CD%', '');	
//filePath = './plugins/memo/memomemoire/memo.json'
	fs.readFile(filePath, function(err, data) { //if (err){console.log('rien');return false}
	
	objet = JSON.parse(data); //longueur = objet.memo.length;
	 jsonStr = JSON.stringify(objet)
	//console.log(objet.memo)
	//ScribeSpeak(jsonStr)
	
//console.log(phrasememo)



	//objet1 = JSON.parse(phrasememo);console.log('1')
	 objet.memo.push(phrasememo); data1 = JSON.stringify(objet); 
	//console.log(phrasememo+objet1+data1)
	fs.writeFile(filePath,data1 , function (err) {  console.log("mémo enregistrer " + phrasememo)
      ScribeSpeak('je mémorise '+phrasememo)
    callback(); return false
})//fin write file               

})//fin read file


}//fin fnct ecritue



function ask(question, filePath) {
 ScribeAskMe(question, [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {//data1='{"wiki":[]}'
      //if (phrase!=='undefined') {console.log(phrase+'tttttttttttttttttttttttt')
        if (phrase=='lire les mémo') {console.log('onnn lisssssss'); lecture(filePath);callback();return false}
        if (phrase=='écrire un mémo') {console.log('onnn ecoute'); question="j'enregistre";ask(question,filePath);callback();return false}
        if ((phrase=='effacer les mémos')||(phrase=='efface les mémo')) {console.log('on efface tout');
        fs.writeFile(filePath,'{"memo":[]}' , function (err) {  console.log("mémo effacer ");ScribeSpeak('mémo effacer')});callback();return false
    				}//fin if
        
      else { ecriture(filePath ,phrase)
      	//(answer==false) {//console.log(1+answer+2+phrase+3+match+4+wholeMatch);
        //ScribeSpeak("Je ne suis pas sûr que tu aies répondu à ma question !", function () {
          //ask(query);
        //});
      }
     // else ScribeSpeak("Tu n'as rien répondu. Tant pis.");//console.log(answer+phrase+match+wholeMatch);
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 2}
  );
}//fin fnct ask
question="veux tu , lire les mémo, ou, écrire un mémo, ou, effacer les mémo ?"
ask(question,filePath)
//Mémoire(memo,phrasememo,nommemo,filePath)



}