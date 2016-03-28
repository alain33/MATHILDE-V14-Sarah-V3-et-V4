
var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;


exports.action = function(data, callback, config, SARAH) {
maConfig = config.modules.scribe

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('Wikipédia');
//var filePath = './plugins/wiki/wikimemoire/'; // Chemin vers bases de mots.json


phrase=data.phrase
phrase='recherche '+phrase+' sur Wikipédia'
console.log('ondoit recherche'+phrase)
request = require('request');
j=1;k=0;




req = function(url){ 

	request({ 'uri' : url, encoding: 'utf-8'}, function (err, response, body){

  	
 if (err || response.statusCode != 200) {console.log(err)
  //return callback({'tts': "Action échouée"})
   ScribeSpeak('rien dans ma base de données'); //
    process1 = '%CD%/plugins/cortana/bin/search.vbs ' + search;exec(process1);
  

var request = require('request');
var cheerio = require('../modules/cheerio');

//request('https://www.google.fr/search?hl=fr&q=le+num%C3%A9ro+de+t%C3%A9l%C3%A9phone+de+l%27h%C3%B4pital+de+Castelnaudary&gws_rd=ssl', function (error, response, html) {
//try {request('https://www.google.fr/search?hl=fr&q='+search, function (error, response, html) {
  //  var $ = cheerio.load(html);
 
//$('span:nth-child(1)._tA').each(function(i, element){var a = $(this);

//console.log('blabla : '+a.text())  
//})


  //       });
//}
//catch (Exception) {
//if (a.text()=='null'){process1 = '%CD%/plugins/cortana/bin/search.vbs ' + search;exec(process1);}
//}

















  return false
} // fin if err

 $ = require('../modules/cheerio').load(body, { xmlMode: true, ignoreWhitespace: true, lowerCaseTags: true }); 
  	
  	//  SCRAPING
requeste=function(){

  try {paragaphe1=$('#mw-content-text > p:nth-child(1)').text();
//  console.log('paraph1'+paragaphe1)
}
  catch (Exception) {
    //console.log("erreur dans la recherche");

}
   try {paragaphe2=$('#mw-content-text > p:nth-child(2)').text();
  // console.log('paraph2'+paragaphe2)
 }
   catch (Exception) {
    //console.log("erreur dans la recherche");
  
 }
    try {paragaphe3=$('#mw-content-text > p:nth-child(3)').text();
    //console.log('paraph3'+paragaphe3)
  }
    catch (Exception) {
      //console.log("erreur dans la recherche");
   

  }
      try {paragaphe4=$('#mw-content-text > p:nth-child(4)').text();
      //console.log('paraph4'+paragaphe4)
    }
      catch (Exception) {
        //console.log("erreur dans la recherche");
      
    }
 try {paragaphe6=$('#mw-content-text > p:nth-child(5)').text();
      //console.log('paraph4'+paragaphe4)
    }
      catch (Exception) {
        //console.log("erreur dans la recherche");
      
    }

//console.log(paragaphe1.length);console.log(paragaphe2.length);console.log(paragaphe3.length);console.log(paragaphe4.length);

mafonction1();


 tempestString = paragaphe4;espace = " ";
//splitString(tempestString, espace);
 }//fin fnct requeste
 requeste();

})//fin request url

}// fin function req



mafonction1=function(){paragaphe5=paragaphe1.length+paragaphe2.length+paragaphe3.length+paragaphe4.length+paragaphe6.length
  if (paragaphe5==0){
    ScribeSpeak('rien dans ma base de données');  process1 = '%CD%/plugins/cortana/bin/search.vbs ' + search;exec(process1)
  }//fin if
else{ ScribeSpeak(paragaphe1+" "+paragaphe2+" "+paragaphe3+" "+paragaphe4+" "+paragaphe6,true) }
WikiMemoire(search);
} //fin mafnct1
//callback();


function WikiMemoire(search){
var path = require('path');
var dir = path.resolve('%CD%', './plugins/mémoiredemathilde/wikimemoire/'+search+'.json').replace('\\%CD%', '');
//pathname = './plugins/wiki/wikimemoire/'+ search +'.json'
pathname = dir

data1='{"wiki":[]}'
var fs = require('fs');


objet1 = JSON.parse(data1); jsonStr1 = JSON.stringify(objet1);

objet1.wiki.push(paragaphe1+paragaphe2+paragaphe3+paragaphe4+paragaphe6); data2 = JSON.stringify(objet1); 

fs.writeFile(pathname, data2, function (err) { // ecrit dans le fichier courses l'objet + la nouvelle valeur
if (err) throw err;})

}//fin wikimemoire



function TestPhrase(search,url){

var fs = require('fs'); path = require('path');
var path = require('path');


query=search
var path = path.resolve('%CD%', './plugins/mémoiredemathilde/wikimemoire/').replace('\\%CD%', '');
  //var path = './plugins/wiki/wikimemoire';

fs.readdir(path, function (err, files) {
  longueurdir=files.length;  //console.log(longueurdir)
  //console.log(files[5]);
  read(files,path,query,longueurdir)
})//fin fs read

function read(files,path,query,longueurdir){//console.log('rrrrrrrrrrrrrrrrrrrr'+longueurdir)
  if(longueurdir==0){req(url);return false}
  //datamatche='{"datamatch":[]}'
vocalise='';compte=0

datascrap='{"information":[]}'
 objetscrap = JSON.parse(datascrap);
 longueurscrap = objetscrap.information.length

for(i=0;i<longueurdir;i++){

//console.log('rrrrrrrrr'+path+'/'+files[i])
//data5=fs.readFileSync('C:/Users/Administrateur/sarah/plugins/demarrage/item/plugins.json','utf8').toString();
//data5=fs.readFileSync(path+'/'+files[i],'utf8').toString();console.log(data5)
//fs.readFile(path+'/'+files[i], function(err, data1) { // je json d'apprentissage
data1=fs.readFileSync(path+'/'+files[i]).toString();//console.log(path+'/'+files[i])
 objet = JSON.parse(data1); //data1Obj = '{ "item" : ' + query + " }";
//objet=data1
 //longueur = objet.wiki.length;
  jsonStr = JSON.stringify(objet);

if (jsonStr.search(new RegExp("\\b" + query + "\\b","gi"))>-1)

//if (jsonStr.indexOf('1956') > -1  )// si on connais le data.q
//{SARAH.speak ("je connais ");
{console.log('cela fait rapport à '+query);//ScribeSpeak('cela fait rapport à '+files[i]+', , , ',true)
//vocalise=vocalise+query
objetmatch = JSON.parse(datamatche); jsonStrmatch = JSON.stringify(objetmatch);//dataconnus = JSON.stringify(objetmatch);//console.log('la mémoire'+objetmatch.objetmatch)
objetmatch.datamatch.push(files[i]);//console.log('la mémoire'+objetmatch.datamatch)
//datamatch='{"datamatch":[]}'


function ask(question, texte,url) {
 ScribeAskMe(question, [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {//data1='{"wiki":[]}'
      //if (phrase!=='undefined') {console.log(phrase+'tttttttttttttttttttttttt')
        if (phrase=='oui') {ScribeSpeak(texte,true); callback();return false}
        if (phrase=='non') {req(url);callback();return false}
     // return}
      
     // else ScribeSpeak("Tu n'as rien répondu. Tant pis.");//console.log(answer+phrase+match+wholeMatch);
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 2}
  );
}//fin fnct ask
//question="veux tu , lire les mémo, ou, écrire un mémo, ou, effacer les mémo ?"
//ask(question,filePath)
//Mémoire(memo,phrasememo,nommemo,filePath)





compte=compte+1



objetscrap.information.push(objet.wiki[0]);

vocalise=vocalise+' , '+ files[i].replace(/.json/gi,' ');
//console.log(compte)
//console.log(vocalise)
texte=objet.wiki[0]
//console.log(texte)
question='cela fait rapport à '+vocalise+' veux tu que je lise , oui ou non'
//ask1(question,texte,url)

//console.log(jsonStr);
//ScribeSpeak(objet.wiki[0],true);
//i=longueurdir-1;j=10;
 //return false
// on envoie au plug recuperé dans le json pour reponse
// ou on fait l'action enregistré

}// fin if on connais le data.q
//console.log('jjjjjjjjjjjjjj11111111111jjjjjj'+i+'rrrr111111111111111rrr')
//})//fin fs read

}//fin for i
//console.log('jjjjjjjjjjjjjjjjjjjj'+j+'rrrrrrr') ;
 //req(url)

if (compte==0){req(url);return false}


function ask1(question, texte,url) {
 ScribeAskMe(question, [
    {'answer':'age' }
    ], function(answer,phrase,match,wholeMatch) {//data1='{"wiki":[]}'
      //if (phrase!=='undefined') {console.log(phrase+'tttttttttttttttttttttttt')
        //if (phrase!=='undefined') {ScribeSpeak(objetscrap.information[phrase],true); callback();return false}
        if (phrase=='non') {
    req(url)
//process1 = '%CD%/plugins/cortana/bin/search.vbs ' + search;exec(process1)
          callback();return false}
//}
        if (phrase!=='undefined') {
try{
          parle= fs.readFileSync(path+'/'+phrase+'.json').toString();objetparle = JSON.parse(parle);
         ScribeSpeak(objetparle.wiki[0],true);console.log('en memoire')
          //ScribeSpeak(objetscrap.information[phrase],true);
           callback();return false}

catch (Exception) {process1 = '%CD%/plugins/cortana/bin/search.vbs ' + search;exec(process1)}
  //ask1(question, texte,url)}
     }   
      //return}
      
     // else ScribeSpeak("Tu n'as rien répondu. Tant pis.");//console.log(answer+phrase+match+wholeMatch);
    }, {'timeout':maConfig.timeout_msec, 'retryIfNoMatch': "Je ne suis pas sûr d'avoir compris. Peux-tu répéter ? quel est ton âge ?", 'essais': 2}
  );
}//fin fnct ask


//vocalise= files[i].replace(/.json/gi,' ');
texte=objet.wiki[0]
question='cela fait rapport à '+vocalise+', le quel veux tu'
ask1(question,texte,url)
console.log(vocalise)
//console.log(objetscrap.information)
//console.log('pppppppppppppppppppppppppppppppp'+vocalise)
}//fin fnct read
}//fin funct test phrase




try{
 rgxp = /recherche (.+) sur Wikipédia/i; match = phrase.match(rgxp);// ce qui se cache entre "recherche" et "sur wikipedia"
search = match[1]; url = 'https://fr.wikipedia.org/wiki/'+search;datamatche='{"datamatch":[]}'
//console.log( 'on rechercheeeeeeee '+search);
TestPhrase(search,url)
}
catch (Exception) {console.log("erreur dans la recherche");return false}






}// fin exports action