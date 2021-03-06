# Aide pour le dépôt de thèses d'exercice dans DUMAS

__Cette aide n'est plus maintenue puisque remplacée par [les bookmarklet pour DUMAS](/../../../bookmarklet#dumas)__

_Les champs actuellement importés sont :_
* _le type de mémoire ;_
* _le domaine de formation ;_
* _la spécialité (si requise) ;_
* _le domaine HAL._

## Procédure

Dans un premier temps, copiez dans votre presse-papier les lignes de code :
* si vous utilisez [le site et que javascript (par défaut) est activé](https://alban-peyrat.github.io/outils/ub-svs/dumas/aide-depot.html) :
  * `médecine spécialisée` et `pharmacie` : parcourez la liste ci-dessous et cliquez sur la spécialité voulue.
Si vous cliquez sur le code, vous le copierez avec la spécialité par défaut (`Sociétés et économies des mondes modernes et contemporains`) ;
  * `médecine générale` et `odontologie` : cliquez sur le code ;
* si vous utilisez [Excel](https://github.com/Alban-Peyrat/ub-svs/raw/main/dumas/dumas_specialite.xlsx) :
  * choisissez le domaine avec le menu déroulant en `C3` (cliquez sur la flèche en bas à droite de la cellule ou appuyer sur `Alt + flèche du bas`) ;
  * `médeciné spécialisée` et `pharmacie` choisissez la spécialité avec le menu déroulant en `C5` (méd spé) ou `C6` (pharma) (cliquez sur la flèche en bas à droite de la cellule ou appuyer sur `Alt + flèche du bas`) ;
  * copiez la cellule `D5`.
* si vous utilisez GitHub ou le site sans javascript (ou que la méthode avec javascript a échoué) :
  * parcourez la liste et retenez le nombre associé ;
  * copiez les lignes de code situées au début de la partie dédiée ;
  * lorsque vous collerez le code plus tard dans la procédure, changez le `5` final par le nombre associé à la spécialité ;

La suite de la prodécure est assez simple, en 4 étapes généralement :
* sur l'onglet du dépôt, allumez la console de votre navigateur (si vous utilisez Firefox, appuyez simultanément sur `Alt + Maj + K`) ;
* collez le contenu de votre presse-papier et appuyez sur `entrée` ;
* si un message apparaît dans la console vous demandant d'autoriser le collage, écrivez `Autoriser le collage`.
Il vous sera peut-être nécessaire de coller à nouveau le contenu de votre presse-papier ;
* si tout s'est bien passé, vous pouvez fermer la console (si vous utilisez Firefox, appuyez simultanément sur `Alt + Maj + I`).

## Sélectionner un domaine

* [Médecine générale](#médecine-générale) ;
* [Médecine spécialisée](#médecine-spécialisée) ;
* [Pharmacie](#pharmacie) ;
* [Odontologie](#odontologie).

### Médecine générale

Le code à copier (aucun changement à effectuer puisque la spécialité est fixe) : `document.getElementById("list_domain").innerHTML += '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>';document.getElementById("dumas_degreeType").value = 12; document.getElementById("dumas_degreeSubject").value = 48; document.getElementById("dumas_degreeSpeciality").value = 150`

### Médecine spécialisée

Le code à copier : `document.getElementById("list_domain").innerHTML += '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>';document.getElementById("dumas_degreeType").value = 12; document.getElementById("dumas_degreeSubject").value = 48; document.getElementById("dumas_degreeSpeciality").value = 5`

La liste des spécialités :
* Allergologie : 383 ;
* Anatomie et cytologie anatomique : 164 ;
* Anatomie et cytologie pathologiques : 196 ;
* Anesthésie réanimation : 163 ;
* Biologie médicale : 159 ;
* Biologie médicale - Virologie (Virologie n'a pas d'index je crois) : 159 ;
* Cardiologie et chirurgie vasculaire : 170 ;
* Cardiologie et maladies vasculaires : 199 ;
* Chirurgie générale  : 171 ;
* Chirurgie orale (Chirurgie maxillo-faciale) : 44 ;
* Chirurgie orthopédique et traumatologique : 206 ;
* Chirurgie thoracique et cardio-vasculaire : 208 ;
* Chirurgie urologique : 209 ;
* Chirurgie viscérale et digestive : 211 ;
* Dermatologie et vénéréologie : 172 ;
* Diabétologie endocrinologie : 203 ;
* Endocrinologie : 152 ;
* Endocrinologie et métabolisme : 165 ;
* Génétique médicale : 174 ;
* Gériatrie : 212 ;
* Gynécologie médicale : 200 ;
* Gynécologie obstétrique : 175 ;
* Hématologie : 166 ;
* Hépato-gastro-entérologie : 155 ;
* Médecine du travail : 176 ;
* Médecine d'urgence : 214 ;
* Médecine interne : 201 ;
* Médecine interne et immunologie clinique : 285 ;
* Médecine légale et expertise médicale : 27 ;
* Médecine nucléaire : 177 ;
* Médecine physique et de réadaptation : 178 ;
* Néphrologie : 179 ;
* Neurologie : 153 ;
* Oncologie : 167 ;
* Oncologie médicale : 833 ;
* Ophtalmologie : 168 ;
* Oto-rhyno-laryngologie et chirurgie cervico-faciale : 169 ;
* Pédiatrie : 181 ;
* Physique et Réadaptation : 178 ;
* Pneumologie : 183 ;
* Psychiatrie : 184 ;
* Radiodiagnostic et imagerie médicale : 185 ;
* Rhumatologie : 186 ;
* Santé publique : 543 ;
* Urologie : 928.

### Pharmacie

Le code à copier : `document.getElementById("list_domain").innerHTML += '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>';document.getElementById("dumas_degreeType").value = 13; document.getElementById("dumas_degreeSubject").value = 48; document.getElementById("dumas_degreeSpeciality").value = 5`

La liste des spécialités :
* Sans spécialité : del ;
* Biologie médicale	: 159 ;
* Industrie	: 844 ;
* Industrie Recherche	: 790 ;
* Innovation pharmaceutique et recherche	: 592 ;
* Officine	: 788 ;
* Pharmacie hospitalière - Pharmacie industrielle et biologie médicale	: 653 ;
* Pharmacie hospitalière - Pratique et recherche	: 553 ;
* Pharmacie hospitalière bio-médicale	: 789 ;
* Pharmacie hospitalière et des collectivités	: 160 ;
* Sciences Pharmaceutiques	: 592 ;
* Toxicologie	: 774.

### Odontologie

Le code à copier (aucun changement à effectuer puisque il n'y a pas de spécialités) : `document.getElementById("list_domain").innerHTML += '<li style="display: block" class="margin-top-5"><input type="hidden" value="sdv" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Sciences du Vivant [q-bio]</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li><li style="display: block" class="margin-top-5"><input type="hidden" value="sdv.mhep" name="domain[]"><span class="label label-primary" style="font-size: inherit; display: inline-block; text-align: justify; white-space: normal; padding: 0px; height: 20px;" data-html="true" data-toggle="tooltip" data-original-title="<span style=&quot;display: block; text-align: left; padding-left: 0px&quot;>Sciences du Vivant [q-bio]</span><span style=&quot;display: block; text-align: left; padding-left: 15px&quot;><i class=&quot;glyphicon glyphicon-share-alt&quot; style=&quot;transform: scaleY(-1);&quot;></i> Médecine humaine et pathologie</span>"><i style="border-radius: 0px; height: 20px; padding: 0px; margin: 0px 7px; top: 1px; bottom: 0px;" class="glyphicon glyphicon-move move" data-toggle="tooltip" data-original-title="Déplacer" data-placement="left"></i><span style="padding-top: 4px; padding-bottom: 0px; margin-top: 0px; height: 20px; display: inline-block;">Médecine humaine et pathologie</span><button style="height: 20px; padding-top: 0px; padding-bottom: 0px; margin-left: 10px; margin-top: -2px; margin-right: 0px; border: medium none ! important; padding-right: 6px;" class="btn btn-xs btn-primary" type="button" data-toggle="tooltip" data-original-title="Supprimer" data-placement="right"><i class="glyphicon glyphicon-trash"></i></button></span></li>';document.getElementById("dumas_degreeType").value = 30; document.getElementById("dumas_degreeSubject").value = 48`
