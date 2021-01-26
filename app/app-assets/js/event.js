var boolMedia = false,
    dataUrl = '',
    typeBanner = '',
    subjek = ['Guru', 'Mahasiswa', 'Siswa'],
    statusEvent = ['Publish', 'Private'],
    kontextCombos = '',
    listArr = [],
    mouse_combos = false,
    IdGlobal,
    arr_daftar_subjek = [];
$(document).ready(function (e) {
    selectMenu('menu0');
    initSample();
    $('.genCombos').hover(function () {
        mouse_combos = true
    }, function () {
        mouse_combos = false;
    });

    $('body').mouseup(function () {
        if (!mouse_combos) {
            $('.genCombos').hide();
        }
    });

    $('body').on({
        mouseenter: function () {
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
        mouseleave: function () {
            $('.tooltips').hide(100);
        }
    }, '.addbtn');

    //.header-search-input 
    //#search
    $('.header-search-input, #search').on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            var targ = $(this).val();
            if (fungsiPencarian == 'tabel') {
                searchDataTable(targ);
            } else {
                searchDataDiv(targ);
            }
        }
    });


    $('.header-search-input, #search').on('input', function () {
        var targ = $(this).val();

        if (fungsiPencarian == 'tabel') {
            searchDataTable(targ);
        } else {
            searchDataDiv(targ);
        }
    });

    $('#inputmedia').on('input', function (e) {
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

    $('#browsemedia').on('change', function () {
        boolMedia = false;
        $('.frameVideo').html('<canvas id="canvas"></canvas>');
        console.log($(this)[0].files[0]);
        var files = $(this)[0].files[0];
        $('#inputmedia').val(files.name);
        $('#inputmediaid label').addClass('active');

        var meta = $(this).attr('meta-data');
        var img = new Image();
        img.onload = function () {
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
        img.onerror = function () {
            console.error("The provided file couldn't be loaded as an Image media");
        }
        img.src = URL.createObjectURL(this.files[0]);
    });

    $('#subjek, #statusevent').on('click', function () {
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
        }
    });


    //This For Ovelay Moore
    $('.btntutup').on('click', function () {
        clsMe();
    });

    $('.btnedit').click(function () {
        getDataEvent(IdGlobal);
    });
    $('.btnsoal').click(function () {
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
        openDeleteItem('Hapus', IdGlobal, 'Data Event Berikut', 'saveformEvent');
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

function setToListBody(daftarArr) {
    // alert(daftarArr);
    $('.bodyCombos').html('');
    daftarArr.forEach(function (item, i) {
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
            $('.daftarAkses').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
                                            <span>' + item + '</span>\
                                            <i class="material-icons" onclick="delAkses(\'' + item + '\') ">close</i>\
                                        </div>');
        } else {
            showToast('data sudah terdaftar');
        }

        $('#subjek').val('');
    }
}

function delAkses(target) {
    var index = arr_daftar_subjek.indexOf(target);
    if (index > -1) {
        arr_daftar_subjek.splice(index, 1);
    }
    $('#' + target.split(' ').join('').replace('(', '').replace(')', '').replace('.', '')).hide(200);
}

function cariCombos(val, ev) {
    $('.bodyCombos').html('');
    var prediksi = '',
        byk = 0;
    if (val.length > 1) {
        listArr.forEach(function (item, i) {
            if (item.toUpperCase().indexOf(val.toUpperCase()) != -1) {
                byk++;
                if (byk == 1) {
                    prediksi = item;
                }
                $('.bodyCombos').append('<div class="listItem" onclick="setItemCombos(\'' + item + '\')">' + item.toUpperCase() + '</div>');
            }
        });
    } else if (val == '') {
        listArr.forEach(function (item, i) {
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
    dataTabel.forEach(function (item, i) {
        if (item.toUpperCase().indexOf(targ.toUpperCase()) != -1) {
            // item = item.replace(targ, '<span style="color:red">' + targ + '</span>');
            $('#paginattable').append('<tr>' + item + '</tr>')
        }
    });
    setTimeout(function () {
        setupTablePagination(rowtabledisp.value);
    }, 200)
}

function searchDataDiv(targ) {
    $('#paginattable').html('');
    dataTabel.forEach(function (item, i) {
        if (item.toUpperCase().indexOf(targ.toUpperCase()) != -1) {
            // item = item.replace(targ, '<span style="color:red">' + targ + '</span>');
            $('#paginattable').append('<div class="col s12 m6 l4 card-width">' + item + '</div>')
        }
    });
    setTimeout(function () {
        setupDivPagination(rowtabledisp.value);
    }, 200)
}

function dispDashboard() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
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
    xmlhttp.onreadystatechange = function () {
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
    setTimeout(function () {
        $('.loadUtama img').css({
            'transform': 'scale(1.0)'
        });
    }, 100);
}

function hideLoad() {
    $('.loadUtama img').css({
        'transform': 'scale(0.0)'
    });
    setTimeout(function () {
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
    return 'http://localhost/';
}

var domView = '',
    bannerType = '',
    banners = '';

function openPreview(types, banner, idevent) {
    window.location.href = "#previewevent";
    bannerType = types;
    banners = banner;

    if (types == "image") {
        $('.form-View').html('<img src="' + getAssetsLink() + 'posiassets/fold/' + banner + '" style="width:100%; height:100%;">');
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
    setTimeout(function () {
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
    $('.form-View').html((bannerType == 'video') ? '<img style="width:100%; height:100%" src="https://img.youtube.com/vi/' + banners + '/hqdefault.jpg">' : '<img src="' + getAssetsLink() + 'posiassets/fold/' + banners + '" style="width:100%; height:100%;">');
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
    setTimeout(function () {
        $('.overlayPreview').hide();
        $('.form-View').hide();
    }, 400);

}

function getDataEvent(Id_event) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
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
    setTimeout(function () {
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
    setTimeout(function () {
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
    setTimeout(function () {
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
    setTimeout(function () {
        $('.form-body-formEvent').animate({
            scrollTop: 0
        }, 200);
    }, 650);

    if (status == 'New') {
        $('#inputmedia').val('');
        $('#inputmediaid label').removeClass('active');
        $('.daftarAkses').html('');
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
            $('.frameVideo').html('<img src="' + getAssetsLink() + 'posiassets/fold/' + modals.banner + '" style="width:100%; height:100%;">')

        } else {
            dataUrl = modals.banner;
            $('#inputmedia').val('https://www.youtube.com/watch?v=' + modals.banner);
            $('#inputmediaid label').addClass('active');
            $('.frameVideo').html('<iframe style="width:100%; height:100%;" src="https://www.youtube.com/embed/' + modals.banner + '" allow="autoplay; encrypted-media" allowfullscreen="" frameborder="0"></iframe>');
        }
        $('.daftarAkses').html('');
        arr_daftar_subjek = JSON.parse(modals.subjek);
        arr_daftar_subjek.forEach(function (item, i) {
            $('.daftarAkses').prepend('<div class="listAkses" id="' + item.split(' ').join('').replace('(', '').replace(')', '').replace('.', '') + '">\
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
    setTimeout(function () {
        $('.overlayformEvent').hide();
        $('.form-formEvent').hide();
        clsMe();
    }, 450);
}

function simpanformEvent() {
    var formData = new FormData();
    var palang = true;

    formEventElementArr.forEach(function (item, i) {
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
            beforeSend: function () {
                showLoad();
                closeformEvent();
            },
            success: function (response) {
                showToast(response);
                hideLoad();
                dispTimeline();
            },
            error: function (xhr, ajaxOptions, thrownError) {

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
    $('.btnedit, .btnnilai, .btnhapus, .btntutup, .btnsoal').css({
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
        $('.btnsoal').css({
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
        beforeSend: function () {
            $('.overlayVerifikasi').hide();
            showLoad();
        },
        success: function (response) {
            // console.log(response);
            showToast(response);
            if (forSubjectDelete == 'saveformEvent') {
                dispTimeline();
                clsMe();
            } else if (forSubjectDelete == 'saveSubjectEvent') {
                dispSubject();
            }
            // $("#barisData" + posDelete).remove();

            hideLoad();
        },
        error: function (xhr, ajaxOptions, thrownError) {}
    });
}


//For Menu 2 Display Subject
function dispSubject() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
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
    setTimeout(function () {
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
    setTimeout(function () {
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
        var isiDom = [''];
        setValueDom(SubjectEventElementArr, isiDom);
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
    setTimeout(function () {
        $('.overlaySubjectEvent').hide();
        $('.form-SubjectEvent').hide();
    }, 400);
}


function simpanSubjectEvent() {
    var formData = new FormData();
    var palang = true;
    SubjectEventElementArr.forEach(function (item, i) {
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
            beforeSend: function () {
                showLoad();
                closeSubjectEvent();
            },
            success: function (response) {
                showToast(response);
                dispSubject();
                hideLoad();
            },
            error: function (xhr, ajaxOptions, thrownError) {

            }
        });
    } else {
        showToast('Data belum lengkap');
    }

}
// ============ AKHIR SCRIPT JQUERY SUBJECTEVENT ====================