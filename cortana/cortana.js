var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;



exports.action = function(data, callback, config,SARAH){

reponse=""; fs = require('fs');exec = require('child_process').exec; path = require('path');

filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/memoire/memoire.json').replace('\\%CD%', '');
//filePath = './plugins/scribe/memoire/memoire.json'; // Chemin vers bases de mots.json

maConfig = config.modules.scribe; util = require('util');

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;

SCRIBE.activePlugin('cortana');


//////////////////////////////////////////////////
///////////////////////////////////////////////////


//function PluginActif(){ 
  try{
  if ( data.reco.search("Mathilde") >-1){
 
reco=data.reco.replace(new RegExp("\\b" + "Mathilde " + "\\b","gi"),"");
 
console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

query=reco;console.log('phrase recu '+query);
////////////////////////////////  

// je json d'apprentissage
function Mémoire(query){


fs.readFile(filePath,'utf-8', function(err, data1) {console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') 
 objet = JSON.parse(data1); data1Obj = '{ "item" : ' + query + " }";
 longueur = objet.courses.length; jsonStr = JSON.stringify(objet);
console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
if (jsonStr.indexOf(query) > -1  )
  {
console.log('je connais')
    emulate(query);callback({'tts' : " "});
// on envoie au plug recuperé dans le json pour reponse
}// fin on connais le data.q

//et si on connais pas que faire ?
else {console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
objet.courses.push({item: query}); new_jsonStr = JSON.stringify(objet);
fs.writeFile(filePath,new_jsonStr ,'utf-8', function (err) {  console.log("valeur rajoutée au json cortana " + query); callback({'tts' : " "});
emulate(query);callback({'tts' : " "});
});               

     }//fin else

})////fin fsread

}//fin fnct memoire


//on connais la phrase qui est dans un plugin si non => skynet
function emulate(query){
//lis le nom des plugins

data5=fs.readFileSync('./plugins/demarrage/item/plugins.json','utf8').toString();
  objet5 = JSON.parse(data5);  longueur5 = objet5.nompluguine.length 
/////////////////////////
names = query;nameList = names.split(" ");
console.log('on vérifie en 1 si '+names+' existe')
console.log(nameList)
//console.log('sa serais bien de verifier'+reponse3)
longueur1=(nameList.length)
//on lis la liste des phrases(item)
for (g=0;g<longueur5;g++){
data=fs.readFileSync('./plugins/demarrage/item/'+objet5.nompluguine[g] +'item.json','utf8').toString(); 
objet = JSON.parse(data);jsonStr = JSON.stringify(objet)
longueur = objet.nompluguine.length;
for (i=0 ; i<longueur ; i++){
// on sort tous les mots
nameListe = objet.nompluguine[i].toLowerCase().split(" ");
longueur2=(nameListe.length)
//
if (longueur2==longueur1)
{
//if ((condition1)&&(condition2))
for (j=0; j<longueur2 ; j++){
console.log('*'+nameList[j]+'*    *'+nameListe[j]+'*   *'+nameListe)
//on test 1 par 1
 if ((nameList[j].toLowerCase().indexOf(nameListe[j].toLowerCase())>-1)&&(nameList[j].length==nameListe[j].length)){
//if (nameList[j].search(new RegExp("\\b" + nameListe[j] + "\\b","gi"))>-1){
  //console.log('debut de reco')
  if (j==longueur2-1){
if(nameList[j].length==nameListe[j].length){console.log('          '+nameList[j].length+'           '+nameListe[j].length)
  nomduplug=objet5.nompluguine[g]
    console.log('apppppppel a'+objet5.nompluguine[g]); emulate1(query,nomduplug);/////fin
    callback({'tts' : " "})
    return false}}
}
else { j=longueur2}
}//fin for
}//fin if longueur
}//fin for
}//fin for g
console.log('pas de reco dans mes xml je test en direct avec emul')

// on test si un plug s'active
function xmlinconnu(query){
  try{
filePathcontent1 = path.resolve('%CD%', './custom.ini').replace('\\%CD%', '');
content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).common.name;console.log('enfin le nom : '+nomappel)
}
catch (Exception) {
filePathcontent1 = path.resolve('%CD%', './client/custom.ini').replace('\\%CD%', '');
content = fs.readFileSync(filePathcontent1,'utf8');ini = require('./ini/ini');fs = require('fs')
nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).bot.name;console.log('enfin le nom : '+nomappel)
  }
 //on prends la date
var date = new Date();
heures=date.getHours();minutes=date.getMinutes();secondes=date.getSeconds();year=date.getFullYear();month=(date.getMonth())+1;day=date.getDate()
if((month)<10){month='0'+month};if((day)<10){day='0'+day};if((heures)<10){heures='0'+heures}
if((minutes)<10){minutes='0'+minutes};secondes=(secondes);if((secondes)<10){secondes='0'+secondes}
ladate=year+'-'+month+'-'+day;letemps='['+heures+':'+minutes+':'+secondes;console.log(ladate);console.log(letemps)

// on emul pour voir

url1 = 'http://127.0.0.1:8888/?emulate='+nomappel+' '+query;console.log('on test'+url1)
request = require('request');
function emulation(ladate,letemps) {
request({ url : url1 }, function (err, response, body){



//on attends l'ecriture du log
  fs=require('fs')
  try{
filePathfichier = path.resolve('%CD%', './bin/'+ladate+'.log').replace('\\%CD%', '');fichier=fs.readFileSync(filePathfichier,'utf-8')
}
catch (Exception) {
filePathfichier = path.resolve('%CD%', './client/AddOns/debug/'+ladate+'.log').replace('\\%CD%', '');fichier=fs.readFileSync(filePathfichier,'utf-8')
}
longuerstring=fichier.length;console.log(longuerstring);str = fichier;toSearch=letemps;console.log(letemps)

lo='';pos=str.indexOf(toSearch)
  if(pos==-1){Skynet(query);return false}
  lon=str.length
    for( i = pos; i < lon ; i++) {
        lo=lo+str[i]
    };//fin for i
    console.log(pos);console.log(lon);console.log('rrrrrrrrr')
    if(lo.indexOf('Build')>-1){console.log('trouver');callback({'tts' : " "});return false}; 
  console.log('pas d émulation trouvé')
  Skynet(query)

});//fin request
}//fin emulation
emulation(ladate,letemps)
}//fin fnct xmlinconnu
xmlinconnu(query)//appel fnct xmlinconnu
//a1()
//a3()

// fin du test
//Skynet(query)
}//fin fnct emulate

//on connais la phrase recu==phrase d'un plug
function emulate1(query,nomduplug){
//http://127.0.0.1:8888?emulate=SARAH+quelle+heure+est+il
// le nom reel de sarah
try{
filePathcontent1 = path.resolve('%CD%', './custom.ini').replace('\\%CD%', '');
content = fs.readFileSync(filePathcontent1,'utf8');
ini = require('./ini/ini');
fs = require('fs')
nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).common.name;
}
catch (Exception) {
filePathcontent1 = path.resolve('%CD%', './client/custom.ini').replace('\\%CD%', '');
content = fs.readFileSync(filePathcontent1,'utf8');
ini = require('./ini/ini');
fs = require('fs')
nomappel = ini.parse(fs.readFileSync(filePathcontent1, 'utf-8')).bot.name;
}
console.log('enfin le nom : '+nomappel)
//fin nom reel de sarah
 url1 = 'http://127.0.0.1:8888/?emulate='+nomappel+' '+query;
setTimeout(function(){ 
  //url1 = 'http://127.0.0.1:8888/?emulate=Sarah '+query;
console.log(url1)
   request = require('request');

request({ url : url1 }, function (err, response, body){
ScribeSpeak("Pluguine "+nomduplug);callback({'tts' : " "});return false
});//fin request
return false
; }, 1000);//fin timeout
}//fin emulate1



// on vérifie les mots cles(creer un fichier prop ou txt)
function Skynet(query) {

 query1=query.replace(new RegExp("\\b" + "de" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "des" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "la" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "les" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "le" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "l'" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "au" + "\\b","gi"),"");
//var query1=query1.replace(new RegExp("\\b" + "à" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "du" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "aux" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "un" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "une" + "\\b","gi"),"");
 query1=query1.replace(new RegExp("\\b" + "d'" + "\\b","gi"),"");
console.log('le query1 '+query1);
console.log("- - - - - - - - - -- - - - - - - - -- - - - - - - --  -- - -- - - "+query+'  '+query1)
if (query.search("traduction") >-1){
  query22 = query.search("traduction");//console.log('query22'+query22);
  query23 = query.length;console.log('query23'+query23);
  for (i = (query22+10); i < query23 ;i++){reponse=reponse+(query[i]);//console.log('reponse'+reponse);
  }

SARAH.run('traduction', { 'chercher' : reponse});callback({'tts' : " "});return false
  }






if (query1.search("synonymes") >-1){
  query22 = query1.search("synonymes");//console.log('query22'+query22);
  query23 = query1.length;console.log('query23'+query23);
  for (i = (query22+9); i < query23 ;i++){reponse=reponse+(query1[i]);//console.log('reponse'+reponse);
  }

SARAH.run('cyrano', { 'chercher' : reponse});callback({'tts' : " "});return false
  }

if (query1.search("synonyme") >-1){
  query22 = query1.search("synonyme");//console.log('query22'+query22);
  query23 = query1.length;console.log('query23'+query23);
  for (i = (query22+8); i < query23 ;i++){reponse=reponse+(query1[i]);//console.log('reponse'+reponse);
  }

SARAH.run('cyrano', { 'chercher' : reponse});callback({'tts' : " "});return false
  }


if (query1.search("vidéos") >-1){
  query22 = query1.search("vidéos");
  query23 = query1.length;
  for (i = (query22+6); i < query23 ;i++){reponse=reponse+(query1[i]);}

   process1 = '%CD%/plugins/cortana/bin/searchyoutube.vbs ' + reponse ; exec(process1);return false
callback({'tts' : " "}); 
}

if (query1.search("vidéo") >-1){
  query22 = query1.search("vidéo");
  query23 = query1.length;
  for (i = (query22+5); i < query23 ;i++){reponse=reponse+(query1[i]);}

   process1 = '%CD%/plugins/cortana/bin/searchyoutube.vbs ' + reponse ; exec(process1);return false
callback({'tts' : " "}); 
}


if (query1.search("images") >-1){ 
  query22 = query1.search("images");
  query23 = query1.length;
  for (i = (query22+6); i < query23 ;i++){reponse=reponse+(query1[i]);}
process1 = '%CD%/plugins/cortana/bin/searchimages.vbs ' + reponse ; exec(process1);return false
//;callback({'tts' : " "})
}

if (query1.search("image") >-1){ 
  query22 = query1.search("image");
  query23 = query1.length;
  for (i = (query22+5); i < query23 ;i++){reponse=reponse+(query1[i]);}
process1 = '%CD%/plugins/cortana/bin/searchimages.vbs ' + reponse ; exec(process1);return false
//;callback({'tts' : " "})
}


if (query1.search("courses") >-1){
  query22 = query1.search("courses");
  query23 = query1.length;
  for (i = (query22+8); i < query23 ;i++){reponse=reponse+(query1[i]);}
//var answer1 = 'Voici le raisultat de votre recherche sur ' + reponse ;
 if (reponse==""){reponse="false"}
 SARAH.run('coursesmathilde', { 'item' : reponse});callback({'tts' : " "});return false
  }


if (query1.search("mémo") >-1){
  query22 = query1.search("mémo");
  query23 = query1.length;
  for (i = (query22+4); i < query23 ;i++){reponse=reponse+(query1[i]);}
//var answer1 = 'Voici le raisultat de votre recherche sur ' + reponse ;
 if (reponse==""){reponse="false"}
  console.log('la reponse envoyer à memo'+reponse)
 SARAH.run('memo', { 'phrasememo' : reponse});callback({'tts' : " "});return false
  }


if (query1.search("météo") >-1){
  query22 = query1.search("météo");
  query23 = query1.length;
  for (i = (query22); i < query23 ;i++){reponse=reponse+(query1[i]);}
//var answer1 = 'Voici le raisultat de votre recherche sur ' + reponse ;
 if (reponse==""){reponse="false"}
 SARAH.run('meteomathilde', { 'ask' : reponse});callback({'tts' : " "});return false
  }


if (query1.search("horoscope") >-1){
  query22 = query1.search("horoscope");
  query23 = query1.length;
  for (i = (query22); i < query23 ;i++){reponse=reponse+(query1[i]);}
//var answer1 = 'Voici le raisultat de votre recherche sur ' + reponse ;
 if (reponse==""){reponse="false"}
  console.log('horrrrrrrrrrroqcope')
 SARAH.run('horoscopemathilde', { 'phrasehoroscope' : query});callback({'tts' : " "});return false
  }





if (query1.search("réveil") >-1){
  query22 = query1.search("réveil");
  query23 = query1.length;
  for (i = (query22+4); i < query23 ;i++){reponse=reponse+(query1[i]);}
//var answer1 = 'Voici le raisultat de votre recherche sur ' + reponse ;
 ///if (reponse===""){reponse="false"}
  
//var patt = new RegExp;

 reponse=reponse.replace(new RegExp('[^0-9]', 'ig'),"")
 if(reponse==""){
  var date = new Date();
  var heure =date.getHours();
  var minute =date.getMinutes();
reponse=heure+''+minute
query=heure+' '+minute
//console.log(heure+' '+minute)
console.log(reponse)
  console.log('immédiat');
  //callback({'tts' : " "});
  //return false
 }//fin if reponse=''
 // protection 24 heure et 59 minutes !!!

if(reponse.length==1){tempsreveil=reponse*3600000}// que heure//8h
if(reponse.length==2){tempsreveil=reponse*3600000}  //que heure//18h
 
 if(reponse.length==3){temp=reponse[0]*3600000;
 tempsreveil=temp;//console.log(temp)
 temp=reponse-reponse[0]*100;//console.log(temp)
 temp=temp*60000;//console.log(temp)
 tempsreveil=tempsreveil+temp} // 1 heure + 2 minutes//1h18
 
 if(reponse.length==4){temp=reponse[0]*36000000+reponse[1]*3600000
 tempsreveil=temp;//console.log(temp)
 temp=reponse-reponse[0]*1000;//console.log(temp)
 temp1=reponse[1]*100;//console.log('rr'+temp1)
 temp=temp-temp1;//console.log('r'+temp)
 temp=temp*60000;//console.log(temp)
 tempsreveil=tempsreveil+temp}// 2 heure + 2 minutes  

reponse1=query
reponse1=(reponse1.replace(new RegExp('[^0-9]', 'ig')," ")).trim()

 console.log('la reponse envoyer à révéil1  '+reponse1+' '+tempsreveil)
ScribeSpeak("réveil programmé à "+reponse1.replace(" "," heure "))
 SARAH.run('reveil1', { 'tempsreveil' : tempsreveil , 'tempsreveilname' : reponse1});callback({'tts' : " "});return false
  }



if(reponse==""){console.log('***************************riennnnnnnnnnnnnn')
  //ask(query)
  match3(query)
  reponse="eee"

}


if(reponse=="") {emulate(query)}





}//fin funtion Skynet

function ask(query) {
 ScribeAskMe("Que recherche tu", [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {
      if (phrase!=='undefined') {
        
        msg = phrase;
      
        Match(query,msg)
      }
      else if (answer==false) {
        ScribeSpeak("Je ne suis pas sûr que tu aies répondu à ma question !", function () {
          ask(query);
        });
      }
      else ScribeSpeak("Tu n'as rien répondu. Tant pis.");//console.log(answer+phrase+match+wholeMatch);
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 2}
  );
}//fin fnct ask





function Match1(query,msg,reponse2){

names = reponse2;nameList = names.split(" ");

longueur1=(nameList.length)


//on lis le fihier phrase
filePathphrasescles = path.resolve('%CD%', './plugins/mémoiredemathilde/phrasescles/phrasescles.json').replace('\\%CD%', '');
fs.readFile(filePathphrasescles, function(err,data){
//fs.readFile('./plugins/cortana/phrasescles/phrasescles.json', function(err,data){
objet = JSON.parse(data);jsonStr = JSON.stringify(objet);
longueur = objet.phrasescles.length;
for (i=0 ; i<longueur ; i++){

// on sort tous les mots
nameListe = objet.phrasescles[i].split(" ");
longueur2=(nameListe.length)

if (longueur2==longueur1)
{

for (j=0; j<longueur2-1 ; j++){


if (nameList[j].search(new RegExp("\\b" + nameListe[j] + "\\b","gi"))>-1){
  console.log(nameListe[j]);
if (j==longueur2-2){
  
  SARAH.run('wiki', { 'phrase' : msg});callback({'tts' : " "})

  return false}
else {

}}


else { j=longueur2;//console.log('rien de rien')









}//fin else
}//fin for


}//fin if longueur


}//fin for
if (reponse2!==""){
// la premiere partis de la phrase
objet.phrasescles.push(reponse2); new_jsonStr = JSON.stringify(objet);

filePathphrasescles1 = path.resolve('%CD%', './plugins/mémoiredemathilde/phrasescles/phrasescles.json').replace('\\%CD%', '');
 fs.writeFile(filePathphrasescles1,new_jsonStr, function (err) {
 //fs.writeFile('./plugins/cortana/phrasescles/phrasescles.json',new_jsonStr, function (err) {
 console.log("valeur rajoutée au json phrasescles " + reponse2); callback({'tts' : " "});
//la 2eme partie de la phrase
//objet.phrasescles.push(reponse3); new_jsonStr = JSON.stringify(objet);
 //fs.writeFile('./plugins/cortana/phrasescles/phrasescles.json',new_jsonStr, function (err) {
 //console.log("valeur rajoutée au json phrasescles " +reponse3); callback({'tts' : " "});})


///on re test la réponse pour voir si un plug existe



//lis le nom des plugins
data5=fs.readFileSync('./plugins/demarrage/item/plugins.json','utf8').toString();
  objet5 = JSON.parse(data5);  longueur5 = objet5.nompluguine.length 

names = reponse3;nameList = names.split(" ");
console.log('on vérifie la présence de cela : '+reponse3+' dans les plug')
longueur1=(nameList.length)

//on lis la liste des phrases(item)
for (g=0;g<longueur5;g++){
data=fs.readFileSync('./plugins/demarrage/item/'+objet5.nompluguine[g] +'item.json','utf8').toString(); 
objet = JSON.parse(data);jsonStr = JSON.stringify(objet)
longueur = objet.nompluguine.length;

for (i=0 ; i<longueur ; i++){
// on sort tous les mots
nameListe = objet.nompluguine[i].split(" ");
nomduplug=objet5.nompluguine[g]
longueur2=(nameListe.length)
//
if (longueur2==longueur1)
{
for (j=0; j<longueur2 ; j++){
//on test 1 par 1
if (nameList[j].search(new RegExp("\\b" + nameListe[j] + "\\b","gi"))>-1){
  
  if (j==longueur2-1){console.log('on as trouver'+reponse3) ;

  emulate1(reponse3,nomduplug);
    callback({'tts' : " "})
    return false}}
else { j=longueur2}
}//fin for

}//fin if longueur

}//fin for

}//fin for g
console.log('pas de reco de '+msg+' dans les plugs')
//Skynet(query)












/// fin du 2 eme test
 SARAH.run('wiki', { 'phrase' : msg});callback({'tts' : " "})

 })//fin fs write
}//fin if pas
})//fin fs readFile

}//fin fnct Match





function Match(query,msg){
reponse=msg;reponse2='';reponse3=''




match=query.search(new RegExp("\\b" + reponse + "\\b","gi"));console.log(match);
if(match<0){reponse=reponse.toLowerCase();query=query.toLowerCase();match=query.search(new RegExp("\\b" + reponse + "\\b","gi"));console.log('la réponse'+reponse+query)}

if(match<0){reponse=reponse.toUpperCase();match=query.search(new RegExp("\\b" + reponse + "\\b","gi"));console.log('la 2eme reponse'+reponse)}
//.toLowerCase();
if(match>-1){
console.log('on a matché en 1')

reponselength=(reponse.length)
querylength=(query.length)



for (i=0;i<match;i++){reponse2=reponse2+query[i]}
for (i=match;i<querylength;i++){reponse3=reponse3+query[i]}

console.log('on a matché en 2 '+query+' '+' '+msg+' '+reponse2)

ScribeSpeak(msg, function() {Match1(query,msg,reponse2);callback({'tts' : " "});
return false
  });
       
}
else{
ScribeSpeak('la phrase ne correspond pas, je sort')
}

}//fin fnct Match1




//on connais une phrase clés=> internet si non =>on questionnne
function match3(query){

filePathrea = path.resolve('%CD%', './plugins/mémoiredemathilde/phrasescles/phrasescles.json').replace('\\%CD%', '');
fs.readFile(filePathrea, function(err,data){
//fs.readFile('./plugins/cortana/phrasescles/phrasescles.json', function(err,data){

objet = JSON.parse(data);jsonStr = JSON.stringify(objet)//;console.log('obbbbbbbbbjet'+objet)
longueur = objet.phrasescles.length;
for (j=0; j<longueur;j++){
if (query.search(new RegExp("\\b" + objet.phrasescles[j] + "\\b","gi"))==0){
longueurphrase=(objet.phrasescles[j]).length
console.log('                 phrase connu : '+objet.phrasescles[j])
console.log ('on part de : '+query.search(new RegExp("\\b" + objet.phrasescles[j] + "\\b","gi"))+longueurphrase)
pointdepart=query.search(new RegExp("\\b" + objet.phrasescles[j] + "\\b","gi"))
console.log('et la longueur : '+query.length)
motsplugin=''
for(dd=longueurphrase; dd<(query.length);dd++){motsplugin=motsplugin+query[dd]}
  console.log('                        la recherche'+motsplugin)




// on retest

//lis le nom des plugins
//filePath = path.resolve('%CD%', './mémoiredemathilde/memomemoire/memo.json').replace('\\%CD%', '');
data5=fs.readFileSync('./plugins/demarrage/item/plugins.json','utf8').toString();
//data5=fs.readFileSync('./plugins/demarrage/item/plugins.json','utf8').toString();
  objet5 = JSON.parse(data5);  longueur5 = objet5.nompluguine.length 

names = motsplugin.toLowerCase();nameList = names.split(" ");
console.log('on vérifie la présence de : '+names+' dans les plug')

console.log(motsplugin)
longueur1=(nameList.length)

//on lis la liste des phrases(item)
for (g=0;g<longueur5;g++){
data=fs.readFileSync('./plugins/demarrage/item/'+objet5.nompluguine[g] +'item.json','utf8').toString(); 
objet = JSON.parse(data);jsonStr = JSON.stringify(objet)

longueur = objet.nompluguine.length;

for (i=0 ; i<longueur ; i++){
// on sort tous les mots
nameListe = objet.nompluguine[i].split(" ");nomduplug=objet5.nompluguine[g]

longueur2=(nameListe.length)
//
if (longueur2==longueur1)
{
for (j=0; j<longueur2 ; j++){console.log('*'+nameListe[j]+'*')
//on test 1 par 1
nameListe[j]=nameListe[j].toLowerCase()
//if (nameList[j].search(new RegExp("\\b" + nameListe[j] + "\\b","gi"))>-1){
  if(nameList[j].search(nameListe[j])>-1){
  if (j==longueur2-1){console.log('trouverrrrrrrrrrrrrrrrrr'); emulate1(motsplugin,nomduplug);callback({'tts' : " "})

    
    return false}}
else { j=longueur2}
}//fin for

}//fin if longueur

}//fin for

}//fin for g
console.log('pas de reco de '+motsplugin+' dans les plugs')
//Skynet(query)

/// fin du 2 eme test

//fin retest



var queryinternet= query.substring(longueurphrase,query.length); 

SARAH.run('wiki', { 'phrase' : queryinternet});callback({'tts' : " "})

return false
}//fin if
}//fin for
ask(query)
})//fin fs read

}//fin fnct query3




//c'est la que l'on commence
Mémoire(query);
  }



}//fin try

  catch (Exception) {}









 callback({'tts' : " "});


  
}//fin export
