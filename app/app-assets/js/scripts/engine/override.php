<?php
session_start();
require 'conn.php';
require 'function.php';
require 'tampilan.php';
$order = anti_Injection($_REQUEST['order']);
$subjek = $_SESSION['subjek'];
$jenjang = $_SESSION['jenjang'];
$email = $_SESSION['email'];
$kontak = $_SESSION['kontak'];
$bentuk = $_SESSION['bentuk'];
$usernameig = $_SESSION['username_ig'];
$token = $_SESSION['token'];
$Id_sekolah = $_SESSION['id_sekolah'];
$Id_member = $_SESSION['id_member'];
if ($token == privateHashing(gettodayShort())) {
    switch ($order) {
        case 'ceklogin':
            echo 1;
            break;
        case 'dashboard':
            echo dispDashboard($conn);
            break;
        case 'timeline':
            $tahun = getTahun();
            echo timeLine($conn,$subjek,$tahun,$Id_member);
            break;
        case 'saveformEvent':

            $judul = anti_Injection($_POST['tema']);
            $type = anti_Injection($_POST['type']);
            $banner = anti_Injection($_POST['data']);
            $desk = $_POST['deskripsi'];
            $subjek = $_POST['subjek'];
            $tglbegin = anti_Injection($_POST['tanggalbegin']);
            $jambegin = anti_Injection($_POST['jambegin']);
            $tglend = anti_Injection($_POST['tanggalend']);
            $jamend = anti_Injection($_POST['jamend']);
            $tglevent = anti_Injection($_POST['tanggalevent']);
            $statusEvent = (anti_Injection($_POST['statusevent']) == 'Private' ? '0' : '1');
            $status = anti_Injection($_POST['status']);
            $pos = anti_Injection($_POST['pos']);
            $token =  md5(gettoday() . rand(0, 1000)) . '.jpg';
            $explode = explode('-', $tglevent);
            if ($type == 'image') {
                $banner = uploadMyImageString($token, $banner);
            }
            $begin = $tglbegin . ' ' . $jambegin . ':00';
            $end = $tglend . ' ' . $jamend . ':00';
            if ($status == 'New') {

                mysqli_query($conn, "INSERT INTO tb_event SET banner_type = '$type',
                                                             banner = '$banner',
                                                             judul = '$judul',
                                                             deskripsi = '$desk',
                                                             subjek = '$subjek',
                                                             tanggal_mulai = '$begin',
                                                             tanggal_akhir = '$end',
                                                             love = '[]',
                                                             komentar = '[]',
                                                             tahun = '$explode[0]',
                                                             bulan = '$explode[1]',
                                                             hari = '$explode[2]',
                                                            `status` = '$statusEvent'");
                echo 'berhasil disimpan' . $subjek;
            }


            break;
    }
} else {
    echo 0;
}
