const grid = document.querySelector('.grid');
const scoreBoard = document.querySelector('.scoreBoard');
const levelNum = document.querySelector('.levelNum');
const playerNameHtml = document.querySelector('.playerName');
const width = 20;
const height = width;
const cellCount = width * height;
let playerPosit = cellCount - width * 3 / 2; //bottom screen, middle;
// let speedPos = playerPosit + width;
let cells = [];
let currentLevel = 1;
let playerOneScore = 0; //keeps track of his score
// let playerCurrentDamage = 10; //player damage per hit of 1 laser
let playerCurrentHealth = 1; //player outstanding health points
let playerLaserLoc = playerPosit;
let nextLaserLoc = playerLaserLoc - width;
let lasersPositionsArray = [];
let aliensPosArray1 = [];
let aliensPosArray2 = [];
let aliensPosArray3 = [];
let alienBombPosArray = [];
let rocksPositions = [];
scoreBoard.innerHTML = playerOneScore;
let gameOver = 0;
let bombsTiming = 500;



// function loopSpeedLines(x) {
//   cells[speedPos].classList.remove('speed');
//   speedTest.style.backgroundImage = "";
// let speedTest = document.querySelector(".speed");
// let i = 1;
// if (x = 0) { 
// let speedLoop = setInterval(() => {
//   document.style.backgroundImage = "url('assets/" + i + ".png')";
//   i++;
//   if (i > 10) {
//     i = 1;
//   }
//  }, 150)
// } else {
//   clearInterval();
//   console.log('asdasd');
//   let y = 1;
//   loopSpeedLines(y);
// }
// }

function updateLvlOnStart (x) {
  currentLevel = x;
  levelNum.innerHTML = x;
}
function bombsTimingUpdate (levelX) {  
  bombsTiming = bombsTiming * ((100  - (10 * levelX))/100) ; //boosts bombing speed on every level (by lowering the interval)
}

function damagePlayer() {
  for (let i = 0; i < cellCount ; i++) {
  if (cells[i].classList.contains('alienBomb') && cells[i].classList.contains('playerShip')) {
    cells[i].classList.remove('playerShip');
    playerCurrentHealth -= 1;
    playerCurrentHealth == 0 ? gameOver = 1 : gameOver = 0;
    gameScoreOnGO();
  }
}
}

function damageAlien() {
  for (let i = 0; i < cellCount ; i++) {
  if (cells[i].classList.contains('alienShip') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip');
    let result1 = aliensPosArray1.indexOf(i);
    aliensPosArray1.splice(result1, 1);
    playerOneScore = playerOneScore + Number(currentLevel);
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
} else if (cells[i].classList.contains('alienShip2') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip2');
    let result2 = aliensPosArray2.indexOf(i);
    aliensPosArray2.splice(result2, 1);
    playerOneScore = playerOneScore + Number(currentLevel);
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
} else if (cells[i].classList.contains('alienShip3') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip3');
    let result3 = aliensPosArray3.indexOf(i);
    aliensPosArray3.splice(result3, 1);
    playerOneScore = playerOneScore + Number(currentLevel);
    scoreBoard.innerHTML = playerOneScore;
    removeLaser(i);
    let result = lasersPositionsArray.indexOf(i);
    lasersPositionsArray.splice(result, 1);
    gameScoreOnGO();
} 
}}


function makeGrid() { // make grid map
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell); //add divs in html under div.grid
    cells.push(cell); //push div cells into cells array
  }}

function makeButtons() { // make buttons
if (localStorage.getItem("level") > 1) { 
  gameInit();
} else {
  const button1 = document.createElement("button");
  button1.classList.add('button');
  button1.classList.add('button1');
  button1.innerHTML = 'Play me ';
  grid.appendChild(button1); 
}
}

function createRocks() { //create all the rocks
  for (let i = 1; i <  3; i++) { //add rocks
    cells[cellCount - (width*3 + 7*i)].classList.add('rocksClass'); //creates 1st set of aliens
    rocksPositions.push(cellCount - 5*i);
  }}


function createAliens(x) { //create all the aliens
 let z = 4 + x;
  for (let i = 0; i < z ; i++) { //add aliens
  cells[2 + i * 2].classList.add('alienShip'); //creates 1st set of aliens
  aliensPosArray1.push(2 + i * 2);
  cells[2 + i * 2 + width].classList.add('alienShip2'); //creates 2nd set of aliens
  aliensPosArray2.push(2 + i * 2 + width);
  cells[2 + i * 2 + width * 2].classList.add('alienShip3'); // creates 3rd set of aliens
  aliensPosArray3.push(2 + i * 2 + width * 2);
  }}

  // cells[(4-x) + i * 2].classList.add('alienShip'); //creates 1st set of aliens
  // aliensPosArray1.push((4-x) + i * 2);
  // cells[(4-x) + i * 2 + width].classList.add('alienShip2'); //creates 2nd set of aliens
  // aliensPosArray2.push((4-x) + i * 2 + width);
  // cells[(4-x) + i * 2 + width * 2].classList.add('alienShip3'); // creates 3rd set of aliens
  // aliensPosArray3.push((4-x) + i * 2 + width * 2);


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
  let movement = 0;
  let moveAliens = setInterval(() => {
    if(movement < 4 && playerCurrentHealth > 0) {
    moveAliensRight();
    movement ++;
     } else {
      clearInterval(moveAliens);
      moveFourLeft(); //alternate with move left
     }
}, 500)}

function moveFourLeft() {         //move aliens left 3 times every 600 miliseconds
  let movement1 = 0;
  let moveAliens = setInterval(() => {
    if(movement1 < 4 && playerCurrentHealth > 0) {
    moveAliensLeft();
    movement1 ++;
     } else {
      clearInterval(moveAliens);
      moveFourRight(); //alternate with move right
      moveAliensDown();

     }
}, 500)}

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
    if(movemenet < 18 && playerCurrentHealth > 0) {         //# times + stops if player is dead
      moveAliensDown();
      checkRocks();
      gameScoreOnGO();
    movemenet ++;
     } else {
       gameOver = 1;

     }
}          


function addPlayerShip() {       
  if (playerCurrentHealth > 0) {                 //place playership
  cells[playerPosit].classList.add('playerShip'); // adds playership class to select with CSS
  // cells[speedPos].classList.add('speed'); // adds class to add animation
  // loopSpeedLines(0); // adds loop of speed anmimation
}}

function removePlayerShip() {                      // remove playership
cells[playerPosit].classList.remove('playerShip');
// loopSpeedLines(1);
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
  randomAlienNum = Math.floor((Math.random() * allAliens.length)) //randomize an alien number
  let randomAlien = allAliens[randomAlienNum];
  let initialBombPos = randomAlien + width; //determine bomb position 
  if (initialBombPos < 400) { //experiment
  alienBombPosArray.push(initialBombPos);
  createBomb(initialBombPos);
}}

function moveLasers() {
 setInterval(() => { //move all lasers or delete them if flying offscreen
    for ( let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('playerLaser') && cells[i].classList.contains('rocksClass')) {
        removeLaser(i);
        let result = lasersPositionsArray.indexOf(i);
        lasersPositionsArray.splice(result, 1);
      }
    }

    for (let i = 0; i < lasersPositionsArray.length; i++){
      removeLaser(lasersPositionsArray[i]); //initial laser remove
      if(lasersPositionsArray[i] - width < 0 ) {
        removeLaser(lasersPositionsArray[i]);
      } else if (playerCurrentHealth > 0) { // if player is alive 
        lasersPositionsArray[i] -= width;   //new laser position
        createLaser(lasersPositionsArray[i]); //create new laser at the position
      }
    damageAlien(); // make sure if laser lands on alien to damage/kill alien
  }}, 170);
}

  function moveBombs() {
    setInterval(() => { //move all bombs or delete them if flying offscreen
  let allAliens = aliensPosArray1.concat(aliensPosArray2,aliensPosArray3);
  for (let i = 0; i < cellCount; i++) {
    if (cells[i].classList.contains('rocksClass') && cells[i].classList.contains('alienBomb')) {
      removeBomb(i); // remove bomb if it hits rock
      let result = alienBombPosArray.indexOf(i);
      alienBombPosArray.splice(result, 1);
  } }
    for (let i = 0; i < alienBombPosArray.length; i++){
      damagePlayer(); // make sure if bomb lands on alien to damage/kill player
      removeBomb(alienBombPosArray[i]); //initial bomb remove
      if ((alienBombPosArray[i] + width) > (cellCount - 1)) { //if next position will be offscreen => 
        removeBomb(alienBombPosArray[i]); // remove bomb
    // } else if (allAliens.length > 0 && playerCurrentHealth > 0 && (cells[i].classList.contains('alienShip2') || cells[i].classList.contains('alienShip') || cells[i].classList.contains('alienShip3'))) { //if there are still aliens left & player is alive //experimental code
    //   alienBombPosArray[i] += width * 2;  //updates location of the new bomb
    //   createBomb(alienBombPosArray[i]); //adds alienBomb class to a cell div with the createBomb function.
    } else if (allAliens.length > 0 && playerCurrentHealth > 0){ //if there are still aliens left & player is alive //experimental code
        alienBombPosArray[i] += width;  //updates location of the new bomb
        createBomb(alienBombPosArray[i]); //adds alienBomb class to a cell div with the createBomb function.
      }
    }
}, 170);
  }

function dropBombs(bombsTiming) {           //time loop that drops bombs from aliens
  let dropingBombs = setInterval(() => {
      newBombInit();                //initiate a new bomb
    }, bombsTiming) }                 //how often

function levelChange(x) { //change level and restart game
  x ++;                                 //for each level change +1
  localStorage.setItem("level", x); //saves the level number
  localStorage.setItem("bombs", x); //saves the player name
  location.reload(); //reloads the game
  }

  function resetFun() {
    localStorage.setItem("level", 1);
    localStorage.setItem("bombs", 500);
    location.reload();
  }

  function checkRocks() {
    for (let i = 0; i < cellCount; i++) {
      if ((cells[i].classList.contains('alienShip') && cells[i].classList.contains('rocksClass')) || (cells[i].classList.contains('alienShip2') && cells[i].classList.contains('rocksClass')) || (cells[i].classList.contains('alienShip3') && cells[i].classList.contains('rocksClass')) ) {
        gameOver = 2;
      }
  }
}

function gameScoreOnGO() {          //displayig score on Game Over
  let allAliens = aliensPosArray1.concat(aliensPosArray2,aliensPosArray3);    
  if (allAliens == 0) {
        gameOver = 1;
      }
  if (gameOver === 1 && playerCurrentHealth > 0) {
      window.confirm("Level cleared, " + playerNameHtml.innerHTML + "! Your score is " + playerOneScore) ? levelChange(currentLevel) : resetFun();
  } else if (gameOver === 1 && playerCurrentHealth <= 0) {
      window.confirm(playerNameHtml.innerHTML + ", you died. Better luck next time. Your score is " + playerOneScore) ? resetFun() : resetFun();
        }
  if (gameOver === 2) {
      window.confirm(playerNameHtml.innerHTML + ", you lost. Your planet has been invaded. Better luck next time. Your score is " + playerOneScore) ? resetFun() : resetFun();
    }
          }

function addEventListeners() {
let detectSpacePress4Laser = document.addEventListener('keydown', (event) =>{ //spacebar hit detection
  event.preventDefault();
  if (event.code === 'Space') {
    newLaserInit();           // new laser initialization
  }})

let playerMove = document.addEventListener('keydown', (event) =>{ //player move around
  removePlayerShip(); //remove player ship + speed animation
      if (event.code === 'ArrowRight' && playerPosit < (cellCount - width - 1)) { //move right on key left arrow and not going out of screen
        playerPosit += 1;
        playerLaserLoc = playerPosit; //update laser positioning
      } else if(event.code === 'ArrowLeft' && playerPosit > (cellCount - width*2)) { //move left on key left arrow and not going out of screen
        playerPosit -= 1;
        playerLaserLoc = playerPosit;
      }
      // speedPos = playerPosit + width;
      addPlayerShip(); //
});
}

function gameInit() {            //initiates games basically, calls all initial functions
  if (localStorage.getItem("level") != null) {
    updateLvlOnStart(localStorage.getItem("level"),);
  } //update level from local storage
  playerNameHtml.innerHTML = localStorage.getItem("playerName"); //update name from local storage

  makeGrid();
  bombsTimingUpdate(Number(currentLevel)); // update bombs timing to level
  moveLasers();
  moveBombs();
  createRocks();
  addPlayerShip();              //initiates player ship
  createAliens(Number(currentLevel));               //create aliens dependent on level
  moveFourRight();            //alternates with left, moves 3 not 4.
  dropBombs(bombsTiming);                //initiates bomb dropping by aliens
  addEventListeners();
}   

//custom prompt screen
//scoreboard

makeButtons();
let button1 = document.querySelector('.button1');

button1.onclick = function() {
  
  playerNameHtml.innerHTML = window.prompt('What is your name, player?', 'Player 1'); //updates player name from prompt
  localStorage.setItem("playerName", playerNameHtml.innerHTML);
  gameInit();
  button1.remove();
}

