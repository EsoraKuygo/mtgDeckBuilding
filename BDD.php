<?php
// Récupérer les données envoyées par JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Informations de connexion à la base de données
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "carteposseder"; 

// Connexion à la base de données MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

// Préparer les données pour l'insertion dans la base de données
$name = $conn->real_escape_string($data['name']);
$imageUrl = $conn->real_escape_string($data['imageUrl']);
$couleur = $conn->real_escape_string($data['colors']);
$type = $conn->real_escape_string($data['type']);
$setName = $conn->real_escape_string($data['setName']);

// Requête d'insertion dans la table 'cards'
$sql = "INSERT INTO carteposseder (name, imageUrl, couleur, type, setName) VALUES ('$name', '$imageUrl','$couleur','$type','$setName')";

// Exécuter la requête d'insertion
if ($conn->query($sql) === TRUE) {
    echo "Données de la carte insérées avec succès dans la base de données.";
} else {
    echo "Erreur lors de l'insertion des données de la carte : " . $conn->error;
}

// Fermer la connexion à la base de données
$conn->close();
?>
