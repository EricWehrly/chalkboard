	
	var width = 0;
	var height = 0;
	var mouseX = 0;
	var mouseY = 0;
	var mouseD = false;
	var eraser = false;
	var xLast = 0;
	var yLast = 0;
	var brushDiameter = 7;
	var eraserWidth = 50;
	var eraserHeight = 100;

    $(document).ready(function() {
        let canvas = document.getElementById("chalkboard");
        width = canvas.width;
        height = canvas.height;
    });

document.addEventListener('touchmove', function(evt) {
    var touch = evt.touches[0];
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    if (mouseY < height && mouseX < width) {
        evt.preventDefault();
        $('.chalk').css('left', mouseX + 'px');
        $('.chalk').css('top', mouseY + 'px');
        //$('.chalk').css('display', 'none');
        if (mouseD) {
            draw(mouseX, mouseY);
        }
    }
}, false);
document.addEventListener('touchstart', function(evt) {
    //evt.preventDefault();
    var touch = evt.touches[0];
    mouseD = true;
    mouseX = touch.pageX;
    mouseY = touch.pageY;
    xLast = mouseX;
    yLast = mouseY;
    draw(mouseX + 1, mouseY + 1);
}, false);
document.addEventListener('touchend', function(evt) {
    mouseD = false;
}, false);

$(document).mousemove(function(evt){
    mouseX = evt.pageX;
    mouseY = evt.pageY;
    if(mouseY<height && mouseX<width){
        $('.chalk').css('left',(mouseX-0.5*brushDiameter)+'px');
        $('.chalk').css('top',(mouseY-0.5*brushDiameter)+'px');
        if(mouseD){
            if(eraser){
                erase(mouseX,mouseY);
            }else{
                draw(mouseX,mouseY);
                }
            }
    }else{
        $('.chalk').css('top',height-10);
        }
    });
$(document).mousedown(function(evt){ 
    mouseD = true;
    xLast = mouseX;
    yLast = mouseY;
    if(evt.button == 2){
        erase(mouseX,mouseY);
        eraser = true;
        $('.chalk').addClass('eraser');
    }else{
        if(!$('.panel').is(':hover')){
            draw(mouseX+1,mouseY+1);
        }		
    }
});

$(document).mouseup(function(evt){ 
    mouseD = false;
    if(evt.button == 2){
        eraser = false;
        $('.chalk').removeClass('eraser');
    }
});
