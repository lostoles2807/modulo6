<?php 
header('Access-Control-Allow-Origin: *');
$contenido = file_get_contents('data-1.json');//traer contenido de archivo json en una variable
$contenido = json_decode($contenido);//decodificar formato archivo json

$ciudades = [];

foreach($contenido as $key=> $json){
	$ciudades[] = $json->Ciudad;
}
$ciudades = array_unique($ciudades);
foreach($ciudades as $opcion){
	$opciones .= "<option value=\"$opcion\">$opcion</option>";
}
print_r($opciones );
?>