var minigames = function() {
    //HTML Body
    var body = document.getElementsByTagName("body")[0];

    //SVG element and its width and height
    var svg = document.getElementById("svg");
    var width = svg.getAttribute("width");
    var height = svg.getAttribute("height");
    
    //User's points
    var points = 0;
    
    //Each minigame's code is contained within a function that is stored in 
    //the games array
    var games = [];

    //This is where the code for each game is made and then stored in the array
    var setup = function() {
	var game1 = function() {
	    var children = svg.childNodes;
	    var len = children.length;
	    for(var i = 0; i < len; i++) {
		svg.removeChild(children[0]);
	    }
	};
	games.push(game1);
	var game2 = function() {};
	games.push(game2);
	var game3 = function() {};
	games.push(game3);
	var game4 = function() {};
	games.push(game4);
	var game5 = function() {};
	games.push(game5);
	var game6 = function() {};
	games.push(game6);
	var game7 = function() {};
	games.push(game7);
	var game8 = function() {};
	games.push(game8);
	var game9 = function() {};
	games.push(game9);
	var game10 = function() {};
	games.push(game10);
    }();


    //This function creates the main menu and displays total points
    var menu = function() {
	
	//Array of rects, each representing a game choice 
	var choices = [];
	
	//Each choice is displayed onscreen
	for(var i = 0; i < 5; i++) {
	    for(var j = 0; j < 2; j++) {
		var choice = document.createElementNS("http://www.w3.org/2000/svg","rect");
		choice.setAttribute('idNum',j*5 + i);
		choice.setAttribute('x',i*width/5 + 10);
		choice.setAttribute('y',j*height/2 + 10);
		choice.setAttribute('width',width/5 - 20);
		choice.setAttribute('height',height/2 - 20);
		choice.setAttribute('fill',"#bbbbbb")
		choice.setAttribute('stroke',"#000000");
		svg.appendChild(choice);
		choices.push(choice);


		//Each rect gets an event listener that runs the function for
		//that game and then re-runs the menu function to setup the
		//menu again once the game is over
		choice.addEventListener("click", function(e){
		    console.log(e);
		    games[this.getAttribute('idNum')]();
		    
		});
	    }
	}
	

	//Puts the total number of points on the screen
	var pointsText = document.createElement("p");
	body.appendChild(pointsText);
	pointsText.appendChild(document.createTextNode("Total Points: "));
	pointsText.appendChild(document.createTextNode(points));
	pointsText.style.setProperty("padding-left","1em");
	pointsText.style.setProperty("font-family","'Comic Sans MS', cursive, sans-serif");
	pointsText.style.setProperty("font-size", "18px");
    }();
}();
