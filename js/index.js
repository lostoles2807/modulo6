/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();
cargar();
cargar2();
var imagen = "<img src='img/home.jpg' width='170px' heigth='170px'";
function cargar(){
	//$("select").material_select();
	$(".colContenido").append('<div id="mostrar" width="100%"></div>');
	
	$.ajax({
		 	type:"POST",
			url:"cargar.php",
			//dataType: 'JSON',
			success:function(data){
				/*for(var a=0; a<data.length; a++){
					$("#selectCiudad").append(data[a]);
				}*/
						   	$("#selectCiudad").append(data);
							//$("#selectTipo").append('<option value="'+data[a].Tipo+'">'+data[a].Tipo+'</option>');
				$("select").material_select();
			}
	});
}

function cargar2(){
	//$("select").material_select();
	$(".colContenido").append('<div id="mostrar" width="100%"></div>');
	
	$.ajax({
		 	type:"POST",
			url:"cargar2.php",
			//dataType: 'JSON',
			success:function(data){
				/*for(var a=0; a<data.length; a++){
					$("#selectCiudad").append(data[a]);
				}*/
						   	$("#selectTipo").append(data);
							//$("#selectTipo").append('<option value="'+data[a].Tipo+'">'+data[a].Tipo+'</option>');
				$("select").material_select();
			}
	});
}


$("#mostrarTodos").click(function(){
	//alert("voy super");
	$.ajax({
			type:"POST",
			url:"http://localhost/modulo6/buscador1.php",
			dataType: 'JSON',
			beforeSend: function(){
				$("#mostrar tr").remove();
				$("#mostrar hr").remove();
			},
			success: function(data){
			for(var b=0; b<data.length; b++){
				$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td><li>Direccion: '+data[b].Direccion+'</li><li> Ciudad:'+data[b].Ciudad
				+'</li><li>Telefono:'+data[b].Telefono+'</li><li>Codigo postal:'+data[b].Codigo_Postal+'</li><li>Tipo: '+data[b].Tipo
				+'</li><li>Precio: '+data[b].Precio+'</li></td><td><a href="#">Ver Detalles</a></td></tr>');
				$("#mostrar").append('<hr></hr>')
			}
		}
	});
	
});

$("form").submit(function(e){
	e.preventDefault();
	var a1 = document.getElementById("selectCiudad").value;
	var a2 = document.getElementById("selectTipo").value;
	var a3 = document.getElementById("rangoPrecio").value;
	var rango = a3.split(";");
	var rangomin = rango[0];
	var rangomax = rango[1];
	//var datos = "ciudad="+a1+"&tipo="+a2+"&rango="+a3;
	$("#mostrar tr").remove();
	$("#mostrar hr").remove();
	$.ajax({
		type:"POST",
		url: "buscador.php",
		dataType:"JSON",
		
		success: function(resp){
			if(a1 == "" && a2 == ""){
			   //alert("Rango Minimo:""$"+rangomin+"Rango maximo:"+rangomax);
				for(var i=0; i<resp.length; i++){
					if(resp[i].Precio >= "$"+rangomin+""  && resp[i].Precio<= "$"+rangomax+"" ){
					  	$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td><li>Direccion: '+resp[i].Direccion+'</li><li> Ciudad:'+resp[i].Ciudad
				+'</li><li>Telefono:'+resp[i].Telefono+'</li><li>Codigo postal:'+resp[i].Codigo_Postal+'</li><li>Tipo: '+resp[i].Tipo
				+'</li><li>Precio: '+resp[i].Precio+'</li></td><td><a href="#">Ver Detalles</a></td></tr>');
						$("#mostrar").append('<hr></hr>')
					   }
				}
			}
			else if(a1 !== "" && a2 == ""){
				//alert("Option two");
				for(var i=0; i<resp.length; i++){
					if((resp[i].Precio >= "$"+rangomin+""  && resp[i].Precio<= "$"+rangomax+"") && resp[i].Ciudad == a1){
					  	$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td><li>Direccion: '+resp[i].Direccion+'</li><li> Ciudad:'+resp[i].Ciudad
				+'</li><li>Telefono:'+resp[i].Telefono+'</li><li>Codigo postal:'+resp[i].Codigo_Postal+'</li><li>Tipo: '+resp[i].Tipo
				+'</li><li>Precio: '+resp[i].Precio+'</li></td><td><a href="#">Ver Detalles</a></td></tr>');
						$("#mostrar").append('<hr></hr>')
					   }
				}
			}
			else if(a1 == "" && a2 !== ""){
				//alert("Option three");
				for(var i=0; i<resp.length; i++){
					if((resp[i].Precio >= "$"+rangomin+""  && resp[i].Precio<= "$"+rangomax+"") && resp[i].Tipo == a2){
					  	$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td><li>Direccion: '+resp[i].Direccion+'</li><li> Ciudad:'+resp[i].Ciudad
				+'</li><li>Telefono:'+resp[i].Telefono+'</li><li>Codigo postal:'+resp[i].Codigo_Postal+'</li><li>Tipo: '+resp[i].Tipo
				+'</li><li>Precio: '+resp[i].Precio+'</li></td><td><a href="#">Ver Detalles</a></td></tr>');
						$("#mostrar").append('<hr></hr>')
					   }
				}
			}
			else if(a1 !== "" && a2 !== ""){
				//alert("Option Four");
				for(var i=0; i<resp.length; i++){
					if((resp[i].Precio >= "$"+rangomin+""  && resp[i].Precio<= "$"+rangomax+"") && resp[i].Ciudad == a1 && resp[i].Tipo == a2){
					  	$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td><li>Direccion: '+resp[i].Direccion+'</li><li> Ciudad:'+resp[i].Ciudad
				+'</li><li>Telefono:'+resp[i].Telefono+'</li><li>Codigo postal:'+resp[i].Codigo_Postal+'</li><li>Tipo: '+resp[i].Tipo
				+'</li><li>Precio: '+resp[i].Precio+'</li></td><td><a href="#">Ver Detalles</a></td></tr>');
						$("#mostrar").append('<hr></hr>')
					   }
				}
			}
			else{
				alert("Go Bad");
			}
			
		}
	})/*.done(function(res){
		$("#mostrar").append('<tr border="1"><td>'+imagen+'</td><td>'+res+'</td></tr>');
	});*/
});
