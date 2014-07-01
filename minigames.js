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
		    if(key === 38 && player.getAttribute('cy') > radius + dy) {
			player.setAttribute('cy',parseInt(player.getAttribute('cy'))-dy);
		    }
		    if(key === 40 && player.getAttribute('cy') < Minigames.height - radius - dy) {
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
			    currentPoints += 5;
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
		Minigames.menu();
	    };
	    this.games.push(game2);

	    var game3 = function() {
		Minigames.menu();
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
