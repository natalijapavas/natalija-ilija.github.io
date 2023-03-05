<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $surname = $_POST['surname'];

    $data = array($name, $surname);

    $file = fopen('rsvp.csv', 'a');
    fputcsv($file, $data);
    fclose($file);

    session_start();
    $_SESSION['form_success'] = true;
    header("Location: index.html#rsvp-section");

    exit();
}
?>