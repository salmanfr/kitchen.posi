<?php
   $host="localhost";
   $user="root";
   $pass="";
   $database = "posi";
   $conn=mysqli_connect($host,$user,$pass,$database) or die("Koneksi gagal");

   // define("RDS_HOSTNAME", $_SERVER["RDS_HOSTNAME"]);
   // define("RDS_PORT", $_SERVER["RDS_PORT"]);
   // define("RDS_DB_NAME", $_SERVER["RDS_DB_NAME"]);
   // define("RDS_USERNAME", $_SERVER["RDS_USERNAME"]);
   // define("RDS_PASSWORD", $_SERVER["RDS_PASSWORD"]);

   // $host=RDS_HOSTNAME;
   // $user=RDS_USERNAME;
   // $pass=RDS_PASSWORD;
   // $database = RDS_DB_NAME;
   // $port = RDS_PORT;
   // $conn=mysqli_connect($host,$user,$pass,$database,$port) or die("Koneksi gagal");

?>