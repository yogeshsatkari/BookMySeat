<?php
// header('Content-Type: text/plain; charset=utf-8');
$servername = "localhost";
$username = "id20680080_yogesh";
$password = "c1|oF~}qb|waqgH~w";
$database = "id20680080_bookmyseat";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
