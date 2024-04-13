$(document).ready(
$('.link').click(function(evt){

    $('.download').remove();

	var patImg = document.getElementById('pattern');
    var imgCanvas = document.createElement('canvas');
    var imgCtx = imgCanvas.getContext("2d");
    var pattern = imgCtx.createPattern(patImg,'repeat');

    imgCanvas.width = width;
    imgCanvas.height = height;

    imgCtx.fillStyle = pattern;
    imgCtx.rect(0,0,width,height);
    imgCtx.fill();


    var layimage = new Image;
    layimage.src = canvas.toDataURL("image/png");

    setTimeout(function(){

        imgCtx.drawImage(layimage,0,0);

        var compimage = imgCanvas.toDataURL("image/png");//.replace('image/png','image/octet-stream');

        $('.panel').append('<a href="'+compimage+'" download="chalkboard.png" class="download">Download</a>');
        $('.download').click(function(){
            IEsave(compimage);
        });
    
    }, 500);


})
);

function IEsave(ctximage){
    setTimeout(function(){
        var win = window.open();
        $(win.document.body).html('<img src="'+ctximage+'" name="chalkboard.png">');
    },500);
}
