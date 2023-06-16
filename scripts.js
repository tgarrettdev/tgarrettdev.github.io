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
  