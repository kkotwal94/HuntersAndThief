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
var currentSelectedTile = null;
var currentValidMoveLocations = [];
var currentNumOfValid = 0;

var whoseTurn = "Blue";

var isTrapPlaced = false;
var lastTrap = null;


var LobbyRoom = [];
var LobbyRoomSize = 2;

var socket = io();
//===========================================================================
// Selectors for making grid and setting its id
//===========================================================================
var $table = document.createElement('table'); //creating table element
var $gameDiv = document.getElementById('gameContent');  //getting gameDiv element
$table.id = "gameGrid"; //setting table id

//!IMPORTANT => WE SHOULD PROBABLY MAKE A HUNTER AND A THIEF A CLASS, SO WE COULD HAVE MULTIPLE CHARACTERS IF WE WANTED TO FOR SOME REASON, LIKE HUNTER AND THIEF PARTY 5, or have multiple games going on

var Hero = function(type, nickname, location) {
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

};

var redthief = new Hero("RedThief", playerNickname+" redThief", '(1,2)');
var redHunter = new Hero("RedHunter", playerNickname +"redHunter", '(1,1)');

var bluethief = new Hero("BlueThief", playerNickname + "blueThief", '(9,8)');
var blueHunter = new Hero("BlueHunter", playerNickname + "blueHunter", '(9,9)');

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
            var newObj={locationY: i, locationX: j, trap: false, gold: false, hasPlayer: false, playerType: null, playerTeam:null}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
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

var p1ReadyStatus = false;
var p2ReadyStatus = false;

var myPlayer = false;
var enemyPlayer = false;

var clientLobby =[];

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
    $li.appendChild(document.createTextNode(msg));
    $li.setAttribute("id", "user"); // added line
    chatList.appendChild($li);
	 $('#listmessages').animate({
        scrollTop: $('#listmessages')[0].scrollHeight});
    
	});

var isSet = false;

var setNickname = function() {
    //console.log(nameSet);
   
    var form = document.getElementById("nickname"); //get form html content
    playerNickname = document.getElementById("nickNames").value;
    var loggedin = document.getElementById("loggedin");
    event.preventDefault();
    
    
    if(nameSet == true) {
        socket.emit('changenickname', playerNickname);
    } else {
      socket.emit('adduser', playerNickname);
      nameSet = true;
    }
    document.getElementById("nickNames").innerHTML = "";
    loggedin.innerHTML = "Currently logged in as: " + playerNickname;
    
    if(isSet == false) {
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Join Lobby");
    btn.appendChild(t);
    btn.id = "joinLobby";
    btn.onclick = function() { 
        join(playerNickname);
    };
    //btn.addEventListener('click', join(playerNickname));
    form.appendChild(btn);
    isSet = true;
        
    }
    
}


socket.on('updateusers', function(usernames) {
    var online = document.getElementById("currentlyonline");
    online.innerHTML = "";
	
	$.each(usernames, function(key, value) {
	   $('#currentlyonline').append('<li>' + value + '<li>');
	});
	});
	
socket.on('updatingLobby', function(lobby, readyStatus) {
    clientLobby = lobby;
    var form = document.getElementById("nickname"); //get form html content
    var lobbyRoom = document.getElementById("lobbyRoom");
    var button = document.getElementById("joinLobby");
    var str;
    lobbyRoom.innerHTML = "";
    var length = lobby.length;
    for(var i = 0; i < length; i++){
       var li = document.createElement('li');
       
      /* console.log(readyStatus[lobby[i]]);
       if(readyStatus[lobby[i]] != undefined || null) {
           if(readyStatus[lobby[i]].ready == false) {
               str = "Not Ready";
               li.innerHTML = lobby[i] + " " + str;
              li.id = "player" + (i+1);
                lobbyRoom.appendChild(li);
           }
           
           if(readyStatus[lobby[i]].ready == true) {
               li.innerHTML = lobby[i] + " " + str;
       li.id = "player" + (i+1);
       lobbyRoom.appendChild(li);
               str = "Ready";
           }
       }
     */
        
       li.innerHTML = lobby[i];
       li.id = "player" + (i+1);
       lobbyRoom.appendChild(li);
    }
    
});

socket.on('lobbyfull', function(lobby) {
    clientLobby = lobby;
    console.log("Lobby is full right now!");

    var lobbyRoom = document.getElementById("lobbyRoom");
    lobbyRoom.innerHTML = "";
    var length = lobby.length;
    for(var i = 0; i < length; i++){
        /*
       if(i=0) {
       var textNode = p1ReadyStatus;
       }
       if(i=1){
           var textNode = p2ReadyStatus;
       }
      */
       var li = document.createElement('li');
       li.innerHTML = lobby[i] + " ";
       lobbyRoom.appendChild(li);
    }
    
});

/*var btn = document.getElementById("joinLobby");
if (btn!=null) {
    
btn.addEventListener('click', join(playerNickname));
}*/

var ready = function(name) {
    var lobbyRoom = document.getElementById("lobbyRoom");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    var readyButton = document.getElementById("readyButton");
    var form = document.getElementById("nickname");
   /*
    console.log("player1: " + player1.innerHTML);
    console.log("player2: " + player2.innerHTML);
   console.log("playerNickName: " + playerNickname);
   console.log("player1: " + player1.innerHTML);
    console.log("player2: " + player2.innerHTML);
    console.log(playerNickname == player1.innerHTML);
    console.log(playerNickname === player2.innerHTML);
   */
    if(player1 != null){
        //console.log("hitplayer1");
        var p1 = player1.innerHTML.split(" ")[0];
        if(p1 == playerNickname) {
            p1ReadyStatus = true;
            player1.innerHTML = playerNickname + " " + "Ready";
            socket.emit('ready', playerNickname);
        }
    }
    
    if(player2 != null){
        var p2 = player2.innerHTML.split(" ")[0];
        if(p2 == playerNickname){
            p2ReadyStatus = true;
            player2.innerHTML = playerNickname + " " + "Ready";
            socket.emit('ready', playerNickname);
        }
    }
    form.removeChild(readyButton);
    
    var unreadyButton = document.createElement("BUTTON");
    var t = document.createTextNode("Unready");
    unreadyButton.id = "unreadyButton";
    unreadyButton.appendChild(t);
    unreadyButton.onclick = function() {
      unReady(playerNickname);  
    };
    form.appendChild(unreadyButton);
    console.log(p1ReadyStatus);
    console.log(p2ReadyStatus);
    
    if(player1 != null && player2 != null) {
        if((playerNickname == player1.innerHTML.split(" ")[0]) || (playerNickname == player2.innerHTML.split(" ")[0])) {
            if(p1ReadyStatus && p2ReadyStatus) {
                var startGame = document.createElement('BUTTON');
                var text = document.createTextNode("Start Game!");
                startGame.id = "startGame";
                startGame.appendChild(text);
                //startGame.onclick ...
                form.appendChild(startGame);
            }
        }
    }
    
};

var unReady = function(name) {
    var lobbyRoom = document.getElementById("lobbyRoom");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    var unreadyButton = document.getElementById("unreadyButton");
    var form = document.getElementById("nickname");
    var startButton = document.getElementById("startGame");
    
    if(startButton != null) {
        form.removeChild(startButton);
    }
    
    if(player1 != null){
        if(player1.innerHTML == (playerNickname + " " + "Ready")) {
            player1.innerHTML = playerNickname;
            socket.emit('unready', playerNickname);
            p1ReadyStatus = false;
        }
    }
    
    if(player2 != null){
        if(player2.innerHTML == (playerNickname + " " + "Ready")){
            player2.innerHTML = playerNickname;
            socket.emit('unready', playerNickname);
            p2ReadyStatus = false;
        }
    }
    form.removeChild(unreadyButton);
    var readyButton = document.createElement("BUTTON");
    var t = document.createTextNode("Ready!");
    readyButton.id = "readyButton";
    readyButton.appendChild(t);
    readyButton.onclick = function() {
        ready(playerNickname);
    }
    form.appendChild(readyButton);
}

var join = function(name) { 
   // console.log(playerNickname);
    var form = document.getElementById("nickname"); //get form html content
    var lobbyRoom = document.getElementById("lobbyRoom");
    var button = document.getElementById("joinLobby");
    
    if(button!=null){
    form.removeChild(button);
    };
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Leave Lobby");
    var readybtn = document.createElement("BUTTON");
    var t2 = document.createTextNode("Ready!");
    
    btn.appendChild(t);
    btn.id ="leaveLobby";
    
    readybtn.appendChild(t2);
    readybtn.id ="readyButton";
    
    readybtn.onclick = function() {
        ready(playerNickname);
    }
     btn.onclick = function() { 
        leave(playerNickname);
    };
    form.appendChild(btn);
    form.appendChild(readybtn);
    
    socket.emit('updateLobby', name);
};

var leave = function() {
    var form = document.getElementById("nickname"); //get form html content
    var button = document.getElementById("leaveLobby");
    var readyButton = document.getElementById("readyButton");
    var unreadyButton = document.getElementById("unreadyButton");
    form.removeChild(button);
    if(readyButton != null) {
    form.removeChild(readyButton);
    }
    if(unreadyButton != null) {
    form.removeChild(unreadyButton);
    }
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("Join Lobby");
    btn.appendChild(t);
    btn.id = "joinLobby";
    btn.onclick = function() { 
        join(playerNickname);
    };
    //btn.addEventListener('click', join(playerNickname));
    form.appendChild(btn);
    socket.emit('leaveLobby');
    //socket.emit('unready', playerNickname);
}


socket.on('readyComplete', function(readyStatus) {
    var form = document.getElementById("nickname");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    //console.log(player1.innerHTML);
    //console.log(readyStatus);
    //console.log("HIT2");
    
    var startButton = document.getElementById("startGame");
    
    if(startButton != null) {
        form.removeChild(startButton);
    }
    
    if(player1 != null){
        var p1 = player1.innerHTML.split(" ")[0];
        if(p1 == readyStatus[p1].name) {
            if(readyStatus[p1].ready == true){
                player1.innerHTML = readyStatus[p1].name + " " + "Ready";
                p1ReadyStatus = true;
            }
        }
    }
    
    if(player2 != null){
        var p2 = player2.innerHTML.split(" ")[0];
        if(p2 == readyStatus[p2].name) {
            if(readyStatus[p2].ready == true) {
                player2.innerHTML = readyStatus[p2].name + " " + "Ready";
                p2ReadyStatus = true;
           }
        }
    }
    
     if(player1 != null && player2 != null) {
        if((playerNickname == player1.innerHTML.split(" ")[0]) || (playerNickname == player2.innerHTML.split(" ")[0])) {
            if(p1ReadyStatus && p2ReadyStatus) {
                var startGame = document.createElement('BUTTON');
                var text = document.createTextNode("Start Game!");
                startGame.id = "startGame";
                startGame.appendChild(text);
                startGame.onclick = function() {
                    initGame();
                }
                form.appendChild(startGame);
            }
        }
    }
    
});

socket.on('unreadyComplete', function(readyStatus) {
    var form = document.getElementById("nickname");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    var startButton = document.getElementById("startGame");
    
    if(startButton != null) {
        form.removeChild(startButton);
    }
    //console.log(player1.innerHTML.split(" ")[0]);
    //console.log(readyStatus);
    if(player1 != null){
        var p1 = player1.innerHTML.split(" ");
        if(p1[0] == readyStatus[p1[0]].name) {
            if(readyStatus[p1[0]].ready == false) {
                player1.innerHTML = readyStatus[p1[0]].name;
                p1ReadyStatus = false;
            }
        }
    }
    
    if(player2 != null){
        var p2 = player2.innerHTML.split(" ");
        if(p2[0] == readyStatus[p2[0]].name) {
            if(readyStatus[p2[0]].ready == false){
                player2.innerHTML = readyStatus[p2[0]].name;
                p2ReadyStatus = false;
            }
        }
    }
    
});

socket.on('blueplayerinit', function(player) {
   console.log("I am the blue player " + playerNickname); 
    
    var finishTurnButton = document.createElement("BUTTON");
    var textNode = document.createTextNode("End Initialization");
    var form = document.getElementById("nickname");
    finishTurnButton.appendChild(textNode);
    finishTurnButton.id = "blueTurnButton";
    finishTurnButton.onclick = function() {
        endblueturninit();
    }
    form.appendChild(finishTurnButton);
    
    grid["(9,9)"].hasPlayer = true;
    grid["(9,9)"].playerType = "Hunter";
    grid["(9,9)"].playerTeam = "Blue";
    
    grid["(9,8)"].hasPlayer = true;
    grid["(9,8)"].playerType = "Thief";
    grid["(9,8)"].playerTeam = "Blue";
    
    document.getElementById("(9,9)").classList.toggle("hasBlueHunter");
    document.getElementById("(9,8)").classList.toggle("hasBlueThief");
});

var endblueturninit = function() {
    console.log("My blue turn init has ended");
    var bluethiefloc = bluethief.location;
    var bluehunterloc = blueHunter.location;
    var locations = {};
    locations["bluethiefloc"] = bluethiefloc;
    locations["bluehunterloc"] = bluehunterloc;
    locations["init"] = "bluetrue"; 
    socket.emit('finishedInit', locations, playerNickname);
};

socket.on('redplayerinit', function(player) {
    console.log("I am the red player " + playerNickname);
    
    var finishTurnButton = document.createElement("BUTTON");
    var textNode = document.createTextNode("End Initialization");
    var form = document.getElementById("nickname");
    finishTurnButton.appendChild(textNode);
    finishTurnButton.id = "redTurnButton";
    finishTurnButton.onclick = function() {
        endredturninit();
    };
    form.appendChild(finishTurnButton);
    
    grid["(1,1)"].hasPlayer = true;
    grid["(1,1)"].playerType = "Hunter";
    grid["(1,1)"].playerTeam = "Red";
    
    grid["(1,2)"].hasPlayer = true;
    grid["(1,2)"].playerType = "Thief";
    grid["(1,2)"].playerTeam = "Red";
    
    document.getElementById("(1,1)").classList.toggle("hasRedHunter");
    document.getElementById("(1,2)").classList.toggle("hasRedThief");
});

var endredturninit = function() {
    console.log("My blue turn init has ended");
    var redthiefloc = redthief.location;
    var redhunterloc = redHunter.location;
    var mine1, mine2, mine3, mine4, mine5;
    var redthiefdecoy;
    var redhunterdecoy;
    
    var locations = {};
    locations["redthiefloc"] = redthiefloc;
    locations["redhunterloc"] = redhunterloc;
    locations["init"] = "redtrue"; 
    socket.emit('finishedInit', locations, playerNickname);
}

socket.on('waitFinishInit', function() {
    console.log("waiting for other player to finish....."); 
});

socket.on('redPlayerInitLoad', function(locations) {
    console.log(locations);
    console.log("loading red players moves");
    
    redthief.updateLocation(locations['redthiefloc']);
    redHunter.updateLocation(locations['redhunterloc']);
    
    grid[locations['redthiefloc']].hasPlayer = true;
    grid[locations['redthiefloc']].playerType = "Thief";
    grid[locations['redthiefloc']].playerTeam = "Red";
    
    grid[locations['redhunterloc']].hasPlayer = true;
    grid[locations['redhunterloc']].playerType = "Hunter";
    grid[locations['redhunterloc']].playerTeam = "Red";
    
    document.getElementById(locations['redthiefloc']).classList.toggle("hasRedThief");
    document.getElementById(locations['redhunterloc']).classList.toggle("hasRedHunter");
});

socket.on('bluePlayerInitLoad', function(locations) {
    console.log(locations);
    console.log("loading blue players moves...");
    bluethief.updateLocation(locations['bluethiefloc']);
    blueHunter.updateLocation(locations['bluehunterloc']);
    
    grid[locations['bluethiefloc']].hasPlayer = true;
    grid[locations['bluethiefloc']].playerType = "Thief";
    grid[locations['bluethiefloc']].playerTeam = "Blue";
    
    grid[locations['bluehunterloc']].hasPlayer = true;
    grid[locations['bluehunterloc']].playerType = "Hunter";
    grid[locations['bluehunterloc']].playerTeam = "Blue";
    
    document.getElementById(locations['bluethiefloc']).classList.toggle("hasBlueThief");
    document.getElementById(locations['bluehunterloc']).classList.toggle("hasBlueHunter");
});

var initGame = function() {
    console.log("starting game...");
    var player1 = document.getElementById("player1");
    var player2 = document.getElementById("player2");
    player1 = player1.innerHTML.split(" ")[0];
    player2 = player2.innerHTML.split(" ")[0];
    socket.emit('initGame', player1, player2);
    
    /*
    grid["(5,5)"].hasPlayer = true;
    grid["(5,5)"].playerType = "Hunter";
    grid["(5,5)"].playerTeam = "Blue";
    grid["(4,5)"].hasPlayer = true;
    grid["(4,5)"].playerType = "Thief";
    grid["(4,5)"].playerTeam = "Blue";
    grid["(4,4)"].hasPlayer = true;
    grid["(4,4)"].playerType = "Hunter";
    grid["(4,4)"].playerTeam = "Red";
    grid["(5,4)"].hasPlayer = true;
    grid["(5,4)"].playerType = "Thief";
    grid["(5,4)"].playerTeam = "Red";
    
    
    
    document.getElementById("(4,4)").classList.toggle("hasRedHunter");
    document.getElementById("(5,4)").classList.toggle("hasRedThief");
    */
}
//===========================================================================
// AI Methods for computer
//===========================================================================


//===========================================================================
// Calling the createGrid function and checking grid object in console
//===========================================================================

createGrid();


grid["(5,5)"].hasPlayer = true;
grid["(5,5)"].playerType = "Hunter";
grid["(5,5)"].playerTeam = "Blue";
grid["(4,5)"].hasPlayer = true;
grid["(4,5)"].playerType = "Thief";
grid["(4,5)"].playerTeam = "Blue";
grid["(4,4)"].hasPlayer = true;
grid["(4,4)"].playerType = "Hunter";
grid["(4,4)"].playerTeam = "Red";
grid["(5,4)"].hasPlayer = true;
grid["(5,4)"].playerType = "Thief";
grid["(5,4)"].playerTeam = "Red";
grid["(6,5)"].hasPlayer = true;
grid["(6,5)"].playerType = "Underling";
grid["(6,5)"].playerTeam = "Blue";
grid["(6,4)"].hasPlayer = true;
grid["(6,4)"].playerType = "Underling";
grid["(6,4)"].playerTeam = "Red";

document.getElementById("(5,5)").classList.toggle("hasBlueHunter");
document.getElementById("(4,5)").classList.toggle("hasBlueThief");
document.getElementById("(4,4)").classList.toggle("hasRedHunter");
document.getElementById("(5,4)").classList.toggle("hasRedThief");
document.getElementById("(6,4)").classList.toggle("hasRedUnderling");
document.getElementById("(6,5)").classList.toggle("hasBlueUnderling");


var underlingInitialSelect = function(clickedTile) {
     var fish = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+grid[clickedTile].locationY+")");
     if(fish){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
     fish = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+grid[clickedTile].locationY+")");
     if(fish){
     fish.classList.toggle("validU");
     currentValidMoveLocations[currentNumOfValid] = fish.id;
     currentNumOfValid++;
     }
    fish = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+1)+")");
    if(fish){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }  
    fish = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-1)+")");
    if(fish){
    fish.classList.toggle("validU");
    currentValidMoveLocations[currentNumOfValid] = fish.id;
    currentNumOfValid++;
    }        
     
}
var underlingDeselect = function(clickedTile) {
    var fish = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+grid[clickedTile].locationY+")");
    if(fish){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+grid[clickedTile].locationY+")");
    if(fish){
    fish.classList.toggle("validU");
    }
    fish = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+1)+")");
    if(fish){
    fish.classList.toggle("validU");
    }  
    fish = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-1)+")");
    if(fish){
    fish.classList.toggle("validU");
    }        
     
     }

var hunterInitialSelect = function(clickedTile) {
    var cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 2)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 2)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+2)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-2)+")");
            if(cat){
            cat.classList.toggle("validH");
            currentValidMoveLocations[currentNumOfValid] = cat.id;
            currentNumOfValid++;
            }
        }
var thiefInitialSelect = function(clickedTile) {
for(var i=1; i<size; i++){
            var dog = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            } 
            dog = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX - i - 1)+","+(grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX - i - 1)+","+(grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + i + 1)+","+(grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + i + 1)+","+(grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            currentValidMoveLocations[currentNumOfValid] = dog.id;
            currentNumOfValid++;
            }
            }
    
}
var hunterDeselect = function(clickedTile){
    var cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 2)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+(grid[clickedTile].locationX - 2)+","+grid[clickedTile].locationY+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY+2)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-1)+")");
            if(cat){
            cat.classList.toggle("validH");
            }
            cat = document.getElementById("("+grid[clickedTile].locationX+","+(grid[clickedTile].locationY-2)+")");
            if(cat){
            cat.classList.toggle("validH");
            } 
}

var thiefDeselect = function(clickedTile){
    for(var i=1; i<size; i++){
            var dog = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY+i)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            dog = document.getElementById("("+(grid[clickedTile].locationX - 1)+","+(grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + 1)+","+(grid[clickedTile].locationY-i)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX - i - 1)+","+(grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX - i - 1)+","+(grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + i + 1)+","+(grid[clickedTile].locationY+1)+")");
            if(dog){
            dog.classList.toggle("validT");
            }
            dog = document.getElementById("("+(grid[clickedTile].locationX + i + 1)+","+(grid[clickedTile].locationY-1)+")");
            if(dog){
            dog.classList.toggle("validT");
            } 
            }
}

var movementLogic = function() {
    if(grid[this.id].hasPlayer == true){
        if(isSelected == false && grid[this.id].playerType == "Hunter"){ //nothing is selected and you click a hunter
            this.classList.toggle("selectedH");
            hunterInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
            enableHunterToolbox();
        }
        else if (isSelected == false && grid[this.id].playerType == "Thief"){ //nothing is selected and you click a thief
            this.classList.toggle("selectedT");
            thiefInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
        }
        else if (isSelected == false && grid[this.id].playerType == "Underling"){ //nothing is selected and you click a underling
            this.classList.toggle("selectedU");
            underlingInitialSelect(this.id);
            currentSelectedTile = this.id;
            isSelected = true;
        }
        else if(isSelected == true && this.classList.contains("selectedH") && isTrapPlaced != true){ //hunter is selected, click again to disable
            this.classList.toggle("selectedH");
            hunterDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
            disableHunterToolbox();
        }
        else if(isSelected == true && this.classList.contains("selectedT")){ //thief is selected, click again to disable
            this.classList.toggle("selectedT");
            thiefDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
        }   
        else if(isSelected == true && this.classList.contains("selectedU")){ //underling is selected, click again to disable
            this.classList.toggle("selectedU");
            underlingDeselect(this.id);
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].playerType == "Thief"){ //thief making kill
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[this.id].playerTeam+grid[this.id].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Thief";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].playerType == "Hunter" && isTrapPlaced != true){ //hunter making kill
            hunterDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[this.id].playerTeam+grid[this.id].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Hunter";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
            disableHunterToolbox();
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].playerType == "Underling"){ //underling making kill
            underlingDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[this.id].playerTeam+grid[this.id].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Underling";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
        }
           
        }
    if(grid[this.id].hasPlayer == false){ //making moves and mine interaction
        if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && grid[currentSelectedTile].playerType == "Thief"){ //thief making valid move
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Thief";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;
            grid[currentSelectedTile].hasPlayer = false;
            
            if(grid[currentSelectedTile].playerTeam == "Red"){
                redthief.updateLocation(this.id); 
                console.log(redthief.location);
            }
            
            if(grid[currentSelectedTile].playerTeam == "Blue"){
                bluethief.updateLocation(this.id); 
                console.log(bluethief.location);
            }

            
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
            }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && grid[currentSelectedTile].playerType == "Hunter" && isTrapPlaced != true){ //hunter making valid move
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Hunter";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;

            grid[currentSelectedTile].hasPlayer = false;
            
            if(grid[currentSelectedTile].playerTeam == "Red"){
                redHunter.updateLocation(this.id); 
                console.log(redHunter.location);
            }
            
            if(grid[currentSelectedTile].playerTeam == "Blue"){
                blueHunter.updateLocation(this.id); 
                console.log(blueHunter.location);
            }
            hunterDeselect(currentSelectedTile);
    
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
            disableHunterToolbox();
        }  
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && grid[currentSelectedTile].playerType == "Underling"){ //underling making valid move
            grid[this.id].hasPlayer = true;
            grid[this.id].playerType = "Underling";
            grid[this.id].playerTeam = grid[currentSelectedTile].playerTeam;
            grid[currentSelectedTile].hasPlayer = false;
            underlingDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            document.getElementById(this.id).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false;
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].trap == "true"){ //thief hitting enemy mine
            thiefDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedT");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].trap = false;
            grid[this.id].hasPlayer = false;
            grid[this.id].playerType = "null";
            grid[this.id].playerTeam = "null";
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].trap == "true"){ //hunter hitting enemy mine
            hunterDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedH");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].trap = false;
            grid[this.id].hasPlayer = false;
            grid[this.id].playerType = "null";
            grid[this.id].playerTeam = "null";
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
            disableHunterToolbox();
        }
        else if(isSelected == true && (currentValidMoveLocations.indexOf(this.id) > -1) && (grid[this.id].playerTeam != grid[currentSelectedTile].playerTeam) && grid[currentSelectedTile].trap == "true"){ //underling hitting enemy mine
            underlingDeselect(currentSelectedTile);
            document.getElementById(currentSelectedTile).classList.toggle("selectedU");
            document.getElementById(currentSelectedTile).classList.toggle("has"+grid[currentSelectedTile].playerTeam+grid[currentSelectedTile].playerType);
            grid[this.id].trap = false;
            grid[this.id].hasPlayer = false;
            grid[this.id].playerType = "null";
            grid[this.id].playerTeam = "null";
            grid[currentSelectedTile].playerTeam = null;
            grid[currentSelectedTile].playerType = null;
            grid[currentSelectedTile].hasPlayer = false;
            currentValidMoveLocations = [];
            currentNumOfValid = 0;
            currentSelectedTile = null;
            isSelected = false; 
        }   
        } 
};

var allowDrop = function(ev) {
    ev.preventDefault();
}

var drag = function(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

var placeMineInGrid = function(ev) {
    ev.preventDefault();
    if(isTrapPlaced == true){
        grid[lastTrap].trap = false;
        grid[lastTrap].playerTeam = "null";
        grid[ev.target.id].trap = true;
        grid[ev.target.id].playerTeam = whoseTurn;
        lastTrap = ev.target.id;
        data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        isTrapPlaced = false;
    }
    else
    lastTrap = ev.target.id;
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    grid[ev.target.id].trap = true;
    grid[ev.target.id].playerTeam = whoseTurn;
    isTrapPlaced = true;
    document.getElementById("drag1").setAttribute("draggable", "false");
    document.getElementById("drag2").setAttribute("draggable", "false");
    document.getElementById("drag3").setAttribute("draggable", "false");
    document.getElementById(data).setAttribute("draggable", "true");
    
}
var placeMineInToolbox = function(ev) {
    ev.preventDefault();
    grid[lastTrap].trap = false;
    grid[lastTrap].playerTeam = "null";
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    isTrapPlaced=false;
    lastTrap = null;
    document.getElementById("drag1").setAttribute("draggable", "true");
    document.getElementById("drag2").setAttribute("draggable", "true");
    document.getElementById("drag3").setAttribute("draggable", "true");
    
}

var disableHunterToolbox = function(){
            document.getElementById("gameContent").setAttribute("ondrop", "null"); 
            document.getElementById("gameContent").setAttribute("ondragover", "null"); 
            document.getElementById("toolbox").setAttribute("ondrop", "null"); 
            document.getElementById("toolbox").setAttribute("ondragover", "null"); 
            document.getElementById("toolbox").style.visibility = "hidden";
}
var enableHunterToolbox = function(){
            document.getElementById("gameContent").setAttribute("ondrop", "placeMineInGrid(event)"); 
            document.getElementById("gameContent").setAttribute("ondragover", "allowDrop(event)"); 
            document.getElementById("toolbox").setAttribute("ondrop", "placeMineInToolbox(event)"); 
            document.getElementById("toolbox").setAttribute("ondragover", "allowDrop(event)"); 
            document.getElementById("toolbox").style.visibility = "visible";
}

var cellClickListeners = function() {
     for(var i =0; i< size; i++) {
        for(var j=0; j<size; j++) {
            var div = document.getElementById("("+ i +","+j+")").addEventListener("click",movementLogic);
}}};

cellClickListeners();
