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
                                <a class="mb-6 btn-floating waves-effect waves-light gradient-45deg-amber-amber">
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

        case 'BidangEvent':
            echo BidangEvent();
            break;
        case 'saveoverlayBidangEvent':
            echo ResultDataOverlayBidangEvent($_POST);
            break;

        case 'Jenjang':
            echo Jenjang();
            break;
        case 'saveOverlayJenjang':
            echo ResultDataJenjang($_POST);
            break;
        case 'getListOfAllDataMember':
            echo ResultDataListOfAllDataMember($_REQUEST);
            break;
    }
} else {
    echo 0;
}
