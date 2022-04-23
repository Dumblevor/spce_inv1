//! Intro: This game uses minimal HTML and several loops to move things around the map.
//! Loops are broken down into several functions to allow for easy debugging.
//JavaScript 77.2% ; CSS 16.5% ; HTML 6.3%

const grid = document.querySelector('.grid');
const scoreBoard = document.querySelector('.scoreBoard');
const levelNum = document.querySelector('.levelNum');
const playerNameHtml = document.querySelector('.playerName');
const modal = document.getElementById("myModal");
const xClose = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
const modalForm = document.querySelector(".modalform");
const submit = document.querySelector(".submit");
const width = 20;
let currentLevel = 1;
let playerOneScore = 0;                                     //keeps track of player 1 score
let playerCurrentHealth = 1;                                //player outstanding health points
let bombsTiming = 500;
let gameOver = 0;
const height = width;
const cellCount = width * height;
let playerPosit = cellCount - width * 3 / 2;                //bottom screen, middle;
let speedPos = playerPosit + width;
let playerLaserLoc = playerPosit;
let nextLaserLoc = playerLaserLoc - width;
let cells = [];
let lasersPositionsArray = [];
let aliensPosArray1 = [];
let aliensPosArray2 = [];
let aliensPosArray3 = [];
let alienBombPosArray = [];
let rocksPositions = [];
scoreBoard.innerHTML = playerOneScore;

function updateLvlOnStart(x) {
  currentLevel = x;
  levelNum.innerHTML = x;
}

function bombsTimingUpdate(levelX) {
  bombsTiming = bombsTiming * ((100 - (10 * levelX)) / 100); //boosts bombing speed on every level (by lowering the interval)
}

function damagePlayer() {                                         //damage player 
  for (let i = 0; i < cellCount; i++) {
    if (cells[i].classList.contains('alienBomb') && cells[i].classList.contains('playerShip')) {
      cells[i].classList.remove('playerShip');
      playerCurrentHealth -= 1;
      playerCurrentHealth == 0 ? gameOver = 1 : gameOver = 0;
      gameScoreOnGO();
    }
  }
}

function damageAlien() {                                            //damage alien invaders
  for (let i = 0; i < cellCount; i++) {
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
  }
}


function makeGrid() {                                                    // make grid map
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell);                                        //add divs in html under div.grid
    cells.push(cell);                                                  //push div cells into cells array
  }
}

function makeButtons() {                                                  // make buttons
  if (localStorage.getItem("level") > 1) {
    gameInit();
  } else {
    const button1 = document.createElement("button");
    button1.classList.add('button');
    button1.innerHTML = 'PLAY';
    grid.appendChild(button1);
  }
}

function createRocks() {                                          //create all the rocks
  for (let i = 1; i < 3; i++) {                                      //add rocks
    cells[cellCount - (width * 3 + 7 * i)].classList.add('rocksClass'); //creates 1st set of aliens
    rocksPositions.push(cellCount - (width * 3 + 7 * i));
  }
}


function createAliens(x) {                                                        //create all the aliens
  let z = 4 + x;
  for (let i = 0; i < z; i++) {                                                    //add aliens
    cells[2 + i * 2].classList.add('alienShip');                                  //creates 1st set of aliens
    aliensPosArray1.push(2 + i * 2);
    cells[2 + i * 2 + width].classList.add('alienShip2');                      //creates 2nd set of aliens
    aliensPosArray2.push(2 + i * 2 + width);
    cells[2 + i * 2 + width * 2].classList.add('alienShip3');               // creates 3rd set of aliens
    aliensPosArray3.push(2 + i * 2 + width * 2);
  }
}

function moveAliensRight() {  //move Aliens right 1 space
  for (let i = 0; i < aliensPosArray1.length; i++) {
    cells[aliensPosArray1[i]].classList.remove('alienShip');
    aliensPosArray1[i]++;
    cells[aliensPosArray1[i]].classList.add('alienShip');
  }
  for (let i = 0; i < aliensPosArray2.length; i++) {
    cells[aliensPosArray2[i]].classList.remove('alienShip2');
    aliensPosArray2[i]++;
    cells[aliensPosArray2[i]].classList.add('alienShip2');
  }
  for (let i = 0; i < aliensPosArray3.length; i++) {
    cells[aliensPosArray3[i]].classList.remove('alienShip3');
    aliensPosArray3[i]++;
    cells[aliensPosArray3[i]].classList.add('alienShip3');
  }
}

function moveAliensLeft() {                                                    //move Aliens Left 1 space
  for (let i = 0; i < aliensPosArray1.length; i++) {                           //for line 1 use array1.length
    cells[aliensPosArray1[i]].classList.remove('alienShip');
    aliensPosArray1[i]--;
    cells[aliensPosArray1[i]].classList.add('alienShip');
  }
  for (let i = 0; i < aliensPosArray2.length; i++) {                       //for line 2 use array2.length
    cells[aliensPosArray2[i]].classList.remove('alienShip2');
    aliensPosArray2[i]--;
    cells[aliensPosArray2[i]].classList.add('alienShip2');
  }
  for (let i = 0; i < aliensPosArray3.length; i++) {                       //for line 3 use array3.length
    cells[aliensPosArray3[i]].classList.remove('alienShip3');
    aliensPosArray3[i]--;
    cells[aliensPosArray3[i]].classList.add('alienShip3');
  }
}

function moveFourRight() {                                                 //move aliens right 3 times every 500 miliseconds
  let movement = 0;
  let moveAliens = setInterval(() => {
    if (movement < 4 && playerCurrentHealth > 0) {
      moveAliensRight();
      movement++;
    } else {
      clearInterval(moveAliens);
      checkRocks();
      gameScoreOnGO();
      moveFourLeft();                                                         //alternate with move left
    }
  }, 500)
}



function moveFourLeft() {                                                     //move aliens left 3 times every 500 miliseconds
  let movement1 = 0;
  let moveAliens = setInterval(() => {
    if (movement1 < 4 && playerCurrentHealth > 0) {
      moveAliensLeft();
      movement1++;
    } else {
      clearInterval(moveAliens);
      moveFourRight();                                                        //alternate with move right
      moveAliensDown();
      checkRocks();
      gameScoreOnGO();

    }
  }, 500)
}

function moveAliensDown() {                                                //moves aliens donwwards
  let movemenet = 0;
  if (movemenet < 16 && playerCurrentHealth > 0) {                             //# times + stops if player is dead
    for (let i = 0; i < aliensPosArray1.length; i++) {                         //for line 1 use array1.length
      cells[aliensPosArray1[i]].classList.remove('alienShip');
      aliensPosArray1[i] += width;
      cells[aliensPosArray1[i]].classList.add('alienShip');
    }
    for (let i = 0; i < aliensPosArray2.length; i++) {                       //for line 2 use array2.length
      cells[aliensPosArray2[i]].classList.remove('alienShip2');
      aliensPosArray2[i] += width;
      cells[aliensPosArray2[i]].classList.add('alienShip2');
    }
    for (let i = 0; i < aliensPosArray3.length; i++) {                             //for line 3 use array3.length
      cells[aliensPosArray3[i]].classList.remove('alienShip3');
      aliensPosArray3[i] += width;
      cells[aliensPosArray3[i]].classList.add('alienShip3');
    }
    movemenet++;
  }
}

function addPlayerShip() {
  if (playerCurrentHealth > 0) {                                        //place playership
    cells[playerPosit].classList.add('playerShip');           // adds playership class to select with CSS
    cells[speedPos].classList.add('speed');                   // adds class to add animation
  }
}

function removePlayerShip() {                                 // remove playership
  cells[playerPosit].classList.remove('playerShip');
  cells[speedPos].classList.remove('speed');                    // adds class to add animation
}

function removeAlienShip(z) {                                       //remove playership
  cells[z].classList.remove('alienShip');
}
function createLaser(x) {
  cells[x].classList.add('playerLaser');
}
function removeLaser(x) {                                        //removing lasers
  cells[x].classList.remove('playerLaser');
}
function createBomb(h) {                                            //creating bomb
  if (playerCurrentHealth > 0 && h < 400) {
    cells[h].classList.add('alienBomb');
  }
}
function removeBomb(h) {                                          //removing bomb
  cells[h].classList.remove('alienBomb');
}
function newLaserInit() {                                       //initiates new laser 
  let initialPos = playerPosit - width;
  lasersPositionsArray.push(initialPos);
  createLaser(initialPos);
}
function newBombInit() {              //initiates new bomb 
  let randomAlienNum = 0;
  let allAliens = aliensPosArray1.concat(aliensPosArray2, aliensPosArray3);                  //alien arrays together
  randomAlienNum = Math.floor((Math.random() * allAliens.length));                   //randomize an alien number
  let randomAlien = allAliens[randomAlienNum];
  let initialBombPos = randomAlien + width; //determine bomb position 
  if (initialBombPos < 400) {                //experiment
    alienBombPosArray.push(initialBombPos);
    createBomb(initialBombPos);
  }
}

function moveLasers() {
  setInterval(() => {                                                       //move all lasers or delete them if flying offscreen
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('playerLaser') && cells[i].classList.contains('rocksClass')) {
        removeLaser(i);
        let result = lasersPositionsArray.indexOf(i);
        lasersPositionsArray.splice(result, 1);
      }
    }

    for (let i = 0; i < lasersPositionsArray.length; i++) {
      removeLaser(lasersPositionsArray[i]); //initial laser remove
      if (lasersPositionsArray[i] - width < 0) {
        removeLaser(lasersPositionsArray[i]);
      } else if (playerCurrentHealth > 0) {                                     // if player is alive 
        lasersPositionsArray[i] -= width;                                     //new laser position
        createLaser(lasersPositionsArray[i]);                             //create new laser at the position
      }
      damageAlien();                                                      // make sure if laser lands on alien to damage/kill alien
    }
  }, 170);
}

function moveBombs() {
  setInterval(() => {                                                 //move all bombs or delete them if flying offscreen
    let allAliens = aliensPosArray1.concat(aliensPosArray2, aliensPosArray3);
    for (let i = 0; i < cellCount; i++) {
      if (cells[i].classList.contains('rocksClass') && cells[i].classList.contains('alienBomb')) {
        removeBomb(i);                                                // remove bomb if it hits rock
        let result = alienBombPosArray.indexOf(i);
        alienBombPosArray.splice(result, 1);
      }
    }
    for (let i = 0; i < alienBombPosArray.length; i++) {
      damagePlayer();                                         // make sure if bomb lands on alien to damage/kill player
      removeBomb(alienBombPosArray[i]);                          //initial bomb remove
      if ((alienBombPosArray[i] + width) > (cellCount - 1)) { //if next position will be offscreen => 
        removeBomb(alienBombPosArray[i]);                     // remove bomb
      } else if (allAliens.length > 0 && playerCurrentHealth > 0) { //if there are still aliens left & player is alive //experimental code
        alienBombPosArray[i] += width;                           //updates location of the new bomb
        createBomb(alienBombPosArray[i]);                      //adds alienBomb class to a cell div with the createBomb function.
      }
    }
  }, 170);
}

function dropBombs(bombsTiming) {                          //time loop that drops bombs from aliens
  let dropingBombs = setInterval(() => {
    newBombInit();                //initiate a new bomb
  }, bombsTiming)
}                                     //how often

function levelChange(x) {                                    //change level and restart game
  x++;                                 //for each level change +1
  localStorage.setItem("level", x);     //saves the level number
  localStorage.setItem("bombs", x);     //saves the player name
  location.reload();                    //reloads the game
}

function resetFun() {
  localStorage.setItem("level", 1);
  localStorage.setItem("bombs", 500);
  location.reload();
}

function checkRocks() {
  for (let i = 0; i < cellCount; i++) {
    if ((cells[i].classList.contains('alienShip') && cells[i].classList.contains('rocksClass'))
      || (cells[i].classList.contains('alienShip2') && cells[i].classList.contains('rocksClass'))
      || (cells[i].classList.contains('alienShip3') && cells[i].classList.contains('rocksClass'))) {
      gameOver = 2;
      console.log('no?');
    }
  }
}

function gameScoreOnGO() {                                       //displayig score on Game Over
  let allAliens = aliensPosArray1.concat(aliensPosArray2, aliensPosArray3);
  if (allAliens == 0) {
    gameOver = 1;
  }
  if (gameOver === 1 && playerCurrentHealth > 0) {

    modal.style.display = "block";                            // show modal
    let nxtLvlBut = document.createElement("button");         //create button
    nxtLvlBut.classList.add('submit');                        //add class to button for CSS 
    nxtLvlBut.innerHTML = "PLAY NEXT LEVEL";                  //gives instructions to player what's going to happen if they press the button
    nxtLvlBut.onclick = function () {                          //button funtion
      nxtLvlBut.remove();                                   //remove button
      modal.style.display = "none";                           // close modal
      levelChange(currentLevel);                          //update level +1 and run game
    }
    document.querySelector(".modal-content").innerHTML = "Level cleared, " + playerNameHtml.innerHTML + "! Your score is " + playerOneScore + "!"; //displayed text on win 
    document.querySelector(".modal-content").appendChild(nxtLvlBut); //button element being added to the modal
  } else if (gameOver === 1 && playerCurrentHealth <= 0) {
    modal.style.display = "block"; // show modal
    let nxtLvlBut = document.createElement("button"); //create button
    nxtLvlBut.classList.add('submit');              //add class to button for CSS 
    nxtLvlBut.innerHTML = "PLAY AGAIN";             //gives instructions to player what's going to happen if they press the button
    nxtLvlBut.onclick = function () {                //button funtion
      nxtLvlBut.remove();                           //remove button
      modal.style.display = "none";                  // close modal
      resetFun();                                   //restarts game from level 1
    }
    document.querySelector(".modal-content").innerHTML = playerNameHtml.innerHTML + ", your ship was destroyed. Better luck next time. Your score is " + playerOneScore + "<br><br>"; //displayed text on win 
    document.querySelector(".modal-content").appendChild(nxtLvlBut); //button element being added to the modal
  }
  if (gameOver === 2) {
    modal.style.display = "block";                                 // show modal
    let nxtLvlBut = document.createElement("button");           //create button
    nxtLvlBut.classList.add('submit');                          //add class to button for CSS 
    nxtLvlBut.innerHTML = "PLAY AGAIN";                         //gives instructions to player what's going to happen if they press the button
    nxtLvlBut.onclick = function () {                            //button funtion
      nxtLvlBut.remove();                                       //remove button
      modal.style.display = "none";                              // close modal
      resetFun();                                               //restarts game from level 1
    }
    document.querySelector(".modal-content").innerHTML = playerNameHtml.innerHTML + ", you lost. Your planet has been invaded. Better luck next time. Your score is " + playerOneScore + "<br><br>"; //displayed text on win 
    document.querySelector(".modal-content").appendChild(nxtLvlBut); //button element being added to the modal
  }
}

function addEventListeners() {
  let detectSpacePress4Laser = document.addEventListener('keydown', (event) => { //spacebar hit detection
    event.preventDefault();
    if (event.code === 'Space') {
      newLaserInit();                                                           // new laser initialization
    }
  })

  let detectEnterPress = document.addEventListener('keydown', (event) => { //spacebar hit detection
    event.preventDefault();
    if (event.code === 'Enter') {

      document.createElement("button").remove();                                   //remove button
      modal.style.display = "none";                           // close modal
      levelChange(currentLevel);                          //update level +1 and run game
    }
  })

  let playerMove = document.addEventListener('keydown', (event) => {               //player move around
    removePlayerShip();                                                             //remove player ship + speed animation
    if (event.code === 'ArrowRight' && playerPosit < (cellCount - width - 1)) { //move right on key left arrow and not going out of screen
      playerPosit += 1;
      playerLaserLoc = playerPosit;                                           //update laser positioning
    } else if (event.code === 'ArrowLeft' && playerPosit > (cellCount - width * 2)) { //move left on key left arrow and not going out of screen
      playerPosit -= 1;
      playerLaserLoc = playerPosit;
    }
    speedPos = playerPosit + width;                                           //updates player ship animation
    addPlayerShip();                                                          //
  });
}

function gameInit() {                                                    //initiates games basically, calls all initial functions
  if (localStorage.getItem("level") != null) {
    updateLvlOnStart(localStorage.getItem("level"),);
  }                //update level from local storage
  playerNameHtml.innerHTML = localStorage.getItem("playerName");    //update name from local storage
  makeGrid();
  bombsTimingUpdate(Number(currentLevel));                           // update bombs timing to level
  moveLasers();
  moveBombs();
  createRocks();
  addPlayerShip();                                                       //initiates player ship
  createAliens(Number(currentLevel));                                 //create aliens dependent on level
  moveFourRight();                                                     //alternates with left, moves 3 not 4.
  dropBombs(bombsTiming);                                               //initiates bomb dropping by aliens
  addEventListeners();
  grid.style.cursor = 'none';                                       //!hide cursor when game starts
}

makeButtons();
let button1 = document.querySelector('.button1');

modalForm.onsubmit = function () {                                          // When the user submits, close the modal, set name, start game
  playerNameHtml.innerHTML = document.forms["playerOneForm"]["pname"].value;
  localStorage.setItem("playerName", playerNameHtml.innerHTML);
  modal.style.display = "none";                                               // close modal
  gameInit();                                                               //start game
  return false;
}

window.onclick = function (event) {                                              // When the user clicks anywhere outside of the modal, close it
  if (event.target == modal) {
    playerNameHtml.innerHTML = document.forms["playerOneForm"]["pname"].value;
    localStorage.setItem("playerName", playerNameHtml.innerHTML);
    modal.style.display = "none";                                                 // close modal
    gameInit();                                                           //start game
  }
}

button1.onclick = function () {                                    //when player clicks the button to start the game 
  modal.style.display = "block";                                          // show modal that enquires the player name and saves it
  button1.remove();                                                 //remove button 
}

