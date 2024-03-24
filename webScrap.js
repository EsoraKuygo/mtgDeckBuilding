import fetch from "node-fetch";
import Cheerio from "cheerio";

async function fetchData(url){
    try {
        const response = await fetch(url);
        const data = await response.text();
        getName(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

fetchData("https://deckbox.org/decks/mtg?f=");

function getName(html){
    const $ = Cheerio.load(html);
    //recup les info voulue
    $("a.simple.left").each(function(){
        // Sélectionne le texte de la balise <span>
        const name = $(this).find("span").text().trim(); 
        // Sélectionne l'attribut href de la balise <a>
        const link = $(this).attr("href").trim(); 
        console.log("Nom du deck:", name);
        console.log("Lien vers le deck:", link);
    });
}

