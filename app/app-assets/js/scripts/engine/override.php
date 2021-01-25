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
            echo timeLine($conn, $subjek, $tahun, $Id_member);
            break;
        case 'cekexpiredpaket':
            $res = mysqli_query($conn, "SELECT tanggal_batas, Id_transaksi_paket, kode_tf FROM tb_transaksi_paket WHERE id_member = '$Id_member' AND status = '0'");
            while ($r = mysqli_fetch_array($res)) {
                $menit = getmenitfrom2date($r['tanggal_batas'], gettoday());
                if ($menit < 0) {
                    changeStatusTransactionPaket($conn, $r['Id_transaksi_paket'], '2', $r['kode_tf']);
                }
            }
            break;
        case 'invoice':
            $arrVoucher = convertVoucher(anti_Injection($_REQUEST['vouch']));
            $today = explode(' ', gettoday());
            $kodeInv = renewCodeInvoice($conn);
            if (cekJumlahTransaksi($conn, $Id_member)) {
                if (cekKodeInv($conn, $kodeInv)) {
                    $arrVoucher['tanggal'] = $today[0];
                    $arrVoucher['jam'] = $today[1];
                    $arrVoucher['invoice'] = $kodeInv;
                    $arrVoucher['tempo'] = date("Y-m-d H:i:s", strtotime('+48 hours', strtotime(gettoday())));
                    $arrVoucher['kodetf'] = getUnik($conn);
                    $arrVoucher['status'] = '1';

                    mysqli_query($conn, "INSERT INTO tb_transaksi_paket SET kode_transaksi = '" . $kodeInv . "',
                                                                        nilai_transaksi = '" . $arrVoucher['harga'] . "',
                                                                        kontext = '" . $arrVoucher['kontext'] . "',
                                                                        tanggal = '" . $today[0] . "',
                                                                        jam = '" . $today[1] . "',
                                                                        id_member = '$Id_member',
                                                                        atom = '" . $arrVoucher['atom'] . "',
                                                                        ket='in',
                                                                        kode_tf = '" . $arrVoucher['kodetf'] . "',
                                                                        tanggal_batas = '" . $arrVoucher['tempo'] . "',
                                                                        `status` = '0',
                                                                        woowa = ''");
                    $last_id = mysqli_insert_id($conn);
                    $members = getDataMember($conn, $Id_member);
                    $str = 'Hi ' . $members['nama'] . ' \r\nNO INVOICE ANDA #' . $arrVoucher['invoice'] . '\r\n';
                    $str .= 'Bank Mandiri \r\n';
                    $str .= 'An. Yayasan Pendidikan POSI \r\n';
                    $str .= 'No Rekening : 105-00-26-333-777 \r\n';
                    $str .= 'Jatuh Tempo : ' . $arrVoucher['tempo'] . ' \r\n';
                    $str .= 'Total Nominal Transfer : Rp. ' . convertCurrency((string)($arrVoucher['harga'] + $arrVoucher['kodetf'])) . ' \r\n';
                    $str .= 'Untuk Pembelian ' . $arrVoucher['kontext'] . ' \r\n';
                    $str .= '\r\n\r\nNB : \r\n';
                    $str .= '1. Transferlah sesuai jumlah Total Nominal Transfer agar terverifikasi automatis. \r\n';
                    $str .= '2. Invoice ini berlaku sebelum tanggal Jatuh Tempo';


                    $statuswoowa = sendtowoowa($kontak, $str);
                    mysqli_query($conn, "UPDATE tb_transaksi_paket SET woowa = '$statuswoowa' WHERE Id_transaksi_paket = '$last_id'");
                    echo json_encode($arrVoucher);
                } else {
                    $kodeInv = renewCodeInvoice($conn);
                    $arrVoucher['tanggal'] = $today[0];
                    $arrVoucher['jam'] = $today[1];
                    $arrVoucher['invoice'] = $kodeInv;
                    $arrVoucher['tempo'] = $kodeInv;
                    $arrVoucher['tempo'] = date("Y-m-d H:i:s", strtotime('+48 hours', strtotime(gettoday())));
                    $arrVoucher['kodetf'] = getUnik($conn);
                    $arrVoucher['status'] = '1';
                    mysqli_query($conn, "INSERT INTO tb_transaksi_paket SET kode_transaksi = '" . $kodeInv . "',
                                                                            nilai_transaksi = '" . $arrVoucher['harga'] . "',
                                                                            kontext = '" . $arrVoucher['kontext'] . "',
                                                                            tanggal = '" . $today[0] . "',
                                                                            jam = '" . $today[1] . "',
                                                                            id_member = '$Id_member',
                                                                            atom = '" . $arrVoucher['atom'] . "',
                                                                            ket='in',
                                                                            kode_tf = '" . $arrVoucher['kodetf'] . "',
                                                                            tanggal_batas = '" . $arrVoucher['tempo'] . "',
                                                                            `status` = '0'");

                    $members = getDataMember($conn, $Id_member);
                    $str = 'Hi ' . $members['nama'] . ' \r\nNO INVOICE ANDA #' . $arrVoucher['invoice'] . '\r\n';
                    $str .= 'Bank Mandiri \r\n';
                    $str .= 'An. Yayasan Pendidikan POSI \r\n';
                    $str .= 'No Rekening : 105-00-26-333-777 \r\n';
                    $str .= 'Jatuh Tempo : ' . $arrVoucher['tempo'] . ' \r\n';
                    $str .= 'Total Nominal Transfer : Rp. ' . convertCurrency((string)($arrVoucher['harga'] + $arrVoucher['kodetf'])) . ' \r\n';
                    $str .= 'Untuk Pembelian ' . $arrVoucher['kontext'] . ' \r\n';
                    $str .= '\r\n\r\nNB : \r\n';
                    $str .= '1. Transferlah sesuai jumlah Total Nominal Transfer agar terverifikasi automatis. \r\n';
                    $str .= '2. Invoice ini berlaku sebelum tanggal Jatuh Tempo';
                    sendtowoowa($kontak, $str);
                    echo json_encode($arrVoucher);
                }
            } else {
                echo json_encode(array('status' => 'Anda memiliki 4 pembelian paket yang belum diselesaikan, mohon selesaikan terlebih dahulu'));
            }
            break;
        case 'loadtransaksi':
            $res = mysqli_query($conn, "SELECT COUNT(Id_transaksi_paket) as jlh FROM tb_transaksi_paket WHERE id_member = '$Id_member' AND `status` = '0'");
            $r = mysqli_fetch_assoc($res);
            echo json_encode(array(
                'number' => $r['jlh'],
                'atom' => getMyAtom($conn, $Id_member)
            ));
            break;
        case 'getlistcart':
            $res = mysqli_query($conn, "SELECT * FROM tb_transaksi_paket WHERE id_member = '$Id_member' AND `status` = '0'");
            $disp = '';
            $no = 1;
            $today = explode(' ', gettoday());
            while ($r = mysqli_fetch_array($res)) {
                $modal = array(
                    'invoice' => $r['kode_transaksi'],
                    'tempo' => $r['tanggal_batas'],
                    'harga' => $r['nilai_transaksi'],
                    'kodetf' => $r['kode_tf']
                );
                $disp .= '<tr>
                                <td>' . ($no++) . '</td>
                                <td>#' . $r['kode_transaksi'] . '</td>
                                <td>' . $r['kontext'] . '</td>
                                <td>' . $r['tanggal'] . ' ' . $r['jam'] . '</td>
                                <td>' . $r['tanggal_batas'] . '</td>
                                <td>Rp. ' . convertCurrency((string)$r['nilai_transaksi']) . '</td>
                                <td>Rp. ' . convertCurrency((string)$r['kode_tf']) . '</td>
                                <td>Rp. ' . convertCurrency((string)($r['nilai_transaksi'] + $r['kode_tf'])) . '</td>
                                <td><a onclick="showPrintInvoice(\'' . murnikanJson($modal) . '\')" class="mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange">
                                        <i class="material-icons">receipt</i>
                                    </a>
                                </td>

                            </tr>';
            }
            echo $disp;
            break;
        case 'riwayattransaksi':
            $res = mysqli_query($conn, "SELECT * FROM tb_transaksi WHERE id_member = '$Id_member' ORDER BY Id_transaksi DESC");
            $disp = '';
            $no = 1;
            while ($r = mysqli_fetch_array($res)) {
                $disp .= '<tr>
                                <td>' . ($no++) . '</td>
                                <td>#' . $r['kode_transaksi'] . '</td>
                                <td>' . $r['tanggal'] . ' ' . $r['jam'] . '</td>
                                <td>' . $r['kontext'] . '</td>
                                <td class="right-align tut">' . $r['atom'] . ($r['ket'] == 'in' ? '<i class="material-icons gr">south</i>' : '<i class="material-icons rd">north</i>') . '</td>
                             </tr>';
            }
            echo json_encode(array(
                'tbl' => $disp,
                'atom' => getMyAtom($conn, $Id_member)
            ));
            break;
        case 'loadevent':
            $idevent = anti_Injection($_POST['idevent']);
            $disp = '';
            $no = 1;
            $terdaftar = cekLockedKompetisi($conn, $idevent, $Id_member);
            $res = mysqli_query($conn, "SELECT * FROM tb_subjek WHERE Id_event = '$idevent' AND subjek = '$subjek'");
            while ($r = mysqli_fetch_array($res)) {
                $jenjang = json_decode($r['jenjang'], false);
                if (in_array($bentuk, $jenjang)) {
                    $disp .= '<tr>
                                    <td data-field="id">' . ($no++) . '</td>
                                    <td data-field="month">' . $r['bidang_studi'] . '</td>
                                    <td data-field="item-sold" class="right-align">' . beautyDate($r['mulai_pelaksanaan']) . '</td>
                                    <td data-field="item-sold" class="right-align">' . beautyDate($r['akhir_pelaksanaan']) . '</td>
                                    <th data-field="item-sold"><a onclick="openformReg(\'' . '.btnformReg' . $r['Id_event'] . '\',\'' . $r['Id_event'] . '\')" class="btnformReg' . $r['Id_event'] . ' waves-effect waves-light btn gradient-45deg-red-pink z-depth-4 mr-1 mb-2">lihat</a></th>
                                    <td data-field="item-sold">' . cekKepesertaan($conn, $Id_member, $r['Id_subjek'], $terdaftar) . '</td>
                                </tr>';
                }
            }
            echo '<table class="responsive-table">
                        <thead>
                            <tr>
                                <th data-field="id">No</th>
                                <th data-field="month">Bidang</th>
                                <th data-field="item-sold" class="right-align">Mulai</th>
                                <th data-field="item-sold" class="right-align">Selesai</th>
                                <th data-field="item-sold" class="float-right">Silabus</th>
                                <th data-field="item-sold" class="">Registrasi</th>
                            </tr>
                        </thead>
                        <tbody id="listHist">
                            ' . $disp . '
                        </tbody>
                    </table>';
            break;
        case 'saveformUploadReg':

            $id_subjek = anti_Injection($_POST['pos']);
            $files = json_decode($_POST['files'], false);
            $arrImg = array();
            $upload_dir = '../../../images/upload/';
            for ($i = 0; $i < COUNT($files); $i++) {
                $token = md5(gettoday() . $i) . '.jpg';
                array_push($arrImg, $token);
                $img = str_replace('data:image/png;base64,', '', $files[$i]);
                $img = str_replace(' ', '+', $img);
                $name = $token;
                $data = base64_decode($img);
                $file = $upload_dir . $name;
                $success = file_put_contents($file, $data);
            }
            $arrImg = json_encode($arrImg);
            mysqli_query($conn, "INSERT INTO tb_kompetisi (Id_event, Id_subjek, Id_member, mulai_pelaksanaan, akhir_pelaksanaan, kisi, original, jawaban_peserta, gbr)
                                                                           SELECT Id_event, Id_subjek,'$Id_member', mulai_pelaksanaan, akhir_pelaksanaan, kisi, '', '', '$arrImg' FROM tb_subjek WHERE Id_subjek = '$id_subjek'");
            echo '1';
            break;
        case 'dispkompetisi':
            echo dispKompetisi($conn, $Id_member);
            break;
        case 'makemelove':
            $pos = anti_Injection($_REQUEST['pos']);
            $love = json_decode(getloveEvent($conn, $pos), false);
            if (in_array($Id_member, $love)) {
                $love = removeArrayByValue($Id_member, $love);
                $loves = ($love == null ? '[]' : json_encode($love));
                mysqli_query($conn, "UPDATE tb_event SET love = '$loves' WHERE Id_event = '$pos'");
                echo json_encode(array(
                    'love' => COUNT($love),
                    'icon' => 'favorite_border'
                ));
            } else {
                array_push($love, $Id_member);
                $loves = json_encode($love);
                mysqli_query($conn, "UPDATE tb_event SET love = '$loves' WHERE Id_event = '$pos'");
                echo json_encode(array(
                    'love' => COUNT($love),
                    'icon' => 'favorite'
                ));
            }

            break;
        case 'getParameterForKontent':
            echo showResultParameterKonten($_REQUEST);
            break;
    }
} else {
    echo 0;
}
