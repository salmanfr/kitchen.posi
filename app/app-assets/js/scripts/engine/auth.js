$(document).ready(function(e) {
    ceklogin();
    $('.btn').click(function() {
        if ($('#username').val() == '') {
            showToast('Isi Username');
        } else if ($('#password').val() == '') {
            showToast('Isi Password');
        } else {
            var user = $('#username').val(),
                pass = $('#password').val();
            var formData = new FormData();
            formData.append('user', user);
            formData.append('pass', pass);
            $.ajax({
                type: 'POST',
                url: 'app/app-assets/js/scripts/engine/auth.php',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function() {
                    showLoad();
                },
                success: function(response) {
                    hideLoad();
                    if (parseInt(response) == 1) {
                        window.location.href = 'app/event.html';
                    } else {
                        showToast(response);
                    }
                },
                error: function(xhr, ajaxOptions, thrownError) {

                }
            });
        }
    });

    $(".kananvisible").click(function() {
        if ($(this).text() == 'visibility') {
            $(this).html('visibility_off');
            $('#password').attr('type', 'password');
        } else {
            $(this).html('visibility');
            $('#password').attr('type', 'text');
        }
    });
});

function ceklogin() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (parseInt(xmlhttp.responseText) == 1) {
                window.location.href = 'app/event.html';
            }
        }
    }
    xmlhttp.open('GET', 'app/app-assets/js/scripts/engine/override.php?order=ceklogin');
    xmlhttp.send();
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