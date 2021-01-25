<?php
session_start();
require 'conn.php';
require 'function.php';
$order = anti_Injection($_REQUEST['order']);
switch($order){
    case 'getprov':
        $res = mysqli_query($conn,"SELECT DISTINCT propinsi as prov FROM tb_sekolah");
        $resp = array();
        while($r=mysqli_fetch_array($res)){
            array_push($resp, $r['prov']);
        }
        echo json_encode($resp);
    break;
    case 'getkab':
        $prov = $_REQUEST['prov'];
        $res = mysqli_query($conn,"SELECT kabupaten_kota as kab FROM tb_sekolah WHERE propinsi = '$prov' GROUP BY kabupaten_kota");
        $resp = array();
        while($r=mysqli_fetch_array($res)){
            array_push($resp, $r['kab']);
        }
        echo json_encode($resp);
    break;
    case 'getkec':
        $prov = $_REQUEST['prov'];
        $kab = $_REQUEST['kab'];
        $res = mysqli_query($conn,"SELECT kecamatan as kec FROM tb_sekolah WHERE propinsi = '$prov' AND kabupaten_kota = '$kab' GROUP BY kecamatan");
        $resp = array();
        while($r=mysqli_fetch_array($res)){
            array_push($resp, $r['kec']);
        }
        echo json_encode($resp);
    break;
    case 'getsekolah':
        $prov = $_REQUEST['prov'];
        $kab = $_REQUEST['kab'];
        $kec = $_REQUEST['kec'];
        $jjg = explode(' / ',$_REQUEST['jjg']);

        $res = mysqli_query($conn,"SELECT sekolah, bentuk FROM tb_sekolah WHERE propinsi = '$prov' AND kabupaten_kota = '$kab' AND kecamatan = '$kec'");
        $resp = array();
        while($r=mysqli_fetch_array($res)){
            if(in_array($r['bentuk'], $jjg)){
                array_push($resp, $r['sekolah']);
            }
            else if($r['bentuk']=='lainnya'){
                array_push($resp, $r['sekolah']);
            }
        }
        echo json_encode($resp);
    break;
    case 'sendwoowa':
        $phone = str_replace('+620','+62',anti_Injection($_REQUEST['phone']));
        $nama  = anti_Injection($_REQUEST['nama']);
        $otp_number = rand(10000, 99999);
        $str = 'Hi '.$nama.', Kode OTP Registrasi POSI Anda '.$otp_number;
        sendtowoowa($phone,$str);
        echo $otp_number;
    break;
    case 'bemember':
        $nama   = anti_Injection($_POST['nama']);
        $kontak = murnikanKontak(anti_Injection($_POST['kontak']));
        $email  = anti_Injection($_POST['email']);
        $password = privateHashing($_POST['password']);
        $subjek = anti_Injection($_POST['sebagai']);

        $jenjang = anti_Injection($_POST['jenjang']);

        $prov = anti_Injection($_POST['provinsi']);
        $kab = anti_Injection($_POST['kab_kota']);
        $kec = anti_Injection($_POST['kecamatan']);
        $sekolah = anti_Injection($_POST['sekolah']);
        $Id_sekolah = getIdSekolah($conn,$prov,$kab,$kec,$sekolah);
        $arrJenjang = explode(' / ',$jenjang);
        $bentuk = getBentukSekolah($conn,$Id_sekolah);
        $bentuk = ($bentuk=='lainnya'?$arrJenjang[0]:$bentuk);
        $ig = anti_Injection($_POST['usernameig']);
        $tgl_lahir = anti_Injection($_POST['tanggal_lahir']);
        $jns_kelamin = anti_Injection($_POST['jenis_kelamin']);
        $agama = anti_Injection($_POST['agama']);
        if($Id_sekolah!=''){
            // cek no hape
            $Ck_kontak = cekKontak($conn,$kontak);
            if($Ck_kontak){
                // cek alamat email
                $Ck_email  = cekEmail($conn,$email);
                if($Ck_email){
                    $today = gettoday();
                    $arr = '["'.$today.'"]';
                    mysqli_query($conn,"INSERT INTO tb_member SET Id_sekolah = '$Id_sekolah',
                                                                  provinsi_sekolah = '$prov',
                                                                  subjek = '$subjek',
                                                                  jenjang = '$jenjang',
                                                                  bentuk = '$bentuk',
                                                                  nama = '$nama',
                                                                  jenis_kelamin = '$jns_kelamin',
                                                                  tanggal_lahir = '$tgl_lahir',
                                                                  agama = '$agama',
                                                                  kontak = '$kontak',
                                                                  email = '$email',
                                                                  `password` = '$password',
                                                                  date_login = '$arr',
                                                                  last_login = '$today',
                                                                  username_ig = '$ig'");
                    $_SESSION['id_member'] = mysqli_insert_id($conn);                                              
                    $_SESSION['subjek'] = $subjek;
                    $_SESSION['jenjang'] = $jenjang;
                    $_SESSION['bentuk'] = $bentuk;
                    $_SESSION['username_ig'] = $ig;
                    $_SESSION['email'] = $email;
                    $_SESSION['kontak'] = $kontak;
                    $_SESSION['id_sekolah'] = $Id_sekolah;
                    $_SESSION['token'] = privateHashing(gettodayShort());
                    echo '1';
                }
                else{
                    echo 'Email sudah terdaftar';
                }
            }
            else{
                echo 'No Hape sudah terdaftar';
            }
        }
        else{
            echo 'Cek koneksi internet anda';
        }
    break;
}

?>