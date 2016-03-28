var ScribeAskMe;
var ScribeSpeak;
var maConfig;
var SCRIBE;


exports.action = function(data, callback, config, SARAH) {

SCRIBE = SARAH.context.scribe;
  ScribeAskMe = SARAH.ScribeAskMe;
  ScribeSpeak = SARAH.ScribeSpeak;
SCRIBE.activePlugin('dismoi');

plugduxml=data.plugduxml
if ( plugduxml ==null ) { plugduxml=0 }

  fs = require('fs');
  xml2js = require('../modules/xml2js') ;   parser = new xml2js.Parser({trim: true});
  path = require('path');  nomplugin="" ;   nombreplugin=0




                          //le nom des plugins
  config=SARAH.ConfigManager.getConfig();

data1='{"nompluguine":[]}'
  file=Object.keys(config.modules).forEach(function(plugin) {

nombreplugin=nombreplugin+1 ; nomplugin=nomplugin+", "+plugin

//dans un json nom pluguine
 objet = JSON.parse(data1);   jsonStr = JSON.stringify(objet); // transforme l'objet en texte
  jsonStr1 = JSON.stringify(plugin)// la valeur de l'item.

try {
jsonStr1=jsonStr1.replace(/"/g,'');//on met au bon format
//console.log("           "+jsonStr1)
     }
catch (Exception) {console.log("    erreur      ");}



//on pousse en memoire
objet.nompluguine.push(jsonStr1); new_jsonStr = JSON.stringify(objet);
data1=new_jsonStr
 });



function ask1(){
ScribeSpeak("il y a "+nombreplugin+" pluguine qui se nomme " + nomplugin,function apel1(){ask2()});
 //ask2()
// callback({'tts': "il y a " + nombreplugin + ",pluguine"}) ;ask2()
}

ask1()




  cd=(objet.nompluguine[plugduxml]); cd1=cd.replace(/"/g,'');

  
  pathname = './plugins/'+cd1+'/'+cd1+'.xml';
//console.log('nom du                                     plug'+pathname);


// on cree le xml..................


datas_xml='<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="dismoi" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">\n'
datas_xml+='<rule id="dismoi" scope="public"><example>Sarah lance google</example><tag>out.action=new Object(); </tag>\n'
datas_xml+='<item>Sarah</item>\n'
datas_xml+='<one-of>\n'
datas_xml+='<item>dis-moi les phrases de</item>\n'
datas_xml+='</one-of>\n'
datas_xml+='<item repeat="0-1">\n'
datas_xml+='<one-of>\n'

for ( i = 0; i < nombreplugin; i++) {  
 cd2=(objet.nompluguine[i]);
datas_xml+='<item>'+cd2+'<tag>out.action.plugduxml="' + i +'"</tag></item>\n';   
}

datas_xml+='</one-of>\n'
datas_xml+='</item><tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/dismoi";</tag></rule> </grammar>\n'


fs.writeFile("./plugins/dismoi/dismoi1.xml", datas_xml, function(err) {
      if(err) {console.log(err);}
      else {console.log("!");}})


                //on met le xml en mémoire et on traite les items

  
  parser = new xml2js.Parser();
//  pathname = 'C:/Users/Administrateur/sarah/plugins/reveil.xml';
  x=0;// iable pour les one-of
j=0

////////////////////////////

data1='{"nompluguine":[]}'
var objet = JSON.parse(data1);
var parse = require('../modules/xml-parser');
var xml = fs.readFileSync(pathname, 'utf8');
var obj = parse(xml);
var DOMParser = require('../modules/xmldom').DOMParser;
var doc = new DOMParser().parseFromString(xml);

txt="a"
for ( i = 0; txt!=="" ; i++){

try{txt = doc.getElementsByTagName("item")[i].childNodes[0].nodeValue;
//console.log(i+' '+txt);

 j++
if (j==5){j=0;//console.log(j)
}


objet.nompluguine.push([txt]); 
//console.log(objet)






}//fin try

catch (Exception) {console.log('fin item');txt="";}
}//fin for i
function ask2(){
ScribeSpeak("il y a "+ i+" phrases dans "+cd1);ask3(i);
//callback({'tts': "il y a "+ i+" phrases dans "+cd1}) ;ask(10)
}



//return false
/////////////////////




pathname = './plugins/'+cd1+'/'+cd1+'dismoi.json';

var jsonStr = JSON.stringify(objet);

fs.writeFile(pathname, jsonStr, function (err) { // ecrit dans le fichier courses l'objet + la nouvelle valeur
   if (err) throw err;})


//console.log(objet.nompluguine[5])








function ask3(i){

 for (k=0; k<i;k++)

{
  //console.log(i);
vocal=JSON.stringify(objet.nompluguine[k]);
  ScribeSpeak(vocal);

}
}






















 //SARAH.askme("veux tu les phrases ", {"oui" : 'oui',"non" : 'non'}, 10000, function(answer, end){ScribeSpeak('', function(){end();});

//if (answer=='oui'){ScribeSpeak(objet.nompluguine[5]);
//}else {ScribeSpeak('ok')}
//;callback({'tts' : " "}) }); 





//myfunc()




callback({'tts': ""}) ;

}