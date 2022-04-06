# Documentation du générateur de notice UNIMARC d'une thèse d'exercice déposée sur DUMAS (BU SVS)

Preuve de concept : catalogage semi-automatisé d'un document DUMAS dans le Sudoc

__Suite à l'Actu des réseaux n°75 de décembre 2021 et de la présentation du [webservice Marcxml2tei](http://documentation.abes.fr/sudoc/manuels/administration/aidewebservices/co/MarcXml2tei.html#OXiP0XaqCYhdbukhutyQif), cet outil semble ne plus être nécessaire.__

_Je travaille encore sur le projet. Fonctionnement à jour de la version 2.0, mais pas la documentation sur le fonctionnement_

## Récupérer les données

### Provenant de DUMAS

* En utilisant [l'API Documents de HAL](https://api.archives-ouvertes.fr/docs/search), il est possible de récupérer un grand nombre de données entrées dans DUMAS, toutefois toutes ne sont pas accessibles.
* En effet, s'il est possible dans DUMAS de renseigner une langue pour les titres par exemples, il n'est pas possible (à ma connaissance) de récupérer cette information via cette API, tout comme il n'est pas non plus possible de récupérer la date de fin de l'embargo sur un document.
* Toutefois, un grand nombre de données reste accessible, proposées sous différents format (j'utiliserai le JSON) :
  * la langue du document (`language_s`) ;
  * l'URI du document (`uri_s`) ;
  * les patronymes des auteurs (`authFirstName_s`) ;
  * les prénoms des auteurs (`authLastName_s`) ;
  * les noms complets des directeurs de thèse (`director_s`) ;
  * l'identifiant HAL de la structure associée (`authStructId_i`) ;
  * la spécialité (`dumas_degreeSpeciality_s`) ;
  * le type de mémoire (`dumas_degreeType_s`) ;
  * l'année de publication (`publicationDateY_i`) ;
  * les titres du document (`title_s`) ;
  * les mots-clefs renseignés (`keyword_s`) ;
  * les résumés renseignés (`abstract_s`) ;
  * le nombre de page (`page_s`) ;
  * le document est en Open Access (`openAccess_bool`).

## Transformer les données en UNIMARC

Il faut distinguer 2 types de champs UNIMARC à écrire :
* les champs (ou parties de champ) fixes ;
* les champs dépendants des informations rapatriées.

Il est à noter que certains champs fixes dans cette preuve de concept ne sont absolument pas les mêmes d'une thèse à l'autre, en revanche, leur écriture via ce procédé sera toujours le même.
En effet, ces champs-là nécessitent d'être modifiés manuellement :
* soit car l'information n'est pas présente dans DUMAS (illustrations, nombre de références, etc.),
* soit car l'information n'est pas accessible via l'API (embargo, langue du second titre, etc.).

Aussi, puisque ce problème n'est pas résolvable, j'ai fait le choix de bloquer la validation au niveau de ces notices en précédant le champ d'un code :
* `_DEL_` pour un champ à supprimer (l'indexation libre) ;
* `_MOD_` pour un champ à modifier (le NNT) ;
* `_VER_` pour un champ à vérifier (la 200).

Tous les champs ne sont pas bloqués de cette manière.
En effet, la 541 serait à vérifier, le `$z` étant pour le moment fixe.
Toutefois, la majorité des seconds titres étant anglais, je pars du principe que l'information sera généralement vraie.
De même, pour les 7XX, je ne les bloque pas car l'association de notices auteur est une étape qui, à mon avis, n'est pas oubliée des collègues.

## Générateur de notice bibliographique (version JS)

Afin d'à la fois [récupérer les données](#récupérer-les-données) et [transformer les données en UNIMARC](#transformer-les-données-en-unimarc), j'ai fait le choix lors de ma première étude de faisabilité de [passer par mon site et d'utiliser du Javascript](https://alban-peyrat.github.io/outils/ub-svs/dumas/generateur-notice.html).
(Et je savais que faire le travail directement dans WinIBW serait pour moi une épreuve plus compliquée, d'où ce premier choix).

Cette manière de générer les notices comporte toutefois un léger problème : la rétrocompatibilité du générateur avec Internet Explorer qui me joue parfois des tours.
En effet, puisque, comme nous le verrons au prochain titre, c'est ce navigateur qui est utilisé par WinIBW pour se connecter à mon GitHub, et à mon plus grand malheur, toutes les fonctions Javascript ne sont pas apparement pas compatible avec celui-ci.
Toutefois, ce procédé restera pour moi la manière privilégiée de travailler pour le moment car :
* je peux apporter des mises à jour au générateur sans que les utilisateurs n'aient à faire quoi que ce soit pour bénéficier de celles-ci ;
* je préfère travailler en javascript (et loin de l'éditeur de script de WinIBW).

Voici maintenant les informations basiques sur ce générateur.
Il ne prend en compte les 8 derniers caractères (espaces exclus) de ce qui est lui est entré dans le champ de saisie (ce qui supposément correspond à l'identifiant DUMAS `docId`).
Voilà les champs créés par le générateur :
* 008 : `008 $aOax3`
* 029 : `029 MOD ##$aFR$b` + l'année + `BORD` + `M`, `3`, `P` ou `O` selon le type de mémoire et la spécialité + `XXX` à modifier manuellement en le numéro de la thèse
* 100 : `100 0#$a` + l'année
* 101 : `101 0#$a`, `$c`, `$d`, `$g` avec la langue du document
* 102 : `102 ##$aFR`
* 104 : `104 ##$ak$by$cy$dba$e0$ffre`
* 105 : `105 ##$ay$bm$ba$c0$d0$e0$fy$gy`
* 135 : `135 ##$ad$br`
* 181 : `181 ##$P01$ctxt`
* 182 : `182 ##$P01$cc`
* 183 : `183 ##$P01$aceb`
* 200 : `200 VER 1#$a` + le 1er titre renvoyé avec les `:` (espaces avant et après, espaces parès) remplacés en `$e` et le `@` placé en début de titre sauf si présence d'un article rejeté, auquel cas, il est placé après l'article + `$f` + premier prénom renvoyé suivi d'un espace suivi du premier nom renvoyé + `$gsous la direction de ` + le premier directeur de thèse renvoyé
* 214 : `214 #1$a` + l'année
* 230 : `230 ##$aDonnées textuelles`
* 303 : `303 ##$aL'impression du document génère` + le nombre de page entouré d'espace + `f.`
* 304 : `304 ##$aTitre provenant de l'écran-titre`
* 310 : `310 MOD ##$aThèse sous embargo jusqu'au JOUR/MOIS/ANNÉE` à modifier manuellement ou supprimer (le champ n'existe pas à ma connaissance dans le l'API)
* 320 : `320 MOD ##$aBibliogr. XX réf. Annexes` à modifier manuellement le nombre de références et supprimer les annexes s'il n'y en a pas
* 328 : `328 #0$bThèse d'exercice$c` + domaine + spécialité si indiquée + `$eBordeaux$d` + l'année
* 330 : `330 ##$a` + résumé (pour chaque résumé entré)
* 337 : `337 ##$aConfiguration requise : un logiciel capable de lire un fichier au format : application/pdf`
* 541 : `541 ##$a` + le 2e titre renvoyé (même changements que celui en 200) + `$zeng`
* 610 : `610 DEL 0#$a` + mot-clef (pour chaque mot-clef, quelle que soit la langue). Substitut temporaire à la 606
* 608 : `608 ##$3027253139$2rameau`
* 700 : `700 #1$a` + nom de l'auteur + `$b` + prénom de l'auteur + `$4070` (pour chaque auteur renvoyé).
Attention, écrit une __700__ même s'il y a plusieurs auteurs
* 701 : `701 #1$a` + nom complet du directeur de thèse renvoyé + `$4727` (pour chaque directeur de thèse renvoyé)
* 711 : `711 02$3175206562$4295`
* 856 : `856 4#$qPDF$u` + l'URI du document renvoyé + `$2Accès au texte intégral`

## Importer ces données dans WinIBW

__À l'heure actuelle, il est nécessaire d'utiliser son navigateur puis de copier la notice en cliquant dessus et la coller dans WinIBW.__
Il est ensuite conseillé de lancer le script `delEspaceB4Tag` (code disponible ci-dessous).

À l'heure actuelle, je passe par [le générateur en javascript que j'avais déjà créé](https://alban-peyrat.github.io/outils/ub-svs/dumas/generateur-notice.html) pour importer les données dans WinIBW.
En effet, à l'aide [du code source du script utilisateur IdRef développé par l'Abes](https://github.com/abes-esr/winibw-scripts/blob/master/user-scripts/idref/IdRef.vbs), j'ai réussi à me connecter à mon générateur et lancer les scripts internes à celui-ci.

Aussi, la procédure que l'utilisateur doit faire une fois [le script dans WinIBW](#code-du-script-winibw) installé est simplissime :
* copier le lien DUMAS de la thèse ;
* lancer le script dans WinIBW ;
* vérifier et compléter la notice générée.

## Code du script WinIBW

__Le code ne fonctionne pas sur Internet Explorer pour le moment, il est donc impossible de directement importer la notice dans WinIBW.__
Il est fortement recommandé d'utiliser ce court script après avoir collé la notice afin de supprime les espaces en trop :

``` VBScript
sub delEspaceB4Tag()
  dim notice
  application.activeWindow.title.selectAll
  notice = application.activeWindow.title.selection
  While(InStr(notice, chr(10) & " ") > 0)
    notice = replace(notice, chr(10) & " ", chr(10))
  Wend
  application.activeWindow.title.insertText notice
End Sub
```

_Version du 25/11/2021, non définitive_

``` VBScript
Sub these_catDumas()
dim docId
  docId = application.activeWindow.clipboard
  docId = replace(docId, chr(13), "")
  docId = replace(docId, chr(10), "")
  docId = replace(docId, " ", "")
  docId = Right(docId, 8)
  
'Source : script IdRef de l'Abes
  set IE = nothing
    set shapp=createobject("shell.application")
     Dim InputTexte
  'MsgBox  "==>" + IE.Visible
    on error resume next
    'pour ouvrir si pas ouvert
    For Each owin In shapp.Windows
         'if left(owin.document.location.href,len("https://api.archives-ouvertes.fr/search/dumas/?q=docid:01911186&wt=xml&fl=language_s,title_s,authFirstName_s,authLastName_s,uri_s,director_s,keyword_s,uri_s,abstract_s,page_s,dumas_degreeSpeciality_s,publicationDateY_i,dumas_degreeSubject_s"))="https://api.archives-ouvertes.fr/search/dumas/?q=docid:01911186&wt=xml&fl=language_s,title_s,authFirstName_s,authLastName_s,uri_s,director_s,keyword_s,uri_s,abstract_s,page_s,dumas_degreeSpeciality_s,publicationDateY_i,dumas_degreeSubject_s" then
         if left(owin.document.location.href,len("https://alban-peyrat.github.io/outils/ub-svs/dumas/generateur-notice.html"))="https://alban-peyrat.github.io/outils/ub-svs/dumas/generateur-notice.html" then
            if err.number = 0 then
                    set IE = owin
                    'MsgBox "ok"
              end if
        end if
    err.clear
    Next

    on error goto 0
    if IE is nothing then
        'MsgBox  "Window Not Open"
         Set IE = CreateObject("InternetExplorer.Application")
    end if

    'IE.Navigate2 "https://api.archives-ouvertes.fr/search/dumas/?q=docid:01911186&wt=xml&fl=language_s,title_s,authFirstName_s,authLastName_s,uri_s,director_s,keyword_s,uri_s,abstract_s,page_s,dumas_degreeSpeciality_s,publicationDateY_i,dumas_degreeSubject_s"    
  IE.Navigate2 "https://alban-peyrat.github.io/outils/ub-svs/dumas/generateur-notice.html"    
  Do While IE.readystate <> 4  
    Loop  
    Set IEDoc = IE.document
    
    'Set inputURL = IEDoc.getElementById("inputURL")
    'inputURL = "https://api.archives-ouvertes.fr/search/dumas/?q=docid:"+docId+"&wt=json&fl=language_s,title_s,authFirstName_s,authLastName_s,uri_s,director_s,keyword_s,uri_s,abstract_s,page_s,dumas_degreeSpeciality_s,publicationDateY_i,dumas_degreeSubject_s"
    'inputURL = "https://dumas.ccsd.cnrs.fr/dumas-01911186"

    Call IEDoc.parentWindow.execScript("main('"&docId&"')","JavaScript")

'Permet de stopper le script WinIBW pour laisser le temps au générateur
  ress_sleep 1

    Set notice = IEDoc.getElementById("notice")
'Fin de l'abes
  
  application.activeWindow.Command "cre"
  'Faire de la détection de ;_;ERREUR;_; + de si la notice est vide dire de réessayer puis si plusierus échec de passer par le site
  application.activeWindow.Title.InsertText notice.innerText
  

'L'abes encore parce que c'est quand même bien mieux de fermer Internet Explorer
'Sauf qu'en fait ça augmente le nombre de renvois vide ahahahahah
'Sauf si je sleep le script WinIBW pour laisser le temps à mon générateur ?
  IE.Quit
  Set IE = Nothing

End Sub
```

## Suite du projet

### Fonctionnalités prévues (si le développement se poursuit)

* amélioration de la gestion des erreurs, notamment pour éviter que rien ne soit renvoyé simplement car 1 information a généré une erreur ;
* gestion des langues :
  * déterminer une langue principale, qui sera la langue du document indiquée en métadonnées ;
  * à partir de la langue principale, si le résumé ou le titre contient deux entrées, déterminer la langue secondaire en considérant que une des deux langues est forcément le français et que si la langue principale est le français alors la seconde langue sera l'anglais ;
  * ensuite la langue sera ajoutée en `101 $d` et `541 $z` en fonction de la présence ou non d'un second résumé ou second titre.
* générer la 310 uniquement si `openAccess_bool` renvoie `false` ;
* gestion des auteurs multiples :
  * écrire le nombre correct de 700 puis passer en 701 ;
  * écrire en 200 tous les auteurs avec des virgule comme séparateur sauf pour le dernier qui est séparé par `et` ;
* génération des 7XX en même temps que la 200 pour éviter de repasser encore une fois sur les mêmes variables ;
* pour les directeurs de thèse, considérer par défaut que tout ce qui se trouve avant le premier espace est le prénom, la suite étant considérée par défaut comme patronyme ([voir l'étude de faisabilité pour comprendre plus en détail l'intérêt](#étude-de-faisabilité)) ;
* les outils _amélioration_, qui visent à directement associer un PPN pour les autorités RAMEAU et mentions de responsabilité (et )qui seront évidemment facultatifs) ;
* dans ce cadre-là, créer manuellement des bases de contenu connu qui seront interrogées et renverront des PPN en cas de trouvailles.

### Étude de faisabilité

* récupérer l'information sur la spécialité via [l'API des référentiels](https://api.archives-ouvertes.fr/docs/ref) (ou une autre) plutôt qu'utiliser une image fixe de la base.
Compléter ensuite le résultat de l'API avec l'image de la base si l'API n'a rien renvoyé (ex : si la connexion a échoué).  
* dans le cadre des outils _amélioration_, essayer d'identifier via [l'API Solr d'IdRef](http://documentation.abes.fr/aideidrefdeveloppeur/index.html#UtiliserApiSolr) les PPN correspondants à des autorités RAMEAU ou des mentions de responsabilité (voire des FMesh ?).
Pour ces outils, si l'interrogation de la base manuelle est également activée, le recours à l'API n'interviendrait qu'après celui à la base manuelle puisque supposément la base manuelle est plus précise.
Aussi, l'un des enjeux majeurs de cette étude de faisabilité sera de définir les critères qui permettront d'affirmer que le PPN correspond bien à ce que nous recherchons et n'est pas une erreur.
* dans le cadre d'une possible généralisation de l'outil (c'est-à-dire, cesser de créer des documents par défaut pour Bordeaux), récupérer les informations à partir de Wikidata.

## Liste de ressources

* [Documentation data.archives-ouvertes.fr](https://data.archives-ouvertes.fr/doc/schema) ;
* [API recherche d'un document dans data.archives-ouvertes.fr](https://api.archives-ouvertes.fr/docs/search) ;
* [API référentiels dans data.archives-ouvertes.fr](https://api.archives-ouvertes.fr/docs/ref) ;
* [API OAI-PMH dans data.archives-ouvertes.fr](https://api.archives-ouvertes.fr/docs/oai) ;
* RDF d'un document : https://data.archives-ouvertes.fr/document/dumas-03133058v1.rdf ;
* JSON d'un document : https://data.archives-ouvertes.fr/document/dumas-03133058v1.json ;
* RDF d'un auteur : https://data.archives-ouvertes.fr/author/1.rdf ;
* JSON d'un auteur : https://data.archives-ouvertes.fr/author/1.json ;
* la requête utilisée : `https://api.archives-ouvertes.fr/search/dumas/?q=docid:12345678&wt=json&fl=language_s,title_s,authFirstName_s,authLastName_s,uri_s,director_s,keyword_s,abstract_s,page_s,dumas_degreeSpeciality_s,publicationDateY_i,dumas_degreeType_s` ;
* récupérer l'information de l'université :
  * ajouter `authStructId_i` à la requête, ce qui renvoie l'identifiant de la structure ;
  * interroger une table manuellement créée pour récupérer les informations liées au NNT, à la 328 et à la 711 ;
  * ~~OU interroger [l'API référentiel Structure](https://api.archives-ouvertes.fr/docs/ref/resource/structure) pour récupérer les informations, mais je ne suis pas sûr que cela soit la solution la plus efficace.~~
~~Toutefois, je doute de l'utilité sachant que ni l'autorité IdRef, ni [le libellé de l'université / l'établissement français](http://documentation.abes.fr/sudoc/regles/LibellesUnivEtab.htm), ni les spécificités du NNT ne se trouvent dans les informations renvoyables par l'API.~~
~~Si une tentative de lien entre référentiel aurait pu être possible pour récupérer au moins la 711, je crains que l'identifiant HAL ne soit présent ni dans IdRef, ni chez la BnF, ni dans VIAF, ni dans l'ISNI.~~
~~Aussi je pense que l'établissement du fichier manuel est plus facile~~
_En fait il est possible de récupérer des informations grâce à WikiData qui contient bien l'identifiant HAL et le PPN IdRef de la structure._
_De là, nous pouvons établir un lien avec des fichiers basés sur les tables établies dans le GM du Sudoc (voir ci-dessous), en récupérant la forme internationale via l'API IdRef ?_
* [Liste des propriétés Wikidata](https://www.wikidata.org/wiki/Wikidata:Database_reports/List_of_properties/all/fr) (identifiant IdRef: `P269`, identifiant HAL: `P6773`))
Pour compléter les libellés, créer un fichier grâce à [la table des libellés des universités et établissements français](http://documentation.abes.fr/sudoc/regles/LibellesUnivEtab.htm) (même si la fiabilité m'a l'air irrégulière pusique `Bordeaux` n'a pas d'entré comme c'est pourtant écrit plusieurs fois).
Dans ce même fichier, indiquer le code court de l'université grâce [à la table des codes des universités et des établissements](http://documentation.abes.fr/sudoc/regles/CodesUnivEtab.htm).
Dans ce même fichier, il faudra manuellement indiquer la manière d'attribuer le code final s'il existe une manière de faire, sinon Bordeaux restera le seul à générer ce code ;
* [Assistant de requêtes Wikidata](https://query.wikidata.org/querybuilder/?uselang=fr) ;
* requête pour récupérer l'identifiant Wikidata de l'Université de Bordeaux :
``` SPARQL
SELECT DISTINCT ?item ?itemLabel WHERE {
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE]". }
  {
    SELECT DISTINCT ?item WHERE {
      ?item p:P6773 ?statement0.
      ?statement0 (ps:P6773) "259761".
    }
    LIMIT 100
  }
}
```
* URI Wikidata associée à l'Université de Bordeaux (en JSON) : `https://www.wikidata.org/wiki/Special:EntityData/Q13344.json`.
Accès au PPN IdRef à partir de là : `entities.Q13344.claims.P269[0].mainsnak.datavalue.value`
* Chercher s'il existe des autorités pour la personne Jean-Claude Moissinac : `https://www.idref.fr/Sru/Solr?q=nom_s:moissinac%20AND%20prenom_s:jean-claude%20AND%20recordtype_z:a&wt=json&fl=ppn_z,nom_s,prenom_s,affcourt_z` ;
* Chercher s'il existe des autorités pour le sujet Urgences en pédiatrie : `https://www.idref.fr/Sru/Solr?q=subjectheading_t:(urgence*%20AND%20pediatr*)%20AND%20recordtype_z:r&wt=json&fl=ppn_z,subjectheading_s` ;


## Liste des erreurs

### Erreurs visibles

* `001` : la première propriété `dumas_degreeType_s` existante est différente de 12, 13 ou 30 qui sont les seules valeurs supposées normales.
Peut être causée par une mauvais entrée des données dans DUMAS ou une réécriture de la variable dans le code avant cette vérification (ce qui ne devrait pas avoir lieu) ;
* `002` : le résultat renvoyé par l'API ne contient pas la propriété `publicationDateY_i` ;
* `003` : le résultat renvoyé par l'API ne contient pas la propriété `dumas_degreeType_s` ;
* `004` : le résultat renvoyé par l'API ne contient pas la propriété `language_s` ;
* `005` : le résultat renvoyé par l'API ne contient pas la propriété `abstract_s` ;
* `006` : le résultat renvoyé par l'API ne contient pas la propriété `page_s` ;
* `007` : le résultat renvoyé par l'API ne contient pas la propriété `openAccess_bool` ;
* `008` : le résultat renvoyé par l'API ne contient pas la propriété `uri_s` ;
* `009` : le résultat renvoyé par l'API ne contient pas la propriété `keyword_s` ;
* `010` : le résultat renvoyé par l'API ne contient pas la propriété `title_s` ;
* `011` : le résultat renvoyé par l'API ne contient pas la propriété `authStructId_i` ;
* `012` : le résultat renvoyé par l'API ne contient pas la propriété `authLastName_s` ;
* `013` : le résultat renvoyé par l'API ne contient pas la propriété `authFirstName_s` associé au numéro `authLastName_s` en cours de traitement ;
* `014` : le résultat renvoyé par l'API ne contient pas la propriété `director_s` ;

### Erreurs invisibles (commencent par #)

* `#99` : _en implémentation_
