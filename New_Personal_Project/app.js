const grid = document.querySelector('.grid');
const scoreBoard = document.querySelector('.scoreBoard');
const width = 20;
const height = width;
const cellCount = width * height;
let playerPosit = cellCount - width / 2; //bottom screen, middle;
let enemyPosit = 1;
let cells = [];
let currentLevel = 1;
let playerOneScore = 0; //keeps track of his score
// let playerCurrentDamage = 10; //player damage per hit of 1 laser
let playerCurrentHealth = 10; //player outstanding health points
let playerLaserLoc = playerPosit;
let nextLaserLoc = playerLaserLoc - width;
let lasersPositionsArray = [];
let aliensPosArray1 = [];
let aliensPosArray2 = [];
let aliensPosArray3 = [];
let alienBombPosArray = [];
scoreBoard.innerHTML = playerOneScore;
let gameOver = 0;




function damagePlayer() {
  for (let i = 0; i < cellCount ; i++) {
  if (cells[i].classList.contains('alienBomb') && cells[i].classList.contains('playerShip')) {
    cells[i].classList.remove('playerShip');
    playerCurrentHealth = 0;
    gameOver = 1;
    gameScoreOnGO();
  }}}


function damageAlien() {
  for (let i = 0; i < cellCount ; i++) {
  if (cells[i].classList.contains('alienShip') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip');
    let result1 = aliensPosArray1.indexOf(i);
    aliensPosArray1.splice(result1, 1);
    playerOneScore ++;
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
} else if (cells[i].classList.contains('alienShip2') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip2');
    let result2 = aliensPosArray2.indexOf(i);
    aliensPosArray2.splice(result2, 1);
    playerOneScore ++;
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
} else if (cells[i].classList.contains('alienShip3') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip3');
    let result3 = aliensPosArray3.indexOf(i);
    aliensPosArray3.splice(result3, 1);
    playerOneScore ++;
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
}}}

function makeGrid() { // make grid map
  for (let i = 0; i < (cellCount); i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell); //add divs in html under div.grid
    cells.push(cell); //push div cells into cells array
  }}

function createAliens() { //create all the aliens
  for (let i = 0; i < 5 ; i++) { //add aliens
    cells[cellCount * (i + 10) /100].classList.add('alienShip'); //creates 1st set of aliens
    aliensPosArray1.push(cellCount * (i + 10) /100);
    cells[cellCount * (i + 20) /100].classList.add('alienShip2'); //creates 2nd set of aliens
    aliensPosArray2.push(cellCount * (i + 20) /100);
    cells[cellCount * (i + 30) /100].classList.add('alienShip3'); // creates 3rd set of aliens
    aliensPosArray3.push(cellCount * (i + 30) /100);
  }}

function moveAliensRight() {  //move Aliens right 1 space
  for (let i = 0; i < aliensPosArray1.length; i++){
    cells[aliensPosArray1[i]].classList.remove('alienShip');
    aliensPosArray1[i] ++;
    cells[aliensPosArray1[i]].classList.add('alienShip');
  }
  for (let i = 0; i < aliensPosArray2.length; i++){
  cells[aliensPosArray2[i]].classList.remove('alienShip2');
  aliensPosArray2[i] ++;
  cells[aliensPosArray2[i]].classList.add('alienShip2');
  }
  for (let i = 0; i < aliensPosArray3.length; i++){
  cells[aliensPosArray3[i]].classList.remove('alienShip3');
  aliensPosArray3[i] ++;
  cells[aliensPosArray3[i]].classList.add('alienShip3');
  }}

function moveAliensLeft() {   //move Aliens Left 1 space

    for (let i = 0; i < aliensPosArray1.length; i++){ //for line 1 use array1.length
      cells[aliensPosArray1[i]].classList.remove('alienShip');
      aliensPosArray1[i] --;
      cells[aliensPosArray1[i]].classList.add('alienShip');
    }
    for (let i = 0; i < aliensPosArray2.length; i++){ //for line 2 use array2.length
    cells[aliensPosArray2[i]].classList.remove('alienShip2');
    aliensPosArray2[i] --;
    cells[aliensPosArray2[i]].classList.add('alienShip2');
    }
    for (let i = 0; i < aliensPosArray3.length; i++){ //for line 3 use array3.length
    cells[aliensPosArray3[i]].classList.remove('alienShip3');
    aliensPosArray3[i] --;
    cells[aliensPosArray3[i]].classList.add('alienShip3');
    }}

function moveFourRight() {        //move aliens right 3 times every 600 miliseconds
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3 && playerCurrentHealth > 0) {
    moveAliensRight();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
      moveFourLeft(); //alternate with move left
     }
}, 600)}

function moveFourLeft() {         //move aliens left 3 times every 600 miliseconds
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3 && playerCurrentHealth > 0) {
    moveAliensLeft();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
      moveFourRight(); //alternate with move right
     }
}, 600)}

function moveAliensDown() {           //moves aliens donwwards
  for (let i = 0; i < aliensPosArray1.length; i++){ //for line 1 use array1.length
    cells[aliensPosArray1[i]].classList.remove('alienShip');
    aliensPosArray1[i] += width;
    cells[aliensPosArray1[i]].classList.add('alienShip');
  }
  for (let i = 0; i < aliensPosArray2.length; i++){ //for line 2 use array2.length
  cells[aliensPosArray2[i]].classList.remove('alienShip2');
  aliensPosArray2[i] += width;
  cells[aliensPosArray2[i]].classList.add('alienShip2');
  }
  for (let i = 0; i < aliensPosArray3.length; i++){ //for line 3 use array3.length
  cells[aliensPosArray3[i]].classList.remove('alienShip3');
  aliensPosArray3[i] += width;
  cells[aliensPosArray3[i]].classList.add('alienShip3');
  }}
  
function moveallthewayDown() { // move aliens down
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 8 && playerCurrentHealth > 0) {         //# times + stops if player is dead
      moveAliensDown();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
     }
}, 3600)}                  //how often

function addPlayerShip() {       
  if (playerCurrentHealth > 0) {                 //place playership
  cells[playerPosit].classList.add('playerShip') ;
}}

function removePlayerShip() {                      // remove playership
cells[playerPosit].classList.remove('playerShip');
}
function removeAlienShip(z) {                      //remove playership
  cells[z].classList.remove('alienShip');
}
function createLaser(x) {                      
    cells[x].classList.add('playerLaser');
}
function removeLaser(x) {                      //removing lasers
    cells[x].classList.remove('playerLaser');
}
function createBomb(h) {                       //creating bomb
    if (playerCurrentHealth > 0 && h < 400) { 
    cells[h].classList.add('alienBomb');
}}
function removeBomb(h) {                      //removing bomb
      cells[h].classList.remove('alienBomb');
}
function newLaserInit() {                 //initiates new laser 
  let initialPos = playerPosit - width;
  lasersPositionsArray.push(initialPos);
  createLaser(initialPos);
}
function newBombInit() {              //initiates new bomb 
  let randomAlienNum = 0;
  let allAliens = aliensPosArray1.concat(aliensPosArray2,aliensPosArray3);//alien arrays together
  console.log(allAliens.length);
  allAliens.length > 1 ? randomAlienNum = Math.floor((Math.random() * allAliens.length) + 1) : randomAlienNum = 1; //randomize an alien number
  let randomAlien = allAliens[randomAlienNum];
  let initialBombPos = randomAlien + width; //determine bomb position 
  if (initialBombPos < 400) { //experiment
  alienBombPosArray.push(initialBombPos);
  createBomb(initialBombPos);
}}

let moveLasers = setInterval(() => { //move all lasers or delete them if flying offscreen
  for (let i = 0; i < lasersPositionsArray.length; i++){
    removeLaser(lasersPositionsArray[i]); //initial laser remove
    if(lasersPositionsArray[i] - width < 0 ) {
      removeLaser(lasersPositionsArray[i]);
    } else if (playerCurrentHealth > 0) { // if player is alive 
      lasersPositionsArray[i] -= width;   //new laser position
      createLaser(lasersPositionsArray[i]); //create new laser at the position
    }
    damageAlien(); // make sure if laser lands on alien to damage/kill alien
  }}, 150);

  let moveBombs = setInterval(() => { //move all bombs or delete them if flying offscreen
  let allAliens = aliensPosArray1.concat(aliensPosArray2,aliensPosArray3);
    for (let i = 0; i < alienBombPosArray.length; i++){
      damagePlayer(); // make sure if bomb lands on alien to damage/kill player
      removeBomb(alienBombPosArray[i]); //initial bomb remove
      if((alienBombPosArray[i] + width) > (cellCount - 1)) { //if next position will be offscreen => 
        removeBomb(alienBombPosArray[i]); // remove bomb
      } else if (allAliens.length > 0 && playerCurrentHealth > 0){ //if there are still aliens left & player is alive //experimental code
        alienBombPosArray[i] += width;  //updates location of the new bomb
        createBomb(alienBombPosArray[i]); //adds alienBomb class to a cell div with the createBomb function.
      }
    }}, 150);

function dropBombs() { // 
  let dropingBombs = setInterval(() => {
      newBombInit();
    }, 550) }                 //how often

function gameScoreOnGO() {          //displayig score on Game Over
  let allAliens = aliensPosArray1.concat(aliensPosArray2,aliensPosArray3);    
  if (playerOneScore === 15) {
        gameOver = 1;
      }
      if (gameOver === 1 && playerCurrentHealth > 0) {
        window.confirm("Level cleared Player 1! Your score is " + playerOneScore);
        } else if (gameOver === 1 && playerCurrentHealth <= 0) {
          window.confirm("Player 1, you died. Better luck next time. Your score is " + playerOneScore);
        } else if (gameOver === 2) {
          window.confirm("Player 1, you lost. Your planet has been invaded. Better luck next time. Your score is " + playerOneScore);
        }
      }

function gameInit() {            //initiates games basically, calls all initial functions
  makeGrid(); //make grid map
  createAliens(); //create aliens
  addPlayerShip();              //initiates player ship
  moveFourRight(); //alternates with left, moves 3 not 4.
  moveallthewayDown();          //initiates aliens going down
  dropBombs();                //initiates bomb dropping by aliens
}         
let detectSpacePress4Laser = document.addEventListener('keydown', (event) =>{ //spacebar hit detection
  if (event.code === 'Space') {
    newLaserInit();           // new laser initialization
  }})

let playerMove = document.addEventListener('keydown', (event) =>{ //player move around
  removePlayerShip();
      if (event.code === 'ArrowRight' && playerPosit < (cellCount - 1)) { //move right on key left arrow and not going out of screen
        playerPosit += 1;
        playerLaserLoc = playerPosit; //update laser positioning

      } else if(event.code === 'ArrowLeft' && playerPosit > (cellCount - width)) { //move left on key left arrow and not going out of screen
        playerPosit -= 1;
        playerLaserLoc = playerPosit;
      }
  addPlayerShip();
});
gameInit(); //runs game
//game over alert 3 scenarios
