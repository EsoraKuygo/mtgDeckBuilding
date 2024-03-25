function addHoverEffect(element) {
    element.addEventListener('mouseover', () => {
        element.style.backgroundColor = 'lightgray'; // Changer la couleur de fond au survol
        element.style.cursor = 'pointer'; // Changer le curseur de la souris
    });

    element.addEventListener('mouseout', () => {
        element.style.backgroundColor = ''; // Retour à la couleur de fond par défaut
    });
}



// Fonction pour récupérer et afficher les noms des decks
function fetchDeckNames() {
    fetch('data.json')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            const deckNames = data.map(deck => deck.name);
            const deckList = document.querySelector('.DeckAff');
            deckNames.forEach(name => {
                const deckNameElement = document.createElement('p');
                deckNameElement.textContent = name;
                deckNameElement.style.border = "thick";
                deckNameElement.style.borderStyle = "double";
                deckNameElement.style.textAlign = "center";
                deckNameElement.style.marginLeft = "250px";
                deckNameElement.style.marginRight = "250px";
                addHoverEffect(deckNameElement);
                deckList.appendChild(deckNameElement);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des noms de deck:', error);
        });
}

// Appeler la fonction pour récupérer et afficher les noms des decks
fetchDeckNames();
