const id = 'M20'
const fetchButton = document.getElementById('startSim'); 
const cardFieldContainer = document.getElementById('cardField');

fetchButton.addEventListener('click', () => {
    const apiUrl = "https://api.magicthegathering.io/v1/sets/"+ (id) +"/booster";

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
                    const cardImage = document.createElement('img');
                    cardImage.src = card.imageUrl;
                    cardImage.alt = card.name;
                    cardImage.style.margin = '10px';
                    cardImage.style.height ='370px';
                    cardImage.style.width = '265px';
                    cardImage.addEventListener('click', () => {
                        //todo
                    });
                    cardFieldContainer.appendChild(cardImage);
                }
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });
});


