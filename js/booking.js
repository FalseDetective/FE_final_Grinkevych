"use strict";

$("#filtrate").click(function(){                            
                       
    $.getJSON('JSON/rooms.json', {}, function(json){     
            $("#filtredRooms table").html( "<tr><th>Название</th><th>Класс</th><th>Мест</th><th>Свободно в выбранный период</th><th>Цена</th><th>Кол-во</th></tr>" );                                             
      		
      		if ( !($("#fromDate").val()) || !($("#toDate").val()) || $("#toDate").val() < $("#fromDate").val()){
            	alert('Введите корректный диапазон дат!')
            	return;
            }
            
            var fromDate = new Date( $("#fromDate").val() );
            var toDate = new Date( $("#toDate").val() );
            var roomClass = $("#class").val();
            var places = $("#places").val();

            for (let i=0; i < json.rooms.length; i++) {
            	if ((roomClass == "Все" || roomClass == json.rooms[i].class) && (places == "Любое" || places == json.rooms[i].places) ) {
            		var freeRooms = json.rooms[i].quantity;
            		for (let j = 0; j < json.books.length; j++){
            			if ( (json.books[j].id == json.rooms[i].id) && ( (Date.parse(fromDate) < Date.parse(json.books[j].toDate)) && (Date.parse(toDate) > Date.parse(json.books[j].toDate)) ||
            				 (Date.parse(fromDate) < Date.parse(json.books[j].fromDate)) && (Date.parse(toDate) > Date.parse(json.books[j].fromDate)) ) ){
            				freeRooms--;
            			}

            		}
            		if (freeRooms > 0){
            			$("#filtredRooms table").append('<tr>' + '<td><a href="'+ json.rooms[i].url+ '">' + json.rooms[i].name + '</a></td>' + 
	            			'<td>' + json.rooms[i].class + '</td>' + '<td>' + json.rooms[i].places + '</td>' + '<td>' + freeRooms + ' из ' + 
	            			json.rooms[i].quantity + '</td>' + '<td>' + json.rooms[i].price + '</td>' + '<td><input class = "quantityInput" type="number" max="'+ freeRooms +'"></td>' + '/tr');
            		}
	            		
            	}
     
     
            }               
    });
	$("#filtredRooms").show();
	$("#bookingForm").show();
});

$("#book").click(function(){
	var result = "";
	for (var i = 0; i < $("#filtredRooms input").length; i++) {
		  	if ($("#filtredRooms input")[i].value) {
		  		result += ("\n" + $("#filtredRooms input")[i].value + "номер(ов) " + $("#filtredRooms a")[i].text);
		  	}	
		  };

	alert("На имя: " + $("#name").val() +
		  "\nС телефоном: " + $("#phoneNumber").val() +
		  "\nПочтой: " + $("#email").val() +
		  "\nи комментарием: " + $("#commentary").val() + "\n\nЗаказано:" + result		  
		);
});