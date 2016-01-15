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

//===========================================================================
// Selectors for making grid and setting its id
//===========================================================================
var $table = document.createElement('table'); //creating table element
var $gameDiv = document.getElementById('gameContent');  //getting gameDiv element
$table.id = "gameGrid"; //setting table id

//!IMPORTANT => WE SHOULD PROBABLY MAKE A HUNTER AND A THIEF A CLASS, SO WE COULD HAVE MULTIPLE CHARACTERS IF WE WANTED TO FOR SOME REASON, LIKE HUNTER AND THIEF PARTY 5, or have multiple games going on

var hero = function(type, nickname, location) {
    this.health = 100;
    this.currentTraps = {};
    this.nickname = nickname;
    this.goldLocation = null;
    this.updateGoldLocation = function() {
        
    }
    
    this.victory = false;
    this.location = location;
    this.type = type; //hunters or thiefs
    this.isTurn = false;
    
    this.setTurn = function() {
        this.isTurn = true;
    }
    
    this.updateHealth = function(x) {
        this.health = x;
    }
    
    this.updateNickName = function(name) {
        this.nickname = name;
    }
    
    this.setGoldLocation = function(x, y) {
        this.goldLocation = "(" + x + "," + y + ")";
    }
    
}
//===========================================================================
// Init Hunter Object
//===========================================================================
var hunter = {health: 100, 
                currentTraps: {}, //will be a object that holds objects named trap + i, where i will be the 1st 2nd 3rd trap
                trapsPlaced: 0,  //traps placed
                isTurn: true,  //if it is his/her turn
                goldLocation: null, //update when goldLocation is set
                victory: null, //win or not
                nickname: null, //if multiplayer set nickname so niggas can watch
                hunterLocation: null,
                type: 'hunter'}; //set location to default value based of size etc, update upon move

//===========================================================================
// Init Thief Object
//===========================================================================
var thief = {health: 100, 
                currentTraps: {}, //will be a object that holds objects named trap + i, where i will be the 1st 2nd 3rd trap
                trapsPlaced: 0,  //traps placed
                isTurn: false,  //if it is his/her turn
                goldLocation: null, //update when goldLocation is set
                thiefLocation: null, //current location of theif
                isGoldObtainable: true, //update every turn, based off whether gold is obtainable or not
                goldObtained: false, //update if gold is obtained;
                nickname: null, //if multiplayer set nickname so niggas can watch and play
                victory: null,
                type: 'thief'} 

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
            var newObj={locationY: i, locationX: j, trap: null, gold: null, hasPlayer: null}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
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

var move = function(player, position) {
    if(player.type == 'thief') {
        if(validateThiefMove(position)) {
            player.thiefLocation = position; //position should be a object like our cells ({x, y})
        }
        //then check if anything is at that location like trap or gold
    }

     if(player.type == 'hunter') {
        if(validateHunterMove(position)) {
            player.hunterLocation = position; //position should be a object like our cells ({x, y})
        }
    }
    //then check if anything is at that location
}

var validateThiefMove = function (position) {
 //Thief movement logic in here maybe
}

var validateHunterMove = function(position) {
 //Hunter movement logic in here maybe
}


//===========================================================================
// Method for setting traps
//===========================================================================

var setHunterTraps = function(position) {
    //do at position, see if that position is empty by checking grid{} object
    //turn is false for hunter after action is complete using drag/drop source/events
}

var setThiefTraps = function(position) {
    //do at position, see if that position is empty by checking grid{} object
    //turn is false for hunter after action is complete using drag/drop source/events
}

//checking gridSpace
var checkGridSpace = function(position) {
    if(Grid[position].trap == true || Grid[position].gold == true || Grid[position].hasPlayer == true) {
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


//===========================================================================
// AI Methods for computer
//===========================================================================


//===========================================================================
// Calling the createGrid function and checking grid object in console
//===========================================================================
hunter.nickname = nickName("hunter"); //ultimately we want users to set their names before playing, inserted this for testing
thief.nickname = nickName("thiefy");
createGrid();
console.log(grid);