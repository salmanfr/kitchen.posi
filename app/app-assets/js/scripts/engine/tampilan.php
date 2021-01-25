<?php
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
    $res = mysqli_query($conn, "SELECT * FROM tb_event WHERE tahun = '$tahun'");
    $k = 0;
    $disp = "";
    while ($r = mysqli_fetch_array($res)) {
        $subj = json_decode($r['subjek'], false);
        if (in_array($subjek, $subj)) {
            $k++;
            $banner = ($r['banner_type'] == 'video' ? 'https://img.youtube.com/vi/' . $r['banner'] . '/hqdefault.jpg' : getAssetslLink() . 'posiassets/fold/' . $r['banner']);
            if ($k % 2 == 0) {
                $disp .= '<li class="timeline-inverted">
                                <div class="timeline-badge green">
                                    <a class="tooltipped" data-position="top" data-tooltip="Aug 19 2019"> <i class="material-icons white-text">event</i></a>
                                </div>
                                <div class="timeline-panel  mb-4">
                                    <div class="btnHapusVideo">
                                        <a onclick="openMore(\'' . $r["Id_video"] . '\')" class="btnmore' . $r["Id_video"] . ' mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange clsv">
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
                                    <a onclick="openMore(\'' . $r["Id_video"] . '\')" class="btnmore' . $r["Id_video"] . ' mb-6 btn-floating waves-effect waves-light gradient-45deg-purple-deep-orange clsv">
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
