var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;





exports.action = function(data, callback, config,SARAH){

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('planning mathilde');
path = require('path');
var request = require('request');
var cheerio = require('cheerio');
fs = require('fs')

function ask(question,i,objetaction) {
 ScribeAskMe(question, [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {
      if (phrase!=='undefined') {
        i=i+1
       console.log(i+phrase)
       //action=action.item.push(phrase)
   
    if(i==1){phrase=phrase.replace(new RegExp('[^0-9]', 'ig')," ").trim()
  
        if(phrase==""){i=0;question="l'heure de début' ?"
 ask(question,i,objetaction);return false}
  }//fin if 2   


if(i==4){
  if (phrase=='non'){

    console.log(objetaction);console.log(objetaction.information[1])

//////////on sauvegarde




filePath = path.resolve('%CD%', './plugins/planingmathilde/memoireplaning/'+objetaction.information[0]+'.json').replace('\\%CD%', '');
new_jsonStr = JSON.stringify(objetaction);
fs.writeFile(filePath,new_jsonStr ,'utf-8', function (err) {console.log("valeur rajoutée au json planing " + new_jsonStr)});               






    programmation(objetaction)
     return false
  }//fin non
   if (phrase=='oui'){i=2;planing(phrase,i,action)}
  //else {i=2;planing(phrase,i,action)}
else {i=3;planing(phrase,i,action)}
}//fin if 4
else{      objetaction.information.push(phrase)
       //action=action+phrase
       console.log(phrase)
       console.log(objetaction)
      planing(phrase,i,objetaction)
          }  //fin esle
      
      }//fin if !=='undefined'
      
      
    }//fin fnct answer
  );
}//fin fnct ask



function planing(phrase,i,action){console.log('rrrrrrrrrrrrr'+i)
if(i==0){
 console.log('essai '+ i)
 question="l'heure de début' ?"
 ask(question,i,action)
}//fin if

if(i==1){
 console.log('essai '+ i)
 question="le nom de l'action ?"
 ask(question,i,objetaction)
}//fin if

if(i==2){
 console.log('essai '+ i)
 question="quel action' ?"
 ask(question,i,objetaction)
}//fin if

if(i==3){
 console.log('essai '+ i)
 question="une autre action . oui ou non' ?"
 ask(question,i,objetaction)
}//fin if

return false

}//fin fnct planning


function programmation(objetaction){

//calcul du temps
reponse=objetaction.information[0];reponse=reponse.replace(" ","");console.log('la reponse est :' +reponse+' '+reponse.length)
if(reponse.length==1){tempsreveil=reponse*3600000;console.log('tepmsreveil '+tempsreveil)}// que heure//8h
if(reponse.length==2){tempsreveil=reponse*3600000;console.log('tepmsreveil '+tempsreveil)}  //que heure//18h
 
 if(reponse.length==3){temp=reponse[0]*3600000;
 tempsreveil=temp;//console.log(temp)
 temp=reponse-reponse[0]*100;//console.log(temp)
 temp=temp*60000;//console.log(temp)
 tempsreveil=tempsreveil+temp;console.log('tepmsreveil '+tempsreveil)} // 1 heure + 2 minutes//1h18
 
 if(reponse.length==4){temp=reponse[0]*36000000+reponse[1]*3600000
 tempsreveil=temp;//console.log(temp)
 temp=reponse-reponse[0]*1000;//console.log(temp)
 temp1=reponse[1]*100;//console.log('rr'+temp1)
 temp=temp-temp1;//console.log('r'+temp)
 temp=temp*60000;//console.log(temp)
 tempsreveil=tempsreveil+temp;console.log('tepmsreveil '+tempsreveil)}// 2 heure + 2 minutes 
//reponse1=(objetaction.information[1].replace(new RegExp('[^0-9]', 'ig')," ")).trim()
//si < ou > au temps demandé

ScribeSpeak('je programme '+objetaction.information[1]);
ScribeSpeak(" à "+objetaction.information[0].replace(" "," heure ,"))
//ScribeSpeak(" à "+reponse1)

tempadditionel=0//15 seconde entre chaque action
tempsdepart= objetaction.information[0]

// on récupére le temps en ms
date = new Date();heure =date.getHours()*3600000;minute =date.getMinutes()*60000;datemilli=heure+minute
console.log("ttttttttttttttttttt "+ heure +"      "+minute+"        "+datemilli+"    "+ tempsreveil)
//si  datemilli < tempsreveil  alors 24h00-datemilli  +   tempdepart 
if(datemilli<tempsreveil){tempadditionel=tempadditionel+(tempsreveil-datemilli)}
//si  datemilli > tempsreveil   alors tempsreveil - datemilli
if(datemilli>tempsreveil){tempadditionel=tempadditionel((24*3600000)-datemilli)+tempsreveil}


//appel du tiemout
 setTimeout(function(){ 
  ScribeSpeak("il est : " + objetaction.information[0].replace(" "," heure ") + " : tu m'avais demandé les actions suivante")
 callback({'tts' : " "});

//on efface le planing
//filePath = path.resolve('%CD%', './plugins/planingmathilde/planing.json').replace('\\%CD%', '');
var nircmd ='%CD%/plugins/infomathilde/nircmd/nircmd.exe'
var path = require('path');
var dir = path.resolve('%CD%', './plugins/').replace('\\%CD%', '');
//console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+dir)
var process=nircmd + ' filldelete "' + dir + '\\planingmathilde\\memoireplaning\\'+objetaction.information[0]+'.json"'﻿
var exec = require('child_process').exec;
                            
exec(process)




//new_jsonStr = JSON.stringify(objetaction);
//fs.writeFile(filePath,new_jsonStr ,'utf-8', function (err) {console.log("valeur rajoutée au json planing " + new_jsonStr)});

 return false
; }, tempadditionel+10000);//fin timeout


for(j=2;j<(objetaction.information).length;j++){
  objetaction1=objetaction.information[j];
  console.log('on appppellllll'+objetaction1)
  tempadditionel=tempadditionel+15000
console.log(tempadditionel)
 tim(objetaction1,tempadditionel)
}
return false
}//fin fnt programation




i=0
phrase=''
//action='{}'
//action='{ "item" : ' + query + " }"
action='{"information":[]}'
 objetaction = JSON.parse(action);
//action=''

planing(phrase,i,objetaction)
function tim(objetaction1,tempadditionel){
  setTimeout(function(){ 
 //tim(objetaction1)


  SARAH.run('cortana', { 'reco' : 'Mathilde '+objetaction1});
 callback({'tts' : " "});return false
  

; }, tempadditionel);//fin timeout
callback({'tts' : " "});return false
 }
}