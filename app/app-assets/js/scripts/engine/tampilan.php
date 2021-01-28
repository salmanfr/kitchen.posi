<?php
error_reporting(0);
function dispDashboard($conn)
{
    $guru  = getJlhMemberKontext($conn, 'Guru');
    $siswa = getJlhMemberKontext($conn, 'Siswa');
    $mahasiswa = getJlhMemberKontext($conn, 'Mahasiswa');
    $total = $guru + $siswa + $mahasiswa;
    return '  <div class="section">
  <!-- card stats start -->
  <div id="card-stats" class="pt-0">
      <div class="row">
           <div class="col s12 m6 l3">
                <div class="card animate fadeLeft">
                    <div class="card-content cyan white-text">
                        <p class="card-stats-title"><i class="material-icons">group</i>All Member</p>
                        <h4 class="card-stats-number white-text">' . $total . '</h4>
                        
                    </div>
                    <div class="card-action cyan darken-1">
                        <div id="clients-bar" class="center-align"><canvas style="display: inline-block; width: 227px; height: 25px; vertical-align: top;" width="227" height="25"></canvas></div>
                    </div>
                </div>
          </div>
          <div class="col s12 m6 l3">
              <div class="card animate fadeLeft">
                  <div class="card-content red accent-2 white-text">
                      <p class="card-stats-title"><i class="material-icons">people</i> Siswa
                      </p>
                      <h4 class="card-stats-number white-text">' . $siswa . '</h4>

                  </div>
                  <div class="card-action red">
                      <div id="sales-compositebar" class="center-align"></div>
                  </div>
              </div>
          </div>
          <div class="col s12 m6 l3">
              <div class="card animate fadeRight">
                  <div class="card-content orange lighten-1 white-text">
                      <p class="card-stats-title"><i class="material-icons">people_alt</i> Mahasiswa
                      </p>
                      <h4 class="card-stats-number white-text">' . $mahasiswa . '</h4>

                  </div>
                  <div class="card-action orange">
                      <div id="profit-tristate" class="center-align"></div>
                  </div>
              </div>
          </div>
          <div class="col s12 m6 l3">
              <div class="card animate fadeRight">
                  <div class="card-content green lighten-1 white-text">
                      <p class="card-stats-title"><i class="material-icons">people_outline</i> Guru
                      </p>
                      <h4 class="card-stats-number white-text">' . $guru . '</h4>

                  </div>
                  <div class="card-action green">
                      <div id="invoice-line" class="center-align"></div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <!--card stats end-->
  <!--chart dashboard start-->
  <div id="chart-dashboard">
      <div class="row">
          <div class="col s12 m8 l8">
              <div class="card animate fadeUp">
                  <div class="card-move-up waves-effect waves-block waves-light">
                      <div class="move-up cyan darken-1">

                          <div class="trending-line-chart-wrapper"><canvas id="revenue-line-chart" height="90"></canvas>
                          </div>
                      </div>
                  </div>
                  <div class="card-content">
                      <a class="btn-floating btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                          <i class="material-icons activator">filter_list</i>
                      </a>
                      <div class="col s12 m3 l3">
                          <div id="doughnut-chart-wrapper">
                              <canvas id="doughnut-chart" height="200"></canvas>
                              <div class="doughnut-chart-status">
                                  <p class="center-align font-weight-600 mt-4">1</p>
                                  <p class="ultra-small center-align">Competition</p>
                              </div>
                          </div>
                      </div>
                      <div class="col s12 m2 l2">
                          <ul class="doughnut-chart-legend">
                              <li class="mobile ultra-small"><span class="legend-color"></span>PC</li>
                             
                              <li class="kitchen ultra-small"><span class="legend-color"></span> AC
                              </li>
                          </ul>
                      </div>
                      <div class="col s12 m5 l6">
                          <div class="trending-bar-chart-wrapper"><canvas id="trending-bar-chart" height="90"></canvas></div>
                      </div>
                  </div>
                  <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">Revenue by Month <i
                              class="material-icons right">close</i>
                      </span>
                      <table class="responsive-table">
                          <thead>
                              <tr>
                                  <th data-field="id">ID</th>
                                  <th data-field="month">Month</th>
                                  <th data-field="item-sold">Item Sold</th>
                                  <th data-field="item-price">Item Price</th>
                                  <th data-field="total-profit">Total Profit</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>1</td>
                                  <td>January</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>2</td>
                                  <td>February</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>3</td>
                                  <td>March</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>4</td>
                                  <td>April</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>5</td>
                                  <td>May</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>6</td>
                                  <td>June</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>7</td>
                                  <td>July</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>8</td>
                                  <td>August</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>9</td>
                                  <td>Septmber</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>10</td>
                                  <td>Octomber</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>11</td>
                                  <td>November</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                              <tr>
                                  <td>12</td>
                                  <td>December</td>
                                  <td>122</td>
                                  <td>100</td>
                                  <td>$122,00.00</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
          <div class="col s12 m4 l4">
              <div class="card animate fadeUp">
                  <div class="card-move-up teal accent-4 waves-effect waves-block waves-light">
                      <div class="move-up">
                          <p class="margin white-text">Subject Stats</p>
                          <canvas id="trending-radar-chart" height="114"></canvas>
                      </div>
                  </div>
                  <div class="card-content  teal">
                      <a class="btn-floating btn-move-up waves-effect waves-light red accent-2 z-depth-4 right">
                          <i class="material-icons activator">done</i>
                      </a>
                      <div class="line-chart-wrapper">
                          <p class="margin white-text">Medal By Year</p>
                          <canvas id="line-chart" height="114"></canvas>
                      </div>
                  </div>
                  <div class="card-reveal">
                      <span class="card-title grey-text text-darken-4">Revenue by country <i
                              class="material-icons right">close</i>
                      </span>
                      <table class="responsive-table">
                          <thead>
                              <tr>
                                  <th data-field="country-name">Country Name</th>
                                  <th data-field="item-sold">Item Sold</th>
                                  <th data-field="total-profit">Total Profit</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>USA</td>
                                  <td>65</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>UK</td>
                                  <td>76</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>Canada</td>
                                  <td>65</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>Brazil</td>
                                  <td>76</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>India</td>
                                  <td>65</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>France</td>
                                  <td>76</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>Austrelia</td>
                                  <td>65</td>
                                  <td>$452.55</td>
                              </tr>
                              <tr>
                                  <td>Russia</td>
                                  <td>76</td>
                                  <td>$452.55</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  </div>


</div>';
}

function timeLine($conn, $subjek, $tahun, $Id_member)
{
    $res = mysqli_query($conn, "SELECT * FROM tb_event WHERE tahun = '$tahun' ORDER BY Id_event DESC");
    $k = 0;
    $disp = "";
    while ($r = mysqli_fetch_array($res)) {
            $k++;
            $banner = ($r['banner_type'] == 'video' ? 'https://img.youtube.com/vi/' . $r['banner'] . '/hqdefault.jpg' : getAssetslLink() . 'fold/' . $r['banner']);
            if ($k % 2 == 0) {
                $disp .= '<li class="timeline-inverted">
                                <div class="timeline-badge green">
                                    <a class="tooltipped" data-position="top" data-tooltip="Aug 19 2019"> <i class="material-icons white-text">event</i></a>
                                </div>
                                <div class="timeline-panel  mb-4">
                                    <div class="btnHapusVideo">
                                        <a onclick="openMore(\'' . $r["Id_event"] . '\')" class="btnmore' . $r["Id_event"] . ' mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange clsv">
                                            <i class="material-icons">more_vert</i>
                                        </a>
                                    </div> 
                                    <div class="card-panel hoverable border-radius-6 m-0 card-animation-1">
                                        <img onclick="openPreview(\'' . $r['banner_type'] . '\',\'' . $r['banner'] . '\',\'' . $r['Id_event'] . '\')" class="responsive-img border-radius-4 z-depth-4 image-n-margin evView' . $r['Id_event'] . '" src="' . $banner . '" alt="" style="width:100%;">
                                        <h6><a href="#" class="mt-5">' . $r['judul'] . '</a></h6>
                                        <p>' . $r['deskripsi'] . '</p>
                                        <div class="row mt-4">
                                        <div class="col s2">
                                            
                                        </div>
                                        <div class="col s3 p-0 mt-1"><span class="pt-2"></span></div>
                                            <div class="col s7 mt-1 right-align">
                                                <a><span class="material-icons">favorite_border</span></a>
                                                <span class="ml-3 vertical-align-top numlove' . $r['Id_event'] . '">' . COUNT(json_decode($r['love'], false)) . '</span>
                                                <a href="#"><span class="material-icons ml-10">groups</span></a>
                                                <span class="ml-3 vertical-align-top">' . getJumPeserta($conn, $r['Id_event']) . '</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>';
            } else {

                $disp .= ' <li>
                            <div class="timeline-badge yellow">
                                <a class="tooltipped" data-position="top" data-tooltip="May 10 2019"><i class="material-icons white-text">event</i></a>
                            </div>
                            <div class="timeline-panel mb-4">
                                <div class="btnHapusVideo">
                                    <a onclick="openMore(\'' . $r["Id_event"] . '\')" class="btnmore' . $r["Id_event"] . ' mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange clsv">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                </div> 
                                <div class="card-panel hoverable border-radius-6 m-0 card-animation-1">
                                    <img onclick="openPreview(\'' . $r['banner_type'] . '\',\'' . $r['banner'] . '\',\'' . $r['Id_event'] . '\')" class="responsive-img border-radius-4 z-depth-4 image-n-margin evView' . $r['Id_event'] . '" src="' . $banner . '" alt="" style="width:100%;">
                                    <h6><a href="#" class="mt-5">' . $r['judul'] . '</a></h6>
                                    <p>' . $r['deskripsi'] . '</p>
                                    <div class="row mt-4">
                                        <div class="col s2">
                                       
                                        </div>
                                        <div class="col s3 p-0 mt-1"><span class="pt-2"></span></div>
                                        <div class="col s7 mt-1 right-align">
                                            <a><span class="material-icons">favorite_border</span></a>
                                            <span class="ml-3 vertical-align-top numlove' . $r['Id_event'] . '">' . COUNT(json_decode($r['love'], false)) . '</span>
                                            <a href="#"><span class="material-icons ml-10">groups</span></a>
                                            <span class="ml-3 vertical-align-top">' . getJumPeserta($conn, $r['Id_event']) . '</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>';
            }
    }

    return '<div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
                <div class="container  mb-4">
                    <div class="row">
                        <div class="col s7 m6 l6 breadcrumbs-left">
                            <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>POSI App</span></h5>
                            <ol class="breadcrumbs mb-0">
                                <li class="breadcrumb-item active">Timeline Event
                                </li>
                            </ol>
                        </div>
                        <div class="col s5 m6 l6">
                           <a meta-data="+ new Event" onclick="openformEvent(\'' . '.btnformEvent' . '\',\'' . 'New' . '\',\'' . '' . '\', \'' . '' . '\')" class="btnformEvent addbtn btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right" href="#!" data-target="dropdown1">
                                    <i class="material-icons">add</i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="section">
                    <!-- timeline -->
                    <ul class="timeline">
                       ' . $disp . '
                        <li class="clearfix" style="float: none;"></li>
                    </ul>
                    <!-- / timeline -->
                </div>
                
            </div>';
}


function dispVideo($conn, $idsekolah, $idguru)
{
    $res = mysqli_query($conn, "SELECT * FROM tb_video WHERE Id_sekolah = '$idsekolah' AND Id_guru = '$idsekolah' ORDER BY Id_video DESC");
    $disp = '';
    $data = getNameAndGbr($conn, $idguru);
    while ($r = mysqli_fetch_array($res)) {
        $komentar = json_decode($r["komentar"], false);
        $love = json_decode($r["love"], false);
        $disp .= '<div class="col s12 m6 l4 card-width">
        <div class="btnHapusVideo">
            <a class="mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange clsv">
                <i class="material-icons">clear</i>
            </a>
        </div> 
        <div class="card-panel border-radius-6 mt-10 card-animation-1">    
            <img onclick=openVideo(\'' . $r["Id_video"] . '\',\'' . $r["link"] . '\') class="responsive-img border-radius-8 z-depth-4 image-n-margin ytb' . $r["Id_video"] . ' ukuranVid" src="http://img.youtube.com/vi/' . $r["link"] . '/hqdefault.jpg" alt="images">
            <h6><a href="#" class="mt-5">' . $r["bidang_studi"] . '</a></h6>
            <p style="height:60px">' . substr($r["judul"], 0, 120) . '</p>
            <div class="row mt-4">
                <div class="col s2">
                    <a href="#"><img src="app-assets/images/user/' . $data[1] . '" alt="fashion" class="circle responsive-img mr-3" width="40"></a>
                </div>
                <a href="#">
                    <div class="col s3 p-0 mt-1"><span class="pt-2">' . substr($data[0], 0, 8) . '</span></div>
                </a>
                <div class="col s7 mt-1 right-align">
                    <a href="#"><span class="material-icons">favorite_border</span></a>
                    <span class="ml-3 vertical-align-top">' . COUNT($love) . '</span>
                    <a href="#"><span class="material-icons ml-10">chat_bubble_outline</span></a>
                    <span class="ml-3 vertical-align-top">' . COUNT($komentar) . '</span>
                </div>
            </div>
        </div>
      </div>';
    }

    return '<div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
            <div class="container">
                <div class="row">
                <div class="col s7 m6 l6 breadcrumbs-left">
                    <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>E-Learning App</span></h5>
                    <ol class="breadcrumbs mb-0">
                    <li class="breadcrumb-item active">Daftar Video
                    </li>
                    </ol>
                </div>
                <div class="col s5 m6 l6">
                    <a meta-data="add Video" onclick="openaddVideo(\'' . '.btnaddVideo' . '\',\'' . 'New' . '\',\'' . '' . '\', \'' . '' . '\')" class="btnaddVideo addbtn btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right" href="#!" data-target="dropdown1">
                    <i class="material-icons">add</i>
                    </a>
                </div>
                </div>
            </div>
         </div>
        <div class="row mt-2" id="paginattable" >
               ' . $disp . '
        </div>
        <div style="margin-bottom:70px" id="pageBar">
                <div class="dataTables_info" id="page-length-option_info" role="status" aria-live="polite">Showing 11 to 20 of 57 entries</div>
                    <div class="dataTables_paginate paging_simple_numbers" id="page-length-option_paginate">
                    <a class="paginate_button previous" aria-controls="page-length-option" data-dt-idx="0" tabindex="0" id="page-length-option_previous" onclick="prevDiv()">Previous</a>
                        <span></span>
                    <a class="paginate_button next" aria-controls="page-length-option" data-dt-idx="7" tabindex="0" id="page-length-option_next" onclick="nextDiv()">Next</a>
                    </div>
                </div>
        </div>';
}

function dispKompetisi($conn, $Id_member)
{

    $res = mysqli_query($conn, "SELECT * FROM tb_kompetisi WHERE Id_member = '$Id_member' ORDER BY mulai_pelaksanaan DESC");
    $disp = '';
    $no = 1;
    while ($r = mysqli_fetch_array($res)) {
        $disp .= '<tr>
                    <th>' . ($no++) . '</th>
                    <th>' . getEventFromId($conn, $r['Id_event']) . '</th>
                    <th>' . getBidangStudiFromId($conn, $r['Id_subjek']) . '</th>
                    <th>' . beautyDate($r['mulai_pelaksanaan']) . '</th>
                    <th>' . beautyDate($r['akhir_pelaksanaan']) . '</th>
                    <th><a href="' . getGrupChat($conn, $r['Id_subjek']) . '" target="_blank" class="mb-6 btn-floating waves-effect waves-light gradient-45deg-light-blue-cyan">
                            <i class="material-icons">near_me</i>
                        </a></th>
                    <th>menunggu</th>
                </tr>';
    }

    return '<div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
                <div class="container">
                <div class="row">
                    <div class="col s7 m6 l6 breadcrumbs-left">
                    <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>POSI App</span></h5>
                    <ol class="breadcrumbs mb-0">
                        <li class="breadcrumb-item active">My Competition
                        </li>
                    </ol>
                    </div>
                    <div class="col s5 m6 l6">
                    </div>
                </div>
                </div>
            </div>    
            <div class="row">
                <div class="col s12">
                <div class="card">
                    <div class="card-content">
                    <div class="row toolPagination">
                        <div class="col s12 scrollTable">
                        <table id="page-length-option" class="display striped responsive-table">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Event Kompetisi</th>
                                <th>Bidang</th>
                                <th>Mulai Pelaksanaan</th>
                                <th>Akhir Pelaksanaan</th>
                                <th>Grup Chat</th>
                                <th>Start Ujian</th>
                            </tr>
                            </thead>
                            <tbody id="paginattable">
                                ' . $disp . '
                            </tbody>
                        </table>
                        </div>
                        <div class="dataTables_info" id="page-length-option_info" role="status" aria-live="polite">Showing 11 to 20 of 57 entries</div>
                                    <div class="dataTables_paginate paging_simple_numbers" id="page-length-option_paginate">
                                        <a class="paginate_button previous" aria-controls="page-length-option" data-dt-idx="0" tabindex="0" id="page-length-option_previous" onclick="prev()">Previous</a>
                                        <span></span>
                                        <a class="paginate_button next" aria-controls="page-length-option" data-dt-idx="7" tabindex="0" id="page-length-option_next" onclick="next()">Next</a>
                                </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>';
}


//For Display Subject ==> Menu 2
function Subject()
{
    $nomor = 1;
    $result = "";
    $dataSubject = query("SELECT * FROM dft_subjek");

    foreach ($dataSubject as $row) {
        $ParameterData = $row["subjek"] . "A99";
        $contex = "Data Subject " . $row["subjek"];
        $result .= '
                  <tr id="barisData' . $row["Id_target"] . '">
                    <td width="5%">' . $nomor++ . '</td>
                    <td width="85%">' . $row["subjek"] . '</td>
                    <td style="display: flex; justify-content: space-around;">
                        <a style="cursor: pointer" meta-data="+ Edit entry"
                            onclick="openSubjectEvent(\'' . '.btnSubjectEvent' . $row["Id_target"] . '\',\'' . 'Edit' . '\',\'' . $row["Id_target"] . '\', \'' . $ParameterData . '\')" 
                                class="btnSubjectEvent' . $row["Id_target"] . ' invoice-action-edit btn btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange breadcrumbs-btn right">
                                <i class="material-icons">edit</i>
                          </a>
                          <a style="cursor: pointer" meta-data="+ Delete entry"
                            onclick="openDeleteItem(\'' . 'Hapus' . '\',\'' . $row["Id_target"] . '\',\'' . $contex . '\',\'' . 'saveSubjectEvent' . '\')"
                              class="invoice-action-edit btn btn-floating waves-effect waves-light pink accent-2 breadcrumbs-btn right">
                                <i class="material-icons">delete</i>
                          </a>
                    </td>
                  </tr>';
    }


    return '
            <div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s7 m6 l6 breadcrumbs-left">
                    <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>POSI App</span></h5>
                    <ol class="breadcrumbs mb-0">
                      <li class="breadcrumb-item active">Subject
                      </li>
                    </ol>
                  </div>
                  <div class="col s5 m6 l6">
                    <a meta-data="+ new entry" onclick="openSubjectEvent(\'' . '.btnSubjectEvent' . '\',\'' . 'New' . '\',\'' . '' . '\', \'' . '' . '\')" class="btnSubjectEvent addbtn btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right"  data-target="dropdown1">
                        <i class="material-icons">add</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
                
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                  
                    <div class="row toolPagination">
                      <div class="col s12 scrollTable">
                        <table id="page-length-option" class="display striped">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Nama Subject</th>
                              <th colspan="2" style="text-align:center;">Action</th>
                            </tr>
                          </thead>
                          
                          <tbody id="paginattable">
                          ' . $result . '
                          </tbody>
                          <tfoot>
                           
                          </tfoot>
                        </table>
                      </div>
                        <div class="dataTables_info" id="page-length-option_info" role="status" aria-live="polite">Showing 11 to 20 of 57 entries</div>
                        <div class="dataTables_paginate paging_simple_numbers" id="page-length-option_paginate">
                                        <a class="paginate_button previous" aria-controls="page-length-option" data-dt-idx="0" tabindex="0" id="page-length-option_previous" onclick="prev()">Previous</a>
                                        <span></span>
                                        <a class="paginate_button next" aria-controls="page-length-option" data-dt-idx="7" tabindex="0" id="page-length-option_next" onclick="next()">Next</a>
                        </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>';
}

function ResultDataSubject($data)
{
    $pos = anti_Injection($data['pos']);
    $status = anti_Injection($data['status']);
    $nama_subject = anti_Injection($data['nama_subject']);

    if ($status == "New") {

        $query = "INSERT INTO `dft_subjek`
                  VALUES 
                  (NULL, '$nama_subject')
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Ditambah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == "Edit") {

        $query = "UPDATE `dft_subjek` SET
                  `subjek` = '$nama_subject'
                  WHERE `Id_target` = '$pos'
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Diubah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == 'Hapus') {

        $query = "DELETE FROM `dft_subjek` WHERE `Id_target` = '$pos'";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Dihapus";
        } else {
            echo "Proses Gagal";
        }
    }
}


function ResultDataJenjang($data)
{
    $pos = anti_Injection($data['pos']);
    $status = anti_Injection($data['status']);
    $nama_jenjang = $data['JenjangDong'];

    if ($status == "New") {

        $query = "INSERT INTO `dft_jenjang`
                  VALUES 
                  (NULL, '$nama_jenjang')
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Ditambah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == "Edit") {

        $query = "UPDATE `dft_jenjang` SET
                  `jenjang` = '$nama_jenjang'
                  WHERE `Id_jenjang` = '$pos'
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Diubah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == 'Hapus') {

        $query = "DELETE FROM `dft_jenjang` WHERE `Id_jenjang` = '$pos'";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Dihapus";
        } else {
            echo "Proses Gagal";
        }
    }
}

function ResultDataListOfAllDataMember($data)
{
    global $conn;
    $idSubject = anti_Injection($data["InSelectSubject"]);
    $idEvent = anti_Injection($data["InSelectEvent"]);
    $nomor = 0;
    $result = '';

    $res = mysqli_query(
        $conn,
        "SELECT *
         FROM `tb_kompetisi` 
         WHERE `Id_subjek` = '$idSubject' 
         AND `Id_event` = '$idEvent'
         --  AND `nilai` != NULL || `nilai` != ''
         ORDER BY `nilai` DESC
         "
    );

    $total = mysqli_num_rows($res);
    $dataStatus = query("SELECT gold, silver, bronze FROM tb_subjek WHERE `Id_subjek` = '$idSubject' AND `Id_event` = '$idEvent'")[0];
    $gold = $dataStatus["gold"];
    $gold = ceil($gold / 100 * $total);

    $silver = $dataStatus["silver"];
    $silver = ceil($silver / 100 * $total);

    $bronze = $dataStatus["bronze"];
    $bronze = ceil($bronze / 100 * $total);
    // $putaran = 1;



    while ($r = mysqli_fetch_array($res)) {
        $nomor++;
        $info =  getDataByIdMember($conn, $r['Id_member']);
        if ($nomor <= $gold) {
            $result .= '<tr>
                        <td width="5%">' . ($nomor) . '</td>
                        <td width="30%">' . $info['nama'] . '</td>
                        <td width="20%">' . $info['provinsi_sekolah'] . '</td>
                        <td width="30%">' . $info['sekolah'] . '</td>
                        <td width="5%">
                            <a onclick="openDetailHasilUjian(\'' . '.btnDetailHasilUjian' . $r["Id_kompetisi"] . '\',\'' . $r["Id_kompetisi"] . '\',\'' . $r["Id_subjek"] . '\',\'' . $r["Id_member"] . '\')"
                            class="btnDetailHasilUjian' . $r["Id_kompetisi"] . ' mb-6 btn waves-effect waves-light gradient-45deg-green-teal">
                            ' .  ($r['nilai']==''?'0':$r['nilai']) . '
                            </a>
                        </td>
                        <td width="5%"> Gold </td>
                        </td>
                    </tr>';
        } else if ($nomor > $gold && $nomor <= ($silver + $gold)) {
            $result .= '<tr>
                        <td width="5%">' . ($nomor) . '</td>
                        <td width="30%">' . $info['nama'] . '</td>
                        <td width="20%">' . $info['provinsi_sekolah'] . '</td>
                        <td width="30%">' . $info['sekolah'] . '</td>
                        <td width="5%"> <a onclick="openDetailHasilUjian(\'' . '.btnDetailHasilUjian' . $r["Id_kompetisi"] . '\',\'' . $r["Id_kompetisi"] . '\',\'' . $r["Id_subjek"] . '\',\'' . $r["Id_member"] . '\')"
                        class="btnDetailHasilUjian' . $r["Id_kompetisi"] . ' mb-6 btn waves-effect waves-light gradient-45deg-green-teal">
                        ' .  ($r['nilai']==''?'0':$r['nilai']) . '
                        </a></td>
                        <td width="5%"> Silver </td>
                        </td>
                    </tr>';
        } else if ($nomor > ($silver + $gold) && $nomor <= ($silver + $gold + $bronze)) {
            $result .= '<tr>
                        <td width="5%">' . ($nomor) . '</td>
                        <td width="30%">' . $info['nama'] . '</td>
                        <td width="20%">' . $info['provinsi_sekolah'] . '</td>
                        <td width="30%">' . $info['sekolah'] . '</td>
                        <td width="5%"> <a onclick="openDetailHasilUjian(\'' . '.btnDetailHasilUjian' . $r["Id_kompetisi"] . '\',\'' . $r["Id_kompetisi"] . '\',\'' . $r["Id_subjek"] . '\',\'' . $r["Id_member"] . '\')"
                        class="btnDetailHasilUjian' . $r["Id_kompetisi"] . ' mb-6 btn waves-effect waves-light gradient-45deg-green-teal">
                        ' .  ($r['nilai']==''?'0':$r['nilai']) . '
                        </a></td>
                        <td width="5%"> Bronze </td>
                        </td>
                    </tr>';
        } else if ($nomor > $bronze) {
            $result .= '<tr>
                            <td width="5%">' . ($nomor) . '</td>
                            <td width="30%">' . $info['nama'] . '</td>
                            <td width="20%">' . $info['provinsi_sekolah'] . '</td>
                            <td width="30%">' . $info['sekolah'] . '</td>
                            <td width="5%"> <a onclick="openDetailHasilUjian(\'' . '.btnDetailHasilUjian' . $r["Id_kompetisi"] . '\',\'' . $r["Id_kompetisi"] . '\',\'' . $r["Id_subjek"] . '\',\'' . $r["Id_member"] . '\')"
                            class="btnDetailHasilUjian' . $r["Id_kompetisi"] . ' mb-6 btn waves-effect waves-light gradient-45deg-green-teal">
                            ' .  ($r['nilai']==''?'0':$r['nilai']) . '
                            </a></td>
                            <td width="5%"> </td>
                            </td>
                        </tr>';
        }
    }


    echo '<table class="responsive-table display striped">
            <thead>
                <tr>
                    <th>Nomor</th>
                    <th>Nama</th>
                    <th>Provinsi</th>
                    <th>Sekolah</th>
                    <th>Nilai</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="listHist">' . $result . '</tbody>
          </table>';
}


function BidangEvent()
{
    $nomor = 1;
    $result = "";
    $dataBidangEvent = query("SELECT * FROM dft_bidang_studi");

    foreach ($dataBidangEvent as $row) {
        $ParameterData = $row["bidang_studi"] . "A99";
        $contex = "Data Bidang " . $row["bidang_studi"];
        $result .= '
                  <tr id="barisData' . $row["Id_bidang_studi"] . '">
                    <td width="5%">' . $nomor++ . '</td>
                    <td width="85%">' . $row["bidang_studi"] . '</td>
                    <td style="display: flex; justify-content: space-around;">
                        <a style="cursor: pointer" meta-data="+ Edit entry"
                        onclick="openoverlayBidangEvent(\'' . '.btnoverlayBidangEvent' . $row["Id_bidang_studi"] . '\',\'' . 'Edit' . '\',\'' . $row["Id_bidang_studi"] . '\', \'' . $ParameterData . '\')" 
                            class="btnoverlayBidangEvent' . $row["Id_bidang_studi"] . ' invoice-action-edit btn btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange breadcrumbs-btn right">
                                <i class="material-icons">edit</i>
                          </a>
                          <a style="cursor: pointer" meta-data="+ Delete entry"
                            onclick="openDeleteItem(\'' . 'Hapus' . '\',\'' . $row["Id_bidang_studi"] . '\',\'' . $contex . '\',\'' . 'saveoverlayBidangEvent' . '\')"
                              class="invoice-action-edit btn btn-floating waves-effect waves-light pink accent-2 breadcrumbs-btn right">
                                <i class="material-icons">delete</i>
                          </a>
                    </td>
                  </tr>';
    }


    return '
            <div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s7 m6 l6 breadcrumbs-left">
                    <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>POSI App</span></h5>
                    <ol class="breadcrumbs mb-0">
                      <li class="breadcrumb-item active">Bidang
                      </li>
                    </ol>
                  </div>
                  <div class="col s5 m6 l6">
                    <a meta-data="+ new entry" onclick="openoverlayBidangEvent(\'' . '.btnoverlayBidangEvent' . '\',\'' . 'New' . '\',\'' . '' . '\', \'' . '' . '\')" class="btnoverlayBidangEvent addbtn btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right"  data-target="dropdown1">
                        <i class="material-icons">add</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
                
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                  
                    <div class="row toolPagination">
                      <div class="col s12 scrollTable">
                        <table id="page-length-option" class="display striped">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Bidang</th>
                              <th colspan="2" style="text-align:center;">Action</th>
                            </tr>
                          </thead>
                          
                          <tbody id="paginattable">
                          ' . $result . '
                          </tbody>
                          <tfoot>
                           
                          </tfoot>
                        </table>
                      </div>
                        <div class="dataTables_info" id="page-length-option_info" role="status" aria-live="polite">Showing 11 to 20 of 57 entries</div>
                        <div class="dataTables_paginate paging_simple_numbers" id="page-length-option_paginate">
                                        <a class="paginate_button previous" aria-controls="page-length-option" data-dt-idx="0" tabindex="0" id="page-length-option_previous" onclick="prev()">Previous</a>
                                        <span></span>
                                        <a class="paginate_button next" aria-controls="page-length-option" data-dt-idx="7" tabindex="0" id="page-length-option_next" onclick="next()">Next</a>
                        </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>';
}

function ResultDataOverlayBidangEvent($data)
{
    $pos = anti_Injection($data['pos']);
    $status = anti_Injection($data['status']);
    $nama_bidang_event = anti_Injection($data['nama_bidang_event']);

    if ($status == "New") {

        $query = "INSERT INTO `dft_bidang_studi`
                  VALUES 
                  (NULL, '$nama_bidang_event', '')
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Ditambah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == "Edit") {

        $query = "UPDATE `dft_bidang_studi` SET
                  `bidang_studi` = '$nama_bidang_event'
                  WHERE `Id_bidang_studi` = '$pos'
                 ";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Diubah";
        } else {
            echo "Proses Gagal";
        }
    } else if ($status == 'Hapus') {

        $query = "DELETE FROM `dft_bidang_studi` WHERE `Id_bidang_studi` = '$pos'";

        if (ProsesData($query) > 0) {
            echo "Data Berhasil Dihapus";
        } else {
            echo "Proses Gagal";
        }
    }
}






//For Display Jenjang ==> Menu 4
function Jenjang()
{
    $nomor = 1;
    $result = "";
    $dataJenjang = query("SELECT * FROM `dft_jenjang`");

    foreach ($dataJenjang as $row) {
        $ParameterData = listNumberArray(json_decode($row["jenjang"], false));
        $contex = "Data Jenjang ";
        $result .= '
                  <tr id="barisData' . $row["Id_jenjang"] . '">
                    <td width="5%">' . $nomor++ . '</td>
                    <td width="85%">' . listNumberArray(json_decode($row["jenjang"], false)) . '</td>
                    <td style="display: flex; justify-content: space-around;">
                          <a style="cursor: pointer" meta-data="+ Delete entry"
                            onclick="openDeleteItem(\'' . 'Hapus' . '\',\'' . $row["Id_jenjang"] . '\',\'' . $contex . '\',\'' . 'saveOverlayJenjang' . '\')"
                              class="invoice-action-edit btn btn-floating waves-effect waves-light pink accent-2 breadcrumbs-btn right">
                                <i class="material-icons">delete</i>
                          </a>
                    </td>
                  </tr>';
    }

    return '
            <div class="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
              <div class="container">
                <div class="row">
                  <div class="col s7 m6 l6 breadcrumbs-left">
                    <h5 class="breadcrumbs-title mt-0 mb-0 display-inline hide-on-small-and-down"><span>POSI App</span></h5>
                    <ol class="breadcrumbs mb-0">
                      <li class="breadcrumb-item active">Jenjang
                      </li>
                    </ol>
                  </div>
                  <div class="col s5 m6 l6">
                    <a meta-data="+ new entry" onclick="openOverlayJenjang(\'' . '.btnOverlayJenjang' . '\',\'' . 'New' . '\',\'' . '' . '\', \'' . '' . '\')" class="btnOverlayJenjang addbtn btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right" data-target="dropdown1">
                        <i class="material-icons">add</i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
                
            <div class="row">
              <div class="col s12">
                <div class="card">
                  <div class="card-content">
                  
                    <div class="row toolPagination">
                      <div class="col s12 scrollTable">
                        <table id="page-length-option" class="display striped">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th style="position: relative; left: 21px;">Bidang</th>
                              <th colspan="2" style="text-align:center;">Action</th>
                            </tr>
                          </thead>
                          
                          <tbody id="paginattable">
                          ' . $result . '
                          </tbody>
                          <tfoot>
                           
                          </tfoot>
                        </table>
                      </div>
                        <div class="dataTables_info" id="page-length-option_info" role="status" aria-live="polite">Showing 11 to 20 of 57 entries</div>
                        <div class="dataTables_paginate paging_simple_numbers" id="page-length-option_paginate">
                                        <a class="paginate_button previous" aria-controls="page-length-option" data-dt-idx="0" tabindex="0" id="page-length-option_previous" onclick="prev()">Previous</a>
                                        <span></span>
                                        <a class="paginate_button next" aria-controls="page-length-option" data-dt-idx="7" tabindex="0" id="page-length-option_next" onclick="next()">Next</a>
                        </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>';
}

function ResultDataDetailHasilUjian($data)
{
    $idKompetisi = anti_Injection($data["idKompetisi"]);
    $idSubject = anti_Injection($data["idSubject"]);
    $idMember = anti_Injection($data["idMember"]);
    $nomor = 1;
    $result = '';

    $arrOriginal = [
        [
            "soal" => 1,
            "jawaban" => "A",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 2,
            "jawaban" => "B",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 3,
            "jawaban" => "C",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 4,
            "jawaban" => "E",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 5,
            "jawaban" => "A",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 6,
            "jawaban" => "D",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 7,
            "jawaban" => "C",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 8,
            "jawaban" => "C",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 9,
            "jawaban" => "D",
            "benar" => 4,
            "salah" => -1
        ],
        [
            "soal" => 10,
            "jawaban" => "B",
            "benar" => 4,
            "salah" => -1
        ]
    ];

    $arrPeserta = [
        [
            "soal" => 1,
            "jawaban" => "A"
        ],
        [
            "soal" => 2,
            "jawaban" => "B"
        ],
        [
            "soal" => 3,
            "jawaban" => "C"
        ],
        [
            "soal" => 4,
            "jawaban" => "A"
        ],
        [
            "soal" => 5,
            "jawaban" => "B"
        ],
        [
            "soal" => 6,
            "jawaban" => "D"
        ],
        [
            "soal" => 7,
            "jawaban" => "D"
        ],
        [
            "soal" => 8,
            "jawaban" => "E"
        ],
        [
            "soal" => 9,
            "jawaban" => "D"
        ],
        [
            "soal" => 10,
            "jawaban" => "B"
        ]
    ];

    $arrOriginal = json_encode($arrOriginal);
    $arrPeserta = json_encode($arrPeserta);

    // $query = "UPDATE `tb_kompetisi` SET
    //          `original` = '$arrOriginal',
    //          `jawaban_peserta` = '$arrPeserta'
    //           WHERE `Id_kompetisi` = '19976'
    //          ";
    // ProsesData($query);


    $DetailHasilUjian = query("SELECT `original`, `jawaban_peserta` FROM `tb_kompetisi` WHERE `Id_kompetisi` = '$idKompetisi' AND `Id_subjek` = '$idSubject' AND `Id_member` = '$idMember'")[0];
    $isSoal = $DetailHasilUjian["original"];
    $isSoal = json_decode($isSoal, true);
    $isJawaban = $DetailHasilUjian["jawaban_peserta"];
    $isJawaban = json_decode($isJawaban, true);

    $skor = 0;
    if (!empty($isJawaban) && !empty($isSoal)) {

        foreach ($isJawaban as $j => $value) {
            foreach ($isSoal as $i => $item) {
                if ($value["soal"] == $item["soal"]) {
                    if ($value["jawaban"] == $item["jawaban"]) {
                        $skor += $item["benar"];
                    } else {
                        $skor += $item["salah"];
                    }
                    $result .= '<tr>
                                    <td> Soal ' . $item['soal'] . '</td>
                                    <td>' . $item['jawaban'] . '</td>
                                    <td>' . $value['jawaban'] . '</td>
                                    <td>' . $item["benar"] . '</td>
                                    <td>' . $item["salah"] . '</td>
                                    <td>' . $skor . '</td>
                                    </tr>';
                }
            }
        }
    }


    return '<table class="responsive-table display striped centered bordered">
                <thead>
                    <tr>
                        <th>Soal</th>
                        <th>Jawaban Benar</th>
                        <th>Jawaban Siswa</th>
                        <th>Skor Benar</th>
                        <th>Skor Salah</th>
                        <th>Nilai Skor</th>
                    </tr>
                </thead>
                <tbody id="listHist">
                    ' . $result . '
                </tbody>
            </table>
            <p style="float: right; margin-right: 93px;"> Total Skor : ' . $skor . '</p>
            ';
}