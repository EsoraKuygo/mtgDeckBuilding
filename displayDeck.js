import fs from 'fs/promises';

// Fonction pour lire le fichier JSON
async function readJSONFile(filePath) {
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier JSON:', error);
        return null;
    }
}

// Exemple d'utilisation
readJSONFile('data.json')
    .then(deckData => {
        if (deckData) {
            // Supposons que vous avez une section HTML avec l'ID "decks" où vous voulez afficher les titres des decks
            const decksSection = document.getElementById('DeckAff');
            
            // Boucle à travers les données des decks et ajoute les titres à la section HTML
            deckData.forEach(deck => {
                const deckTitle = document.createElement('h2');
                deckTitle.textContent = deck.name;
                decksSection.appendChild(deckTitle);
            });
        }
    })
    .catch(error => console.error(error));
