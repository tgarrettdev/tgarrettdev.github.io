window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

$(document).ready(function() {
    // handle form submission
    $('#contact-form').submit(function(event) {
        event.preventDefault();
        var formData = {
            'name': $('input[name=name]').val(),
            'email': $('input[name=email]').val(),
            'phone': $('input[name=phone]').val(),
            'message': $('textarea[name=message]').val()
        };
        // perform validation
        if (!formData.name) {
            alert("Name is required");
            return;
        }
        if (!formData.email) {
            alert("Email is required");
            return;
        }
        if (!formData.phone) {
            alert("Phone is required");
            return;
        }
        if (!formData.message) {
            alert("Message is required");
            return;
        }
        if (!validateEmail(formData.email)) {
            alert("Invalid Email");
            return;
        }

        // process the forms
        $.ajax({
            type: 'POST',
            url: 'submit-form.php',
            data: formData,
            dataType: 'json',
            encode: true
        }).done(function(data) {
            // handle successful submission
            $('#submitButton').attr("disabled", true);
            if (data.status === "success") {
                $('#submitSuccessMessage').removeClass('d-none');
            } else {
                $('#submitErrorMessage').removeClass('d-none');
            }
        }).fail(function(data) {
            // handle error
            $('#submitErrorMessage').removeClass('d-none');
        });
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});
