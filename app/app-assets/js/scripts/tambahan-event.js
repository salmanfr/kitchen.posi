var IdGlobal, paramGlobalEvent;

$(document).ready(function (e) {
    $('.btntutup').on('click', function () {
        $('.overlayMore').hide();
        $('body').css({
            'overflow-y': 'auto'
        });
        clsMe(posVideo);
        // closeformEvent();
    });

    $('.btnedit').click(function () {
        // var isDom = '.btnedit' + IdGlobal;
        // $(".btnedit").addClass('.btnedit' + IdGlobal);
        openformEvent('.btnedit', 'Edit', IdGlobal, '')
    });

    $('.btnchat').click(function () {
        $('.overlayMore .centers').html('<div class="chat">\
                                            <div class="cointainerMessage">\
                                                <div class="messages" id="chat">\
                                                </div>\
                                            </div>\
                                            <div class="input">\
                                                <i class="material-icons" onclick="clsMe(\'' + posVideo + '\')">close</i><input id="txtchat" placeholder="Type your message here!" type="text"><i class="material-icons" onclick="sendchat()">near_me</i>\
                                            </div>\
                                        </div>');
        $('.overlayMore .centers').css({
            'right': '0%'
        });
        posVideoTersorot = posVideo;
    });

    $('.btnhapus').click(function () {
        openVerif('Tugas dan nilai siswa melekat pada video ini, menghapus video akan mengakibatkan mereka lenyap, Apakah anda yakin menghapus video ini? ');
        kontextVerif = 'hapusVideo';

    });

    $('.btnnilai').click(function () {
        openformNilai('.btnnilai', posVideo);
    });

    $('#btnUbah').click(function () {
        var formData = new FormData();
        var palang = false;
        if ($('#pass1').val() == $('#pass2').val() && $('#pass1').val() != "") {
            palang = true;
        } else {
            showToast("Password tidak identik");
        }
        formData.append('file', $('#uploadProfile')[0].files[0]);
        formData.append('password', $('#pass1').val());
        if (palang) {
            $.ajax({
                type: 'POST',
                url: 'app-assets/js/scripts/engine/override.php?order=updateprofile',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    showLoad();
                },
                success: function (response) {
                    showToast(response);
                    setMyProfile();
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });
        } else {
            showToast('Data belum lengkap');
        }
    });
});


function selectMenu(idmenu) {
    var bykbold = $('.bold').length;
    var bykchildbold = $('.childbold').length;
    for (i = 0; i <= bykbold; i++) {
        $('#menu' + i).removeClass('active');
        $('#menu' + i + ' a').removeClass('active');
    }
    for (i = 1; i <= bykchildbold; i++) {
        $('#childmenu' + i).removeClass('active');
        $('#childmenu' + i + ' a').removeClass('active');
    }
    $('#' + idmenu).addClass('active');
    $('#' + idmenu + ' a').addClass('active');


    if (idmenu == 'menu0') {
        dispDashboard();
    } else if (idmenu == 'menu1') {
        dispTimeline();
    } else if (idmenu == 'menu2') {
        dispKompetisi();
    }

    //navigationButtom(idmenu);
}

// function navigationButtom(idmenu) {
//     // gradient-45deg-amber-amber
//     var lbl = ['dashboard', 'event', 'kompetisi', 'produk', 'merchandise'];
//     $('#labelmenu').html(lbl[convertMenu(idmenu)]);
//     var mn = $('.navBottom').children('div');
//     for (var i = 0; i < mn.length; i++) {
//         $('.menu' + i).addClass('gradient-45deg-green-teal');
//         $('.menu' + i).removeClass('gradient-45deg-amber-amber');
//         $('.menu' + i + ' i').css({
//             'font-size': '30px',
//             'line-height': '31px',
//             'padding-top': '12px'
//         });
//         //mn.eq(i).removeClass('gradient-45deg-amber-amber');
//         // mn.eq(i).addClass('gradient-45deg-green-teal');
//     }
//     $('.menu' + convertMenu(idmenu)).addClass('gradient-45deg-amber-amber');
//     $('.menu' + convertMenu(idmenu)).removeClass('gradient-45deg-green-teal');
//     var kiri = $('.menu' + convertMenu(idmenu)).offset().left;
//     var wmenu = $('.menu' + convertMenu(idmenu)).width();
//     var wlabel = $('#labelmenu').width();
//     var margl = (wmenu - wlabel) / 2;
//     $('#labelmenu').css({
//         'left': (kiri + margl) + 'px'
//     });
//     $('.menu' + convertMenu(idmenu) + ' i').css({
//         'font-size': '25px',
//         'line-height': '25px',
//         'padding-top': '12px'
//     });

// }

function convertMenu(idmenu) {
    if (idmenu == 'menu0') {
        return 0;
    } else if (idmenu == 'menu1') {
        return 1;
    } else if (idmenu == 'menu2') {
        return 2;
    } else if (idmenu == 'menu3') {
        return 3;
    } else if (idmenu == 'menu4') {
        return 4;
    }
}

function selectChildMenu(idmenu, target) {

    var bykchildbold = $('.childbold').length;
    var bykbold = $('.bold').length;
    for (i = 0; i <= bykbold; i++) {
        $('#menu' + i).removeClass('active');
        $('#menu' + i + ' a').removeClass('active');
    }
    for (i = 1; i <= bykchildbold; i++) {
        $('#childmenu' + i).removeClass('active');
        $('#childmenu' + i + ' a').removeClass('active');
    }
    $('#' + idmenu).addClass('active');
    $('#' + idmenu + ' a').addClass('active');

    // if (idmenu == 'childmenu4') {
    //     var b = new Date();
    //     var thn = b.getFullYear(),
    //         bln = filter2Digit(b.getMonth() + 1);
    //     rekapPerjalanDinas(bln, thn);
    // } else 

    if (idmenu == 'childmenu1') {
        dispSekolah();
    } else if (idmenu == 'childmenu2') {
        dispQaurryCategory();
    } else if (idmenu == 'childmenu3') {
        openHeaderKwitansi();
    } else if (idmenu == 'childmenu4') {
        openMatang();
    }
}

function filter2Digit(b) {
    var e = b.toString();
    if (e.length == 1) {
        return '0' + e;
    } else {
        return e;
    }
}

function justSelectMenu(idmenu) {
    var bykbold = $('.bold').length;
    var bykchildbold = $('.childbold').length;
    for (i = 0; i < bykbold; i++) {
        $('#menu' + i).removeClass('active');
        $('#menu' + i + ' a').removeClass('active');
    }
    for (i = 1; i <= bykchildbold; i++) {
        $('#childmenu' + i).removeClass('active');
        $('#childmenu' + i + ' a').removeClass('active');
    }
    $('#' + idmenu).addClass('active');
    $('#' + idmenu + ' a').addClass('active');



}

function openMyProfile() {
    $('.overlayProfile').show();
    setTimeout(function () {
        $('.formProfile').css({
            'top': '50%'
        });
    }, 300);
}

function closeMyProfile() {
    $('.formProfile').css({
        'top': '250%'
    });
    setTimeout(function () {
        $('.overlayProfile').hide();
    }, 300);
}





// ============ AKHIR SCRIPT JQUERY ADDVIDEO ====================
var modalVideo,
    posVideo;


function openMore(idVideo) {
    $('body').css({
        'overflow-y': 'hidden'
    });
    posVideo = idVideo;
    btnaddVideo = '.btnmore' + idVideo;
    IdGlobal = idVideo;


    var atas = $(btnaddVideo).offset().top - $(document).scrollTop();
    var kiri = $(btnaddVideo).offset().left;
    var lebar = $(btnaddVideo).width();
    var tinggi = $(btnaddVideo).height();
    $('.btnedit, .btnnilai, .btnhapus, .btntutup, .btnchat').css({
        'top': atas - 2 + 'px',
        'left': kiri - 2 + 'px',
        'display': 'block'
    });

    $('.overlayMore').show();
    setTimeout(function () {
        $('.btnedit').css({
            'top': atas - 50 + 'px',
            'left': kiri + 'px',
            'display': 'block'
        });
        $('.btnnilai').css({
            'top': atas - 35 + 'px',
            'left': kiri + 35 + 'px',
            'display': 'block'
        });
        $('.btnchat').css({
            'top': atas + 3 + 'px',
            'left': kiri + 45 + 'px',
            'display': 'block'
        });
        $('.btnhapus').css({
            'top': atas + 40 + 'px',
            'left': kiri + 35 + 'px',
            'display': 'block'
        });

    }, 100);

}

function clsMe(pos) {
    $('.overlayMore .centers').css({
        'right': '-100%'
    });
    posVideoTersorot = '';
}

function getDataForFormEvent(isID) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonData = JSON.parse(xmlhttp.responseText);
            $("#judulBanner").val(jsonData.judul);
            $('#inputmedia').val(jsonData.banner);
            CKEDITOR.instances.deskripsi.setData(jsonData.deskripsi);
            $("#subjek").val(jsonData.subjek);
            $("#tanggalbegin").val(jsonData.tanggal_mulai);
            $("#jambegin").val(jsonData.waktu_mulai);
            $("#tanggalend").val(jsonData.tanggal_akhir);
            $("#jamend").val(jsonData.waktu_akhir);
            $("#tanggalevent").val(jsonData.tanggal_event);
            $("#statusevent").val(jsonData.status);
            console.log(jsonData.tanggal_event)
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getParameterForKontent&dataID=' + isID);
    xmlhttp.send();
}