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
        case 'getdataevent':
            $Id_event = anti_Injection($_REQUEST['id_event']);
            $res = mysqli_query($conn,"SELECT * FROM tb_event WHERE Id_event = '$Id_event'");
            $r = mysqli_fetch_assoc($res);
            echo json_encode(array('type'=>$r['banner_type'],
                                    'banner'=>$r['banner'],
                                    'judul'=>$r['judul'],
                                    'desk'=>$r['deskripsi'],
                                    'subjek'=>$r['subjek'],
                                    'begin'=>$r['tanggal_mulai'],
                                    'end'=>$r['tanggal_akhir'],
                                    'event'=>$r['tahun'].'-'.$r['bulan'].'-'.$r['hari'],
                                    'status'=>$r['status']
                                    ));
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
                if($banner!='namlastcorp'){
                    $banner = uploadMyImageString($token, $banner);
                }
            }
            $begin = $tglbegin . ' ' . $jambegin;
            $end = $tglend . ' ' . $jamend;
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
                
                echo 'berhasil disimpan';
            }
            else If($status=='Edit'){
                if($banner!="namlastcorp"){
                    $query = "UPDATE tb_event SET banner_type = '$type',
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
                                                                `status` = '$statusEvent' WHERE Id_event = '$pos'";
                    
                }
                else{
                    $query = "UPDATE tb_event SET banner_type = '$type',
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
                                                  `status` = '$statusEvent' WHERE Id_event = '$pos'";
                  
                }
                if (ProsesData($query) > 0) {
                    echo  "Data berhasil diedit";
                } else {
                    echo "Gagal edit, tidak ada perubahan apapun";
                }
            } else if ($status == 'Hapus') {
                moveData($pos);
                $query = "DELETE FROM `tb_event` WHERE `Id_event` = '$pos'";
                if (ProsesData($query) > 0) {
                    echo  "Data berhasil dihapis";
                } else {
                    echo "Gagal hapus data";
                }
            }
            break;
    }
} else {
    echo 0;
}
