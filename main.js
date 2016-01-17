//1. Set up grid
//2. Having movabillity for sprites
//3. Adding in another sprite and moving logic
//4. set up turn base
//5. place traps //logic added
//6. place gold //logic added
//6. step on traps logic
//7. animations for moving/dieing
//8. map reduction logic

//===========================================================================
// Global game variables and objects
//===========================================================================
var grid = {}; //object for our grid and each cell and what consists in it
var traps = {}; // a object containing all traps, which will hold a number of trap objects
var trap = {position: null, detonated: false}; //weapons/traps we can lay, object with damage and what not
var mapReduce = false; //if we decide to reduce the map
var turnNum = 0; //current turn number
var size = 10; // size of grid, if square
var halfpoint = size / 2; //half the grid size to differentiate enemy space and your space
var playerNickname = '';
var isSelected = false;

var socket = io();
//===========================================================================
// Selectors for making grid and setting its id
//===========================================================================
var $table = document.createElement('table'); //creating table element
var $gameDiv = document.getElementById('gameContent');  //getting gameDiv element
$table.id = "gameGrid"; //setting table id

//!IMPORTANT => WE SHOULD PROBABLY MAKE A HUNTER AND A THIEF A CLASS, SO WE COULD HAVE MULTIPLE CHARACTERS IF WE WANTED TO FOR SOME REASON, LIKE HUNTER AND THIEF PARTY 5, or have multiple games going on

var hero = function(type, nickname, location) {
    this.alive = true;
    this.currentTraps = {};
    this.nickname = nickname;
    this.goldLocation = null;
    this.victory = false;
    this.location = location;
    this.coordinateLocation = null;
    this.type = type; //hunters or thiefs
    this.isTurn = false;
    
    this.setTurn = function() {
        this.isTurn = true;
    }
    
    this.setDead = function() {
        this.alive = false;
    }
    
    this.setAlive = function() {
        this.alive = true;
    }
    
    this.updateNickName = function(name) {
        this.nickname = name;
    }
    
    this.setGoldLocation = function(x, y) {
        this.goldLocation = "(" + x + "," + y + ")";
    }
    
    this.setVictory = function() {
        this.victory = true;
    }
    
    this.addTrapAndUpdateGrid = function(x, y) {
        var trapToString = '(' + x + ',' + y + ')';
        this.currentTrap[trapToString] = {locationX: x, locationY: y, defused: false, active: false, exploded: false, pending: false};
        grid[trapToString].trap = this.currentTrap[trapToString];
    }
    
    this.updateLocation = function(location) { 
        this.location = location;
    }
    
    this.updateCoordinateLocation = function(coordinates) { //coordinates is a object
        this.coordinateLocation = coordinates;
    }

}


//===========================================================================
// Create grid and fill grid{} object with initialized objects for each key
//===========================================================================
var createGrid = function() {
    for(var i =0; i< size; i++) {
        var $tr = document.createElement('tr'); //create a new table row
        $tr.id = "row: " + i; //give the id row: 0 ... 1 .. 2
        if(i <= halfpoint-1) {
            $tr.classList.add("enemyCell");
        }
        else {
            $tr.classList.add("myCell");
        }
        $table.appendChild($tr); //append the row to our table
        for(var j=0; j<size; j++) {
            var newObj={locationY: i, locationX: j, trap: false, gold: false, hasPlayer: null, playerType: null}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
            var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
            grid[pos] = newObj; //in our grid object, we'll have another object within it named the location such as grid { (0,1): {locationX: 0, locationY:0 .... } (0,2) : ... }
            var $td = document.createElement('td'); //create our cell element
            $td.id = pos; //set the cell id to the position, i.e (0,0) being the first cell
            $tr.appendChild($td); //append cell to table row
        }
    }
   $gameDiv.appendChild($table); //Append our table to our gamediv
}


//===========================================================================
// Methods for checking if either user won
//===========================================================================
var victoryCheck = function() {

}
//===========================================================================
// Method for setting nickname
//===========================================================================

var nickName = function(str) {
    if(str == null) {
        return "Player";    
    } else {
        return str;
    }
}


//===========================================================================
// Method for checking if all preReqs are met for multiplayer
//===========================================================================

var init = function() {
    //nicknames set
    //board set
    //sprites loaded
    //if so then return true

}

//===========================================================================
// Method for moving sprites
//===========================================================================



var validateThiefMove = function (player, position) {
 //Thief movement logic in here maybe
 //if((grid[position].currentX - player.coordinateLocation.currentX >)
 
}

var validateHunterMove = function(position) {
 //Hunter movement logic in here maybe
}


//===========================================================================
// Method for setting traps
//===========================================================================

//checking gridSpace
var checkGridSpace = function(position) {
    if(grid[position].trap == true || grid[position].gold == true || grid[position].hasPlayer == true) {
        return false;
    } else {
        return true;
    }
}


//===========================================================================
// CheckNeighbors for traps/golds
//===========================================================================

var checkNeighbhor = function(player, position) {
    //logic to check neighbhors based on player.type, i.e hunter can check more than 5 spaces away diagonally for some hint, whereas thief can check only 2 for traps and gold, minesweeper esque
}

//===========================================================================
// Method for reducing map
//===========================================================================

var reduceMap = function() {

}

//===========================================================================
// Method for opting to kill the guy
//===========================================================================

var checkCollision = function() {

}


//===========================================================================
// Implement pathing using breadthFirstSearch for walking animation etc
//===========================================================================

var BFS = function() {

}



//===========================================================================
// socket.io methods for multiplayer
//===========================================================================
//setting name
var nameSet = false;


var inputMessage = function() {
    var chatInput = document.getElementById("chatinput").value;
    event.preventDefault();
    //console.log(chatInput);
    socket.emit('chat message', chatInput); //sends message to server
    document.getElementById("chatinput").value = "";
    return false;
}

socket.on('chat message', function(msg) {
    var chatList = document.getElementById("listmessages");
    var $li = document.createElement("li");
    $lipre.appendChild(document.createTextNode(msg));
    $li.setAttribute("id", "user"); // added line
    chatList.appendChild($li);
	 $('#listmessages').animate({
        scrollTop: $('#chatbox')[0].scrollHeight});
    
	});

var setNickname = function() {
    console.log(nameSet);
    var inputName = document.getElementById("nickNames").value;
    var loggedin = document.getElementById("loggedin");
    event.preventDefault();
    if(nameSet == true) {
        socket.emit('changenickname', inputName);
    } else {
      socket.emit('adduser', inputName);
      nameSet = true;
    }
    inputName.innerHTML = "";
    loggedin.innerHTML = "Currently logged in as: " + inputName;
    
}


socket.on('updateusers', function(usernames) {
    var online = document.getElementById("currentlyonline");
    online.innerHTML = "";
	
	$.each(usernames, function(key, value) {
	   $('#currentlyonline').append('<li>' + value + '<li>');
	});
	});
//===========================================================================
// AI Methods for computer
//===========================================================================


//===========================================================================
// Calling the createGrid function and checking grid object in console
//===========================================================================

createGrid();

grid["(5,5)"].hasPlayer = true; // just showing theres a player in the middle, for now just assuming it is a hunter
grid["(4,5)"].hasPlayer = true;
grid["(5,5)"].playerType = "H";
grid["(4,5)"].playerType = "T";
grid["(0,0)"].hasPlayer = true;
grid["(0,0)"].playerType = "H";

grid["(0,1)"].hasPlayer = true;
grid["(0,1)"].playerType = "H";

grid["(0,2)"].hasPlayer = true;
grid["(0,2)"].playerType = "H";

grid["(0,3)"].hasPlayer = true;
grid["(0,3)"].playerType = "H";

grid["(0,4)"].hasPlayer = true;
grid["(0,4)"].playerType = "H";

grid["(0,5)"].hasPlayer = true;
grid["(0,5)"].playerType = "H";


grid["(1,1)"].hasPlayer = true;
grid["(1,1)"].playerType = "T";

grid["(1,2)"].hasPlayer = true;
grid["(1,2)"].playerType = "H";

grid["(1,3)"].hasPlayer = true;
grid["(1,3)"].playerType = "H";

grid["(1,4)"].hasPlayer = true;
grid["(1,4)"].playerType = "H";

grid["(1,5)"].hasPlayer = true;
grid["(1,5)"].playerType = "H";


var changeColor = function() {
    if(grid[this.id].hasPlayer == true){
        if(isSelected == false && grid[this.id].playerType == "H"){
            this.classList.toggle("selectedH");
            var cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 2)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 2)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY+2)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY-2)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            isSelected = true;
        }
        else if (isSelected == false && grid[this.id].playerType == "T"){
            this.classList.toggle("selectedT");
            for(var i=1; i<(size-grid[this.id].locationX+2); i++){
            var dog = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            dog = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX - i - 1)+","+(grid[this.id].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX - i - 1)+","+(grid[this.id].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + i + 1)+","+(grid[this.id].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + i + 1)+","+(grid[this.id].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            }
            isSelected = true;
        }
        else if(isSelected == true && this.classList.contains("selectedH")){
            this.classList.toggle("selectedH");
            var cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 2)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[this.id].locationX - 2)+","+grid[this.id].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY+2)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[this.id].locationX+","+(grid[this.id].locationY-2)+")");
            if(cat){
            cat.classList.toggle("validH");
            } isSelected = false;
        }
        else if(isSelected == true && this.classList.contains("selectedT")){
            this.classList.toggle("selectedT");
            for(var i=1; i<(size-grid[this.id].locationX+2); i++){
            var dog = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            dog = document.getElementById("("+(grid[this.id].locationX - 1)+","+(grid[this.id].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + 1)+","+(grid[this.id].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX - i - 1)+","+(grid[this.id].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX - i - 1)+","+(grid[this.id].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + i + 1)+","+(grid[this.id].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[this.id].locationX + i + 1)+","+(grid[this.id].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            } }
            isSelected = false;
        }
        }
};

var cellClickListeners = function() {
     for(var i =0; i< size; i++) {
        for(var j=0; j<size; j++) {
            var div = document.getElementById("("+ i +","+j+")").addEventListener("click",changeColor);
}}};

cellClickListeners();