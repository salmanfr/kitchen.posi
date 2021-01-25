<?php
require 'conn.php';
require 'function.php';
$today = gettoday();
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://app.moota.co/api/v1/bank/epokO6vDWaJ/mutation');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'Authorization: Bearer OXAqsE67rL2LjWc9nQK6jDSqbwpSpc4WgKyNN2RxrxwtVAdVct'
]);
$response = curl_exec($curl);


$array = (object)json_decode($response, false);
$array_response =  $array->data;


for($i=(COUNT($array_response)-1);$i>=0;$i--){
     $obj = $array_response[$i];
     $tanggal = $obj->date;
     $deskripsi = $obj->description;
     $amount = str_replace(".00","",$obj->amount);
     $mutation_id = $obj->mutation_id;
     $bank = $obj->bank;
     $type = $obj->type;
     $balance = $bank->balance;
     
     cekTransaksiPaket($conn,$tanggal,$today,$deskripsi,$mutation_id,$amount,$balance,$type);
}


// cek expired transaksi
$res = mysqli_query($conn,"SELECT tanggal_batas, Id_transaksi_paket, kode_tf FROM tb_transaksi_paket WHERE `status` = '0'");
while($r = mysqli_fetch_array($res)){
    $menit = getmenitfrom2date($r['tanggal_batas'],gettoday());
    if($menit < 0){
        changeStatusTransactionPaket($conn,$r['Id_transaksi_paket'], '2' ,$r['kode_tf']);
    }
}

// log activity 
mysqli_query($conn,"INSERT INTO log_activity_moota SET `date` = '$today'");



function cekTransaksiPaket($conn,$tanggal,$today,$deskripsi,$mutation_id,$amount,$balance,$type){
    // cek mutasi id sudah di upload apa tidak
    $res = mysqli_query($conn,"SELECT Id_moota_tf FROM tb_moota_tf WHERE mutation_id = '$mutation_id'");
    $r = mysqli_fetch_assoc($res);
    if($r['Id_moota_tf']==''){
        
        mysqli_query($conn,"INSERT INTO tb_moota_tf SET tanggal_bank = '$tanggal',
                                                        tanggal_akses = '$today',
                                                        deskripsi = '$deskripsi',
                                                        mutation_id = '$mutation_id',
                                                        amount = '$amount',
                                                        balance = '$balance',
                                                        Id_transaksi = '0',
                                                        kode_transaksi = '',
                                                        `type` = '$type'");  
        if($type=='CR'){ 
            $last_id = mysqli_insert_id($conn);       
            pindaiAmount($conn,$amount,$last_id);                                 
        }     
    }
    
}

function pindaiAmount($conn,$amount,$last_id){
    $res = mysqli_query($conn,"SELECT  * FROM tb_transaksi_paket WHERE status = '0' AND (nilai_transaksi+kode_tf) = '$amount'");
    $r = mysqli_fetch_assoc($res);
    if($r['id_member']!=''){
       
         
        // masukkan ke tb_transaksi
        $kode_transaksi = $r['kode_transaksi'];
        $id_transaksi_paket = $r['Id_transaksi_paket'];
        mysqli_query($conn,"INSERT INTO tb_transaksi (kode_transaksi, nilai_transaksi, kontext, tanggal, jam, id_member, atom, ket, kode_tf, confirm_admin, confirm_user, woowa) 
                            SELECT kode_transaksi, nilai_transaksi, kontext, tanggal, jam, id_member, atom, ket, kode_tf, '3', '1','' FROM tb_transaksi_paket WHERE kode_transaksi = '$kode_transaksi'");
        $last_id_tb_transaksi = mysqli_insert_id($conn);

        // insert bonus
        $bonus = getBonus($r['atom']);
        if($bonus>0){
            mysqli_query($conn,"INSERT INTO tb_transaksi (kode_transaksi, nilai_transaksi, kontext, tanggal, jam, id_member, atom, ket, kode_tf, confirm_admin, confirm_user, woowa)
                                SELECT kode_transaksi, '0', CONCAT('Bonus ',kontext), tanggal, jam, id_member, '$bonus', ket, '0', '3', '1','bonus' FROM tb_transaksi_paket WHERE kode_transaksi = '$kode_transaksi'");
        }

         // buat moota terverivikasi
         mysqli_query($conn,"UPDATE tb_moota_tf SET Id_transaksi = '$last_id_tb_transaksi',  kode_transaksi = '$kode_transaksi' WHERE Id_moota_tf = '$last_id'");

        // ubah status terverifikasi
        changeStatusTransactionPaket($conn,$id_transaksi_paket, '1' ,$r['kode_tf']);
        // kirim konfirmasi ke wa
        $member  = getDataMember($conn,$r['id_member']);
        $str = 'Hi '.$member['nama'].'\r\n';
        $str .= 'Transfer anda untuk pembelian '.$r['kontext'].' \r\n';
        $str .= 'Sebesar Rp. '.convertCurrency((string)$amount).' \r\n';
        $str .= 'dengan NO INVOICE #'.$r['kode_transaksi'].'\r\n';
        $str .= 'Telah berhasil dikonfirmasi oleh system kami \r\n';
        $str .= 'Terima kasih \r\n';
        $str .= '\r\n';
        $str .= '\r\n';
        $str .= 'TTD Yayasan Pendidikan POSI';
        $statuswoowa = sendtowoowa($member['kontak'],$str);
        mysqli_query($conn,"UPDATE tb_transaksi SET woowa = '$statuswoowa' WHERE Id_transaksi = '$last_id_tb_transaksi'");
    }    
    else{
    	 mysqli_query($conn,"UPDATE tb_moota_tf SET matcheds = '0' WHERE Id_moota_tf = '$last_id'");
    }
}

function getBonus($atom){
    if($atom==2000){
        return 5;
    }
    else if($atom==1000){
        return 2;
    }
    else if($atom=='500'){
        return 1;
        
    }
    else{
        return 0;
    }
}

?>