<?php 
header('Access-Control-Allow-Origin: *');
$contenido = file_get_contents('data-1.json');//traer contenido de archivo json en una variable
$contenido = json_decode($contenido);//decodificar formato archivo json

$tipos = [];

foreach($contenido as $key=> $json){
	$tipos[] = $json->Tipo;
}
$tipos = array_unique($tipos);
foreach($tipos as $opciont){
	$opcionest .= "<option value=\"$opciont\">$opciont</option>";
}
print_r($opcionest);
?>