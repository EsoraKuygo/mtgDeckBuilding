import fetch from "node-fetch";
import cheerio from "cheerio";
import fs from 'fs/promises';
const start = document.getElementById('startSim')
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const cardData = getCardData(html);
        await saveToJson(cardData);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

function getCardData(html) {
    const $ = cheerio.load(html);
    const cardData = [];
    $("div.css-UZpTh img").each(function (index) {
        const imageURL = $(this).attr("src").trim();
        cardData.push({ cardNumber: index + 1, imageURL });
    });
    return cardData;
}

async function saveToJson(data) {
    try {
        await fs.writeFile('cardData.json', JSON.stringify(data, null, 2));
        console.log('Les données ont été sauvegardées dans cardData.json.');
    } catch (error) {
        console.error('Erreur lors de l\'écriture dans le fichier JSON:', error);
    }
}

fetchData("https://magic.wizards.com/en/products/outlaws-of-thunder-junction/card-image-gallery");
