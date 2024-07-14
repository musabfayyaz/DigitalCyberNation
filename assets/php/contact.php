<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = ""; // Replace with the recipient's email address
    $subject = $_POST["subject"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    $headers = "From: $name <$email>" . "\r\n";
    
    if (mail($to, $subject, $message, $headers)) {
        print "Email Sent Sucessfully!";
    } else {
        print "Error Sending Email!";
    }
}
?>
