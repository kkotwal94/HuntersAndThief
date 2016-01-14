var grid = {};
var size = 20;
var $table = document.createElement('table');
var $gameDiv = document.getElementById('gameContent'); 
$table.id = "gameGrid";
var createGrid = function() {
    for(var i =0; i< size; i++) {
        var $tr = document.createElement('tr'); //create a new table row
        $tr.id = "row: " + i; //give the id row: 0 ... 1 .. 2
        $table.appendChild($tr); //append the row to our table
        for(var j=0; j<size; i++) {
            var newObj={locationY: i, locationX: j, trap: null, gold: null}; //create a new key/dictionary value for each cell/tile in our table into our grid obj, which will keep track of what exists in each cell
            var pos = "(" + j + "," + i + ")"; //gives us our position for these cells as a coordinate
            grid.pos = newObj; //in our grid object, we'll have another object within it named the location such as grid { (0,1): {locationX: 0, locationY:0 .... } (0,2) : ... }
            var $td = document.createElement('td'); //create our cell element
            $td.id = pos; //set the cell id to the position, i.e (0,0) being the first cell
            $tr.appendChild($td); //append cell to table row
        }
    }
    $gameDiv.appendChild($table); //Append our table to our gamediv
}

createGrid();
console.log(grid);