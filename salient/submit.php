<?php
if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $surname = $_POST['surname'];

    $file = 'weddinglistrsvp.csv';
    $data = array($name, $surname);

    $file_open = fopen($file, 'a');
    fputcsv($file_open, $data);
    fclose($file_open);

    echo "success";
}
?>