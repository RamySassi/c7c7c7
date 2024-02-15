class Board extends EventEmitter {
  constructor(board) {
    super();

    this.board = board || [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  getRow(index) {
    return this.board[index];
  }

  updateBoard(newBoard) {
    this.board = newBoard;
  }


  getCol(index) {
    const result = [];
    for (let i = 0; i < this.board.length; i++) {
      result.push(this.board[i][index]);
    }
    return result;
  }


  generateBoard() {
    const hardPuzzle = [
      ["", "", 2, "", "", "", "", "", ""],
      ["", "", 9, "", "", "", "", "", ""],
      ["", 4, "", "", "", "", "", 6, ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", 5, 9, "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      [7, "", "", "", "", "", 4, "", 2],
      ["", 8, "", "", "", "", "", "", ""],
    ]

    this.board = hardPuzzle;
    this.emit("boardGenerated", hardPuzzle);
  }

  clearBoard() {
    const emptyPuzzle = [
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", ""],
    ];
    this.board = emptyPuzzle;
    this.emit("boardcleared", emptyPuzzle);
  }

  getBox(rowIndex, colIndex) {
    const result = [];
    const boxRowStart = rowIndex - (rowIndex % 3);
    const boxColStart = colIndex - (colIndex % 3);

    for (let r = boxRowStart; r < boxRowStart + 3; r++) {
      for (let d = boxColStart; d < boxColStart + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;
  }

  getBoxByIndex(index){
    const result=[]
    const startingRow = Math.floor(index / 3) * 3;
    const startingCol = Math.floor(index % 3) * 3;
    for (let r = startingRow; r < startingRow + 3; r++) {
      for (let d = startingCol; d < startingCol + 3; d++) {
        result.push(this.board[r][d]);
      }
    }
    return result;

  }
/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */

/*=========================================================================
=                 TODO: fill in these Checker Functions                    =
=========================================================================*/

  
rowSafe(row, num) {
  //check if the row contains num
  let rows=this.getRow(row)
// if(rows.includes(num)){
//   return false
// }
// return true
return !rows.includes(num)
}

colSafe(col, num) {
  let cols=this.getCol(col)
  //check if the column contains num
  return !cols.includes(num)
}

boxSafe(row, col, num) {
  let box=this.getBox(row,col)
  //check if the box contains num
  return !box.includes(num)
}

rowValidAt(rowIndex) {
  let row=this.getRow(rowIndex)
  //check if a row is valid at a given index
//  for(var i=0;i<9;i++){
//   for(var j=i+1;j<9;j++){
//     if(row[i]===row[j] && row[i]){
//       return false
//     }
//   }
//  }
//  return true
    
for(var i=0;i<9;i++){
  let element=row[i]
  if(element&&row.lastIndexOf(element)!==i){
    return false
  }
}
return true
}

colValidAt(colIndex) {
  let col=this.getCol(colIndex)
  for(var i=0;i<9;i++){
    let element=col[i]
    if(element&&col.lastIndexOf(element)!==i){
      return false
    }
  }
  return true
  //check if a column is valid at a given index
}

boxValidAt(boxIndex) {
  let box=this.getBoxByIndex(boxIndex)
  for(var i=0;i<9;i++){
    let element=box[i]
    if(element&&box.lastIndexOf(element)!==i){
      return false
    }
  }
  return true
  //check if a box is valid at a given index
}

allRowsValid() {
  for(var i=0;i<9;i++){
    if(!this.rowValidAt(i)){
      return false
    }
  }
  return true
  //check if all the rows in the board are valid
}
allColsValid() 
{
  for(var i=0;i<9;i++){
    if(!this.colValidAt(i)){
      return false
    }
  }
  return true
  //check if all the columns in the board are valid
}
allBoxesValid() {
  for(var i=0;i<9;i++){
    if(!this.boxValidAt(i)){
      return false
    }
  }
  return true
  //check if all the boxes in the board are valid
}

validBoard() {
  return this.allBoxesValid() && this.allColsValid() && this.allRowsValid();
}

isSafe(row, col, num) {
  return  this.rowSafe(row, num) && this.colSafe(col, num) && this.boxSafe(row, col, num);
}
/*=========================================================================
=                 TODO: fill in these Solver Functions                    =
=========================================================================*/

solve() {
    for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (this.board[row][col] === 0) {
    for (var num = 1; num <= 9; num++) {
      if (this.isSafe(row, col, num)) {
 this.board[row][col] = num;
       if (this.solve()) {
 return true}
   this.board[row][col] = 0; 
          }}
        return false; 
          }}}
        return true; 
          
        
      }
  




  solveBoard() {
    while (this.validBoard()) {
      if (this.solve()) {
        this.emit("validBoard", this.board);
        return true
      }
      return false
    }
    this.emit("invalidBoard");
    return false
    // dont forget to add a small change here ;) 
  }
}
