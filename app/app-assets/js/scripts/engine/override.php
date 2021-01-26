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
        case 'getdataevent':
            $Id_event = anti_Injection($_REQUEST['id_event']);
            $res = mysqli_query($conn, "SELECT * FROM tb_event WHERE Id_event = '$Id_event'");
            $r = mysqli_fetch_assoc($res);
            echo json_encode(array(
                'type' => $r['banner_type'],
                'banner' => $r['banner'],
                'judul' => $r['judul'],
                'desk' => $r['deskripsi'],
                'subjek' => $r['subjek'],
                'begin' => $r['tanggal_mulai'],
                'end' => $r['tanggal_akhir'],
                'event' => $r['tahun'] . '-' . $r['bulan'] . '-' . $r['hari'],
                'status' => $r['status']
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
                if ($banner != 'namlastcorp') {
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
            } else if ($status == 'Edit') {
                if ($banner != "namlastcorp") {
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
                } else {
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
        case 'getdatasubjek':
            $Id_event = anti_Injection($_REQUEST['id_event']);
            $res = mysqli_query($conn, "SELECT * FROM tb_subjek WHERE Id_event = '$Id_event'");
            $disp = '<table class="responsive-table">
                        <thead>
                            <tr>
                                <th data-field="id">No</th>
                                <th data-field="month">Subjek</th>
                                <th data-field="month">Jenjang</th>
                                <th data-field="month">Bidang</th>
                                <th data-field="item-sold" class="right-align">Mulai</th>
                                <th data-field="item-sold" class="right-align">Selesai</th>
                                <th data-field="item-sold" class="right-align">Peserta</th>
                                <th data-field="item-sold" class="right-align">Edit</th>
                                <th data-field="item-sold" class="right-align">Hapus</th>
                            </tr>
                        </thead>
                        <tbody id="listHist">';
            $no = 1;
            while ($r = mysqli_fetch_array($res)) {
                
                $mulai = explode(' ',$r['mulai_pelaksanaan']);
                $akhir = explode(' ',$r['akhir_pelaksanaan']);
                $modal = array($r['subjek'],$r['bidang_studi'],$mulai[0],$mulai[1],$akhir[0],$akhir[1],$r['chat_group'],$r['atom'],$r['gold'],$r['silver'],$r['bronze'],str_replace('"', 'KMA',str_replace('[', 'FLG',str_replace(']', "FRG",$r['jenjang']))));
                $disp .= '<tr>
                            <td>' . ($no++) . '</td>
                            <td>' . $r['subjek'] . '</td>
                            <td>' . listNumberArray(json_decode($r['jenjang'], false)) . '</td>
                            <td>' . $r['bidang_studi'] . '</td>
                            <td class="right-align">' . $r['mulai_pelaksanaan'] . '</td>
                            <td class="right-align">' . $r['akhir_pelaksanaan'] . '</td>
                            <td onclick="openoverlayListOfAllDataMember(\'' . '.BtnListOfAllMember' . $r["Id_subjek"] . '\',\'' . $r["Id_subjek"] . '\',\'' . $Id_event . '\')"
                                class="right-align BtnListOfAllMember' . $r["Id_subjek"] . '">
                            ' . getFollower($conn, $r['Id_subjek']) . '
                            </td>
                            <td class="right-align">
                                <a class="mb-6 btn-floating waves-effect waves-light gradient-45deg-amber-amber btnformBidang'.$r['Id_subjek'].'" onclick="openformBidang(\''.'.btnformBidang'.$r['Id_subjek'].'\',\''.'Edit'.'\',\''.$r['Id_subjek'].'\',\''.murnikanJson($modal).'\')">
                                    <i class="material-icons">edit</i>
                                </a>
                            </td>
                            <td class="right-align">
                                <a class="mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange">
                                    <i class="material-icons">delete</i>
                                </a>
                            </td>
                        </tr>';
            }
            echo $disp . '</tbody>
                </table>';
            break;

        case 'subject':
            echo Subject();
            break;
        case 'saveSubjectEvent':
            echo ResultDataSubject($_POST);
            break;
        case 'getdatakompetisi':
            $Id_event = anti_Injection($_REQUEST['id_event']);
            $arrResp = array();
            // ambil subjek event 
            $res = mysqli_query($conn,"SELECT subjek, tahun, bulan, hari FROM tb_event WHERE Id_event = '$Id_event'");
            $r = mysqli_fetch_assoc($res);
            array_push($arrResp, array('subjek'=>$r['subjek'],
                                       'tglevent'=>$r['tahun'].'-'.$r['bulan'].'-'.$r['hari']));
            
            // ambil jenjang
            $res = mysqli_query($conn,"SELECT * FROM dft_jenjang");
            $jenjang = array();
            $subjek = json_decode($r['subjek'],false);
            while($r = mysqli_fetch_array($res)){
                if(in_array($r['subjek'],$subjek)){
                    array_push($jenjang,array('jenjang'=>$r['jenjang'],
                                               'subjek'=>$r['subjek']));
                }
            }
            array_push($arrResp, array('jenjang'=>$jenjang));

            // ambil bidang studi
            $res = mysqli_query($conn,"SELECT * FROM dft_bidang_studi");
            $bidang = array();
            while($r = mysqli_fetch_array($res)){
                array_push($bidang, $r['bidang_studi']);
            }
            array_push($arrResp, array('bidang'=>$bidang));

            echo json_encode($arrResp);
            
            break;
        case 'saveformBidang':
            $subjek = anti_Injection($_POST['subjbidang']);
            $bidang = anti_Injection($_POST['bidang']);
            $mulai = $_POST['tglev1'].' '.$_POST['jammulai'];
            $akhir = $_POST['tglev2'].' '.$_POST['jamakhir'];
            $link = anti_Injection($_POST['linktg']);
            $price = anti_Injection($_POST['price']);
            $gold = anti_Injection($_POST['gold']);
            $silver = anti_Injection($_POST['silver']);
            $bronze = anti_Injection($_POST['bronze']);
            $jenjang = $_POST['jenjang'];
            $pos = anti_Injection($_POST['pos']);
            $status = anti_Injection($_POST['status']);
            $id_event = anti_Injection($_POST['id_event']);

            if($status=='New'){
                mysqli_query($conn,"INSERT INTO `tb_subjek` SET `Id_event` = '$id_event',
                                                                 `subjek` = '$subjek',
                                                                 `jenjang` = '$jenjang',
                                                                 `bidang_studi` = '$bidang',
                                                                 `mulai_pelaksanaan`  = '$mulai',
                                                                 `akhir_pelaksanaan`  = '$akhir',
                                                                 `kisi` = '',
                                                                 `chat_group` = '$link',
                                                                 `atom` = '$price',
                                                                 `gold` = '$gold',
                                                                 `silver` = '$silver',
                                                                 `bronze` = '$silver'");
                echo 'Berhasil di tambahkan';
            }
            break;
    }
} else {
    echo 0;
}
