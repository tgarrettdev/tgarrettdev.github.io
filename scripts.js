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
    responsiveNavItems.map(function(responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function openFeedbackModal() {
    $('#feedbackModal').modal('show');
}
function handleSubmit(event) {
    event.preventDefault();
    
    // perform validation
    const formData = {
      'name': document.querySelector('input[name=name]').value,
      'email': document.querySelector('input[name=email]').value,
      'phone': document.querySelector('input[name=phone]').value,
      'message': document.querySelector('textarea[name=message]').value
    };
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("All fields are required");
      return;
    }
  
    // send the form data
    fetch('/', {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    }).then(() => {
      document.querySelector('#submitSuccessMessage').style.display = 'block';
    }).catch(() => {
      document.querySelector('#submitErrorMessage').style.display = 'block';
    });
  }
  