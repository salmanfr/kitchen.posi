<?php
function gettoday()
{
  $date = time();
  date_default_timezone_set('Asia/Jakarta');
  $year = date('Y', $date);
  $month = date('m', $date);
  $day = date('d', $date);
  $hour = date('H', $date);
  $menit = date('i', $date);
  $detik = date('s', $date);
  $todays = $year . '-' . $month . '-' . $day . ' ' . $hour . ':' . $menit . ':' . $detik;
  return $todays;
}
function getTahun()
{
  $date = time();
  date_default_timezone_set('Asia/Jakarta');
  $year = date('Y', $date);
  return $year;
}
function gettodayShort()
{
  $date = time();
  date_default_timezone_set('Asia/Jakarta');
  $year = date('Y', $date);
  $month = date('m', $date);
  $day = date('d', $date);
  $hour = date('H', $date);
  $menit = date('i', $date);
  $detik = date('s', $date);
  $todays = $year . '-' . $month . '-' . $day;
  return $todays;
}
function anti_Injection($data)
{
  return htmlspecialchars($data, ENT_QUOTES);
}



function sendtowoowa($phone, $str)
{
  // $key_demo='db63f52c1a00d33cf143524083dd3ffd025d672e255cc688';
  $key_demo = 'aef55ac149e89a9b7019c1eb8acee2f7ece80a07e9537c06';

  $url = 'http://116.203.191.58/api/send_message';
  $data = array(
    "phone_no" => $phone,
    "key"     => $key_demo,
    "message" => $str
  );
  $data_string = json_encode($data, 1);
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_VERBOSE, 0);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
  curl_setopt($ch, CURLOPT_TIMEOUT, 360);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_string),
    'Authorization: Basic dXNtYW5ydWJpYW50b3JvcW9kcnFvZHJiZWV3b293YToyNjM3NmVkeXV3OWUwcmkzNDl1ZA=='
  ));
  $res = curl_exec($ch);
  curl_close($ch);

  return $res;
}
function getIdSekolah($conn, $prov, $kab, $kec, $sekolah)
{
  $res = mysqli_query($conn, "SELECT Id_sekolah FROM tb_sekolah WHERE propinsi = '$prov' AND kabupaten_kota = '$kab' AND kecamatan = '$kec' AND sekolah = '$sekolah'");
  $r = mysqli_fetch_assoc($res);
  return $r['Id_sekolah'];
}
function getBentukSekolah($conn, $id_sekolah)
{
  $res = mysqli_query($conn, "SELECT bentuk FROM tb_sekolah WHERE Id_sekolah = '$id_sekolah'");
  $r = mysqli_fetch_assoc($res);
  return $r['bentuk'];
}
function privateHashing($password)
{
  return 'lkwert938k' . md5(sha1($password . 'bukankaleng2'));
}

function cekKontak($conn, $phone)
{
  $res = mysqli_query($conn, "SELECT kontak FROM tb_member WHERE kontak = '$phone'");
  $r = mysqli_fetch_assoc($res);
  return ($r['kontak'] == '' ? true : false);
}
function cekEmail($conn, $email)
{
  $res = mysqli_query($conn, "SELECT email FROM tb_member WHERE email = '$email'");
  $r = mysqli_fetch_assoc($res);
  return ($r['email'] == '' ? true : false);
}

function kodeTanggalInvoice()
{
  $date = time();
  date_default_timezone_set('Asia/Jakarta');
  $year = date('Y', $date);
  $month = date('m', $date);
  $day = date('d', $date);
  $hour = date('H', $date);
  $menit = date('i', $date);
  $detik = date('s', $date);
  $todays = $day . $month . $year[2] . $year[3];
  return $todays;
}
function getIdLastTransaction($conn)
{
  $res = mysqli_query($conn, "SELECT Id_transaksi_paket FROM tb_transaksi_paket ORDER BY Id_transaksi_paket DESC LIMIT 1");
  $r = mysqli_fetch_assoc($res);
  return sixDigit($r['Id_transaksi_paket'] == '' ? '0' : $r['Id_transaksi_paket']);
}
function sixDigit($number)
{
  return strlen($number) == 1 ? '00000' . $number : (strlen($number) == 2 ? '0000' . $number : (strlen($number) == 3 ? '000' . $number : (strlen($number) == 4 ? '00' . $number : (strlen($number) == 5 ? '0' . $number : $number))));
}
function renewCodeInvoice($conn)
{
  return kodeTanggalInvoice() . '-' . getIdLastTransaction($conn);
}
function cekKodeInv($conn, $kodeInv)
{
  $res = mysqli_query($conn, "SELECT kode_transaksi FROM tb_transaksi_paket WHERE kode_transaksi = '$kodeInv'");
  $r = mysqli_fetch_assoc($res);
  return $r['kode_transaksi'] == '' ? true : false;
}
function convertVoucher($number)
{
  if ($number == '1') {
    return array(
      'kontext' => 'Paket Planet (100 Atom)',
      'atom' => '100',
      'bonus' => '0',
      'harga' => '100000'
    );
  } else if ($number == '2') {
    return array(
      'kontext' => 'Paket Galaxy (2000 Atom + Bonus 5 Atom)',
      'atom' => '2000',
      'bonus' => '5',
      'harga' => '2000000'
    );
  } else if ($number == '3') {
    return array(
      'kontext' => 'Paket Tata Surya (1000 Atom + Bonus 2 Atom)',
      'atom' => '1000',
      'bonus' => '2',
      'harga' => '1000000'
    );
  } else if ($number == '4') {
    return array(
      'kontext' => 'Paket Matahari (500 Atom + Bonus 1 Atom)',
      'atom' => '500',
      'bonus' => '1',
      'harga' => '500000'
    );
  }
}
function getUnik($conn)
{
  $res = mysqli_query($conn, "SELECT Id_kode_tf FROM tb_kode_tf WHERE ket = 'unused' LIMIT 1");
  $r = mysqli_fetch_assoc($res);

  mysqli_query($conn, "UPDATE tb_kode_tf SET ket = 'used' WHERE Id_kode_tf = '" . $r['Id_kode_tf'] . "'");
  return $r['Id_kode_tf'];
}
function cekJumlahTransaksi($conn, $Id_member)
{
  $res = mysqli_query($conn, "SELECT COUNT(Id_transaksi_paket) as jlh FROM tb_transaksi_paket WHERE id_member = '$Id_member' AND `status` = '0'");
  $r = mysqli_fetch_assoc($res);
  return intval($r['jlh']) >= 4 ? false : true;
}
function getmenitfrom2date($target, $run)
{
  $tgl1 = $target;
  $tgl2 = $run;
  $date2 = strtotime($tgl1);
  $date1 = strtotime($tgl2);
  $tgl = ($date2 - $date1) / (60);
  $jdl = round($tgl);
  return ($jdl);
}
function changeStatusTransactionPaket($conn, $id_transaction, $status, $kode_tf)
{
  mysqli_query($conn, "UPDATE tb_transaksi_paket SET `status` = '$status' WHERE Id_transaksi_paket = '$id_transaction'");
  changeketkodetf($conn, $kode_tf);
}

function changeketkodetf($conn, $kode_tf)
{
  mysqli_query($conn, "UPDATE tb_kode_tf SET ket = 'unused' WHERE Id_kode_tf = '$kode_tf'");
}

function getDataMember($conn, $Id_member)
{
  $res = mysqli_query($conn, "SELECT * FROM tb_member WHERE Id_member = '$Id_member'");
  $r = mysqli_fetch_assoc($res);
  return $r;
}
function convertCurrency($e)
{
  if (strlen($e) > 3) {
    $data = '';
    $g = 0;
    for ($i = strlen($e) - 1; $i >= 0; $i--) {
      $g++;
      $data = $e[$i] . $data;
      if ($g % 3 == 0 && $g != strlen($e)) {
        $data = '.' . $data;
      }
    }
    return $data;
  } else {
    return $e;
  }
}
function getMyAtom($conn, $Id_member)
{
  $res = mysqli_query($conn, "SELECT atom, ket FROM tb_transaksi WHERE id_member = '$Id_member'");
  $myatom = 0;
  while ($r = mysqli_fetch_array($res)) {
    if ($r['ket'] == 'in') {
      $myatom = $myatom + $r['atom'];
    } else {
      $myatom = $myatom - $r['atom'];
    }
  }
  return $myatom;
}
function murnikanJson($modal)
{
  return str_replace('}', "F212F", str_replace('{', "A212A", str_replace('"', 'Q212Q', json_encode($modal))));
}

function getJumPeserta($conn, $id_event)
{
  $res = mysqli_query($conn, "SELECT COUNT(Id_kompetisi) AS jlh FROM tb_kompetisi WHERE Id_event = '$id_event'");
  $r = mysqli_fetch_assoc($res);
  return $r['jlh'] == '' ? '0' : $r['jlh'];
}
function listPoin($kisi)
{
  $arr = json_decode($kisi, false);
  $list = '<ol>';
  for ($i = 0; $i < COUNT($arr); $i++) {
    $list .= '<li>' . $arr[$i] . '</li>';
  }
  return $list . '</ol>';
}
function cekKepesertaan($conn, $Id_member, $id_subjek, $terdaftar)
{
  $res = mysqli_query($conn, "SELECT Id_kompetisi FROM tb_kompetisi WHERE Id_subjek = '$id_subjek' AND Id_member = '$Id_member'");
  $r = mysqli_fetch_assoc($res);
  if ($r['Id_kompetisi'] != '') {
    return 'registrated';
  } else {
    if ($terdaftar) {
      return 'locked';
    } else {
      return '<a onclick="openformUploadReg(\'' . '.formUplReg' . $id_subjek . '\',\'' . $id_subjek . '\')" class="formUplReg' . $id_subjek . ' waves-effect waves-light btn gradient-45deg-green-teal z-depth-4 mr-1 mb-2">daftar</a>';
    }
  }
}

function murnikanKontak($kontak)
{
  $kontak = str_replace('+620', '+62', $kontak);
  if ($kontak[0] == '0') {
    $number = '';
    for ($i = 1; $i < strlen($kontak); $i++) {
      $number .= $kontak[$i];
    }
    $number = '+62' . $number;
  } else {
    $number = $kontak;
  }
  return $number;
}
function getNamaBulan($angka)
{
  $bulan = array(
    '01' => 'Januari',
    '02' => 'Februari',
    '03' => 'Maret',
    '04' => 'April',
    '05' => 'Mei',
    '06' => 'Juni',
    '07' => 'Juli',
    '08' => 'Agustus',
    '09' => 'September',
    '10' => 'Oktober',
    '11' => 'November',
    '12' => 'Desember',
  );
  return $bulan[$angka];
}

function beautyDate($tanggal)
{
  $tgl = explode(' ', $tanggal);
  $part = explode('-', $tgl[0]);
  return $part[2] . ' ' . getNamaBulan($part[1]) . ' ' . $part[0] . ' ' . $tgl[1];
}
function cekLockedKompetisi($conn, $idevent, $Id_member)
{
  $res = mysqli_query($conn, "SELECT Id_subjek FROM tb_kompetisi WHERE Id_event = '$idevent' AND Id_member = '$Id_member'");
  $r = mysqli_fetch_assoc($res);
  return $r['Id_subjek'] != '' ? true : false;
}
function getEventFromId($conn, $idevent)
{
  $res = mysqli_query($conn, "SELECT judul FROM tb_event WHERE Id_event = '$idevent'");
  $r = mysqli_fetch_assoc($res);
  return $r['judul'];
}
function getBidangStudiFromId($conn, $idsubjek)
{
  $res = mysqli_query($conn, "SELECT bidang_studi FROM tb_subjek WHERE Id_subjek = '$idsubjek'");
  $r = mysqli_fetch_assoc($res);
  return $r['bidang_studi'];
}
function getloveEvent($conn, $pos)
{
  $res = mysqli_query($conn, "SELECT love FROM tb_event WHERE Id_event = '$pos'");
  $r = mysqli_fetch_assoc($res);
  return $r['love'];
}

function removeArrayByValue($target, $array)
{
  if (($key = array_search($target, $array)) !== false) {
    unset($array[$key]);
    $array = array_values($array);
    return $array;
  } else {
    return $array;
  }
}
function cekloveMyId($Id_member, $love)
{
  return in_array($Id_member, $love);
}
function getGrupChat($conn, $id_subjek)
{
  $res = mysqli_query($conn, "SELECT chat_group FROM tb_subjek WHERE Id_subjek = '$id_subjek'");
  $r = mysqli_fetch_assoc($res);
  return $r['chat_group'];
}

function getJlhMemberKontext($conn, $kontext)
{
  $res = mysqli_query($conn, "SELECT COUNT(Id_member) as jlh FROM tb_member WHERE subjek = '$kontext'");
  $r = mysqli_fetch_assoc($res);
  return $r['jlh'];
}
function getOriginalLink()
{
  return 'http://localhost/';
}
function getAssetslLink()
{
  return 'http://localhost/';
}
function uploadMyImageString($name, $file)
{
  $post = [
    'token' => 'namlastcorp',
    'name' => $name,
    'file'   => $file,
  ];
  $ch = curl_init(getAssetslLink() . '/posiassets/upl.php');
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

  // execute!
  $response = curl_exec($ch);

  // close the connection, release resources used
  curl_close($ch);

  // do anything you want with your response
  return $response;
}



function query($query)
{
  global $conn;

  $result = mysqli_query($conn, $query);
  $rows = [];

  while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row;
  }

  return $rows;
}

function ProsesData($query)
{
  global $conn;
  mysqli_query($conn, $query);

  return mysqli_affected_rows($conn);
}


function moveData($id)
{

  $moveData = query("SELECT * FROM `tb_event` WHERE `Id_event` = '$id'")[0];

  $data1 = $moveData["Id_event"];
  $data2 = $moveData["banner_type"];
  $data3 = $moveData["banner"];
  $data4 = $moveData["judul"];
  $data5 = $moveData["deskripsi"];
  $data6 = $moveData["subjek"];
  $data7 = $moveData["tanggal_mulai"];
  $data8 = $moveData["tanggal_akhir"];
  $data9 = $moveData["love"];
  $data10 = $moveData["komentar"];
  $data11 = $moveData["tahun"];
  $data12 = $moveData["bulan"];
  $data13 = $moveData["hari"];
  $data14 = $moveData["status"];


  $query = "INSERT INTO `tb_event_hapus`
            VALUES
            (NULL, '$data1', '$data2', '$data3', '$data4', '$data5', '$data6', '$data7', 
             '$data8', '$data9', '$data10', '$data11', '$data12', '$data13', '$data14')
           ";
  ProsesData($query);
}
