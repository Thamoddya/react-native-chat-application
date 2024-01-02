<?php
  $hostname = "localhost";
  $username = "root";
  $password = "1234";
  $dbname = "chatapp";

  $conn = mysqli_connect('localhost', 'root', '1234','chatapp');
  if(!$conn){
    echo "Database connection error".mysqli_connect_error();
  }
?>
