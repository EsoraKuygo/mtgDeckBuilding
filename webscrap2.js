import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from 'fs/promises';


async function fetchData(url) {
    try {
        console.log("Début de la récupération des données...");
        const response = await fetch(url);
        const data = await response.text();
        console.log("Données récupérées avec succès!");
        const deckNamesAndLinks = await getNameAndLinks(data); // Attendre le résultat de getNameAndLinks
        const deckData = []; // Tableau pour stocker les données des cartes
        // Récupération des cartes 
        for (const { name, link } of deckNamesAndLinks) {
            const cardsData = await fetchCardData("https://www.magic-ville.com/" + link);
            const cards = getCard(cardsData);
            deckData.push({ name, cards }); // Ajouter les données du deck dans le tableau
        }
        console.log("Toutes les données ont été traitées avec succès!");
        await fs.writeFile('dataThunders.json', JSON.stringify(deckData, null, 2)); // Écrire les données dans le fichier
        console.log("Données écrites avec succès dans le fichier!");
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        alert('Une erreur est survenue lors de la récupération des données. Consultez la console pour plus de détails.');
    }
}


async function fetchCardData(url) {
    try {
        console.log("Début de la récupération des données des cartes...");
        const response = await fetch(url);
        console.log("Données des cartes récupérées avec succès!");
        return await response.text();
    } catch (error) {
        console.error('Erreur lors de la récupération des données des cartes:', error);
        alert('Une erreur est survenue lors de la récupération des données des cartes. Consultez la console pour plus de détails.');
        return null;
    }
}

function getNameAndLinks(html) {
    console.log("Début de l'extraction des noms et des liens...");
    const $ = cheerio.load(html);
    const deckNamesAndLinks = [];
    $("a.simple.left").each(function () {
        const name = $(this).find("span").text().trim();
        const link = $(this).attr("href").trim();
        deckNamesAndLinks.push({ name, link });
    });
    console.log("Extraction des noms et des liens terminée!");
    return deckNamesAndLinks;
}

function getCard(html) {
    console.log("Début de l'extraction des données des cartes...");
    const $ = cheerio.load(html);
    const cards = [];
    $("td.card_name").each(function () {
        const cardName = $(this).find("a").text().trim();
        const cardImageSrc = $(this).closest('div[id^="card_"]').find('img').attr('src');
        cards.push({ name: cardName, imageSrc: cardImageSrc });
    });
    console.log("Extraction des données des cartes terminée!");
    return cards;
}
