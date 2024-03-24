import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from 'fs/promises';

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        const deckNamesAndLinks = getNameAndLinks(data);
        const deckData = []; // Tableau pour stocker les données des decks
        // Récupération des cartes pour chaque deck
        for (const { name, link } of deckNamesAndLinks) {
            const cardsData = await fetchCardData("https://deckbox.org" + link);
            const cards = getCard(cardsData);
            deckData.push({ name, cards }); // Ajouter les données du deck dans le tableau
        }
        await fs.writeFile('data.json', JSON.stringify(deckData, null, 2)); // Écrire les données dans le fichier
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

async function fetchCardData(url) {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (error) {
        console.error('Erreur lors de la récupération des données des cartes:', error);
        return null;
    }
}

function getNameAndLinks(html) {
    const $ = cheerio.load(html);
    const deckNamesAndLinks = [];
    $("a.simple.left").each(function () {
        const name = $(this).find("span").text().trim();
        const link = $(this).attr("href").trim();
        deckNamesAndLinks.push({ name, link });
    });
    return deckNamesAndLinks;
}

function getCard(html) {
    const $ = cheerio.load(html);
    const cards = [];
    $("td.card_name").each(function () {
        const cardName = $(this).find("a").text().trim();
        cards.push(cardName);
    });
    return cards;
}

fetchData("https://deckbox.org/decks/mtg?f=");
