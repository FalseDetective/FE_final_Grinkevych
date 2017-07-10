"use strict"
$(function() {

var imgWidth = $('body').width()*0.3;

$('#gallery div').css({ height: imgWidth });

var images = [
	'img/gallery/1.jpg',
	'img/gallery/2.jpg',
	'img/gallery/3.jpeg',
	'img/gallery/4.jpg',
	'img/gallery/5.jpg',
	'img/gallery/6.jpg',
	'img/gallery/7.jpg',
	'img/gallery/8.jpg',
	'img/gallery/9.jpg',
	'img/gallery/10.jpg',
	'img/gallery/11.jpg',
	'img/gallery/12.jpg',
	'img/gallery/13.jpg',
	'img/gallery/14.jpg',
	'img/gallery/15.jpg',
];

var page = 0;
var imagesOnPage = 6;
var pageNum = Math.round(images.length/imagesOnPage)-1;

//Добавляем картинки
var gallery = document.getElementById("gallery");

for (let i=0; i<imagesOnPage; i++) {
	let img = document.createElement("div");
	//img.style='background-image: url('+ images[i] + ') height: '+imgWidth;
	img.style.backgroundImage = 'url('+ images[i] + ')';
	img.style.height = imgWidth+'px';
	gallery.appendChild(img);
}

//листаем
var img = gallery.getElementsByTagName('div');


$( "#pgLeft span" ).click(function() {
  page--;
  if (page < 0) {
  	page = pageNum;
  }
  for (let i=0; i<imagesOnPage; i++){
	if (!images[i+page*imagesOnPage]){
		img[i].style.visibility = "hidden";
	} else {
		img[i].style.visibility = "visible";
		img[i].style.backgroundImage = 'url('+ images[i+page*imagesOnPage] + ')';
	}

}  

});

$( "#pgRight span" ).click(function() {
  page++;
  if (page > pageNum) {
  	page = 0;
  }
  for (let i=0; i<imagesOnPage; i++){
	if (!images[i+page*imagesOnPage]){
		img[i].style.visibility = "hidden";
	} else {
		img[i].style.visibility = "visible";
		img[i].style.backgroundImage = 'url('+ images[i+page*imagesOnPage] + ')';
	}
}  
});

window.onresize = function() {
	imgWidth = $('body').width()*0.3;
	$('#gallery div').css({ height: imgWidth });
	
};

});