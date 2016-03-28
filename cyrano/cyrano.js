var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;




exports.action = function(data, callback, config, SARAH) {


data1='{"cyrano":[]}'
fs = require('fs');

nomchercher=data.chercher
console.log('chercher : *'+nomchercher+'*')
url = 'http://www.crisco.unicaen.fr/des/synonymes/'+nomchercher;request = require('request');



path = require('path');
pathname = path.resolve('%CD%', './plugins/mémoiredemathilde/cyranomemoire/'+nomchercher+'.json').replace('\\%CD%', '');

//pathname = './plugins/cyrano/cyranomemoire/'+ nomchercher +'.json' 
SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;

SCRIBE.activePlugin('cyrano');







function speak(){
	nom="";
	//console.log('pour : '+nomchercher)
	if ( longueur > 0){for ( i = 1; i < 11 ;i++){if (L[i]==undefined){break};if (L[i]==""){break};nom=nom+L[i]+", ";
	
	//nom1=nom1+","+nom
	//SARAH.speak(nom);
	//console.log(i+" "+nom);
}}
	speake=function() {ScribeSpeak(nom,true); CyranoMemoire(nom);
callback();};

speake();

fs.writeFile(pathname, data1, function (err) { // ecrit dans le fichier courses l'objet + la nouvelle valeur
if (err) throw err;})
callback();
}//fin fnct speak
 
//ScribeSpeak("Désolé je n'ai pas compris. Merci de réessayer.", true);

 


function scrap(){
	if (nombre3==undefined){nombre3=0;}
	try{nombre4=eval(nombre1)}catch (Exception) {nombre4=0}
	try{nombre4=nombre4+eval(nombre3)}catch (Exception) {nombre4=0}

	nombre4=nombre4+4///le nombre à rechercher pour les 10 principaux
 	
 	heure1 = $('#synonymes > table:nth-child('+nombre4+')').text();// le nom exaact
	L = heure1.split("  ");
	longueur = heure1.length;


tempowait=(((JSON.stringify(heure1).length)*70)+3000);console.log('tempoWait'+tempowait);console.log();
//MicroOffOn(tempowait);
speak();callback();
}// fin fnct scrap











function Internet(){
  
request({ 'uri' : url }, function (err, response, body){
	$ = require('../modules/cheerio').load(body, { xmlMode: false, ignoreWhitespace: true, lowerCaseTags: true });nombre=$('i.titre:nth-child(2)').text();//le nombre de synonymes

	if (nombre==""){console.log('pas de synonymes on callback');SARAH.speak('pas de synonyme');callback();return false}

	nombre1=nombre.replace(new RegExp("\\b" + "synonymes" + "\\b","gi"),""); nombre1=eval(nombre1)


		try {
			nombre2=$('#synonymes > div:nth-child('+(nombre1+2)+') > i:nth-child(1)').text();// le nombre d'antonymes
			nombre3=nombre2.replace(new RegExp("\\b" + "antonymes" + "\\b","gi"),"");
			nombre3=nombre3.replace(new RegExp("\\b" + "antonyme" + "\\b","gi"),"");
			nombre3=eval(nombre3);scrap();
			}

			catch (Exception) {
				//console.log("      pas d'antonyme     ");
				nombre3="0"}




});//fin request

}//fin fnct internet


function CyranoMemoire(nom){

objet1 = JSON.parse(data1); jsonStr1 = JSON.stringify(objet1);

objet1.cyrano.push(nom); data1 = JSON.stringify(objet1); 

callback();
}//fin fnct CyranoMemoire











function testmemoire(){

path = require('path');
var path = path.resolve('%CD%', './plugins/mémoiredemathilde/cyranomemoire/').replace('\\%CD%', '');


//path = require('path');var path = './plugins/cyrano/cyranomemoire';

file=fs.readdirSync(path)

  longueurdir=file.length
//console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+longueurdir)
for(i=0;i<longueurdir-1;i++){//console.log(nomchercher)
	//console.log('a'+file[i]+'a');
	nom=nomchercher+'.json';
	//	console.log('b'+nom+'b')
if (nom==file[i]){
//console.log(nom+file[i]+i) 
//console.log(files.cyrano)

files=fs.readFileSync(path+'/'+file[i],'utf8').toString()
//files=fs.readFileSync(path+'/'+file[i],'utf8').toString()
//console.log(nom+file[i]+i)
//console.log(files)
objet = JSON.parse(files);jsonStr = JSON.stringify(objet)
//console.log('obbbbbbbbbjet'+jsonStr)
longueur = objet.cyrano.length;//console.log('lonnnnnnnnnngueur'+longueur)
//console.log(objet.cyrano)
//console.log('les objtssssssssssssssssssssssssssssssss'+objet+jsonStr)
//objet = JSON.parse(data);jsonStr = JSON.stringify(objet)
//longueur = objet.nompluguine.length;console.log(longueur)
	ScribeSpeak(objet.cyrano)

i=longueurdir-1
}//fin if

else if ( i==longueurdir-1||i==longueurdir){Internet()}
	//console.log(longueurdir)
}//fin for
if ( i==longueurdir-1||i==longueurdir){Internet()}
  //console.log(longueurdir)
  //console.log(files[5]);read(files,path,query,longueurdir)
  //nomchercher
//  Onconnais(files, path, longueurdir)
//})
}//fin test
testmemoire()
}//