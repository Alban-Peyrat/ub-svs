window.addEventListener('load', function() {
const medSpeTitle = document.getElementById("mdecinespcialise");
const medGeTitle = document.getElementById("mdecinegnrale");
const pharTitle = document.getElementById("pharmacie");
const odonTitle = document.getElementById("odontologie");

const medSpeUL = medSpeTitle.nextElementSibling.nextElementSibling.nextElementSibling;
const pharUL = pharTitle.nextElementSibling.nextElementSibling.nextElementSibling;

const medGeCopy = medGeTitle.nextElementSibling.firstElementChild;
const odonCopy = odonTitle.nextElementSibling.firstElementChild;
const medSpeCopy = medSpeTitle.nextElementSibling.firstElementChild;
const pharCopy = pharTitle.nextElementSibling.firstElementChild;

//medGeCopy.classList.add("js-copy");
//odonCopy.classList.add("js-copy");
//medSpeCopy.classList.add("js-copy");
//pharCopy.classList.add("js-copy");

// for (let ii = 0; ii < medSpeUL.children.length; ii++) {
//     medSpeUL.children[ii].classList.add("medSpeLi");
// };
// for (let ii = 0; ii < pharUL.children.length; ii++) {
//     pharUL.children[ii].classList.add("pharLi");
// };


medGeCopy.onclick = function() {doCopy(medGeCopy, "Médecine générale")};
odonCopy.onclick = function() {doCopy(odonCopy, "Odontologie")};
medSpeCopy.onclick = function() {doCopy(medSpeCopy, "Médecine spécialisée (spécialitée à compléter)")};
pharCopy.onclick = function() {doCopy(pharCopy, "Pharmacie (spécialitée à compléter)")};


//Code original pour choper l'event cliqué par bhv le 19 juin 2020 sur StackOverflow
//en réponse à la question How to get the element clicked (for the whole document)? de user1145216
//https://stackoverflow.com/questions/9012537/how-to-get-the-element-clicked-for-the-whole-documentanswer-9012576#answer-44905133
//Consulté le 18/11/2021
medSpeUL.onclick = function(e) {
    let domaine = "Médecine spécialisée spécialité ";
    let spe = e.target.innerText;
    let speCode = spe.substring(spe.indexOf(" : ")+3);
    speCode = speCode.replace(" ;", "").replace(".", "");
    spe = spe.substring(0, spe.indexOf(" : "));

    changeSpe(medSpeCopy, speCode);
    doCopy(medSpeCopy, domaine+spe);
    defaultSpe(medSpeCopy, speCode);
};
pharUL.onclick = function(e) {
    let domaine = "Pharmacie spécialité ";
    let spe = e.target.innerText;
    let speCode = spe.substring(spe.indexOf(" : ")+3);
    speCode = speCode.replace(" ;", "").replace(".", "");
    spe = spe.substring(0, spe.indexOf(" : "));

//Sans spé handler + change spe
    if(speCode == "del"){
        pharCopy.innerText = pharCopy.innerText.substring(0, pharCopy.innerText.indexOf('document.getElementById("dumas_degreeSpeciality").value = 5'));
        domaine = "Pharmacie ";
        spe = spe.toLowerCase();
    }else{
        changeSpe(pharCopy, speCode);
    };
    doCopy(pharCopy, domaine+spe);
    defaultSpe(pharCopy, speCode);
};


function changeSpe(codeCop, speCode){
    codeCop.innerText = codeCop.innerText.substring(0, codeCop.innerText.length - 1) + speCode;
}

function defaultSpe(codeCop, speCode){
    codeCop.innerText = codeCop.innerText.substring(0, codeCop.innerText.length - speCode.length) + 5;
}

//Code original pour copier le texte publié par Rodolphe le 02 Mai 2019 sur Alsacréations
//https://www.alsacreations.com/astuce/lire/1789-Copier-du-texte-dans-le-presse-papier-systeme.html
//Consulté le 18/11/2021
function doCopy(codeCop, domaine){
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNode(codeCop);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        // Exécution de la commande de copie
        var result = document.execCommand('copy');
        if (result) {
            // La copie a réussi
            alert(domaine+' copiée !');
        }
    }
    catch(err) {
        // Une erreur est surevnue lors de la tentative de copie
        alert(err);
    }

    // Fin de l'opération
    selection = window.getSelection();
    if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
    } else if (typeof selection.removeAllRanges === 'function') {
        selection.removeAllRanges();
    }
}
})
