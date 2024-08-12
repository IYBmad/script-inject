<?php
// log.php
$data = $_GET['data'] ?? '';
$file = 'data.txt';
file_put_contents($file, $data . PHP_EOL, FILE_APPEND);
?>
