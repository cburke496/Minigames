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
	unlockVals:[0,50,150,400,1000,2500,5000,10000,25000,100000],

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

		    var pointsText = document.createElement("p");
		    Minigames.body.removeChild(document.getElementsByTagName("p")[0]);
		    Minigames.body.appendChild(pointsText);
		    pointsText.appendChild(document.createTextNode("Points for this Game: "));
		    pointsText.appendChild(document.createTextNode(currentPoints));
		    pointsText.style.setProperty("padding-left","1em");
		    pointsText.style.setProperty("font-family","'Comic Sans MS', cursive, sans-serif");
		    pointsText.style.setProperty("font-size", "18px");


		    if(player.getAttribute('cx') < Minigames.width - radius) {
			try {
			    window.requestAnimationFrame(animloop);
			} catch (err) {
			    window.webkitRequestAnimationFrame(animloop);
			}
		    } else {
			Minigames.svg.removeChild(player);
			var plen = pellets.length;
			for(var i = plen; i > 0; i--) {
			    Minigames.svg.removeChild(pellets[i-1]);
			}
			var splen = superPellets.length;
			for(var i = splen; i > 0; i--) {
			    Minigames.svg.removeChild(superPellets[i-1]);
			}
			Minigames.points += currentPoints;
			Minigames.body.removeChild(document.getElementsByTagName("p")[0]);
			Minigames.svg.removeChild(background);

			Minigames.menu();
		    }
		};
		
		try {
		    window.requestAnimationFrame(animloop);
		} catch (err) {
		    window.webkitRequestAnimationFrame(animloop);
		}	
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


		    var pointsText = document.createElement("p");
		    Minigames.body.removeChild(document.getElementsByTagName("p")[0]);
		    Minigames.body.appendChild(pointsText);
		    pointsText.appendChild(document.createTextNode("Points for this Game: "));
		    pointsText.appendChild(document.createTextNode(currentPoints));
		    pointsText.style.setProperty("padding-left","1em");
		    pointsText.style.setProperty("font-family","'Comic Sans MS', cursive, sans-serif");
		    pointsText.style.setProperty("font-size", "18px");


		    if(!dead) {
			try {
			    window.requestAnimationFrame(animloop);
			} catch (err) {
			    window.webkitRequestAnimationFrame(animloop);
			}
		    } else {
			Minigames.svg.removeChild(player);
			var slen = spikes.length;
			for(var i = slen - 1; i >= 0; i--) {
			    Minigames.svg.removeChild(spikes[i]);
			}
			
			Minigames.points += currentPoints;
			Minigames.body.removeChild(document.getElementsByTagName("p")[0]);
			Minigames.svg.removeChild(background1);
			Minigames.svg.removeChild(background2);

			Minigames.menu();
		    }
		};
		
		try {
		    window.requestAnimationFrame(animloop);
		} catch (err) {
		    window.webkitRequestAnimationFrame(animloop);
		}	
	    };
	    this.games.push(game2);

	    var game3 = function() {
		var background = document.createElementNS("http://www.w3.org/2000/svg","rect");
		    background.setAttribute("fill","eeeeff");
		    background.setAttribute("x",0);
		    background.setAttribute("y",0);
		    background.setAttribute("width",Minigames.width);
		    background.setAttribute("height",Minigames.height);
		    Minigames.svg.appendChild(background);

		var boxes = [];
		for(var i = 0; i < 75; i++) {
		    var box = document.createElementNS("http://www.w3.org/2000/svg","rect");
		    var boxSize = Math.random()*200 + 50;
		    box.setAttribute("fill","0000"+Minigames.dec2Hex(Math.random()*256));
		    box.setAttribute("x",Math.random()*(Minigames.width-boxSize));
		    box.setAttribute("y",Math.random()*(Minigames.height-boxSize));
		    box.setAttribute("width",boxSize);
		    box.setAttribute("height",boxSize);
		    box.setAttribute("opacity",Math.random()*0.75);
		    box.setAttribute("transform","rotate("+Math.random()*90+" "+(parseFloat(box.getAttribute('x'))+boxSize/2)+" "+(parseFloat(box.getAttribute('y'))+boxSize/2)+")");
		    Minigames.svg.appendChild(box);
		    boxes.push(box);
		}


		var animloop = function() {
		    for(var i = 0; i < boxes.length; i++) {
			boxes[i].setAttribute('x',parseFloat(boxes[i].getAttribute('x'))+Math.random()*6-3);
			boxes[i].setAttribute('y',parseFloat(boxes[i].getAttribute('y'))+Math.random()*6-3);
		    }

		    try {
			window.requestAnimationFrame(animloop);
		    } catch (err) {
			window.webkitRequestAnimationFrame(animloop);
		    }
		}

		try {
		    window.requestAnimationFrame(animloop);
		} catch (err) {
		    window.webkitRequestAnimationFrame(animloop);
		}	

	    };
	    this.games.push(game3);

	    var game4 = function() {
		Minigames.menu();
	    };
	    this.games.push(game4);

	    var game5 = function() {
		Minigames.menu();
	    };
	    this.games.push(game5);
	    
	    var game6 = function() {
		Minigames.menu();
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
	    var pointsText = document.createElement("p");
	    this.body.appendChild(pointsText);
	    pointsText.appendChild(document.createTextNode("Total Points: "));
	    pointsText.appendChild(document.createTextNode(this.points));
	    pointsText.style.setProperty("padding-left","1em");
	    pointsText.style.setProperty("font-family","'Comic Sans MS', cursive, sans-serif");
	    pointsText.style.setProperty("font-size", "18px");
	},
	clear: function() {
	    var children = this.svg.childNodes;
	    var len = children.length;
	    for(var i = 0; i < len; i++) {
		this.svg.removeChild(children[0]);
	    }
	    //var totalPoints = document.getElementsByTagName("p")[0];
	    //this.body.removeChild(totalPoints);
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
	    return result;
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
    var index = Minigames.currentKeys.indexOf(e.keyCode);
    Minigames.currentKeys.splice(index,1);
});
