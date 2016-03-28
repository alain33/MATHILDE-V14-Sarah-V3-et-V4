

exports.init = function(SARAH,config) {
mamémoire=''
objetphrasesmemoire='{"information":["info"]}'
mamémoire='{"information":["info"]}'
function boucle(){


temps=-5000;temps1=0
fs = require('fs') ; request = require('request') ; cheerio = require('../modules/cheerio')
temps=0;temps1=0
demarrage=function(mamémoire){//remise à zero du fichier temporaire
 var date = new Date()
 var heure = date.getHours()
    if (heure==1){
     objetphrasesmemoire='{"information":["info"]}';mamémoire='{"information":["info"]}'
data2=objetphrasesmemoire
      
     // fs.writeFileSync('./plugins/infomathilde/info1memoire/infomemoire.json', data2,'utf8')

      scrap(mamémoire)//appel du scrap
    }//fin if
else{scrap(mamémoire)}//appel du scrap
}//fin fnct demarrage



scrap=function(mamémoire){

 datascrap='{"information":[]}'
 objetscrap = JSON.parse(datascrap);
 longueurscrap = objetscrap.information.length
  request({ 'uri' : 'https://news.google.com/'}, function(error, response, html){
//request('https://news.google.com/','utf8', function (error, response, html) {
 
       var $ = cheerio.load(html);
  
          $('h2').each(function(i, element){
             var a = $(this).text();a=a.trim()
            //console.log(a)
             a = a.toLowerCase();
             //a = a.replace(/[-_']/gi,' ');
             //a = a.replace(/[^a-zA-Z0-9ôÖèçàéêœ'' ]/gi,'');
             a=a.replace(/["]/gi,' ')
             a=a.trim()
             objetscrap.information.push(a)
             
             //console.log(a+'.')
             longueurscrap = objetscrap.information.length;
          })//fin fnct each

        lecturemotscles(mamémoire,objetscrap,longueurscrap)
    })//fin request

}//fin fnct scrap




lecturemotscles=function(mamémoire,objetscrap,longueurscrap){
path = require('path');
filePath = path.resolve('%CD%', './plugins/mémoiredemathilde/info1memoire/info.json').replace('\\%CD%', '');
 //filemotscles=fs.readFileSync('./plugins/infomathilde/info1memoire/info.json','utf8')
filemotscles=fs.readFileSync(filePath,'utf8')

//fs.readFile(filePath, function(err, data) { 
 objetmotscles = JSON.parse(filemotscles) ; longueurmotscles = objetmotscles.mots.length ; jsonStrmotscles = JSON.stringify(objetmotscles)
 lecturememoire(mamémoire,objetscrap,longueurscrap, objetmotscles,longueurmotscles)
}//fin fnct motscles



lecturememoire=function(mamémoire,objetscrap,longueurscrap, objetmotscles,longueurmotscles){
filememoire=mamémoire;
 objetphrasesmemoire = JSON.parse(filememoire); jsonStrobjetphrasesmemoire = JSON.stringify(objetphrasesmemoire);
 longueurobjetphrasesmemoire = objetphrasesmemoire.information.length
 matchtest(objetscrap,longueurscrap, objetmotscles,longueurmotscles ,objetphrasesmemoire,longueurobjetphrasesmemoire)

}//fin lecture json memoire


matchtest=function(objetscrap,longueurscrap, objetmotscles,longueurmotscles ,objetphrasesmemoire,longueurobjetphrasesmemoire){

var date = new Date();console.log('il est ' + date.getHours() + ' heures et '+ date.getMinutes() + ' minutes');




for(y=0; y<longueurscrap; y++){
 

  for(i=0; i<longueurmotscles; i++){
    motsrechercher=objetmotscles.mots[i].trim()

if (objetscrap.information[y].search(motsrechercher)>-1){//si scrap=mot recherché
      for(z=0; z<longueurobjetphrasesmemoire; z++){//console.log('on avait au départ donc: '+longueurobjetphrasesmemoire)

          if (objetscrap.information[y].search(objetphrasesmemoire.information[z])>-1){     //si scrap=phrases memoire  
      
             z=longueurobjetphrasesmemoire+10;i=longueurmotscles+10// on connais donc on sort et on test l'autre phrase
        }// fin if
        

            else {if(z==longueurobjetphrasesmemoire-1){
      
                  z=longueurobjetphrasesmemoire+10;i=longueurmotscles+10

      
                            function ecriture(objetscrap,objetphrasesmemoire,y,process,nouveau){


 temps=temps+5000;temps1=temps+5000
setTimeout(function (temps,temps1) { 
                                var exec = require('child_process').exec;
                                var nircmd ='%CD%/plugins/infomathilde/nircmd/nircmd.exe';//var process = './plugins/volume/bin/nircmdc.exe';
                                var process=nircmd+' trayballoon "Information" "'+objetscrap.information[y]+'" "shell32.dll,22" 1000';
                                //exec(process);
     // var child = exec(process)
 
   
                                //console.log('on memorise '+temps+objetscrap.information[y])
                                objetphrasesmemoire.information.push(objetscrap.information[y]);
                                data2 = JSON.stringify(objetphrasesmemoire);
                     var exec = require('child_process').exec;
                                var nircmd1 ='%CD%/plugins/infomathilde/nircmd/nircmd.exe';//var process = './plugins/volume/bin/nircmdc.exe';
                               // var process1=nircmd+' infobox '+'" info "'+' '+'"'+objetscrap.information[y]+'"';
                                var process1=nircmd+' infobox '+'"'+objetscrap.information[y]+'"'+' '+'" info "';
                                //exec(process);
     // var child = exec(process)

var child2 = exec(process1)
console.log('info : '+objetscrap.information[y])
mamémoire=data2






}, temps);

setTimeout(function (temps,temps1) {


                       var exec = require('child_process').exec;
                                var nircmd ='%CD%/plugins/infomathilde/nircmd/nircmd.exe';//var process = './plugins/volume/bin/nircmdc.exe';
                                var process2=nircmd+' sendmouse move 1 1';
                                var process3=nircmd +' killprocess "nircmd"'
                                //exec(process);
     // var child1 = exec(process2)
 var child3 = exec(process3)
   
           //                     console.log('moveeeeeeee '+temps)

}, temps1);







                            }//fin fnct ecriture


                  ecriture(objetscrap,objetphrasesmemoire,y,process)

            } }// fin else if 
          
      }//fin for z

    } //fin if mot rechercher

  } // fin for i
} //fin for y

}//fin fnct matchtest


setTimeout(function(objetaction1){ 
 boucle()
; }, 3600000);//fin timeout


demarrage(mamémoire)//c'est parti.....

}//fin fnct boucle

boucle()
}

