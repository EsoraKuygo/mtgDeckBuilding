const fetchButton = document.getElementById('fetchButton');
const cardNameInput = document.getElementById('cardNameInput');
const cardFieldContainer = document.getElementById('cardField');
const cardModal = document.getElementById('cardModal');
const popUpAddText = document.getElementById('Ajout');
const popUpAddAccept = document.getElementById('yes');
const popUpAddRefuse = document.getElementById('no');

fetchButton.addEventListener('click', () => {
    const apiUrl = `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(cardNameInput.value)}`;

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            cardFieldContainer.innerHTML = '';
            data.cards.forEach(card => {
                if (card.imageUrl) {
                    console.log(data)
                    const cardImage = document.createElement('img');
                    cardImage.src = card.imageUrl;
                    cardImage.alt = card.name;
                    cardImage.style.margin = '10px';
                    cardImage.style.height ='370px';
                    cardImage.style.width = '265px';
                    cardImage.addEventListener('click', () => {
                        cardModal.style.display = 'block';
                        popUpAddText.textContent = "Souhaitez-vous ajouter " + card.name + " à votre collection ?";
                        popUpAddAccept.onclick = () => {
                            addToDatabase(card); // Appel de la fonction pour ajouter à la base de données
                            cardModal.style.display = 'none';
                        };
                    });
                    cardFieldContainer.appendChild(cardImage);
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});


popUpAddRefuse.addEventListener('click', () => {
    cardModal.style.display = 'none';
});

function addToDatabase(card) {
    fetch('BDD.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: card.name,
            imageUrl: card.imageUrl,
            colors: card.colors.join(','),
            type: card.type,
            setName: card.setName,
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Données de la carte envoyées avec succès à la base de données.');
            console.log(card.name ,card.imageUrl ,card.colors, card.type,card.setName )
        } else {
            throw new Error('Erreur lors de l\'envoi des données de la carte à la base de données.');
        }
    })
    .catch(error => {
        console.error(error.message);
    });
}
