<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){  
    require 'conn.php';
    require 'function.php';

        // login administator
        $user = anti_Injection($_POST['user']);
        $pass = privateHashing(anti_Injection($_POST['pass']));

        $res = mysqli_query($conn,"SELECT * FROM tb_member WHERE email = '$user' LIMIT 1");
        $r = mysqli_fetch_assoc($res);
        $password = $r['password'];
        if($pass == $password && $user !=''){
            $_SESSION['id_sekolah'] = $r['Id_sekolah'];
            $_SESSION['id_member'] = $r['Id_member'];
            $_SESSION['bentuk'] = $r['bentuk'];
            $_SESSION['username_ig'] = $r['username_ig'];
            $_SESSION['subjek'] = $r['subjek'];
            $_SESSION['jenjang'] = $r['jenjang'];
            $_SESSION['email'] = $r['email'];
            $_SESSION['kontak'] = $r['kontak'];
            //$_SESSION['bentuk'] = getBentukSekolah($conn,$r['Id_sekolah']);
            $_SESSION['token'] = privateHashing(gettodayShort());

            // konfigurasi data login
            $last_login = gettoday();
            $date_login = json_decode($r['date_login'],false);
            array_push($date_login,$last_login);
            $data_login = json_encode($date_login);
            $Id_member = $r['Id_member'];
            mysqli_query($conn,"UPDATE tb_member SET date_login = '$data_login', last_login = '$last_login' WHERE Id_member = '$Id_member'");
            echo '1';
        }
        else {
            echo 'rejected login';
        }
}

?>