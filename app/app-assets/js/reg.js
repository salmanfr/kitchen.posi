var elementIdentitas = ['nama', 'kontak', 'email', 'password', 'sebagai'],
    elementSekolah = ['jenjang', 'provinsi', 'kab_kota', 'kecamatan', 'sekolah'],
    elementOtp = ['tanggal_lahir', 'jenis_kelamin', 'usernameig', 'otpcode'],
    jenjang = ['SD / MI', 'SMP / MTS', 'SMA / MA / SMK'],
    agama = ['Islam', 'Katholik', 'Protestan', 'Hindu', 'Budha', 'Konghucu'],
    statusBtn = 0,
    mouse_combos = false,
    listArr = [],
    provinsi = [],
    kabupaten = [],
    kecamatan = [],
    sekolah = [],
    kontextCombos,
    selProv = '',
    selKab = '',
    selKec = '',
    OTPnumber = '';

$(document).ready(function(e) {
    prepareProv();
    for (var i = 0; i < elementSekolah.length; i++) {
        $('.' + elementSekolah[i]).hide();
    }
    for (var i = 0; i < elementOtp.length; i++) {
        $('.' + elementOtp[i]).hide();
    }
    if ($('body').width() > 765) {
        $('#otpcode').formatter({
            'pattern': '{{9}}-{{9}}-{{9}}-{{9}}-{{9}}',
            'persistent': true
        });
        $('#kontak').formatter({
            'pattern': '+62 {{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}{{9}}',
            'persistent': true
        });
    }

    $(".kananvisible").click(function() {
        if ($(this).text() == 'visibility') {
            $(this).html('visibility_off');
            $('#password').attr('type', 'password');
        } else {
            $(this).html('visibility');
            $('#password').attr('type', 'text');
        }
    });



    $('.btn').on('click', function() {
        if (statusBtn == 0) {
            var palang1 = false;
            for (var i = 0; i < elementIdentitas.length; i++) {
                if ($('#' + elementIdentitas[i]).val() == '') {
                    palang1 = true;
                }
            }
            // password
            if ($('#password').val().toString().length < 7) {
                palang1 = true;
                showToast('password lemah');
                $('#password').focus();
            }
            // email
            var emls = $('#email').val().split('@');
            if (emls[1] != "gmail.com" && emls[1] != "yahoo.com" && emls[1] != "yahoo.co.id") {
                palang1 = true;
                showToast('email harus @gmail.com');
            }
            // nomor hape 
            if ($('#kontak').val().split(' ').join('').length < 10) {
                palang1 = true;
                showToast('Nomor Kontak belum lengkap');
                $('#kontak').focus();
            }
            // nomor hape 
            if ($('#nama').val().split(' ').join('').length < 3) {
                palang1 = true;
                showToast('Isi nama lengkap anda');
                $('#nama').focus();
            }


            if (!palang1) {
                statusBtn = 1;
                for (var i = 0; i < elementIdentitas.length; i++) {
                    $('.' + elementIdentitas[i]).hide(100);
                }
                for (var i = 0; i < elementSekolah.length; i++) {
                    $('.' + elementSekolah[i]).show(200);
                }

                for (var i = 0; i < elementOtp.length; i++) {
                    $('.' + elementOtp[i]).hide();
                }
                $('.subjudul').html('DATA SEKOLAH');
            } else {
                showToast('Data belum lengkap');
            }

        } else if (statusBtn == 1) {
            // send to wa 
            sendToWooWa($('#kontak').val().split(' ').join(''), $('#nama').val());
            $('.resendotp').show();
            $('.punyaakun').hide();
            var palang2 = false;
            for (var i = 0; i < elementIdentitas.length; i++) {
                if ($('#' + elementIdentitas[i]).val() == '') {
                    palang2 = true;
                }
            }
            if (!palang2) {
                statusBtn = 2;
                for (var i = 0; i < elementIdentitas.length; i++) {
                    $('.' + elementIdentitas[i]).hide();
                }
                for (var i = 0; i < elementSekolah.length; i++) {
                    $('.' + elementSekolah[i]).hide();
                }

                for (var i = 0; i < elementOtp.length; i++) {
                    $('.' + elementOtp[i]).show(200);
                }

                $('.subjudul').html('KODE OTP');
                $('.btn').html('Daftar');
            } else {
                showToast('Data belum lengkap');
            }
        } else if (statusBtn == 2) {
            var palang3 = false;
            for (var i = 0; i < elementOtp.length; i++) {
                if ($('#' + elementOtp[i]).val() == '') {
                    palang3 = true;
                }
            }
            if (!palang3) {
                if (OTPnumber == $('#otpcode').val().split('-').join('')) {
                    var formData = new FormData();
                    for (i = 0; i < elementIdentitas.length; i++) {
                        formData.append(elementIdentitas[i], $('#' + elementIdentitas[i]).val());
                    }

                    for (i = 0; i < elementSekolah.length; i++) {
                        formData.append(elementSekolah[i], $('#' + elementSekolah[i]).val());
                    }
                    formData.append('kontak', $('#kontak').val().split(' ').join(''));
                    formData.append('usernameig', $('#usernameig').val());
                    formData.append('tanggal_lahir', $('#tanggal_lahir').val());
                    formData.append('jenis_kelamin', $('#jenis_kelamin').val());
                    formData.append('agama', $('#agama').val());
                    $.ajax({
                        type: 'POST',
                        url: 'app/app-assets/js/scripts/engine/reg.php?order=bemember',
                        data: formData,
                        processData: false,
                        contentType: false,
                        beforeSend: function() {
                            showLoad();
                        },
                        success: function(response) {
                            if (parseInt(response) == 1) {
                                window.location.href = 'app';
                            } else {
                                statusBtn = 0;
                                for (var i = 0; i < elementSekolah.length; i++) {
                                    $('.' + elementSekolah[i]).hide();
                                }
                                for (var i = 0; i < elementOtp.length; i++) {
                                    $('.' + elementOtp[i]).hide();
                                }
                                for (var i = 0; i < elementIdentitas.length; i++) {
                                    $('.' + elementIdentitas[i]).show(100);
                                }
                                $('.resendotp').hide();
                                $('.punyaakun').show();
                                $('#otpcode').val('');
                                $('.btn').html('Selanjutnya');
                                showToast(response);
                            }
                            hideLoad();

                        },
                        error: function(xhr, ajaxOptions, thrownError) {

                        }
                    });

                } else {
                    showToast('Kode OTP tidak cocok');
                }
            } else {
                showToast('Data belum lengkap');
            }
        }
    });

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

    $('#jenjang, #provinsi, #kab_kota, #kecamatan, #sekolah, #sebagai, #jenis_kelamin, #agama').on('click', function() {
        window.location.href = "#list";
        var tinggi = $(this).height(); // tinggi inputnya
        var atas = $(this).offset().top - $(document).scrollTop() + tinggi;
        var kiri = $(this).offset().left;
        var lebar = $(this).width() - 30;

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

        if (kontextCombos == 'jenjang') {
            setToListBody(jenjang);
            listArr = jenjang;
        } else if (kontextCombos == 'provinsi') {
            setToListBody(provinsi);
            listArr = provinsi;
        } else if (kontextCombos == 'kab_kota') {
            setToListBody(kabupaten);
            listArr = kabupaten;
        } else if (kontextCombos == 'kecamatan') {
            setToListBody(kecamatan);
            listArr = kecamatan;
        } else if (kontextCombos == 'sekolah') {
            setToListBody(sekolah);
            listArr = sekolah;
        } else if (kontextCombos == 'sebagai') {
            setToListBody(['Guru', 'Siswa']);
            listArr = ['Guru', 'Siswa'];
        } else if (kontextCombos == 'jenis_kelamin') {
            setToListBody(['Laki-laki', 'Perempuan']);
            listArr = ['Laki-laki', 'Perempuan'];
        } else if (kontextCombos == 'agama') {
            setToListBody(agama);
            listArr = agama;
        }
    });


    $('#panelCaris').on('input keypress', function(ev) {
        var val = $(this).val();
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
    });
});

window.onhashchange = function(e) {
    var urlnow = e.oldURL.split('#')[1];
    var urlnanti = location.hash.replace('#', '');
    // showToast(urlnow + urlnanti);
    if (urlnow == 'list') {
        $('.genCombos').hide();
        window.location.href = "javascript:;";
    }
}

function resendOtpCode() {
    sendToWooWa($('#kontak').val().split(' ').join(''), $('#nama').val());
}

function sendToWooWa(phoneNumber, nama) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            OTPnumber = xmlhttp.responseText;
            hideLoad();
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/reg.php?order=sendwoowa&phone=' + phoneNumber + '&nama=' + nama);
    xmlhttp.send();
}

function setToListBody(daftarArr) {
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
    $('.' + kontextCombos + ' label').addClass('active');
    window.location.href = "javascript:;";
    $('.genCombos').hide();


    if (kontextCombos == 'jenjang') {
        $('#provinsi').val('');
        $('#kab_kota').val('');
        $('#kecamatan').val('');
        $('#sekolah').val('');
    } else if (kontextCombos == 'provinsi') {
        selProv = item;
        getKab(item);
        $('#kab_kota').val('');
        $('#kecamatan').val('');
        $('#sekolah').val('');
    } else if (kontextCombos == 'kab_kota') {
        selKab = item;
        getKec(item, selProv);
        $('#kecamatan').val('');
        $('#sekolah').val('');
    } else if (kontextCombos == 'kecamatan') {
        getSekolah(item, selKab, selProv);
        $('#sekolah').val('');
    }
}


function showToast(e) {
    var toastHTML = e;
    M.toast({ html: toastHTML, classes: 'rounded' });
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

function prepareProv() {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            provinsi = JSON.parse(xmlhttp.responseText);
            hideLoad();
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/reg.php?order=getprov');
    xmlhttp.send();
}

function getKab(prov) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            kabupaten = JSON.parse(xmlhttp.responseText);
            hideLoad();
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/reg.php?order=getkab&prov=' + prov);
    xmlhttp.send();
}

function getKec(kab, prov) {
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            kecamatan = JSON.parse(xmlhttp.responseText);
            hideLoad();
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/reg.php?order=getkec&prov=' + prov + '&kab=' + kab);
    xmlhttp.send();
}

function getSekolah(kec, kab, prov) {
    var jjg = $('#jenjang').val();
    showLoad();
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            sekolah = JSON.parse(xmlhttp.responseText);
            hideLoad();
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/reg.php?order=getsekolah&prov=' + prov + '&kab=' + kab + '&kec=' + kec + '&jjg=' + jjg);
    xmlhttp.send();
}