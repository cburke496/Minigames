var minigames = function() {
    return {
    //HTML Body
	body:document.getElementsByTagName("body")[0],

    //SVG element and its width and height
	svg:document.getElementById("svg"),
	width:svg.getAttribute("width"),
	height:svg.getAttribute("height"),
	
    //User's points
	points:0,
    
    //Each minigame's code is contained within a function that is stored in 
    //the games array
	games:[],

    //Stores the key currently being pressed
	currentKeys:[],

    //Number of points needed to unlock each game
	//unlockVals:[0,50,150,400,1000,2500,5000,10000,25000,100000],
	unlockVals:[0,0,0,0,0,0,0,0,0,0],

    //This is where the code for each game is made and then stored in the array
	setup:function() {
	    var game1 = function() {
		var background = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background.setAttribute('width', Minigames.width);
		background.setAttribute('height', Minigames.height);
		background.setAttribute('x',0);
		background.setAttribute('y',0);
		background.setAttribute('fill',"#000000");
		background.setAttribute('stroke',"#000000");
		Minigames.svg.appendChild(background);


		var player = document.createElementNS("http://www.w3.org/2000/svg","circle");
		var radius = 6;
		player.setAttribute('r', radius);
		player.setAttribute('cx', radius);
		player.setAttribute('cy', Minigames.height/2);
		player.setAttribute('fill',"#ffffff");
		player.setAttribute('stroke',"#ffffff");
		Minigames.svg.appendChild(player);

		var pellets = [];
		for(var i = 0; i < 20; i++) {
		    var pellet = document.createElementNS("http://www.w3.org/2000/svg","circle");
		    var pradius = 3;
		    pellet.setAttribute('r', pradius);
		    pellet.setAttribute('cx',Math.random()*(Minigames.width-2*pradius) + pradius);
		    pellet.setAttribute('cy',Math.random()*(Minigames.height-2*pradius) + pradius);
		    pellet.setAttribute('fill',"#0000ff");
		    pellet.setAttribute('stroke',"#0055ff");
		    pellet.setAttribute('stroke-width',2);
		    Minigames.svg.appendChild(pellet);
		    pellets.push(pellet);
		}

		var superPellets = [];
		for(var i = 0; i < 3; i++) {
		    var superPellet = document.createElementNS("http://www.w3.org/2000/svg","circle");
		    var spradius = 5;
		    superPellet.setAttribute('r', spradius);
		    superPellet.setAttribute('cx',Math.random()*(Minigames.width-2*spradius) + spradius);
		    superPellet.setAttribute('cy',Math.random()*(Minigames.height-2*spradius) + spradius);
		    superPellet.setAttribute('fill',"#ffff00");
		    superPellet.setAttribute('stroke',"#ffff55");
		    superPellet.setAttribute('stroke-width',2);
		    Minigames.svg.appendChild(superPellet);
		    superPellets.push(superPellet);
		}


		var currentPoints = 0;

		var animloop = function() {
		    var dx = 2;
		    var dy = 5;
		    var key = Minigames.currentKeys[Minigames.currentKeys.length-1];
		    if((key === 38 || key === 87) && player.getAttribute('cy') > radius + dy) {
			player.setAttribute('cy',parseInt(player.getAttribute('cy'))-dy);
		    }
		    if((key === 40 || key === 83)&& player.getAttribute('cy') < Minigames.height - radius - dy) {
			player.setAttribute('cy',parseInt(player.getAttribute('cy'))+dy);
		    }

		    player.setAttribute('cx',parseInt(player.getAttribute('cx'))+dx);
		    
		    var plen = pellets.length;
		    for(var i = plen; i > 0; i--) {
			if(Math.pow(pellets[i-1].getAttribute('cx')-player.getAttribute('cx'),2) + Math.pow(pellets[i-1].getAttribute('cy')-player.getAttribute('cy'),2) < Math.pow(radius + pradius,2)) {
			    currentPoints++;
			    Minigames.svg.removeChild(pellets[i-1]);
			    pellets.splice(i-1,1)
			}
		    }

		    var splen = superPellets.length;
		    for(var i = splen; i > 0; i--) {
			if(Math.pow(superPellets[i-1].getAttribute('cx')-player.getAttribute('cx'),2) + Math.pow(superPellets[i-1].getAttribute('cy')-player.getAttribute('cy'),2) < Math.pow(radius + spradius,2)) {
			    currentPoints += 3;
			    Minigames.svg.removeChild(superPellets[i-1]);
			    superPellets.splice(i-1,1)
			}
		    }
		    
		    Minigames.displayGamePoints(currentPoints);
		    
		    
		    if(player.getAttribute('cx') < Minigames.width - radius) {
			Minigames.nextFrame(animloop);
		    } else {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    }
		};
		
		Minigames.nextFrame(animloop);
	    };
	    this.games.push(game1);
	    var game2 = function() {
		var spikeSize = 60;
		var spikeValue = 3;

		var background1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background1.setAttribute('width', Minigames.width);
		background1.setAttribute('height', Minigames.height-spikeSize);
		background1.setAttribute('x',0);
		background1.setAttribute('y',0);
		background1.setAttribute('fill',"#dddddd");
		Minigames.svg.appendChild(background1);

		var background2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background2.setAttribute('width', Minigames.width);
		background2.setAttribute('height', spikeSize);
		background2.setAttribute('x',0);
		background2.setAttribute('y',Minigames.height - spikeSize);
		background2.setAttribute('fill',"#000000");
		Minigames.svg.appendChild(background2);


		var player = document.createElementNS("http://www.w3.org/2000/svg","circle");
		var radius = 20;
		var playerX = 100;
		player.setAttribute('r', radius);
		player.setAttribute('cx', playerX);
		player.setAttribute('cy', Minigames.height - radius - spikeSize);
		player.setAttribute('fill',"#ffffff");
		Minigames.svg.appendChild(player);

		
		var spikes = [];
		var spikeCoords = [];

		var currentPoints = 0;


		var drawSpike = function(spike, xcoord) {
		    spike.setAttribute('points',xcoord+","+Minigames.height+" "+(parseInt(xcoord)+spikeSize)+","+Minigames.height+" "+(parseInt(xcoord)+spikeSize/2)+","+(parseInt(Minigames.height-spikeSize)));
		}


		var dead = false;
		var dx = 5;
		var dy = 0;
		var jumpdy = 20;
		var gravity = 1;
		var animloop = function() {
		    var key = Minigames.currentKeys[Minigames.currentKeys.length-1];

		    if(Math.random()*250/dx < 1 && (spikeCoords.length === 0 || spikeCoords[spikeCoords.length-1] <= Minigames.width - spikeSize)) {
			var spikeBackground = document.createElementNS("http://www.w3.org/2000/svg","rect");
			spikeBackground.setAttribute("x",Minigames.width);
			spikeBackground.setAttribute("y",parseInt(Minigames.height)-spikeSize);
			spikeBackground.setAttribute("width",spikeSize);
			spikeBackground.setAttribute("height",spikeSize);
			spikeBackground.setAttribute("fill","#dddddd");
			spikes.push(spikeBackground);
			Minigames.svg.appendChild(spikeBackground);

			var spike = document.createElementNS("http://www.w3.org/2000/svg","polygon");
			spike.setAttribute('fill',"#888888");
			spike.setAttribute('stroke',"#777777");
			drawSpike(spike, Minigames.width);
			spikes.push(spike);
			spikeCoords.push(Minigames.width);
			Minigames.svg.appendChild(spike);
		    }


		    if(dy != 0 || player.getAttribute('cy') < Minigames.width-spikeSize-radius) {
			dy -= gravity;
		    }
		    player.setAttribute('cy',parseInt(player.getAttribute('cy'))-dy);
		    if(player.getAttribute('cy') > Minigames.height - spikeSize - radius) {
			player.setAttribute('cy',parseInt(Minigames.height)-spikeSize - radius);
			dy = 0;
		    }

		    var slen = spikeCoords.length;
		    for(var i = slen - 1; i >= 0; i--) {
			spikeCoords[i] -= dx;
			drawSpike(spikes[2*i+1],spikeCoords[i]);
			spikes[2*i].setAttribute('x',spikeCoords[i]);
			
			
			if(playerX >= spikeCoords[i] && playerX <= spikeCoords[i] + spikeSize && parseInt(player.getAttribute('cy')) === Minigames.height-spikeSize-radius) {
			    dead = true;
			}
		    }
		    if(spikeCoords[0] + spikeSize < 0) {
			spikeCoords.splice(0,1)
			Minigames.svg.removeChild(spikes[0]);
			Minigames.svg.removeChild(spikes[1]);
			spikes.splice(0,2)
			currentPoints += 3;
			if(currentPoints % (3*spikeValue) === 0) {
			    dx++;
			}
		    }
		    
		    
		    if(key === 32 && parseInt(player.getAttribute('cy')) === parseInt(Minigames.height)-spikeSize-radius) {
			dy = jumpdy;
		    }
		    
		    Minigames.displayGamePoints(currentPoints);
		    
		    if(!dead) {
			Minigames.nextFrame(animloop);
		    } else {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    }
		};
		
		Minigames.nextFrame(animloop);
	    };
	    this.games.push(game2);
	    
	    var game3 = function() {
		var currentPoints = 200;
		var numBoxes = 30;
		
		var background = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background.setAttribute("fill","#eeeeff");
		background.setAttribute("x",0);
		background.setAttribute("y",0);
		background.setAttribute("width",Minigames.width);
		background.setAttribute("height",Minigames.height);
		Minigames.svg.appendChild(background);
		
		var boxes = [];
		var extraSpace = 100;
		for(var i = 0; i < numBoxes; i++) {
		    var box = document.createElementNS("http://www.w3.org/2000/svg","rect");
		    var boxSize = Math.random()*200 + 50;
		    box.setAttribute("fill","#0000"+Minigames.dec2Hex(Math.random()*256));
		    box.setAttribute("x",Math.random()*(Minigames.width-boxSize + 2*extraSpace) - extraSpace);
		    box.setAttribute("y",Math.random()*(Minigames.height-boxSize + 2*extraSpace) - extraSpace);
		    box.setAttribute("width",boxSize);
		    box.setAttribute("height",boxSize);
		    box.setAttribute("opacity",Math.random()*0.75);
		    
		    Minigames.svg.appendChild(box);
		    boxes.push(box);
		}
		
		
		var timerValue = 255;
		var timerWidth = 300;
		var dWidth = timerWidth/timerValue;
		var timerHeight = 20;
		var timer = document.createElementNS("http://www.w3.org/2000/svg","rect");
		timer.setAttribute("width",timerWidth);
		timer.setAttribute("height",timerHeight);
		timer.setAttribute("x",Minigames.width/2 - timerWidth/2);
		timer.setAttribute("y",Minigames.height - timerHeight * 2);
		timer.setAttribute("fill","#00ff00");
		Minigames.svg.appendChild(timer);
		
		
		var player = document.createElementNS("http://www.w3.org/2000/svg","rect");	
		var pSize = 10;
		var pSpeed = 5;
		player.setAttribute("width",pSize);
		player.setAttribute("height",pSize);
		player.setAttribute("fill","#000000");
		player.setAttribute("x",Math.random()*(Minigames.width-pSize)*3/4+(Minigames.width-pSize)/8);
		player.setAttribute("y",Math.random()*(Minigames.height-pSize)*3/4+(Minigames.height-pSize)/8);
		Minigames.svg.appendChild(player);
		
		
		var dodge = document.createElementNS("http://www.w3.org/2000/svg","text");
		var dOpacity = 1;
		dodge.setAttribute('x',Minigames.width/2);
		dodge.setAttribute('y',Minigames.height*3/4);
		dodge.setAttribute('opacity',dOpacity);
		dodge.setAttribute('text-anchor',"middle");
		dodge.setAttribute('font-size',"300px");
		dodge.setAttribute('font-family',"'Comic Sans MS', cursive, sans-serif");
		dodge.appendChild(document.createTextNode("DODGE"));
		
		Minigames.svg.appendChild(dodge);
		
		
		var animloop = function() {
		    var key = Minigames.currentKeys[Minigames.currentKeys.length-1];
		    
		    if(dOpacity > 0) {
			dOpacity -= 0.03;
		    } 
		    if(dOpacity < 0) {
			dOpacity = 0;
		    }
		    dodge.setAttribute('opacity',dOpacity);
		    
		    var wiggleRoom = 20;
		    
		    for(var i = 0; i < boxes.length; i++) {
			boxes[i].setAttribute('x',parseFloat(boxes[i].getAttribute('x'))+Math.random()*wiggleRoom*2-wiggleRoom);
			boxes[i].setAttribute('y',parseFloat(boxes[i].getAttribute('y'))+Math.random()*wiggleRoom*2-wiggleRoom);
			
			var boxX = boxes[i].getAttribute('x');
			var boxY = boxes[i].getAttribute('y');
			var boxW = boxes[i].getAttribute('width');
			var boxH = boxes[i].getAttribute('height');
			var pX = player.getAttribute('x');
			var pY = player.getAttribute('y');
			
			
			if(parseInt(pX) + parseInt(pSize) > parseInt(boxX) && 
			   parseInt(pX) < parseInt(boxX) + parseInt(boxW) &&
			   parseInt(pY) + parseInt(pSize) > parseInt(boxY) && 
			   parseInt(pY) < parseInt(boxY) + parseInt(boxH)) {
			    if(currentPoints > 0) {
				currentPoints--;
			    }
			}
		    }
		    
		    timer.setAttribute("fill","#"+Minigames.dec2Hex(255-timerValue)+Minigames.dec2Hex(timerValue)+"00")
		    timer.setAttribute("width",timerWidth);
		    timerValue--;
		    timerWidth -= dWidth;
		    
		    
		    if((Minigames.currentKeys.indexOf(37) > Minigames.currentKeys.indexOf(39) || Minigames.currentKeys.indexOf(65) > Minigames.currentKeys.indexOf(68)) && player.getAttribute('x') >= pSpeed) {
			player.setAttribute('x',parseInt(player.getAttribute('x'))-pSpeed);
		    }
		    if((Minigames.currentKeys.indexOf(38) > Minigames.currentKeys.indexOf(40) || Minigames.currentKeys.indexOf(87) > Minigames.currentKeys.indexOf(83)) && player.getAttribute('y') >= pSpeed) {
			player.setAttribute('y',parseInt(player.getAttribute('y'))-pSpeed);
		    }
		    if((Minigames.currentKeys.indexOf(39) > Minigames.currentKeys.indexOf(37) || Minigames.currentKeys.indexOf(68) > Minigames.currentKeys.indexOf(65)) && player.getAttribute('x') < Minigames.width - pSize - pSpeed) {
			player.setAttribute('x',parseInt(player.getAttribute('x'))+pSpeed);
		    }
		    if((Minigames.currentKeys.indexOf(40) > Minigames.currentKeys.indexOf(38) || Minigames.currentKeys.indexOf(83) > Minigames.currentKeys.indexOf(87)) && player.getAttribute('y') < Minigames.height - pSize - pSpeed) {
			player.setAttribute('y',parseInt(player.getAttribute('y'))+pSpeed);
		    }
		    
		    Minigames.displayGamePoints(currentPoints);
		    
		    
		    if(timerValue > 0) {
			Minigames.nextFrame(animloop);
		    } else {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    }
		}
		
		Minigames.nextFrame(animloop);
		
	    };
	    this.games.push(game3);
	    
	    var game4 = function() {
		var currentPoints = 0;
		var divider = 8;
		
		
		var loadMessage = document.createElementNS("http://www.w3.org/2000/svg","text");
		loadMessage.setAttribute('x',Minigames.width/2);
		loadMessage.setAttribute('y',Minigames.height*3/4);
		loadMessage.setAttribute('text-anchor',"middle");
		loadMessage.setAttribute('font-size',"200px");
		loadMessage.setAttribute('font-family',"'Comic Sans MS', cursive, sans-serif");
		loadMessage.appendChild(document.createTextNode("Loading..."));
		
		Minigames.svg.appendChild(loadMessage);
		
		
		var bgPixels = new Array(Minigames.width/divider);
		for(var i = 0; i < Minigames.width/divider; i++) {
		    bgPixels[i] = new Array(Minigames.height/divider);
		}
		
		for(var i = 0; i < Minigames.width/divider; i++) {
		    for(var j = 0; j < Minigames.height/divider; j++) {
			bgPixels[i][j] = 128;
		    }
		}
		
		for(var index = 0; index < 300; index++) {
		    var rad = parseInt(Math.random()*60 + 15);
		    var cx = parseInt(Math.random()*Minigames.width);
		    var cy = parseInt(Math.random()*Minigames.height);
		    var mag = parseInt(Math.random()*45 + 15);
		    
		    
		    for(var i = 0; i < Minigames.width/divider; i++) {
			for(var j = 0; j < Minigames.height/divider; j++) {
			    var dist = Math.sqrt(Math.pow(cx-i*divider,2) + Math.pow(cy-j*divider,2));
			    if(dist < rad) {
				bgPixels[i][j] += mag * (rad-dist) / rad;
			    }
			}
		    }
		}
		
		
		var gameOver = false;
		var player = document.createElementNS("http://www.w3.org/2000/svg","circle");
		var rad = 5;
		var ax = 0;
		var ay = 0;
		var dx = 0;
		var dy = 0;
		var px = Minigames.width/2;
		var py = Minigames.height/2;
		var acc = 0.3;

		
		var uBalls = [];
		var dBalls = [];
		var lBalls = [];
		var rBalls = [];

		var spawnChance = 0.06;
		var brad = 20;
		var bradvary = 10;
		var bspeed = 8;

		var counter = 0;
		var pointFreq = 2;
		
		var animloop = function() {
		    Minigames.displayGamePoints(currentPoints);

		    
		    if(Math.random() < spawnChance) {
			var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");
			ball.setAttribute('cx',Math.random()*(Minigames.width-2*brad)+brad);
			ball.setAttribute('cy',parseInt(Minigames.height) + brad);
			ball.setAttribute('r',brad+Math.random()*(bradvary*2+1) - bradvary);
			ball.setAttribute('fill',"#"+Minigames.dec2Hex(Math.random()*128)+Minigames.dec2Hex(Math.random()*128 + 128)+"ff");
			Minigames.svg.appendChild(ball);
			uBalls.push(ball);
		    }
		    if(Math.random() < spawnChance) {
			var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");
			ball.setAttribute('cx',Math.random()*(Minigames.width-2*brad)+brad);
			ball.setAttribute('cy',-1 * brad);
			ball.setAttribute('r',brad+Math.random()*(bradvary*2+1) - bradvary);
			ball.setAttribute('fill',"#"+Minigames.dec2Hex(Math.random()*128)+Minigames.dec2Hex(Math.random()*128 + 128)+"ff");
			Minigames.svg.appendChild(ball);
			dBalls.push(ball);
		    }
		    if(Math.random() < spawnChance) {
			var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");		
			ball.setAttribute('cx',-1 * brad);
			ball.setAttribute('cy',Math.random()*(Minigames.height-2*brad)+brad);
			ball.setAttribute('r',brad+Math.random()*(bradvary*2+1) - bradvary);
			ball.setAttribute('fill',"#"+Minigames.dec2Hex(Math.random()*128)+Minigames.dec2Hex(Math.random()*128 + 128)+"ff");
			Minigames.svg.appendChild(ball);
			rBalls.push(ball);
		    }
		    if(Math.random() < spawnChance) {
			var ball = document.createElementNS("http://www.w3.org/2000/svg","circle");		
			ball.setAttribute('cx',parseInt(Minigames.width) + brad);
			ball.setAttribute('cy',Math.random()*(Minigames.height-2*brad)+brad);
			ball.setAttribute('r',brad+Math.random()*(bradvary*2+1) - bradvary);
			ball.setAttribute('fill',"#"+Minigames.dec2Hex(Math.random()*128)+Minigames.dec2Hex(Math.random()*128 + 128)+"ff");
			Minigames.svg.appendChild(ball);
			lBalls.push(ball);
		    }
		    
		    for(var i = uBalls.length - 1; i >= 0; i--) {
			var pos = parseInt(uBalls[i].getAttribute('cy'));
			uBalls[i].setAttribute('cy',pos - bspeed);
			
			if(Math.pow(py - pos,2) + Math.pow(px - uBalls[i].getAttribute('cx'),2) < Math.pow(rad + brad,2)) {
			    gameOver = true;
			}

			if(pos < -1 * brad) {
			    Minigames.svg.removeChild(uBalls[i]);
			    uBalls.splice(i,1);
			}
		    }
		    for(var i = dBalls.length - 1; i >= 0; i--) {
			var pos = parseInt(dBalls[i].getAttribute('cy'));
			dBalls[i].setAttribute('cy',pos + bspeed);
			
			if(Math.pow(py - pos,2) + Math.pow(px - dBalls[i].getAttribute('cx'),2) < Math.pow(rad + brad,2)) {
			    gameOver = true;
			}
			
			if(pos > parseInt(Minigames.height) + brad) {
			    Minigames.svg.removeChild(dBalls[i]);
			    dBalls.splice(i,1);
			}
		    }
		    for(var i = lBalls.length - 1; i >= 0; i--) {
			var pos = parseInt(lBalls[i].getAttribute('cx'));
			lBalls[i].setAttribute('cx',pos - bspeed);
			
			if(Math.pow(px - pos,2) + Math.pow(py - lBalls[i].getAttribute('cy'),2) < Math.pow(rad + brad,2)) {
			    gameOver = true;
			}

			if(pos < -1 * brad) {
			    Minigames.svg.removeChild(lBalls[i]);
			    lBalls.splice(i,1);
			}
		    }
		    for(var i = rBalls.length - 1; i >= 0; i--) {
			var pos = parseInt(rBalls[i].getAttribute('cx'));
			rBalls[i].setAttribute('cx',pos + bspeed);
			
			if(Math.pow(px - pos,2) + Math.pow(py - rBalls[i].getAttribute('cy'),2) < Math.pow(rad + brad,2)) {
			    gameOver = true;
			}
			
			if(pos > parseInt(Minigames.width) + brad) {
			    Minigames.svg.removeChild(rBalls[i]);
			    rBalls.splice(i,1);
			}
		    }

		 
		    if(Minigames.currentKeys.indexOf(37) > Minigames.currentKeys.indexOf(39) || Minigames.currentKeys.indexOf(65) > Minigames.currentKeys.indexOf(68)) {
			ax = acc * -1;
		    }
		    if(Minigames.currentKeys.indexOf(38) > Minigames.currentKeys.indexOf(40) || Minigames.currentKeys.indexOf(87) > Minigames.currentKeys.indexOf(83)) {
			ay = acc * -1;
		    }
		    if(Minigames.currentKeys.indexOf(39) > Minigames.currentKeys.indexOf(37) || Minigames.currentKeys.indexOf(68) > Minigames.currentKeys.indexOf(65)) {
			ax = acc;
		    }
		    if(Minigames.currentKeys.indexOf(40) > Minigames.currentKeys.indexOf(38) || Minigames.currentKeys.indexOf(83) > Minigames.currentKeys.indexOf(87)) {
			ay = acc;
		    }


		    dx += ax;
		    dy += ay;
		    px += dx;
		    py += dy;
		    ax = 0;
		    ay = 0;
		    
		    if(px < rad) {
			px = rad;
			dx = 0;
		    }
		    if(px >= Minigames.width - rad) {
			px = Minigames.width - rad - 1;
			dx = 0;
		    }
		    if(py < rad) {
			py = rad;
			dy = 0;
		    }
		    if(py >= Minigames.height - rad) {
			py = Minigames.height - rad - 1;
			dy = 0;
		    }

		    player.setAttribute('cx',px);
		    player.setAttribute('cy',py);

		    counter++;
		    if(counter >= pointFreq) {
			currentPoints++;
			counter = 0;
		    }
		    
		    if(!gameOver) {
			Minigames.nextFrame(animloop);
		    } else {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    }
		}
		

		setTimeout(function() {
		    Minigames.svg.removeChild(loadMessage);
		    
		    for(var i = 0; i < Minigames.width/divider; i++) {
			for(var j = 0; j < Minigames.height/divider; j++) {
			    var pixel = document.createElementNS("http://www.w3.org/2000/svg","rect");
			    pixel.setAttribute("x",i*divider);
			    pixel.setAttribute("y",j*divider);
			    pixel.setAttribute("width",divider);
			    pixel.setAttribute("height",divider);
			    pixel.setAttribute("fill","#0000"+Minigames.dec2Hex(Math.min(255,bgPixels[i][j])));
			    
			    Minigames.svg.appendChild(pixel);
			}
		    }

		    
		    player.setAttribute('cx',Minigames.width/2);
		    player.setAttribute('cy',Minigames.height/2);
		    player.setAttribute('r',rad);
		    player.setAttribute('fill',"#00ffff");
		    Minigames.svg.appendChild(player);

		    Minigames.nextFrame(animloop);
		},100);
	    };
	    this.games.push(game4);
	    
	    var game5 = function() {
		var currentPoints = 0;

		var makeTriangle = function(size,fill,stroke,opacity,strokeWidth) {
		    opacity = opacity || 0.75;
		    strokeWidth = strokeWidth || 3;
		    
		    var triangle = document.createElementNS("http://www.w3.org/2000/svg","polygon");
		    var triX = Math.random()*(parseInt(Minigames.width)+size/4)-size/4;
		    var triY = Math.random()*(parseInt(Minigames.height)+size/4)-size/4;
		    
		    var point1 = [triX+Math.random()*size,triY+Math.random()*size];
		    var point2 = [triX+Math.random()*size,triY+Math.random()*size];
		    while(Math.pow(point1[0]-point2[0],2) + Math.pow(point1[1]-point2[1],2) < Math.pow(size/2,2)) {
			point2 = [triX+Math.random()*size,triY+Math.random()*size];
		    }			    
		    
		    var point3 = [triX+Math.random()*size,triY+Math.random()*size];
		    while(Math.pow(point1[0]-point3[0],2) + Math.pow(point1[1]-point3[1],2) < Math.pow(size/2,2) || Math.pow(point2[0]-point3[0],2) + Math.pow(point2[1]-point3[1],2) < Math.pow(size/2,2)) {
			point3 = [triX+Math.random()*size,triY+Math.random()*size];
		    }			    
		    
		    triangle.setAttribute("points",point1[0] + "," + point1[1] + " " + point2[0] + "," + point2[1] + " " + point3[0] + "," + point3[1]);
		    triangle.setAttribute("fill",fill);
		    triangle.setAttribute("stroke",stroke);
		    triangle.setAttribute("stroke-width",strokeWidth);
		    triangle.setAttribute("opacity",opacity);
		    Minigames.svg.appendChild(triangle);
		}
		
		for(var i = 0; i < 50; i++) {
		    var r = Minigames.dec2Hex(Math.random()*256);
		    var g = Minigames.dec2Hex(Math.random()*256);
		    var b = Minigames.dec2Hex(Math.random()*256);
		    makeTriangle(250,"#"+r+g+b,"#"+r+g+b);
		}
		

		var player = document.createElementNS("http://www.w3.org/2000/svg","polygon");
		var px = 40;
		var py = Minigames.height/2;
		var psize = 15;
		var pangle = 0;
		var pspeed = 5;
		player.setAttribute("points",px + "," + (py - psize/2) + " " + px + "," + (py + psize/2) + " " + (px + psize) + "," + py);
		player.setAttribute("fill","#00dd00");
		Minigames.svg.appendChild(player);


		var border = document.createElementNS("http://www.w3.org/2000/svg","rect");
		border.setAttribute("fill-opacity","0");
		border.setAttribute("x",0);
		border.setAttribute("y",0);
		border.setAttribute("width",Minigames.width);
		border.setAttribute("height",Minigames.height);
		border.setAttribute("stroke","#ff0000");
		border.setAttribute("stroke-width","3px");
		Minigames.svg.appendChild(border);

		
		var obstacles = [];
		var spawnChance = 0.05;

		var counter = 0;
		var pointFreq = 5;

		var gameOver = false;

		var animloop = function() {
		    var key = Minigames.currentKeys[Minigames.currentKeys.length-1];

		    var numObstacles = obstacles.length;
		    for(var i = numObstacles - 1; i >= 0; i--) {
			if(Math.pow(obstacles[i].getAttribute("cx")-px,2) +
			   Math.pow(obstacles[i].getAttribute("cy")-py,2) <
			   Math.pow(parseFloat(obstacles[i].getAttribute("r"))+psize/2,2)) {
			    gameOver = true;
			}

			obstacles[i].setAttribute("r",parseFloat(obstacles[i].getAttribute("r")) + 0.25);
			if(obstacles[i].getAttribute("opacity") >= 0.6) {
			    obstacles[i].setAttribute("opacity",obstacles[i].getAttribute("opacity") - 0.005);
			} else if(obstacles[i].getAttribute("opacity") >= 0) {
			    obstacles[i].setAttribute("opacity",obstacles[i].getAttribute("opacity") - 0.025);
			} else {
			    Minigames.svg.removeChild(obstacles[i]);
			    obstacles.splice(i,1);
			}
		    }

		    if(Math.random() < spawnChance) {
			var obstacle = document.createElementNS("http://www.w3.org/2000/svg","circle");
			var x = Minigames.width * Math.random();
			var y = Minigames.height * Math.random();
			while(Math.abs(x - px) < psize * 5 ||
			      Math.abs(y - py) < psize * 5) {
			    x = Minigames.width * Math.random();
			    y = Minigames.height * Math.random();
			}
			
			obstacle.setAttribute("cx",x);
			obstacle.setAttribute("cy",y);
			obstacle.setAttribute("r",0);
			obstacle.setAttribute("opacity",1);
			obstacle.setAttribute("fill","#ff0000");
			Minigames.svg.appendChild(obstacle);
			obstacles.push(obstacle);
		    }
		    
		    if(key === 37 || key === 65) {
			pangle -= 5;
		    }
		    if(key === 39 || key === 68) {
			pangle += 5;
		    }

		    px += pspeed * Math.cos(pangle * Math.PI / 180);
		    py += pspeed * Math.sin(pangle * Math.PI / 180);

		    player.setAttribute("points",px + "," + (py - psize/2) + " " + px + "," + (py + psize/2) + " " + (px + psize) + "," + py);
		    player.setAttribute("transform","rotate("+pangle+ " " + (px + psize/2) + " " + py + ")");

		    pspeed += 0.003;
		    spawnChance += 0.00005;

		    counter++;
		    if(counter >= pointFreq) {
			currentPoints++;
			counter = 0;
		    }

		    Minigames.displayGamePoints(currentPoints);
		    
		    
		    if(px < 3 || px > Minigames.width - 4 - psize || py < 3 + psize/2 || py > Minigames.height - 4 - psize/2) {
			gameOver = true;
		    }

		    if(gameOver) {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    } else {
			Minigames.nextFrame(animloop);
		    }
		}

		Minigames.nextFrame(animloop);		
	    };
	    this.games.push(game5);
	    
	    var game6 = function() {
		var fullAlphabet = "abcdefghijklmnopqrstuvwxyz";
		var alphabet = "abcdefhiklmnorstuvwxz";
		var letters = [];
		var circles = [];
		var fontSize = 25;
		var bottomSpace = 30;

		var background1 = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background1.setAttribute("x",0);
		background1.setAttribute("y",0);
		background1.setAttribute("width",Minigames.width);
		background1.setAttribute("height",Minigames.height - fontSize - bottomSpace);
		background1.setAttribute("fill","#ccffdd");
		Minigames.svg.appendChild(background1);

		var background2 = document.createElementNS("http://www.w3.org/2000/svg","rect");
		background2.setAttribute("x",0);
		background2.setAttribute("y",Minigames.height - fontSize - bottomSpace);
		background2.setAttribute("width",Minigames.width);
		background2.setAttribute("height",fontSize + bottomSpace);
		background2.setAttribute("fill","#ffdddd");
		Minigames.svg.appendChild(background2);
		

		var deathLine = document.createElementNS("http://www.w3.org/2000/svg","line");
		deathLine.setAttribute("x1",0);
		deathLine.setAttribute("y1",Minigames.height - fontSize - bottomSpace);
		deathLine.setAttribute("x2",Minigames.width);
		deathLine.setAttribute("y2",Minigames.height - fontSize - bottomSpace);
		deathLine.setAttribute("stroke","#000000");
		deathLine.setAttribute("fill","#000000");
		deathLine.setAttribute("stroke-width",1);
		Minigames.svg.appendChild(deathLine);


		var spawnChance = 0.01;
		var bombChance = 0.05;
		var bombRad = 100;
		var pointsPerLetter = 10;

		var explode = function(cnum) {
		    var bombsToExplode = [];
		    for(var i = 0; i < letters.length; i++) {
			if(Math.pow(parseFloat(letters[i].getAttribute("x"))-circles[cnum].getAttribute("cx"),2) +
			   Math.pow(parseFloat(letters[i].getAttribute("y"))-circles[cnum].getAttribute("cy"),2) <
			   Math.pow(bombRad + fontSize/4,2)) {
			    if(letters[i].getAttribute("fill") === "#ff0000") {
				for(var j = 0; j < circles.length; j++) {
				    if(parseInt(circles[j].getAttribute("letter")) === i) {
					if(j === cnum) {
					    var bombLetterNum = i;
					} else {
					    bombsToExplode.push(j);
					}
					break;
				    }
				}
			    } else {
				Minigames.svg.removeChild(letters[i]);
				letters.splice(i,1);

				for(var j = 0; j < circles.length; j++) {
				    if(parseInt(circles[j].getAttribute("letter")) > i) {
					circles[j].setAttribute("letter",circles[j].getAttribute("letter") - 1);
				    }
				}

				i--;
			    }
			}
		    }

		    Minigames.svg.removeChild(letters[bombLetterNum]);
		    letters.splice(bombLetterNum,1);
		    Minigames.svg.removeChild(circles[cnum]);
		    circles.splice(cnum,1);
		    for(var i = 0; i < circles.length; i++) {
			if(parseInt(circles[i].getAttribute("letter")) > bombLetterNum) {
			    circles[i].setAttribute("letter",circles[i].getAttribute("letter") - 1);
			}
		    }
		    for(var i = 0; i < bombsToExplode.length; i++) {
			if(bombsToExplode[i] > cnum) {
			    bombsToExplode[i]--;
			}
		    }


		    for(var i = 0; i < bombsToExplode.length; i++) {
			var exploded = explode(bombsToExplode[i]);
			for(var j = i+1; j < bombsToExplode.length; j++) {
			    bombsToExplode[j]--;
			}
			for(var j = 0; j < exploded.length; j++) {
			    for(var k = i+1; k < bombsToExplode.length; k++) {
				if(bombsToExplode[k] === exploded[j]) {
				    bombsToExplode.splice(k,1);
				    k--;
				} else if(bombsToExplode[k] > exploded[j]) {
				    bombsToExplode[k]--;
				}
			    }
			}
			bombsToExplode = bombsToExplode.splice(0,i+1).concat(exploded).concat(bombsToExplode);
			i += exploded.length;
		    }

		    return bombsToExplode;
		}
			    

		var gameOver = false;
		var currentPoints = 0;
		var oldKey;

		var animloop = function() {
		    var key = Minigames.currentKeys[Minigames.currentKeys.length-1];
		    var letterTyped = false;
		    if(key === oldKey) {
			letterTyped = true;
		    }

		    if(Math.random() < spawnChance) {
			var letter = document.createElementNS("http://www.w3.org/2000/svg","text");
			letters.push(letter);
			letter.setAttribute('x',Math.random()*(Minigames.width-50)+25);
			letter.setAttribute('y',15);
			letter.setAttribute('text-anchor',"middle");
			letter.setAttribute('font-size',20);
			letter.setAttribute('font-family',"'Comic Sans MS', cursive, sans-serif");
			if(Math.random() < bombChance) {
			    letter.setAttribute('fill',"#ff0000");
			    var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
			    circle.setAttribute('stroke',"#ff0000");
			    circle.setAttribute('fill','none');
			    circle.setAttribute('letter',letters.length-1);
			    circle.setAttribute('cx',letter.getAttribute('x'));
			    circle.setAttribute('cy',parseFloat(letter.getAttribute('y')) - fontSize / 4);
			    circle.setAttribute('r',bombRad);
			    circles.push(circle);
			    
			    Minigames.svg.appendChild(circle);
			} else {
			    letter.setAttribute('fill',"#"+Minigames.dec2Hex(Math.random()*150)+Minigames.dec2Hex(Math.random()*150)+Minigames.dec2Hex(Math.random()*150));
			}
			letter.setAttribute('deltax',0);
			letter.setAttribute('vx',2);
			letter.setAttribute('koverm',Math.random()/20);
			var numLetter = Math.random()*alphabet.length;
			letter.appendChild(document.createTextNode(alphabet.substring(numLetter,numLetter+1)));
		
			Minigames.svg.appendChild(letter);
		    }
		    
		    for(var i = 0; i < letters.length; i++) {
			letters[i].setAttribute("y",parseInt(letters[i].getAttribute("y"))+1);
			letters[i].setAttribute("x",parseFloat(letters[i].getAttribute("x"))+parseFloat(letters[i].getAttribute("vx")));
			letters[i].setAttribute("deltax",parseFloat(letters[i].getAttribute("deltax"))+parseFloat(letters[i].getAttribute("vx")));
			letters[i].setAttribute("vx",parseFloat(letters[i].getAttribute("vx"))-(letters[i].getAttribute("deltax")*letters[i].getAttribute("koverm")));

			if(letters[i].getAttribute("y") > Minigames.height - fontSize - bottomSpace) {
			    gameOver = true;
			}

			if(!letterTyped && letters[i].childNodes[0].nodeValue.substring(0,1) === fullAlphabet.substring(key-65,key-64)) {
			    if(letters[i].getAttribute('fill') === "#ff0000") {
				for(var j = 0; j < circles.length; j++) {
				    if(parseInt(circles[j].getAttribute("letter")) === i) {
					explode(j);
					break;
				    }
				}
			    } else {
				Minigames.svg.removeChild(letters[i]);
				letters.splice(i,1);
				for(var j = 0; j < circles.length; j++) {
				    if(parseInt(circles[j].getAttribute("letter")) > i) {
					circles[j].setAttribute("letter",circles[j].getAttribute("letter") - 1);
				    }
				}
			    }
				
			    letterTyped = true;
			    currentPoints += pointsPerLetter;
			    i--;
			}
		    }

		    for(var i = 0; i < circles.length; i++) {
			circles[i].setAttribute("cx",letters[circles[i].getAttribute("letter")].getAttribute("x"));
			circles[i].setAttribute("cy",parseFloat(letters[circles[i].getAttribute("letter")].getAttribute("y")) - fontSize/4);
		    }

		    spawnChance += 0.00001;
		    oldKey = key;
		    Minigames.displayGamePoints(currentPoints);

		    if(gameOver) {
			Minigames.points += currentPoints;
			Minigames.clear();
			Minigames.menu();
		    } else {
			Minigames.nextFrame(animloop);
		    }
		}
		
		Minigames.nextFrame(animloop);
	    };
	    this.games.push(game6);
	    
	    var game7 = function() {
		Minigames.menu();
	    };
	    this.games.push(game7);
	    
	    var game8 = function() {
		Minigames.menu();
	    };
	    this.games.push(game8);
	    
	    var game9 = function() {
		Minigames.menu();
	    };
	    this.games.push(game9);
	    
	    var game10 = function() {
		Minigames.menu();
	    };
	    this.games.push(game10);
	},


    //This function creates the main menu and displays total points
	menu:function() {
	
	//Array of rects, each representing a game choice 
	    var choices = [];
	
	//Each choice is displayed onscreen
	    for(var i = 0; i < 5; i++) {
		for(var j = 0; j < 2; j++) {
		    var choice = document.createElementNS("http://www.w3.org/2000/svg","rect");
		    choice.setAttribute('idNum',j*5 + i);
		    choice.setAttribute('x',i*this.width/5 + 10);
		    choice.setAttribute('y',j*this.height/2 + 10);
		    choice.setAttribute('width',this.width/5 - 20);
		    choice.setAttribute('height',this.height/2 - 20);
		    choice.setAttribute('fill',"#bbbbbb")
		    choice.setAttribute('stroke',"#000000");
		    svg.appendChild(choice);
		    choices.push(choice);
		    
		    if(this.points < this.unlockVals[j*5+i]) {
			var unlockText = document.createElementNS("http://www.w3.org/2000/svg","text");
			unlockText.setAttribute('x',i*this.width/5 + this.width/10);
			unlockText.setAttribute('y',j*this.height/2 + this.height/4);
			unlockText.setAttribute('text-anchor',"middle");
			unlockText.setAttribute('font-size',"18px");
			unlockText.setAttribute('font-family',"'Comic Sans MS', cursive, sans-serif");
			unlockText.appendChild(document.createTextNode("UNLOCK AT: "));
			unlockText.appendChild(document.createTextNode(this.unlockVals[j*5+i]));
			this.svg.appendChild(unlockText);
		    }


		//Each rect gets an event listener that runs the function for
		//that game and then re-runs the menu function to setup the
		//menu again once the game is over
		    choice.addEventListener("click", function(e){
			if(Minigames.points >= Minigames.unlockVals[this.getAttribute('idNum')]) {
			    Minigames.clear();
			    Minigames.games[this.getAttribute('idNum')]();
			}
		    });
		}
	    }
	    
	    
	//Puts the total number of points on the screen
	    this.displayTotalPoints(this.points);
	},
	clear: function() {
	    var children = this.svg.childNodes;
	    var len = children.length;
	    for(var i = 0; i < len; i++) {
		this.svg.removeChild(children[0]);
	    }
	},
	dec2Hex: function(n) {
	    var result = "";
	    var digits = "0123456789ABCDEF";
	    var counter = 0;
	    var oldCounter = 0;
	    
	    if(n == 0) {
		return "0";
	    }
	    
	    while(n > 0) {
		var tmp = n;
		oldCounter = counter;
		counter = 0;
		while(tmp >= 16) {
		    counter++;
		    tmp = parseInt(tmp / 16);
		}

		if(oldCounter - counter > 1) {
		    for(var i = 0; i < oldCounter - counter - 1; i++) {
			result += '0';
		    }
		}

		result += digits.substring(tmp,tmp+1);
		n -= tmp * Math.pow(16,counter);
		
		if(n == 0) {
		    while(counter > 0) {
			result += '0';
			counter--;
		    }
		}
	    }

	    if(result.length === 1) {
		return "0"+result;
	    }
	    return result;
	},
	displayPoints: function(message) {
	    return function(points) {
		var prevPoints = document.getElementsByTagName("p");
		if(prevPoints.length > 0) {
		    Minigames.body.removeChild(prevPoints[0]);
		}

		var pointsText = document.createElement("p");
		Minigames.body.appendChild(pointsText);
		pointsText.appendChild(document.createTextNode(message));
		pointsText.appendChild(document.createTextNode(points));
		pointsText.style.setProperty("padding-left","1em");
		pointsText.style.setProperty("font-family","'Comic Sans MS', cursive, sans-serif");
		pointsText.style.setProperty("font-size", "18px");
	    };
	},
	displayTotalPoints: function(points) {
	    Minigames.displayPoints("Total Points: ")(points);
	},
	displayGamePoints: function(points) {
	    Minigames.displayPoints("Points for this Game: ")(points);
	},
	nextFrame: function(loop) {
	    var w = window;
	    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	    requestAnimationFrame(loop);
	}
    };
};
    
var Minigames = minigames();
Minigames.setup();
Minigames.menu();


window.addEventListener("keydown", function(e) {
    if(Minigames.currentKeys.indexOf(e.keyCode) === -1) {
	Minigames.currentKeys.push(e.keyCode);
    }
});

window.addEventListener("keyup", function(e) {
    while(Minigames.currentKeys.indexOf(e.keyCode) != -1) {
	Minigames.currentKeys.splice(Minigames.currentKeys.indexOf(e.keyCode),1);
    }
});
