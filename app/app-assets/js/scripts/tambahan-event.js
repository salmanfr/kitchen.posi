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
    setTimeout(function() {
        $('.formProfile').css({
            'top': '50%'
        });
    }, 300);
}

function closeMyProfile() {
    $('.formProfile').css({
        'top': '250%'
    });
    setTimeout(function() {
        $('.overlayProfile').hide();
    }, 300);
}