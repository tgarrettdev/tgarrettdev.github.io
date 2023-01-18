<?php
    // check if the form has been submitted
    if(isset($_POST) && !empty($_POST)){
        // get form data
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $message = $_POST['message'];
        
        // basic validation
        if(empty($name) || empty($email) || empty($phone) || empty($message)){
            // return error message if any fields are empty
            echo json_encode(array('status' => 'error', 'message' => 'Please fill in all fields'));
            exit;
        }
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            // return error message if email is invalid
            echo json_encode(array('status' => 'error', 'message' => 'Invalid email'));
            exit;
        }
        
        // Send email
        $to = 'tgarrett.92@icloud.com';
        $subject = 'New contact form submission';
        $headers = "From: " . strip_tags($email) . "\r\n";
        $headers .= "Reply-To: ". strip_tags($email) . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $message = '<p>Name: '.$name.'</p>'
                  .'<p>Email: '.$email.'</p>'
                  .'<p>Phone: '.$phone.'</p>'
                  .'<p>Message: '.$message.'</p>';
        if(mail($to, $subject, $message, $headers)){
            echo json_encode(array('status' => 'success', 'message' => 'Thank you for your message'));
            exit;
        }
        else{
            echo json_encode(array('status' => 'error', 'message' => 'Error sending message'));
            exit;
        }
    }
?>
