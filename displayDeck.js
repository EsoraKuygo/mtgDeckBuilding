// Fonction pour ajouter un effet hover aux éléments
function addHoverEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.opacity= "0.5"; // Changer la couleur de fond au survol
        element.style.cursor = 'pointer'; // Changer le curseur de la souris
    });

    element.addEventListener('mouseout', () => {
        element.style.opacity= "1" // Retour à la couleur de fond par défaut
    });
}

// Fonction pour récupérer les noms des premières cartes de chaque deck
function fetchFirstCardData() {
    return fetch('data.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            const firstCardData = data.map(deck => {
                return {
                    deckName: deck.name,
                    firstCard: deck.cards[0]
                };
            });
            return firstCardData;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des noms des premières cartes de chaque deck:', error);
        });
}

// Fonction pour récupérer les informations sur la première carte de chaque deck depuis l'API Magic: The Gathering
function fetchCardImages(firstCard) {
    const apiUrl = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(firstCard)}`;

    return fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            // Récupérer l'URL de l'image de la carte
            if (data.image_uris && data.image_uris.art_crop) {
                return data.image_uris.art_crop;
            } else {
                throw new Error('Aucune URL d\'image trouvée pour cette carte');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l\'image de la carte:', error);
        });
}

// Fonction pour récupérer et afficher les noms des decks avec leurs premières cartes et leurs images
function fetchDeckNamesWithFirstCardsAndImages() {
    fetchFirstCardData()
        .then(firstCardData => {
            const deckList = document.querySelector('.DeckAff');

            firstCardData.forEach(deck => {
                const deckNameElement = document.createElement('p');
                deckNameElement.textContent = deck.deckName; // Afficher le nom du deck
                deckNameElement.style.border = "thick";
                deckNameElement.style.margin= 'auto';
                deckNameElement.style.borderStyle = "double";
                deckNameElement.style.textAlign = "center";
                deckNameElement.style.height = "228px";
                deckNameElement.style.width = "626px"
                deckNameElement.style.backgroundOrigin = "border-box";
                deckNameElement.style.backgroundRepeat = "no-repeat";
                deckNameElement.style.backgroundPositionX= "center";
                deckNameElement.style.backgroundPositionY= "top"; 
                deckNameElement.style.fontSize = "24px"; // Taille de la police
                deckNameElement.style.color = "white"; // Couleur du texte
                deckNameElement.style.lineHeight = "228px"; // Centrer verticalement le texte
                deckNameElement.style.textShadow= "1px 1px 2px black, 0 0 1em black, 0 0 0.2em black";

                // Récupérer l'image de la première carte et l'utiliser comme arrière-plan pour le nom du deck
                fetchCardImages(deck.firstCard)
                    .then(imageUrl => {
                        deckNameElement.style.backgroundImage = `url('${imageUrl}')`;
                    });

                addHoverEffect(deckNameElement);
                deckList.appendChild(deckNameElement);
            });
        });
}

// Appeler la fonction pour récupérer et afficher les noms des decks avec leurs premières cartes et leurs images
fetchDeckNamesWithFirstCardsAndImages();
