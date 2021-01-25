<?php
session_start();
$_SESSION['jenjang'] = '';
$_SESSION['email'] = '';
$_SESSION['kontak'] = '';
$_SESSION['token'] = '';
session_destroy();
header('location:index.html');
?>