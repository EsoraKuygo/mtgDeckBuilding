const DisplayInv = document.getElementById('block');
function fetchInventoryData() {
    fetch('getInventaire.php')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('La requête Fetch a échoué');
        })
        .then(data => {
            console.log(data);

            // Afficher les données sur la page
            data.forEach(item => {
                // Créer des éléments HTML pour chaque élément de l'inventaire
                const DC = document.createElement('div');
                DC.classList.add('card-container'); // Ajout de la classe card-container
                const desc = document.createElement('p');
                desc.textContent = item.name; 
                desc.style.textAlign = 'center'; 
                desc.style.marginBottom = '10px';
                const cardImage = document.createElement('img');
                cardImage.src = item.image;
                cardImage.alt = item.name;
                cardImage.style.margin = '10px';
                cardImage.style.height ='370px';
                cardImage.style.width = '265px';
                DC.appendChild(desc);
                DC.appendChild(cardImage);
                block.appendChild(DC); // Utilisation de DisplayInv
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données de l\'inventaire:', error);
        });
}


// Appeler la fonction pour récupérer et afficher les données de l'inventaire
fetchInventoryData();