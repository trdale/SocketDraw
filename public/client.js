document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
  
   var canvas  = document.getElementById('socket_canvas');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;  
   canvas.width = width;
   canvas.height = height;
   
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };
   var socket = io.connect();
   socket.on('draw_line', function (data) {
      var line = data.line;
	  context.beginPath();
	  context.moveTo(line[0].x * width, line[0].y * height);
	  context.lineTo(line[1].x * width, line[1].y * height);
	  context.stroke();
   });
   
   function draw() {
      if (mouse.click && mouse.move && mouse.pos_prev) {
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev ] });
         mouse.move = false;
      }
	  mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
	  setTimeout(draw, 10);   
   }
   
   draw();
});