<?php
// Informations de connexion à la base de données
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "cardesora"; 

// Connexion à la base de données MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connexion échouée : " . $conn->connect_error);
}

$sql = "SELECT * FROM carteposseder";
$result = $conn->query($sql);

$inventoryData = array();

if ($result->num_rows > 0) {
    // Récupérer chaque ligne de résultat et l'ajouter au tableau
    while($row = $result->fetch_assoc()) {
        $inventoryData[] = $row;
    }
}

$conn->close();

echo json_encode($inventoryData);
?>