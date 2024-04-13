$(document).ready(chalkboard);

let ctx;

function chalkboard(){
	$('#chalkboard').remove();
	$('.chalk').remove();
	$('body').prepend('<div class="panel"><a class="link" target="_blank">Save</a></div>');
	$('body').prepend('<img src="img/bg.png" id="pattern" width=50 height=50>');
	$('body').prepend('<canvas id="chalkboard"></canvas>');
	$('body').prepend('<div class="chalk"></div>');

	init();
} 
         
function draw(x,y){
	ctx.strokeStyle = 'rgba(255,255,255,'+(0.4+Math.random()*0.2)+')';
	ctx.beginPath();
	  ctx.moveTo(xLast, yLast);		
	  ctx.lineTo(x, y);
	  ctx.stroke();
	  
	  // Chalk Effect
	var length = Math.round(Math.sqrt(Math.pow(x-xLast,2)+Math.pow(y-yLast,2))/(5/brushDiameter));
	var xUnit = (x-xLast)/length;
	var yUnit = (y-yLast)/length;
	for(var i=0; i<length; i++ ){
		var xCurrent = xLast+(i*xUnit);	
		var yCurrent = yLast+(i*yUnit);
		var xRandom = xCurrent+(Math.random()-0.5)*brushDiameter*1.2;			
		var yRandom = yCurrent+(Math.random()-0.5)*brushDiameter*1.2;
		ctx.clearRect( xRandom, yRandom, Math.random()*2+2, Math.random()+1);
		}

	xLast = x;
	yLast = y;
}

function erase(x,y){
	ctx.clearRect (x-0.5*eraserWidth,y-0.5*eraserHeight,eraserWidth,eraserHeight);
}

$(window).resize(function(){
	// chalkboard();
});

function init() {

	document.oncontextmenu = function() {return false;};
	
	var canvas = document.getElementById("chalkboard");
	$('#chalkboard').css('width',$(window).width());
	$('#chalkboard').css('height',$(window).height());
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	
	ctx = canvas.getContext("2d");
	
	$('#chalkboard').css('cursor','none');
	document.onselectstart = function(){ return false; };
	ctx.fillStyle = 'rgba(255,255,255,0.5)';	
	ctx.strokeStyle = 'rgba(255,255,255,0.5)';	
    ctx.lineWidth = brushDiameter;
	ctx.lineCap = 'round';
}
