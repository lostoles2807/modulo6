<?php 
header('Access-Control-Allow-Origin: *');
$contenido = file_get_contents('data-1.json');//traer contenido de archivo json en una variable
//$contenido = json_decode($contenido);//decodificar formato archivo json
print_r($contenido);
?>