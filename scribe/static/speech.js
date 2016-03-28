// https://gist.github.com/jhermsmeier/3bc995d37f3acc0b0364

function $( selector ) {
  return document.querySelector( selector )
}

var smileys = [":-)",":-o",":-O",":-0",":-|",":-D",":-v",":-&#x2662;",":-°",":-&#x22c5;",":-&#x25e6;",":-&#x00b7;"];
var idleSmileys = [":-)",":-o",":-|",":-D",":-v",":-&#x2662;",":-°",":-&#x22c5;",":-&#x25e6;",":-&#x00b7;",
					"8^/",";-)",":-B",":-P",":-p",":^)",":-x",":')",":-]"];

var DOMsay = $ ('.say');
var DOMsmiley = $ ('.smiley');
var DOMplugin = $ ('.plugin_name');

var SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition

function Recognizer() {
  
  if( !(this instanceof Recognizer) )
    return new Recognizer()
  
  this.recog = new SpeechRecognition()
  this.recog.lang = 'fr'
  this.recog.continuous = true
  this.recog.interimResults = true
  
  
  this.confidence = $( '.speech .confidence' )
  this.transcript = $( '.speech .transcript' )
  
  this.attachEvents()
  
}

Recognizer.prototype = {
  
  constructor: Recognizer,
  
  attachEvents: function() {
    this.recog.addEventListener( 'audiostart', this )
    this.recog.addEventListener( 'soundstart', this )
    this.recog.addEventListener( 'speechstart', this )
    this.recog.addEventListener( 'speechend', this )
    this.recog.addEventListener( 'soundend', this )
    this.recog.addEventListener( 'audioend', this )
    this.recog.addEventListener( 'result', this )
    this.recog.addEventListener( 'nomatch', this )
    this.recog.addEventListener( 'error', this )
    this.recog.addEventListener( 'start', this )
    this.recog.addEventListener( 'end', this )
  },
  
  handleEvent: function( event ) {
    switch( event && event.type ) {
      case 'result': this.displayResult( event ); break
      case 'end': this.listen(); break
      default: console.log( 'Unhandled event:', event )
    }
  },
  
  listen: function() {
    this.recog.start()
  },
  
  abort: function() {
    this.recog.abort()
  },
  
  displayResult: function( event ) {
    //window.requestAnimationFrame( function() {
      
      var result = event.results[ event.resultIndex ]
      var item = result[0]
      
	  
      this.confidence.textContent = parseFloat( item.confidence ).toPrecision( 2 )
      this.transcript.textContent = item.transcript
      
	  
      if (result.isFinal === true) {
        this.transcript.classList.add( 'final' );
		sendData(item.transcript,item.confidence,"reco");

		
	  } else {
        this.transcript.classList.remove( 'final' );
		// partiel seulement ...
		sendData(item.transcript,item.confidence,"partial");
		
	  }
      
  //  }.bind( this ))
  },
  
}

function sendData(txt, confidence, type, force) {
	console.log("Send: " + txt + "(" + confidence + ")" + (force==true ? ' - FORCE': ''));
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	
	var url = "/sarah?" + type + "=" + txt + "&confidence=" + parseFloat( confidence ).toPrecision( 2 );
	
	if (typeof force !== 'undefined') url+= '&force=' + force;
	console.log(url);
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

window.addEventListener( 'DOMContentLoaded', function() {
	// Google Chrome/HTML5 Speech Recognition
	this.recognizer = new Recognizer()
	this.recognizer.listen()
  
	// SSE depuis le plugin SCRIBE de SARAH
	var channel = new EventSource('/scribe');
	channel.addEventListener('message', function(ev) {
		scribeEvents(ev);
	});
	DOMsay.textContent = '...';
	idleAnim();
	//setInterval(function() {sendData($( '.speech .transcript' ).textContent,$( '.speech .confidence' ).textContent,"reco", true);},1000);
})

var speaking = false;
var tokenSarahAnim;

function scribeEvents(ev) {
	obj = JSON.parse(ev.data);
	console.log(obj);
	
	switch (obj.command) {
		case 'refresh':
			location.reload();
			break;
		case 'forceSend':
			//sendData($( '.speech .transcript' ).textContent,$( '.speech .confidence' ).textContent,"reco", true);
			break;
		case 'abort':
			this.recognizer.abort();
			/*
			if (obj.clear) {
				this.recognizer.transcript.textContent = '...';
				this.recognizer.confidence.textContent = '0';
			}*/
			break;
		case 'start':
			this.recognizer.listen();
			break;
		case 'plugin':
			DOMplugin.textContent = obj.plugin;
			break;
			
		case 'saying':
			DOMsay.innerHTML = obj.html;
			if (obj.pause == "-1") {
				speaking = false;
				idleAnim();
			} else {
				clearTimeout(tokenSarahAnim);
				speaking = true;
				stay = obj.timeout - obj.pause;		 // msec où le highlight reste sur le(s) mot(s)
				repeat = 5;						// nbre de smileys à afficher
				delay = Math.floor(stay/6);
				setTimeout(function() {
					pickSmiley(repeat+1, delay);
				}, obj.pause / 1.25);
				
			}
			break;
		default:
	}
}

function pickSmiley(repeat, interval) {
	repeat--;
	if (repeat>0) {
		n = Math.floor(Math.random() * smileys.length);
		DOMsmiley.innerHTML = smileys[n];
		setTimeout(function() {
			pickSmiley(repeat, delay);
		}, delay);
	} else DOMsmiley.textContent = ':-)';
}

function idleAnim() {
	t = Math.floor(Math.random() * 60000);
	tokenSarahAnim = setTimeout(function(){
		n = Math.floor(Math.random() * idleSmileys.length);
		DOMsmiley.innerHTML = idleSmileys[n];
		idleAnim();
	}, t);
}