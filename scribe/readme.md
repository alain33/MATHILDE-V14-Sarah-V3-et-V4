PLUGIN: SCRIBE
==============
Le plugin Scribe (pour Sarah) permet d'utiliser la reconnaissance vocale HTML5 de Google, à travers Google Chrome.
Le plugin crée un serveur HTTPS qui héberge une page liée au moteur de reconnaissance vocale HTML5 de Google.
Toute phrase prononcée dans le micro est à la fois interprétée par Sarah (et ses grammaires XML) et la page HTTPS.
La page HTTPS envoie au plugin Scribe tout ce qu'elle reconnait comme mots (y compris durant la phase de reconnaissance "partielle").
Le plugin Scribe offre des facilités pour utiliser ce que Google a reconnu comme phrase afin d'exploiter Google dans des plugins tiers.

En bonus, le plugin Scribe écrit dans une zone de la page HTTPS quel est le plugin actif mais aussi ce que Sarah a dit en surlignant les mots qui sont prononcés au fur et à mesure (le timing de cette partie est à régler indépendamment et est totalement expérimental) et en animant un petit visage formé de smileys ... :-)

Prérequis
---------
- Sarah v3 (j'ai mis du code compatible v4 mais je n'ai pas testé)
- Google Chrome en dernière version

Installation
------------
1- copiez le répertoire `scribe` dans le répertoire `plugins` de Sarah
1bis - installez éventuellement l'un ou l'autre plugin exemple (voir plus bas)
2- lancez Sarah (serveur+client)
3- Google Chrome s'ouvre sur la page `https://127.0.0.1:4300` (<-- HTTPS !!)
4- confirmez l'exception de sécurité
5- au besoin confirmez l'utilisation du micro (cette étape ne sera plus jamais demandée car on est en HTTPS)
6- dans Chrome, appuyez sur ALT-F pour ouvrir le menu de Chrome, puis choisissez `Paramètres` (5e avant la fin)
7- allez tout en bas de la page des Paramètres et cliquez sur `Afficher les paramètres avancés`
8- cliquez sur le bouton `Gérer les certificats' dans la section HTTPS/SSL (vers la fin)
9- choisissez l'onglet `autorités de certification RACINES de confiance`
10- cliquez sur le bouton `importer` puis sur le bouton `suivant`, puis sur le bouton `parcourir`
11- dans la fenêtre qui s'ouvre choisissez `Certificats PKCS#7` dans la liste déroulante en bas à droite (au dessus du bouton `ouvrir`)
12- sélectionnez le fichier `sarah_chrome.p7b` qui est dans le répertoire du plugin et cliquez sur le bouton `ouvrir`
13- cliquez sur `suivant` deux fois, puis sur `terminer`

Les étapes 6 à 13 ne sont à effectuer qu'une seule fois et permettent que Chrome n'émette plus d'avertissement (étape 4), la prochaine fois que vous lancerez Sarah

Fonctionnalités
---------------
Le plugin Scribe est composé d'une partie NodeJS et d'une page web HTTPS. La page web HTTPS discute avec Sarah/NodeJS de manière bidirectionelle:
- elle renvoie à Sarah/NodeJS ce que Google a pu déchiffrer, ainsi que l'indice de confiance de la reconnaissance Google
- elle reçoit de Sarah les phrases qu'elle est en train de prononcer et surligne les mots qu'elle prononce. En même temps un petit visage constitué de smileys s'anime

Quand vous dites une phrase, vous pouvez voir dans Chrome le moteur de Google chercher la meilleure correspondance (=reconnaissance PARTIELLE) jusqu'à ce que le moteur considère que la reconnaissance est terminée, auquel cas il renvoie une reconnaissance COMPLETE (qui s'affiche sur fond noir).

Les deux types de reconnaissance sont envoyés à Sarah, ce qui lui permet de réagir beaucoup plus vite que s'il fallait attendre la reconnaissance complète. Cette fonctionnalité est très utile car Google peut parfois mettre plusieurs secondes à reconnaitre une phrase simple ("oui", "non", "Sarah allume la lumière"). La reconnaissance partielle permet au plugins basés sur Scribe de réagir beaucoup plus vite. Ainsi, dès que la reconnaissance partielle à identifié "oui", "non" ou "allum*" (à rechercher avec un Regex par ex.), on pourrait utiliser ce résultat plutôt que d'attendre la reconnaissance complète. Bien entendu ce mécanisme est optionnel et vous n'êtes pas obligé de l'utiliser systématiquement.

Le plugin Scribe expose de nouveaux objets JavaScript exploitables dans vos plugins, à travers l'objet `SARAH.context.scribe`.

- compteur: il s'agit d'un compteur de phrases reconnues entièrement par Google. A chaque fois qu'une phrase est reconnue COMPLETEMENT, ce compteur est incrémenté de 1. Ce mécanisme permet de s'assurer très rapidement qu'une nouvelle phrase a été prononcée dans le micro simplement en comparant une valeur mémorisée du compteur avec l'actuelle valeur.
- compteurPartial: il s'agit d'un compteur de phrases reconnues PARTIELLEMENT par Google. A chaque fois qu'une phrase est reconnue PARTIELLEMENT, ce compteur est incrémenté de 1. Dès que la phrase est reconnue entièrement, `compteurPartial` reprend la même valeur que `compteur`. Si on utilise la reconnaissance partielle, il faut mettre soi-même ce compteur à la même valeur que `compteur` sous peine de mal identifier les reconnaissances partielles suivantes.
- lastReco: contient la dernière phrase reconnue COMPLETEMENT par Google.
- lastPartial: contient la dernière phrase reconnue PARTIELLEMENT par Google.
- lastConfidence: contient la valeur de confiance de la dernière reconnaissance COMPLETE
- lastPartialConfidence: idem pour la dernière reconnaissance PARTIELLE
- lastX: contient un objet `[{compteur: ..., reco: ..., confidence: ...}, {}, ...]` des X dernières reconnaissances complètes. La dernière phrase reconnue est toujours en `[0]`
- microOFF(): fonction appelant `nircmd` pour éteindre le micro. C'est notamment utile pendant que Sarah parle afin que Google n'interprète pas ce que dit Sarah. Cette fonction est déjà appelée par `ScribeSpeak  et `ScribeAskMe`, il n'est donc pas nécessaire de l'appeler lorsqu'on utilise ces deux fonctions-là.
- microON(): fonction appelant `nircmd` pour allumer le micro.
- SarahEcoute(true|false): cette fonction permet de rendre sourde Sarah si on passe `false` en paramètre. Pour rétablir l'écoute de Sarah, on passe `true`. Cette fonction est très utile quand on désire ne traiter QUE la reconnaissance Google tout en empêchant Sarah d'exécuter la moindre grammaire. Cette fonction est déjà appelée par `ScribeAskMe`.
- hook(): ceci permet d'appeler une fonction `callback` dès 




Avantages
---------
- PLUS DE LIMITATION A 50 UTILISATIONS !!
- Plus besoin de créer une clé Google API (dont le principe d'inscription change tout le temps)
- vous pouvez utiliser le même principe (sans nécessairement Garbage) pour récupérer ce que Chrome a compris A TOUT INSTANT ! Par ex:
  - votre grammaire contient "Sarah allume la lumière du salon" et "Sarah allume la lumière de la cuisine"
  - anciennement il fallait passer en argument (action/data) le mot "salon" ou "cuisine" si on voulait que Sarah réponde "j'ai allumé la lumière de la cuisine/salon"
  - vous pouvez à présent utiliser la dernière phrase reconnue par Google pour savoir quelle lumière vous avez demandé en dernier !
- Pour certains mots, Chrome est beaucoup plus précis au niveau de la reconnaissance. C'est notamment le cas pour tous les mots en anglais mais aussi pour les nombres.
  

Inconvénients
-------------
- tributaire de Google Chrome (plantages ? comment les détecter, relancer Chrome, etc)
- dépend de la qualité de la connexion (vitesse, stabilité, disponibilité des serveurs Google etc)
- Chrome peut entendre la réponse de Sarah ou d'autres bruits et donc renvoyer quelques chose d'erroné (solution ? couper le micro ?)
- il faut (légèrement) réécrire les plugins qui utiliseraient la règle GARBAGE si on veut utiliser ce principe (il faut aussi réécrire le code de speech_test.js pour qu'il utilise un certificat SSL qui ne change pas à chaque lancement ... mais bon c'est une autre histoire)

