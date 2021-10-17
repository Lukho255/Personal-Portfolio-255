$(() => {
    $('#contactForm input, #contactForm textarea').jqBootstrapValidation({
        preventSubmit: true,
        submitError($form, event, errors) {},
        submitSuccess($form, event) {
            event.preventDefault();
            const name = $('input#name').val();
            const email = $('input#email').val();
            const subject = $('input#subject').val();
            const message = $('textarea#message').val();

            $this = $('#sendMessageButton');
            $this.prop('disabled', true);

            $.ajax({
                url: '././mail/contact.php',
                type: 'POST',
                data: {
                    name,
                    email,
                    subject,
                    message,
                },
                cache: false,
                success() {
                    $('#success').html('<div class=\'alert alert-success\'>');
                    $('#success > .alert-success').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-success')
                        .append('<strong>Your message has been sent. </strong>');
                    $('#success > .alert-success')
                        .append('</div>');
                    $('#contactForm').trigger('reset');
                },
                error() {
                    $('#success').html('<div class=\'alert alert-danger\'>');
                    $('#success > .alert-danger').html('<button type=\'button\' class=\'close\' data-dismiss=\'alert\' aria-hidden=\'true\'>&times;')
                        .append('</button>');
                    $('#success > .alert-danger').append($('<strong>').text(`Sorry ${name}, it seems that our mail server is not responding. Please try again later!`));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger('reset');
                },
                complete() {
                    setTimeout(() => {
                        $this.prop('disabled', false);
                    }, 1000);
                },
            });
        },
        filter() {
            return $(this).is(':visible');
        },
    });

    $('a[data-toggle="tab"]').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
});

$('#name').focus(() => {
    $('#success').html('');
});