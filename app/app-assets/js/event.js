var boolMedia = false,
    dataUrl = '',
    typeBanner = '',
    subjek = ['Guru', 'Mahasiswa', 'Siswa', 'Pekerja'],
    nama_jenjang = ['SD', 'MI', 'SMP', 'MTS', 'SMA', 'MA', 'SMK', 'MAHASISWA'],
    statusEvent = ['Publish', 'Private'],
    kontextCombos = '',
    listArr = [],
    mouse_combos = false,
    IdGlobal,
    arr_daftar_subjek = [],
    sbjEvent = [],
    tglEvent = '',
    jjgEvent = [],
    jjgSubjek = [],
    jjgterpilih = [],
    bdgEvent = [],
    pilihanJawaban = ['A', 'B', 'C', 'D', 'E'],
    tinggkatKesulitan = ['Sangat Mudah', 'Mudah', 'Sulit', 'Sangat Sulit'],
    arr_silabus = [],
    arr_materi = [];
$(document).ready(function(e) {
    selectMenu('menu0');
    initSample('deskripsi', 350);
    initSample('soal', 350);
    initSample('opta', 100);
    initSample('optb', 100);
    initSample('optc', 100);
    initSample('optd', 100);
    initSample('opte', 100);
    initSample('pembahasan', 350);
    initSample('rekomendasi', 350);
    $('.genCombos').hover(function() {
        mouse_combos = true
    }, function() {
        mouse_combos = false;
    });

    $('body').mouseup(function() {
        if (!mouse_combos) {
            $('.genCombos').hide();
        }
    });

    $('body').on({
        mouseenter: function() {
            $('.tooltips').show();
            var kontextLabel = $(this).attr('meta-data');
            $('.tooltips').html(kontextLabel);
            var atas = $(this).offset().top - $(document).scrollTop() - $(this).height() - ($(this).height() / 3),
                kiri = $(this).offset().left - $('.tooltips').width() + ($(this).width() / 2);
            $('.tooltips').css({
                'top': atas + 'px',
                'left': kiri + 'px'
            });

        },
        mouseleave: function() {
            $('.tooltips').hide(100);
        }
    }, '.addbtn');

    //.header-search-input 
    //#search
    $('.header-search-input, #search').on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            var targ = $(this).val();
            if (fungsiPencarian == 'tabel') {
                searchDataTable(targ);
            } else {
                searchDataDiv(targ);
            }
        }
    });

    $('#silabus').on('keyup', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            var targ = $(this).val();
            if (!in_array(targ, arr_silabus)) {
                arr_silabus.push(targ);
                $('.daftarSilabus').prepend('<div class="listAkses" id="' + targ.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                                <span>' + targ + '</span>\
                                                <i class="material-icons" onclick="delAkses(\'' + targ + '\') ">close</i>\
                                            </div>');
                $(this).val('');

            }
        }
    });


    $('.header-search-input, #search').on('input', function() {
        var targ = $(this).val();

        if (fungsiPencarian == 'tabel') {
            searchDataTable(targ);
        } else {
            searchDataDiv(targ);
        }
    });

    $('#inputmedia').on('input', function(e) {
        var arrLink = $(this).val().split('v='),
            link = arrLink[1];
        // cek apakah didalam link ada &=
        var targlink = '',
            palang = false;

        for (i = 0; i < link.length; i++) {
            if (link.charAt(i) == '&') {
                palang = true;
            } else {
                if (!palang) {
                    targlink = targlink + link.charAt(i);
                }
            }

        }
        kodelink = targlink;
        boolMedia = true;
        dataUrl = kodelink;
        typeBanner = 'video';
        $('.frameVideo').html('<iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/' + targlink + '" allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0"></iframe>')
    });

    $('#browsemedia').on('change', function() {
        boolMedia = false;
        $('.frameVideo').html('<canvas id="canvas"></canvas>');
        console.log($(this)[0].files[0]);
        var files = $(this)[0].files[0];
        $('#inputmedia').val(files.name);
        $('#inputmediaid label').addClass('active');

        var meta = $(this).attr('meta-data');
        var img = new Image();
        img.onload = function() {
            var canvas = document.getElementById('canvas'),

                width = $('.frameVideo').width(),
                height = $('.frameVideo').width() / 1.6;
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0, width, height);
            dataUrl = canvas.toDataURL();
            console.log(dataUrl);
            boolMedia = false;
            typeBanner = 'image';

        }
        img.onerror = function() {
            console.error("The provided file couldn't be loaded as an Image media");
        }
        img.src = URL.createObjectURL(this.files[0]);
    });

    $('#subjek, #statusevent, #subjbidang, #jjgbidang, #bidang, #namaJenjang, #jawaban, #kesulitan').on('click', function() {
        var tinggi = $(this).height();
        var atas = $(this).offset().top - $(document).scrollTop() + tinggi;
        var kiri = $(this).offset().left;
        var lebar = $(this).width() - 30;
        $('#panelCaris').css({
            'width': (lebar - 10) + 'px'
        });
        $('.genCombos').show();
        $('.genCombos').css({
            'left': kiri + 'px',
            'top': atas + 'px',
            'width': lebar + 'px'
        });
        panelCaris.focus();
        panelCaris.value = "";
        kontextCombos = $(this).attr('meta-data');

        // jika layar laptop biarkan apa adanya
        var layar = $('body').width();
        var tinggiLayar = $('body').height();
        if (layar > 765) {
            $('#panelCaris').css({
                'width': (lebar - 10) + 'px'
            });
            $('.genCombos').show();
            $('.genCombos').css({
                'left': kiri + 'px',
                'top': atas + 'px',
                'width': lebar + 'px'
            });
            if (atas > (tinggiLayar / 2) + 100) {
                $('.genCombos').css({
                    'left': kiri + 'px',
                    'top': (atas - $('.genCombos').height() - tinggi) + 'px',
                    'width': lebar + 'px'
                });
            }
        } else {
            var tng = $('body').height();
            $('#panelCaris').css({
                'width': (layar - 10) + 'px'
            });
            $('.genCombos').show();
            $('.genCombos').css({
                'left': 0 + 'px',
                'top': 0 + 'px',
                'width': layar + 'px',
                'height': tng + 'px'
            });
            $('.bodyCombos').css({
                'height': tng - 10 + 'px'
            });
        }
        if (kontextCombos == 'subjek') {
            setToListBody(subjek);
            listArr = subjek;
        } else if (kontextCombos == 'statusevent') {
            setToListBody(statusEvent);
            listArr = statusEvent;
        } else if (kontextCombos == 'subjbidang') {
            setToListBody(sbjEvent);
            listArr = sbjEvent;
        } else if (kontextCombos == 'jjgbidang') {
            setToListBody(jjgterpilih);
            listArr = jjgterpilih;
        } else if (kontextCombos == 'bidang') {
            setToListBody(bdgEvent);
            listArr = bdgEvent;
        } else if (kontextCombos == 'namaJenjang') {
            setToListBody(nama_jenjang);
            listArr = nama_jenjang;
        } else if (kontextCombos == 'kesulitan') {
            setToListBody(tinggkatKesulitan);
            listArr = tinggkatKesulitan;
        } else if (kontextCombos == 'jawaban') {
            setToListBody(pilihanJawaban);
            listArr = pilihanJawaban;
        }
    });


    //This For Ovelay Moore
    $('.btntutup').on('click', function() {
        clsMe();
    });

    $('.btnedit').click(function() {
        getDataEvent(IdGlobal);
    });

    $('.btnhapus').click(function() {
        // openDeleteItem('Hapus', IdGlobal, 'Data Event Berikut', 'saveformEvent');
    });

    $('.btnnilai').click(function() {
        opendispSubjek('.btnnilai', IdGlobal);
    });

    $('#btnUbah').click(function() {
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
                beforeSend: function() {
                    showLoad();
                },
                success: function(response) {
                    showToast(response);
                    setMyProfile();
                },
                error: function(xhr, ajaxOptions, thrownError) {

                }
            });
        } else {
            showToast('Data belum lengkap');
        }
    });

});

function setToListBody(daftarArr) {
    // alert(daftarArr);
    $('.bodyCombos').html('');
    daftarArr.forEach(function(item, i) {
        $('.bodyCombos').append('<div class="listItem" onclick="setItemCombos(\'' + item + '\')">' + item.toUpperCase() + '</div>');
    });
    $('.bodyCombos').animate({
        scrollTop: 0
    }, 500);
}

function setItemCombos(item) {
    $('#' + kontextCombos).val(item);
    $('#' + kontextCombos + 'id label').addClass('active');
    $('.genCombos').hide();

    if (kontextCombos == 'subjek') {
        if (!in_array(item, arr_daftar_subjek)) {
            arr_daftar_subjek.push(item);
            $('.form-body-formEvent .daftarAkses').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                            <span>' + item + '</span>\
                                            <i class="material-icons" onclick="delAkses(\'' + item + '\') ">close</i>\
                                        </div>');
        } else {
            showToast('data sudah terdaftar');
        }

        $('#subjek').val('');
    } else if (kontextCombos == 'subjbidang') {
        jjgterpilih = [];
        $('.form-body-formBidang .daftarAkses').html('');
        arr_daftar_subjek = [];
        for (var i = 0; i < jjgSubjek.length; i++) {
            if (item == jjgSubjek[i]) {
                jjgterpilih.push(Unlateral(jjgEvent[i]));
            }
        }
    } else if (kontextCombos == 'jjgbidang') {
        var arrItem = item.split(' / ');
        $('.form-body-formBidang .daftarAkses').html('');
        arr_daftar_subjek = [];
        for (var i = 0; i < arrItem.length; i++) {
            arr_daftar_subjek.push(arrItem[i]);
            $('.form-body-formBidang .daftarAkses').prepend('<div class="listAkses" id="' + arrItem[i].split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                                <span>' + arrItem[i] + '</span>\
                                                <i class="material-icons" onclick="delAkses(\'' + arrItem[i] + '\') ">close</i>\
                                            </div>');
        }
        $('#' + kontextCombos).val('');
    } else if (kontextCombos == 'namaJenjang') {
        if (!in_array(item, arr_daftar_subjek)) {
            arr_daftar_subjek.push(item);
            $('.daftarAksesJenjang').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                            <span>' + item + '</span>\
                                            <i class="material-icons" onclick="delAkses(\'' + item + '\') ">close</i>\
                                        </div>');
        } else {
            showToast('data sudah terdaftar');
        }

        $('#namaJenjang').val('');
    }
}

function Unlateral(arrLat) {
    var q = JSON.parse(arrLat);
    var str = '';
    q.forEach(function(item, i) {
        if (i == (q.length - 1)) {
            str = str + item
        } else {
            str = str + item + ' / '
        }
    });
    return str;
}

function delAkses(target) {
    var index = arr_daftar_subjek.indexOf(target);
    if (index > -1) {
        arr_daftar_subjek.splice(index, 1);
    }
    $('#' + target.split(' ').join('').replace('(', '').replace(')', '').replace('.', '')).hide(200);
}



function delSilabus(target) {
    var index = arr_silabus.indexOf(target);
    if (index > -1) {
        arr_silabus.splice(index, 1);
    }
    $('#' + target.split(' ').join('').replace('(', '').replace(')', '').replace('.', '')).hide(200);
}

function cariCombos(val, ev) {
    $('.bodyCombos').html('');
    var prediksi = '',
        byk = 0;
    if (val.length > 1) {
        listArr.forEach(function(item, i) {
            if (item.toUpperCase().indexOf(val.toUpperCase()) != -1) {
                byk++;
                if (byk == 1) {
                    prediksi = item;
                }
                $('.bodyCombos').append('<div class="listItem" onclick="setItemCombos(\'' + item + '\')">' + item.toUpperCase() + '</div>');
            }
        });
    } else if (val == '') {
        listArr.forEach(function(item, i) {
            byk++;
            if (byk == 1) {
                prediksi = item;
            }
            $('.bodyCombos').append('<div class="listItem" onclick="setItemCombos(\'' + item + '\')">' + item.toUpperCase() + '</div>');
        });
    }

    var key = ev.keyCode;
    if (key == 13) {
        setItemCombos(prediksi)
    }
}

function in_array(nilai, arr) {
    var bool = false;
    for (i = 0; i < arr.length; i++) {
        if (nilai == arr[i]) {
            bool = true;
        }
    }
    return bool;
}

function searchDataTable(targ) {
    $('#paginattable').html('');
    dataTabel.forEach(function(item, i) {
        if (item.toUpperCase().indexOf(targ.toUpperCase()) != -1) {
            // item = item.replace(targ, '<span style="color:red">' + targ + '</span>');
            $('#paginattable').append('<tr>' + item + '</tr>')
        }
    });
    setTimeout(function() {
        setupTablePagination(rowtabledisp.value);
    }, 200)
}

function searchDataDiv(targ) {
    $('#paginattable').html('');
    dataTabel.forEach(function(item, i) {
        if (item.toUpperCase().indexOf(targ.toUpperCase()) != -1) {
            // item = item.replace(targ, '<span style="color:red">' + targ + '</span>');
            $('#paginattable').append('<div class="col s12 m6 l4 card-width">' + item + '</div>')
        }
    });
    setTimeout(function() {
        setupDivPagination(rowtabledisp.value);
    }, 200)
}

function dispDashboard() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.dispUtama').html(xmlhttp.responseText);
            var $el = $('.math-tex')
            $el.empty()
            $el.html('<span>\\(x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}\\)</span>')
            MathJax.Hub.Queue(['Typeset', MathJax.Hub, $el[0]]);
            setChart();
            hideLoad();
            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=dashboard');
    xmlhttp.send();
}

function dispTimeline() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.dispUtama').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=timeline');
    xmlhttp.send();
}

function showLoad() {
    $('.loadUtama').show();
    setTimeout(function() {
        $('.loadUtama img').css({
            'transform': 'scale(1.0)'
        });
    }, 100);
}

function hideLoad() {
    $('.loadUtama img').css({
        'transform': 'scale(0.0)'
    });
    setTimeout(function() {
        $('.loadUtama').hide();
    }, 310);
}

function showToast(e) {
    var toastHTML = e;
    M.toast({
        html: toastHTML,
        classes: 'rounded'
    });
}

function auth(resp) {
    if (parseInt(resp) == 0) {
        window.location.href = '../exit.php';
    }
}

function formatMoney(amount, decimalCount = 0, decimal = ",", thousands = ".") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

function setValueDom(arraydom, isidom) {
    for (i = 0; i < arraydom.length; i++) {
        if (arraydom[i] != '') {
            if (isidom[i] != '') {
                $('#' + arraydom[i]).val(isidom[i]);
                $('#' + arraydom[i] + 'id label').addClass('active');
            } else {
                $('#' + arraydom[i]).val('');
                $('#' + arraydom[i] + 'id label').removeClass('active');
            }
        }
    }
}

function getAssetsLink() {
    return 'http://assets.folder.posi.id/';
}

var domView = '',
    bannerType = '',
    banners = '';

function openPreview(types, banner, idevent) {
    window.location.href = "#previewevent";
    bannerType = types;
    banners = banner;

    if (types == "image") {
        $('.form-View').html('<img src="' + getAssetsLink() + 'fold/' + banner + '" style="width:100%; height:100%;">');
    } else {
        $('.form-View').html('<iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/' + banner + '" allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0"></iframe>');
    }
    domView = '.evView' + idevent;
    var dom = domView;
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    //$('.form-View').html('<img style="width:100%; height:100%" src="https://img.youtube.com/vi/' + kodeytb + '/hqdefault.jpg">')
    $('.overlayPreview').show();
    $('.form-View').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '10px',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-View').css({
                'margin-left': '-350px',
                'margin-top': '-250px',
                'width': '700px',
                'height': '500px',
                'top': '50%',
                'left': '50%',
                'border-radius': '0px'
            });
            $('.btncloses').css({
                'display': 'block',
                'margin-left': '335px',
                'margin-top': '-265px'
            });
        } else {
            // layar hape
            $('.form-View').css({
                'margin-left': '-47vw',
                'margin-top': '-115px',
                'width': '94vw',
                'height': '230px',
                'top': '50%',
                'left': '50%',
                'border-radius': '0px'
            });
            $('.btncloses').css({
                'display': 'block',
                'margin-left': '43vw',
                'margin-top': '-130px'
            });
        }
        $('body').css({
            'overflow-y': 'hidden'
        });
    }, 130);

}

function closeView() {
    window.location.href = "javascript:;";
    var dom = domView;
    $('body').css({
        'overflow-y': 'auto'
    });
    $('.form-View').html((bannerType == 'video') ? '<img style="width:100%; height:100%" src="https://img.youtube.com/vi/' + banners + '/hqdefault.jpg">' : '<img src="' + getAssetsLink() + 'fold/' + banners + '" style="width:100%; height:100%;">');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-View').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '5px'
    });
    setTimeout(function() {
        $('.overlayPreview').hide();
        $('.form-View').hide();
    }, 400);

}

function getDataEvent(Id_event) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var modals = xmlhttp.responseText;
            hideLoad();
            openformEvent('.btnedit', 'Edit', IdGlobal, modals);

            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getdataevent&id_event=' + Id_event);
    xmlhttp.send();
}


// ============ MULAI SCRIPT JQUERY FORMEVENT ====================
var btnformEvent = '',
    statusformEvent = '',
    posformEvent = '',
    formEventElementArr = ['tema', 'tanggalbegin', 'jambegin', 'tanggalend', 'jamend', 'tanggalevent', 'statusevent'];

function openformEvent(dom, status, pos, modal) {
    btnformEvent = dom;
    $('.form-header-formEvent #judul').html(status + " " + 'Event');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayformEvent').show();
    $('.form-formEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-formEvent').css({
                'margin-left': '-460px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '920px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-formEvent').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-formEvent').show();
        $('.form-body-formEvent').show();
        $('.form-footer-formEvent').show();

        // setup tinggi body form
        var hForm = $('.form-formEvent').height(),
            hBody = hForm - 103;
        $('.form-body-formEvent').css({
            'height': hBody + 'px'
        });
    }, 600);
    setTimeout(function() {
        // var lbrCanvas = $('.frameVideo').width(),
        //     tggCanvas = parseInt(lbrCanvas / 1.6);
        // $('.frameVideo').css({
        //     'height': tggCanvas + 'px'
        // });
    }, 700);
    statusformEvent = status;
    $('#tanggalbeginid label').addClass('active');
    $('#jambeginid label').addClass('active');

    $('#tanggalendid label').addClass('active');
    $('#jamendid label').addClass('active');

    $('#tanggaleventid label').addClass('active');
    $('#statuseventid label').addClass('active');
    setTimeout(function() {
        $('.form-body-formEvent').animate({
            scrollTop: 0
        }, 200);
    }, 650);

    if (status == 'New') {
        $('#inputmedia').val('');
        $('#inputmediaid label').removeClass('active');
        $('.form-body-formEvent .daftarAkses').html('');
        $('#tema').val('');
        $('#temaid label').removeClass('active');
        arr_daftar_subjek = [];

        $('#tanggalbegin').val('');
        $('#jambegin').val('');

        $('#tanggalend').val('');
        $('#jamend').val('');

        $('#tanggalevent').val('');
        $('#statusevent').val('Private');
        CKEDITOR.instances.deskripsi.setData('');
    } else {
        posformEvent = pos;
        //setValueDom(formEventElementArr, isiDom);
        var modals = JSON.parse(modal);
        $('#tema').val(modals.judul);
        $('#temaid label').addClass('active');
        typeBanner = modals.type;
        var type = modals.type;
        if (type == "image") {
            dataUrl = "namlastcorp";
            $('#inputmedia').val(modals.banner);
            $('#inputmediaid label').addClass('active');
            $('.frameVideo').html('<img src="' + getAssetsLink() + 'fold/' + modals.banner + '" style="width:100%; height:100%;">')

        } else {
            dataUrl = modals.banner;
            $('#inputmedia').val('https://www.youtube.com/watch?v=' + modals.banner);
            $('#inputmediaid label').addClass('active');
            $('.frameVideo').html('<iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/' + modals.banner + '" allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0"></iframe>');
        }
        $('.form-body-formEvent .daftarAkses').html('');
        arr_daftar_subjek = JSON.parse(modals.subjek);
        arr_daftar_subjek.forEach(function(item, i) {
            $('.form-body-formEvent .daftarAkses').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                            <span>' + item + '</span>\
                                            <i class="material-icons" onclick="delAkses(\'' + item + '\') ">close</i>\
                                        </div>');
        });
        CKEDITOR.instances.deskripsi.setData(modals.desk);
        var begin = modals.begin.split(' ');
        $('#tanggalbegin').val(begin[0]);
        $('#jambegin').val(begin[1]);

        var ends = modals.end.split(' ');
        $('#tanggalend').val(ends[0]);
        $('#jamend').val(ends[1]);

        $('#tanggalevent').val(modals.event);
        $('#statusevent').val((modals.status == '1' ? 'Publish' : 'Private'));
    }

}

function closeformEvent() {
    var dom = btnformEvent;
    $('.frameVideo').html('');
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-formEvent').hide();
    $('.form-body-formEvent').hide();
    $('.form-footer-formEvent').hide();
    $('.form-formEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%'
    });
    setTimeout(function() {
        $('.overlayformEvent').hide();
        $('.form-formEvent').hide();
        clsMe();
    }, 450);
}

function simpanformEvent() {
    var formData = new FormData();
    var palang = true;

    formEventElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });

    if (dataUrl == "") {
        palang = false;
    }
    if (arr_daftar_subjek.length == 0) {
        palang = false;
    }
    formData.append('data', dataUrl);
    formData.append('subjek', JSON.stringify(arr_daftar_subjek));
    formData.append('type', typeBanner);
    formData.append('deskripsi', CKEDITOR.instances.deskripsi.getData());
    formData.append('status', statusformEvent);
    formData.append('pos', posformEvent);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveformEvent',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeformEvent();
            },
            success: function(response) {
                showToast(response);
                hideLoad();
                dispTimeline();
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY FORMEVENT ====================





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
    $('.btnedit, .btnnilai, .btnhapus, .btntutup').css({
        'top': atas - 2 + 'px',
        'left': kiri - 2 + 'px',
        'display': 'block'
    });

    $('.overlayMore').show();
    setTimeout(function() {
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
        $('.btnhapus').css({
            'top': atas + 3 + 'px',
            'left': kiri + 45 + 'px',
            'display': 'block'
        });


    }, 100);
}

function clsMe() {
    $('.overlayMore').hide();
    $('body').css({
        'overflow-y': 'auto'
    });
    $('.overlayMore .centers').css({
        'right': '-100%'
    });
}



var statusDelete, posDelete, subjectDelete;
// Urutan Tombol Pada Tombol Delete adalah status, Id, conteks[untuk isian keterangan], serta subject[menu]
function openDeleteItem(status, Id, contex, subject) {
    statusDelete = status;
    posDelete = Id;
    forSubjectDelete = subject;

    $('.overlayVerifikasi').show();
    $('#strKontext').html('Apakah anda yakin menghapus ' + contex + ' ?');
}

function verifikasiDelete() {
    var formData = new FormData();
    formData.append('status', statusDelete);
    formData.append('pos', posDelete);
    $.ajax({
        type: 'POST',
        url: 'app-assets/js/scripts/engine/override.php?order=' + forSubjectDelete,
        data: formData,
        processData: false,
        contentType: false,
        beforeSend: function() {
            $('.overlayVerifikasi').hide();
            showLoad();
        },
        success: function(response) {
            // console.log(response);
            showToast(response);
            if (forSubjectDelete == 'saveformEvent') {
                dispTimeline();
                clsMe();
            } else if (forSubjectDelete == 'saveSubjectEvent') {
                dispSubject()
            } else if (forSubjectDelete == 'saveSoal') {
                getDaftarSoal(IdGlobalSubjek);
            }
            // $("#barisData" + posDelete).remove();

            hideLoad();
        },
        error: function(xhr, ajaxOptions, thrownError) {}
    });
}

// ============ MULAI SCRIPT JQUERY DISPSUBJEK ====================
var btndispSubjek = '';

function opendispSubjek(dom, id_event) {
    btndispSubjek = dom;
    $('.form-header-dispSubjek #judul').html('SUBJEK DAN BIDANG');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlaydispSubjek').show();
    $('.form-dispSubjek').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-dispSubjek').css({
                'margin-left': '-500px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '1000px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '0px'
            });
        } else {
            // layar hape
            $('.form-dispSubjek').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '0px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-dispSubjek').show();
        $('.form-body-dispSubjek').show();
        $('.form-footer-dispSubjek').show();

        // setup tinggi body form
        var hForm = $('.form-dispSubjek').height(),
            hBody = hForm - 103;
        $('.form-body-dispSubjek').css({
            'height': hBody + 'px'
        });
    }, 600);
    getDataSubjekBidang(id_event);

    // get all data what kontext needed
    getDataKompetisi(IdGlobal);
}

function getDataKompetisi(id_event) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            hideLoad();
            var json = JSON.parse(xmlhttp.responseText);
            // get data kompetisi
            sbjEvent = JSON.parse(json[0].subjek);
            tglEvent = json[0].tglevent;

            // ambil data jenjang

            var arrJenjang = json[1].jenjang;
            jjgEvent = [];
            jjgSubjek = [];
            arrJenjang.forEach(function(item, i) {
                jjgEvent.push(item.jenjang);
                jjgSubjek.push(item.subjek);
            });
            bdgEvent = [];
            bdgEvent = json[2].bidang;
            console.log(bdgEvent);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getdatakompetisi&id_event=' + id_event);
    xmlhttp.send();
}

function getDataSubjekBidang(Id_event) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.form-body-dispSubjek').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getdatasubjek&id_event=' + Id_event);
    xmlhttp.send();
}


function closedispSubjek() {
    var dom = btndispSubjek;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-dispSubjek').hide();
    $('.form-body-dispSubjek').hide();
    $('.form-footer-dispSubjek').hide();
    $('.form-dispSubjek').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%'
    });
    setTimeout(function() {
        $('.overlaydispSubjek').hide();
        $('.form-dispSubjek').hide();
        clsMe();
    }, 400);
}


function simpandispSubjek() {
    var formData = new FormData();
    var palang = true;
    dispSubjekElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });
    formData.append('status', statusdispSubjek);
    formData.append('pos', posdispSubjek);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=savedispSubjek',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closedispSubjek();
            },
            success: function(response) {
                showToast(response);
                hideLoad();
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY DISPSUBJEK ====================




//For Menu 2 Display Subject
function dispSubject() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.dispUtama').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
            dataTabel = [];
            var targ = $('#paginattable').children('tr');
            for (i = 0; i < targ.length; i++) {
                dataTabel.push(targ.eq(i).html());
            }
            setupTablePagination(rowtabledisp.value);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=subject');
    xmlhttp.send();
}



// ============ MULAI SCRIPT JQUERY SUBJECTEVENT ====================
var btnSubjectEvent = '',
    statusSubjectEvent = '',
    posSubjectEvent = '',
    SubjectEventElementArr = ['nama_subject'];

function openSubjectEvent(dom, status, pos, modal) {
    btnSubjectEvent = dom;
    $('.form-header-SubjectEvent #judul').html(status + " " + 'Subject Event');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlaySubjectEvent').show();
    $('.form-SubjectEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-SubjectEvent').css({
                'margin-left': '-300px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-125px'),
                'width': '600px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '250px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-SubjectEvent').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-SubjectEvent').show();
        $('.form-body-SubjectEvent').show();
        $('.form-footer-SubjectEvent').show();

        // setup tinggi body form
        var hForm = $('.form-SubjectEvent').height(),
            hBody = hForm - 103;
        $('.form-body-SubjectEvent').css({
            'height': hBody + 'px'
        });
    }, 600);
    statusSubjectEvent = status;
    if (status == 'New') {

    } else {
        posSubjectEvent = pos;
        var isiDom = modal.split('A99');
        setValueDom(SubjectEventElementArr, isiDom);
    }
}




function closeSubjectEvent() {
    var dom = btnSubjectEvent;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-SubjectEvent').hide();
    $('.form-body-SubjectEvent').hide();
    $('.form-footer-SubjectEvent').hide();
    $('.form-SubjectEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%'
    });
    setTimeout(function() {
        $('.overlaySubjectEvent').hide();
        $('.form-SubjectEvent').hide();
    }, 400);
}


function simpanSubjectEvent() {
    var formData = new FormData();
    var palang = true;
    SubjectEventElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });
    formData.append('status', statusSubjectEvent);
    formData.append('pos', posSubjectEvent);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveSubjectEvent',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeSubjectEvent();
            },
            success: function(response) {
                showToast(response);
                dispSubject();
                hideLoad();
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY SUBJECTEVENT ====================

// ============ MULAI SCRIPT JQUERY FORMBIDANG ====================
var btnformBidang = '',
    statusformBidang = '',
    posformBidang = '',
    formBidangElementArr = ['subjbidang', 'bidang', 'tglev1', 'jammulai', 'tglev2', 'jamakhir', 'linktg', 'price', 'gold', 'silver', 'bronze'];

function openformBidang(dom, status, pos, modal) {
    btnformBidang = dom;
    $('.form-header-formBidang #judul').html(status + " " + ' Bidang Ujian');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + (status == 'New' ? 56 : 0);
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayformBidang').show();
    $('.form-formBidang').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': (status == 'New' ? '3px' : '100%'),
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-formBidang').css({
                'margin-left': '-400px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '800px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-formBidang').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({ 'overflow-y': 'hidden' });
        $('.form-header-formBidang').show();
        $('.form-body-formBidang').show();
        $('.form-footer-formBidang').show();

        // setup tinggi body form
        var hForm = $('.form-formBidang').height(),
            hBody = hForm - 103;
        $('.form-body-formBidang').css({
            'height': hBody + 'px'
        });
    }, 600);
    setTimeout(function() {
        $('.form-body-formBidang').animate({
            scrollTop: 0
        }, 200);
    }, 650);
    statusformBidang = status;
    if (status == 'New') {
        var isiDom = ['', '', '', '', '', '', '', '', '', '', ''];
        setValueDom(formBidangElementArr, isiDom);
        $('#tglev1').val(tglEvent);
        $('#tglev1id label').addClass('active');

        $('#tglev2').val(tglEvent);
        $('#tglev2id label').addClass('active');

        $('#jammulaiid label').addClass('active');
        $('#jamakhirid label').addClass('active');
        arr_daftar_subjek = [];
        $('.form-body-formBidang .daftarAkses').html('');

        arr_silabus = [];
        $('.daftarSilabus').html('');
    } else {
        posformBidang = pos;
        var isiDom = JSON.parse(rekontruksiJson(modal));
        jjgterpilih = [];
        for (var i = 0; i < jjgSubjek.length; i++) {
            if (isiDom[0] == jjgSubjek[i]) {
                jjgterpilih.push(Unlateral(jjgEvent[i]));
            }
        }
        $('.form-body-formBidang .daftarAkses').html('');
        arr_daftar_subjek = JSON.parse(rekontruksiSiku(isiDom[11]));
        for (var i = 0; i < arr_daftar_subjek.length; i++) {
            $('.form-body-formBidang .daftarAkses').prepend('<div class="listAkses" id="' + arr_daftar_subjek[i].split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                                <span>' + arr_daftar_subjek[i] + '</span>\
                                                <i class="material-icons" onclick="delAkses(\'' + arr_daftar_subjek[i] + '\') ">close</i>\
                                            </div>');
        }

        $('.daftarSilabus').html('');
        arr_silabus = JSON.parse(rekontruksiSiku(isiDom[12]));
        console.log(arr_silabus);
        for (var i = 0; i < arr_silabus.length; i++) {
            $('.daftarSilabus').prepend('<div class="listAkses" id="' + arr_silabus[i].split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                                <span>' + arr_silabus[i] + '</span>\
                                                <i class="material-icons" onclick="delSilabus(\'' + arr_silabus[i] + '\') ">close</i>\
                                            </div>');
        }


        setValueDom(formBidangElementArr, isiDom);
    }

}


function closeformBidang() {
    var dom = btnformBidang;
    $('body').css({ 'overflow-y': 'auto' });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + (statusformBidang == 'New' ? 56 : 0);
    var tinggi = $(dom).height();
    $('.form-header-formBidang').hide();
    $('.form-body-formBidang').hide();
    $('.form-footer-formBidang').hide();
    $('.form-formBidang').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': (statusformBidang == 'New' ? '3px' : '100%')
    });
    setTimeout(function() {
        $('.overlayformBidang').hide();
        $('.form-formBidang').hide();
    }, 400);
}

function simpanformBidang() {
    var formData = new FormData();
    var palang = true;
    formBidangElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });
    if (arr_daftar_subjek.length == 0) {
        palang = false;
    }
    formData.append('jenjang', JSON.stringify(arr_daftar_subjek));
    formData.append('kisi', JSON.stringify(arr_silabus));
    formData.append('status', statusformBidang);
    formData.append('pos', posformBidang);
    formData.append('id_event', IdGlobal);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveformBidang',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeformBidang();

            },
            success: function(response) {
                showToast(response);
                hideLoad();
                getDataSubjekBidang(IdGlobal);
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY FORMBIDANG ====================
// ============ AKHIR SCRIPT JQUERY FORMBIDANG ====================

function rekontruksiJson(modal) {
    return modal.split('Q212Q').join('"').split('A212A').join('{').split('F212F').join('}');
}

function rekontruksiSiku(targ) {
    return targ.split('FRG').join(']').split('FLG').join('[').split('KMA').join('"');
}


// ============ MULAI SCRIPT JQUERY OVERLAYLISTOFALLDATAMEMBER ====================
var btnoverlayListOfAllDataMember = '',
    posoverlayListOfAllDataMember = '';

function openoverlayListOfAllDataMember(dom, IdSubject, IdEvent) {
    btnoverlayListOfAllDataMember = dom;
    $('.form-header-overlayListOfAllDataMember #judul').html('Daftar Peserta & Rank');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayoverlayListOfAllDataMember').show();
    $('.form-overlayListOfAllDataMember').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-overlayListOfAllDataMember').css({
                'margin-left': '-600px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '1200px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%'
            });
        } else {
            // layar hape
            $('.form-overlayListOfAllDataMember').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-overlayListOfAllDataMember').show();
        $('.form-body-overlayListOfAllDataMember').show();
        $('.form-footer-overlayListOfAllDataMember').show();

        // setup tinggi body form
        var hForm = $('.form-overlayListOfAllDataMember').height(),
            hBody = hForm - 103;
        $('.form-body-overlayListOfAllDataMember').css({
            'height': hBody + 'px'
        });
    }, 600);

    ListAllDataOfMember(IdSubject, IdEvent);
}


function closeoverlayListOfAllDataMember() {
    var dom = btnoverlayListOfAllDataMember;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    $('.form-header-overlayListOfAllDataMember').hide();
    $('.form-body-overlayListOfAllDataMember').hide();
    $('.form-footer-overlayListOfAllDataMember').hide();
    $('.form-overlayListOfAllDataMember').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px'
    });
    setTimeout(function() {
        $('.overlayoverlayListOfAllDataMember').hide();
        $('.form-overlayListOfAllDataMember').hide();
    }, 400);
}
// ============ AKHIR SCRIPT JQUERY OVERLAYLISTOFALLDATAMEMBER ====================



//For List All Data Of Member
function ListAllDataOfMember(isIdSubject, isIdEvent) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.form-body-overlayListOfAllDataMember').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getListOfAllDataMember&InSelectSubject=' + isIdSubject + '&InSelectEvent=' + isIdEvent);
    xmlhttp.send();
}

function dispBidang() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.dispUtama').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
            dataTabel = [];
            var targ = $('#paginattable').children('tr');
            for (i = 0; i < targ.length; i++) {
                dataTabel.push(targ.eq(i).html());
            }
            setupTablePagination(rowtabledisp.value);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=BidangEvent');
    xmlhttp.send();
}



// ============ MULAI SCRIPT JQUERY OVERLAYBIDANGEVENT ====================
var btnoverlayBidangEvent = '',
    statusoverlayBidangEvent = '',
    posoverlayBidangEvent = '',
    overlayBidangEventElementArr = ['nama_bidang_event'];

function openoverlayBidangEvent(dom, status, pos, modal) {
    btnoverlayBidangEvent = dom;
    $('.form-header-overlayBidangEvent #judul').html(status + " " + 'Bidang Event');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayoverlayBidangEvent').show();
    $('.form-overlayBidangEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-overlayBidangEvent').css({
                'margin-left': '-300px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-125px'),
                'width': '600px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '250px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-overlayBidangEvent').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-overlayBidangEvent').show();
        $('.form-body-overlayBidangEvent').show();
        $('.form-footer-overlayBidangEvent').show();

        // setup tinggi body form
        var hForm = $('.form-overlayBidangEvent').height(),
            hBody = hForm - 103;
        $('.form-body-overlayBidangEvent').css({
            'height': hBody + 'px'
        });
    }, 600);
    statusoverlayBidangEvent = status;
    if (status == 'New') {
        var isiDom = [''];
        setValueDom(overlayBidangEventElementArr, isiDom);
    } else {
        posoverlayBidangEvent = pos;
        var isiDom = modal.split('A99');
        setValueDom(overlayBidangEventElementArr, isiDom);
    }

}


function closeoverlayBidangEvent() {
    var dom = btnoverlayBidangEvent;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-overlayBidangEvent').hide();
    $('.form-body-overlayBidangEvent').hide();
    $('.form-footer-overlayBidangEvent').hide();
    $('.form-overlayBidangEvent').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%'
    });
    setTimeout(function() {
        $('.overlayoverlayBidangEvent').hide();
        $('.form-overlayBidangEvent').hide();
    }, 400);
}


function simpanoverlayBidangEvent() {
    var formData = new FormData();
    var palang = true;
    overlayBidangEventElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });
    formData.append('status', statusoverlayBidangEvent);
    formData.append('pos', posoverlayBidangEvent);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveoverlayBidangEvent',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeoverlayBidangEvent();
            },
            success: function(response) {
                showToast(response);
                dispBidang();
                hideLoad();
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY OVERLAYBIDANGEVENT ====================





//For Menu 4 Display Jenjang
function dispJenjang() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.dispUtama').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
            dataTabel = [];
            var targ = $('#paginattable').children('tr');
            for (i = 0; i < targ.length; i++) {
                dataTabel.push(targ.eq(i).html());
            }
            setupTablePagination(rowtabledisp.value);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=Jenjang');
    xmlhttp.send();
}



// ============ MULAI SCRIPT JQUERY OVERLAYJENJANG ====================
var btnOverlayJenjang = '',
    statusOverlayJenjang = '',
    posOverlayJenjang = '',
    OverlayJenjangElementArr = ['nama_jenjang'];

function openOverlayJenjang(dom, status, pos, modal) {
    btnOverlayJenjang = dom;
    $('.form-header-OverlayJenjang #judul').html(status + " " + 'OverlayJenjang');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayOverlayJenjang').show();
    $('.form-OverlayJenjang').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-OverlayJenjang').css({
                'margin-left': '-300px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '600px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-OverlayJenjang').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-OverlayJenjang').show();
        $('.form-body-OverlayJenjang').show();
        $('.form-footer-OverlayJenjang').show();

        // setup tinggi body form
        var hForm = $('.form-OverlayJenjang').height(),
            hBody = hForm - 103;
        $('.form-body-OverlayJenjang').css({
            'height': hBody + 'px'
        });
    }, 600);
    statusOverlayJenjang = status;
    if (status == 'New') {
        arr_daftar_subjek = [];
    } else {
        posOverlayJenjang = pos;
        $('.daftarAksesJenjang').html('');
        arr_daftar_subjek = JSON.parse(modal);
        arr_daftar_subjek.forEach(function(item, i) {
            $('.daftarAksesJenjang').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                            <span>' + item + '</span>\
                                            <i class="material-icons" onclick="delAkses(\'' + item + '\') ">close</i>\
                                        </div>');
        });
    }

}


function closeOverlayJenjang() {
    var dom = btnOverlayJenjang;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-OverlayJenjang').hide();
    $('.form-body-OverlayJenjang').hide();
    $('.form-footer-OverlayJenjang').hide();
    $('.form-OverlayJenjang').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '100%'
    });
    setTimeout(function() {
        $('.overlayOverlayJenjang').hide();
        $('.form-OverlayJenjang').hide();
    }, 400);
}


function simpanOverlayJenjang() {
    var formData = new FormData();
    var palang = true;
    OverlayJenjangElementArr.forEach(function(item, i) {
        if ($('#' + item).val() == "") {
            palang = false;
        }
        formData.append(item, $('#' + item).val());
    });
    if (arr_daftar_subjek.length == 0) {
        palang = false;
    }
    formData.append('JenjangDong', JSON.stringify(arr_daftar_subjek));
    formData.append('status', statusOverlayJenjang);
    formData.append('pos', posOverlayJenjang);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveOverlayJenjang',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeOverlayJenjang();
            },
            success: function(response) {
                showToast(response);
                dispJenjang();
                hideLoad();
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY OVERLAYJENJANG ====================

// ============ MULAI SCRIPT JQUERY DAFTARSOAL ====================
var btndaftarSoal = '',
    IdGlobalSubjek = 0;

function opendaftarSoal(dom, id_subjek) {
    IdGlobalSubjek = id_subjek;
    btndaftarSoal = dom;
    $('.form-header-daftarSoal #judul').html('DAFTAR SOAL');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;
    var lebarLayar = $('body').width() - 20;

    $('.overlaydaftarSoal').show();
    $('.form-daftarSoal').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '1px',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-daftarSoal').css({
                'margin-left': (lebarLayar < 1400 ? -lebarLayar / 2 + 'px' : '-700px'),
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': (lebarLayar < 1400 ? lebarLayar + 'px' : '1300px'),
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-daftarSoal').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({ 'overflow-y': 'hidden' });
        $('.form-header-daftarSoal').show();
        $('.form-body-daftarSoal').show();
        $('.form-footer-daftarSoal').show();

        // setup tinggi body form
        var hForm = $('.form-daftarSoal').height(),
            hBody = hForm - 103;
        $('.form-body-daftarSoal').css({
            'height': hBody + 'px'
        });
    }, 600);

    getDaftarSoal(id_subjek);

}

function getDaftarSoal(id_subjek) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            hideLoad();
            $('.form-body-daftarSoal').html(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getdaftarsoal&id_subjek=' + id_subjek);
    xmlhttp.send();
}


function closedaftarSoal() {
    var dom = btndaftarSoal;
    $('body').css({ 'overflow-y': 'auto' });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    $('.form-header-daftarSoal').hide();
    $('.form-body-daftarSoal').hide();
    $('.form-footer-daftarSoal').hide();
    $('.form-daftarSoal').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '3px'
    });
    setTimeout(function() {
        $('.overlaydaftarSoal').hide();
        $('.form-daftarSoal').hide();
    }, 400);
}

// ============ AKHIR SCRIPT JQUERY DAFTARSOAL ====================

// ============ MULAI SCRIPT JQUERY INPUTSOAL ====================
var btninputSoal = '',
    statusinputSoal = '',
    posinputSoal = '';

function openinputSoal(dom, status, pos) {
    btninputSoal = dom;
    $('.form-header-inputSoal #judul').html(status + " " + ' Soal');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayinputSoal').show();
    $('.form-inputSoal').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '3px',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-inputSoal').css({
                'margin-left': '-400px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '800px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        } else {
            // layar hape
            $('.form-inputSoal').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
                'border-radius': '5px'
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({ 'overflow-y': 'hidden' });
        $('.form-header-inputSoal').show();
        $('.form-body-inputSoal').show();
        $('.form-footer-inputSoal').show();

        // setup tinggi body form
        var hForm = $('.form-inputSoal').height(),
            hBody = hForm - 103;
        $('.form-body-inputSoal').css({
            'height': hBody + 'px'
        });
    }, 600);
    statusinputSoal = status;
    if (status == 'New') {
        var isiDom = ['', '', '', '', '', ''];
        setValueDom(inputSoalElementArr, isiDom);
        CKEDITOR.instances.soal.setData('');
        CKEDITOR.instances.opta.setData('');
        CKEDITOR.instances.optb.setData('');
        CKEDITOR.instances.optc.setData('');
        CKEDITOR.instances.optd.setData('');
        CKEDITOR.instances.opte.setData('');
        CKEDITOR.instances.pembahasan.setData('');
        CKEDITOR.instances.rekomendasi.setData('');
    } else {
        posinputSoal = pos;
        getSoalNo(posinputSoal);
    }
}

function getSoalNo(pos) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            hideLoad();
            var json = JSON.parse(xmlhttp.responseText);
            $('#materi').val(json.materi);
            $('#materiid label').addClass('active');

            $('#submateri').val(json.submateri);
            $('#submateriid label').addClass('active');

            CKEDITOR.instances.soal.setData(json.soal);
            CKEDITOR.instances.opta.setData(json.opta);
            CKEDITOR.instances.optb.setData(json.optb);
            CKEDITOR.instances.optc.setData(json.optc);
            CKEDITOR.instances.optd.setData(json.optd);
            CKEDITOR.instances.opte.setData(json.opte);
            CKEDITOR.instances.pembahasan.setData(json.pembahasan);
            CKEDITOR.instances.rekomendasi.setData(json.rekomendasi);

            $('#jawaban').val(json.jawaban);
            $('#jawabanid label').addClass('active');

            $('#scorebenar').val(json.benar);
            $('#scorebenarid label').addClass('active');

            $('#scoresalah').val(json.salah);
            $('#scoresalahid label').addClass('active');

            $('#kesulitan').val(json.kesukaran);
            $('#kesulitanid label').addClass('active');

        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getsoalno&id_soal=' + pos);
    xmlhttp.send();
}

function closeinputSoal() {
    var dom = btninputSoal;
    $('body').css({ 'overflow-y': 'auto' });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width() + 56;
    var tinggi = $(dom).height();
    $('.form-header-inputSoal').hide();
    $('.form-body-inputSoal').hide();
    $('.form-footer-inputSoal').hide();
    $('.form-inputSoal').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'border-radius': '3px'
    });
    setTimeout(function() {
        $('.overlayinputSoal').hide();
        $('.form-inputSoal').hide();
    }, 400);
}

var inputSoalElementArr = ['materi', 'submateri', 'jawaban', 'scorebenar', 'scoresalah', 'kesulitan'];

function simpaninputSoal() {
    var formData = new FormData();
    var palang = true;
    inputSoalElementArr.forEach(function(item, i) {
        formData.append(item, $('#' + item).val());
    });
    formData.append('soal', CKEDITOR.instances.soal.getData());
    formData.append('opta', CKEDITOR.instances.opta.getData());
    formData.append('optb', CKEDITOR.instances.optb.getData());
    formData.append('optc', CKEDITOR.instances.optc.getData());
    formData.append('optd', CKEDITOR.instances.optd.getData());
    formData.append('opte', CKEDITOR.instances.opte.getData());
    formData.append('pembahasan', CKEDITOR.instances.pembahasan.getData());
    formData.append('rekomendasi', CKEDITOR.instances.rekomendasi.getData());
    formData.append('id_subjek', IdGlobalSubjek);
    formData.append('status', statusinputSoal);
    formData.append('pos', posinputSoal);
    if (palang) {
        $.ajax({
            type: 'POST',
            url: 'app-assets/js/scripts/engine/override.php?order=saveSoal',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function() {
                showLoad();
                closeinputSoal();
            },
            success: function(response) {
                showToast(response);
                hideLoad();
                getDaftarSoal(IdGlobalSubjek);
            },
            error: function(xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY INPUTSOAL ====================
// ============ AKHIR SCRIPT JQUERY INPUTSOAL ====================
// ============ AKHIR SCRIPT JQUERY INPUTSOAL ====================================


// ============ MULAI SCRIPT JQUERY DETAILHASILUJIAN ====================
var btnDetailHasilUjian = '';

function openDetailHasilUjian(dom, IdKompetisi, IdSubject, IdEvent) {
    btnDetailHasilUjian = dom;
    $('.form-header-DetailHasilUjian #judul').html('Detail Hasil Ujian');
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    var layar = $('body').width();
    var tinggiLayar = $('body').height() - 20;

    $('.overlayDetailHasilUjian').show();
    $('.form-DetailHasilUjian').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 56 + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
        'display': 'block'
    });
    setTimeout(function() {
        if (layar > 762) {
            $('.form-DetailHasilUjian').css({
                'margin-left': '-600px',
                'margin-top': (tinggiLayar < 700 ? -tinggiLayar / 2 + 'px' : '-350px'),
                'width': '1200px',
                'height': (tinggiLayar < 700 ? tinggiLayar + 'px' : '700px'),
                'top': '50%',
                'left': '50%',
            });
        } else {
            // layar hape
            $('.form-DetailHasilUjian').css({
                'margin-left': '-50vw',
                'margin-top': '-50vh',
                'width': '100vw',
                'height': '100vh',
                'top': '50%',
                'left': '50%',
            });
        }
    }, 200);
    setTimeout(function() {
        $('body').css({
            'overflow-y': 'hidden'
        });
        $('.form-header-DetailHasilUjian').show();
        $('.form-body-DetailHasilUjian').show();
        $('.form-footer-DetailHasilUjian').show();

        // setup tinggi body form
        var hForm = $('.form-DetailHasilUjian').height(),
            hBody = hForm - 103;
        $('.form-body-DetailHasilUjian').css({
            'height': hBody + 'px'
        });
    }, 600);
    getDetailDataHasilUjian(IdKompetisi, IdSubject, IdEvent);
}


function closeDetailHasilUjian() {
    var dom = btnDetailHasilUjian;
    $('body').css({
        'overflow-y': 'auto'
    });
    var atas = $(dom).offset().top - $(document).scrollTop();
    var kiri = $(dom).offset().left;
    var lebar = $(dom).width();
    var tinggi = $(dom).height();
    $('.form-header-DetailHasilUjian').hide();
    $('.form-body-DetailHasilUjian').hide();
    $('.form-footer-DetailHasilUjian').hide();
    $('.form-DetailHasilUjian').css({
        'margin-left': '0px',
        'margin-top': '0px',
        'width': lebar + 'px',
        'height': tinggi + 'px',
        'top': atas + 'px',
        'left': kiri + 'px',
    });
    setTimeout(function() {
        $('.overlayDetailHasilUjian').hide();
        $('.form-DetailHasilUjian').hide();
    }, 400);
}



// ============ AKHIR SCRIPT JQUERY DETAILHASILUJIAN ====================

function getDetailDataHasilUjian(isIdKompetisi, isIdSubject, isIdMember) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $('.form-body-DetailHasilUjian').html(xmlhttp.responseText);
            hideLoad();
            auth(xmlhttp.responseText);
        }
    }
    xmlhttp.open('GET', 'app-assets/js/scripts/engine/override.php?order=getDataDetailHasilUjian&idKompetisi=' + isIdKompetisi + '&idSubject=' + isIdSubject + '&idMember=' + isIdMember);
    xmlhttp.send();
}