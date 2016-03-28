Courses
=======

S.A.R.A.H plugin Courses

pré requis : Pour pouvoir avoir les notifications vous devez avoir installer le plugin PUSH.

--- Dans le fichier courses.xml vous devez spécifier le nom de (ou des) personnes à notifier; dans la partie
<!-- envoie via push-->
....
out.action.qui = "VOTRE NOM";

Attention le nom doit être strictement celui définit dans le plugin push; respecter la casse !


--- Listes des commandes basiques : 

SARAH rajoute du Lait = rajoute le Lait à la liste de courses
SARAH enlève le LAIT = enlève le Lait
SARAH envoie moi la liste des courses = PUSH
SARAH Donne moi la liste des courses = SPEAK
SARAH vide la liste des courses = bin la vide :)

Pour l'ajout ou le retrait des objets (item des courses) vous devez rajouter une ligne par objet dans la partie 
<!--liste des courses-->
exemple : 

<item>rajoute du lait
    <tag>out.action.item="Lait";</tag>
</item>

<item>enléve le lait
    <tag>out.action.item_out="Lait";</tag>
</item>

Bon plugin à vous ! 

