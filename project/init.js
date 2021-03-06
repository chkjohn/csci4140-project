function init()
{

console.log('init');

//-------------game init---------
if(network)
	game.init();
//--------------------------------

var canvas = document.getElementById("boardCanvas");
var ctx = canvas.getContext("2d");

//initialization
ctx.rect(0, 0, game.board_size, game.board_size);
ctx.lineWidth = 1;
ctx.strokeStyle = '#669966';
ctx.stroke();

viewRefresh(canvas);

canvas.addEventListener('click', function(e) {
        var mousePos = getMousePos(canvas, e);
		if(game.token_index==client_index)
		{
			if(players[client_index].nextTile(tile,mousePos))
			{
				viewRefresh(canvas);
				players[client_index].removeTile(null);
				
				game.nextToken(network);	//next player
				
				postureViewUpdate(canvas_posture,tile,players[client_index].id);
				pickerViewUpdate(canvas_picker,players[client_index]);
				
				//send to server
				if(network)
					players[client_index].send("next",tile,tile_index,mousePos);
				
				console.log("success");
			}
			else
				console.log("fail");
		}
		else
			alert("This is player[" + game.token_index + "]'s round!");
}, false);

canvas.addEventListener('mousemove', function(e) {
        var mousePos = getMousePos(canvas, e);
		topLayerView_transform(canvas,mousePos,tile,players[client_index].id)
}, false);


var canvas_posture = document.getElementById("posture");
var ctx_posture = canvas_posture.getContext("2d");
//initialization
ctx_posture.rect(0, 0, 150,150);
ctx_posture.lineWidth = 1;
ctx_posture.strokeStyle = '#669966';
ctx_posture.stroke();

postureViewUpdate(canvas_posture,tile,players[client_index].id);

document.getElementById("rotate_cw").addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	rotateTile('cw',tile,canvas_posture);
},false);
document.getElementById("rotate_counter_cw").addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	rotateTile('counter_cw',tile,canvas_posture);
},false);
document.getElementById("mirror_y").addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	mirrorTile('y',tile,canvas_posture);
},false);
document.getElementById("mirror_x").addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	mirrorTile('x',tile,canvas_posture);
},false);

document.getElementById("next").addEventListener('click',function(e){
	e.preventDefault();
	e.stopPropagation();
	if(game.token_index==client_index)
	{
		game.nextToken(network);//next player		
		
		postureViewUpdate(canvas_posture,tile,players[client_index].id);
		pickerViewUpdate(canvas_picker,players[client_index]);
		
		//send to server
		if(network)
			players[client_index].send("empty",null,null,null);
	}
	else
		alert("This is player[" + game.token_index + "]'s round!");
},false);


var canvas_picker = document.getElementById("picker");
pickerViewUpdate(canvas_picker,players[client_index]);

canvas_picker.addEventListener('click', function(e) {
	e.preventDefault();
	e.stopPropagation();
	var mousePos = getMousePos(canvas_picker, e);
	pickTile(mousePos,canvas_posture,players[client_index]);
},false);

}

window.addEventListener("load",init,false);