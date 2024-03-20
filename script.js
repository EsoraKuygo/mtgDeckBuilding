const fetchButton = document.getElementById('fetchButton');
const cardNameInput = document.getElementById('cardNameInput');
const cardFieldContainer = document.getElementById('cardField');
const cardModal = document.getElementById('cardModal');
const popUpAddText = document.getElementById('Ajout');
const popUpAddAccept = document.getElementById('yes');
const popUpAddRefuse = document.getElementById('no');

fetchButton.addEventListener('click', () => {
    const apiUrl = `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(cardNameInput.value)}`;

    // Effectuer une requête Fetch et gerer les erreurs
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            cardFieldContainer.innerHTML = '';

            // Parcourir les diff vers d'une carte et creer l'img
            data.cards.forEach(card => {
                if (card.imageUrl) {
                const cardImage = document.createElement('img');
                cardImage.src = card.imageUrl;
                cardImage.alt = card.name;
                cardImage.style.margin = '10px';
                cardImage.style.height ='370px';
                cardImage.style.width = '265px';
                cardImage.addEventListener('click', () => {
                    //creation du modal et de son texte
                    cardModal.style.display = 'block';
                        popUpAddText.textContent = "souhaitez vous ajoutez " + card.name + " à votre collection";
                });
                console.log('je creer les images')
                cardFieldContainer.appendChild(cardImage);
                } else {
                    console.log('je ne creer rien')
                }
            });
            console.log(data);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
        });

        popUpAddRefuse.addEventListener('click', () => {
            cardModal.style.display = 'none';
        });

/**
 ** @todo quand cliquez sur oui, ajouter a la bdd
 **/
        popUpAddAccept.addEventListener('click',() =>{
           // write me 
        })

});
