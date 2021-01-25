var bodyTable = [],
    totalBaris = 0,
    totalPages = 0,
    tersorot = 0,
    display = 0;

function setupTablePagination(disp) {
    display = parseInt(disp);
    // prepare to set tool pagination
    //$('.toolPagination').append('')
    var targ = $('#paginattable').children('tr');
    bodyTable = [];
    for (i = 0; i < targ.length; i++) {
        bodyTable.push(targ.eq(i).html());
    }
    $('.dataTables_info').html('Showing ' + (bodyTable.length > 0 ? 1 : '0') + ' to ' + ((bodyTable.length < display) ? (bodyTable.length > 0 ? bodyTable.length : 0) : display) + ' of ' + bodyTable.length + " entries");
    var total = bodyTable.length,
        sisa = total % display,
        kelipatan = (total - sisa) / display,
        pages = sisa == 0 ? kelipatan : (kelipatan + 1);

    totalPages = pages;
    totalBaris = bodyTable.length;


    $('.dataTables_paginate span').html('');
    for (i = 0; i < pages; i++) {
        var curr = i == 0 ? 'current' : '';
        $('.dataTables_paginate span').append('<a class="paginate_button ' + curr + ' btn' + (i + 1) + '" aria-controls="page-length-option" onclick="pages(\'' + (i + 1) + '\')">' + (i + 1) + '</a>');
    }

    $('#paginattable').html('');
    for (i = 0; i < display; i++) {
        $('#paginattable').append('<tr>' + bodyTable[i] + '</tr>');
    }
    tersorot = 1;
}

function pages(datake) {
    tersorot = datake;
    $('.dataTables_paginate span a').removeClass('current');
    $('.dataTables_paginate span .btn' + datake).addClass('current');

    var index = 1 + (display) * (datake - 1);
    $('#paginattable').html('');
    for (i = (index - 1); i < (index + (display - 1)); i++) {

        $('#paginattable').append('<tr>' + bodyTable[i] + '</tr>');
    }
    $('.dataTables_info').html('Showing ' + (index) + ' to ' + ((index + (display - 1)) > bodyTable.length ? bodyTable.length : (index + (display - 1))) + ' of ' + bodyTable.length + " entries");
}

function prev() {
    tersorot = (tersorot - 1);
    if (tersorot < 1) {
        tersorot = 1;
    }
    pages(tersorot);
}

function next() {
    tersorot++;
    if (tersorot > totalPages) {
        tersorot = totalPages;
    }
    pages(tersorot);
}



function setupDivPagination(disp) {
    display = parseInt(disp);
    // prepare to set tool pagination
    //$('.toolPagination').append('')
    var targ = $('#paginattable').children('div');
    bodyTable = [];
    for (i = 0; i < targ.length; i++) {
        bodyTable.push(targ.eq(i).html());
    }
    $('.dataTables_info').html('Showing ' + (bodyTable.length > 0 ? 1 : '0') + ' to ' + ((bodyTable.length < display) ? (bodyTable.length > 0 ? bodyTable.length : 0) : display) + ' of ' + bodyTable.length + " entries");
    var total = bodyTable.length,
        sisa = total % display,
        kelipatan = (total - sisa) / display,
        pages = sisa == 0 ? kelipatan : (kelipatan + 1);

    totalPages = pages;
    totalBaris = bodyTable.length;


    $('.dataTables_paginate span').html('');
    for (i = 0; i < pages; i++) {
        var curr = i == 0 ? 'current' : '';
        $('.dataTables_paginate span').append('<a class="paginate_button ' + curr + ' btn' + (i + 1) + '" aria-controls="page-length-option" onclick="pagesDiv(\'' + (i + 1) + '\')">' + (i + 1) + '</a>');
    }

    $('#paginattable').html('');
    for (i = 0; i < display; i++) {
        if (bodyTable[i] != undefined) {
            $('#paginattable').append('<div class="col s12 m6 l4 card-width">' + bodyTable[i] + '</div>');
        }
    }
    tersorot = 1;
}

function pagesDiv(datake) {
    tersorot = datake;
    $('.dataTables_paginate span a').removeClass('current');
    $('.dataTables_paginate span .btn' + datake).addClass('current');

    var index = 1 + (display) * (datake - 1);
    $('#paginattable').html('');
    for (i = (index - 1); i < (index + (display - 1)); i++) {

        $('#paginattable').append('<div class="col s12 m6 l4 card-width">' + bodyTable[i] + '</div>');
    }
    $('.dataTables_info').html('Showing ' + (index) + ' to ' + ((index + (display - 1)) > bodyTable.length ? bodyTable.length : (index + (display - 1))) + ' of ' + bodyTable.length + " entries");
}

function prevDiv() {
    tersorot = (tersorot - 1);
    if (tersorot < 1) {
        tersorot = 1;
    }
    pagesDiv(tersorot);
}

function nextDiv() {
    tersorot++;
    if (tersorot > totalPages) {
        tersorot = totalPages;
    }
    pagesDiv(tersorot);
}