const grid = document.querySelector('.grid');
const width = 20;
const height = width;
const cellCount = width * height;
let playerPosit = cellCount - width / 2; //bottom screen, middle;
let enemyPosit = 1;
let cells = [];
let currentLevel = 1;
let playerOneScore = 0; //keeps track of his score
let playerCurrentDamage = 10; //player damage per hit of 1 laser
let playerCurrentHealth = 10; //player outstanding health points
let playerLaserLoc = playerPosit;
let nextLaserLoc = playerLaserLoc - width;
let lasersPositionsArray = [];
let aliensPosArray1 = [];
let aliensPosArray2 = [];
let aliensPosArray3 = [];
let alienBombPosArray = [];
const scoreBoard = document.getElementsByClassName('scoreBoard');
scoreBoard.Tz

function damageAlien() {
  for (let i = 0; i < cellCount ; i++) {
  if (cells[i].classList.contains('alienShip') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip');
    let result1 = aliensPosArray1.indexOf(i);
    aliensPosArray1.splice(result1, 1);
    playerOneScore ++;
} else if (cells[i].classList.contains('alienShip2') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip2');
    let result2 = aliensPosArray2.indexOf(i);
    aliensPosArray2.splice(result2, 1);
    playerOneScore ++;
} else if (cells[i].classList.contains('alienShip3') && cells[i].classList.contains('playerLaser')) {
    cells[i].classList.remove('alienShip3');
    let result3 = aliensPosArray3.indexOf(i);
    aliensPosArray3.splice(result3, 1);
    playerOneScore ++;
}
}
}
function makeGrid() { // make grid map
  for (let i = 0; i < (cellCount); i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell); //add divs in html under div.grid
    cells.push(cell); //push div cells into cells array
  }
}
function createAliens() { //create all the aliens
  for (let i = 0; i < 5 ; i++) { //add aliens
    cells[cellCount * (i + 10) /100].classList.add('alienShip'); //creates 1st set of aliens
    aliensPosArray1.push(cellCount * (i + 10) /100);
    cells[cellCount * (i + 20) /100].classList.add('alienShip2'); //creates 2nd set of aliens
    aliensPosArray2.push(cellCount * (i + 20) /100);
    cells[cellCount * (i + 30) /100].classList.add('alienShip3'); // creates 3rd set of aliens
    aliensPosArray3.push(cellCount * (i + 30) /100);
  }
}
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
  }

  }
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
    }
    }
function moveFourRight() {        //move aliens right 3 times every 600 miliseconds
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3) {
    moveAliensRight();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
      moveFourLeft(); //alternate with move left
     }
}, 600)
}
function moveFourLeft() {         //move aliens left 3 times every 600 miliseconds
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3) {
    moveAliensLeft();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
      moveFourRight(); //alternate with move right
     }
}, 600)
}
function moveAliensDown() {
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
  }
  }
function moveallthewayDown() { // move aliens down
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 5) {         //# times
      moveAliensDown();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
     }
}, 3600)                  //how often
}
function addPlayerShip() {                        //place playership
  cells[playerPosit].classList.add('playerShip');
}
function removePlayerShip() {                      //remove playership
cells[playerPosit].classList.remove('playerShip');
}
function removeAlienShip(z) {                      //remove playership
  cells[z].classList.remove('alienShip');
  }
  function createLaser(x) {                      
    cells[x].classList.add('playerLaser');
  };
  function removeLaser(x) {                      //removing lasers
    cells[x].classList.remove('playerLaser');
  }

function newLaserInit() {
  let initialPos = playerPosit - width;
  lasersPositionsArray.push(initialPos);
  createLaser(initialPos);
}

//call all the functions
makeGrid(); //make grid map
cells[playerPosit].classList.add('playerShip'); // add player ship on map
createAliens(); //create aliens
moveFourRight(); //alternates with left, moves 3 not 4.
moveallthewayDown();

//event listeners
let detectSpacePress4Laser = document.addEventListener('keydown', (event) =>{
  if (event.code === 'Space') {
    newLaserInit();
    //playerShootLaser();
  }})
const moveLasers = setInterval(() => { //move all lasers or delete them if flying offscreen
for (let i = 0; i < lasersPositionsArray.length; i++){
  damageAlien();
  removeLaser(lasersPositionsArray[i]); //initial laser remove
  if( lasersPositionsArray[i] - width < 0 ) {
    removeLaser(lasersPositionsArray[i]);
  } else {
    lasersPositionsArray[i] -= width;
    createLaser(lasersPositionsArray[i]);
  }  
}}, 150);
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



//       //! damage alien

//       // ! if cell[i] has class player laser and alienship > dissapear laser, lower enemy health, update score up if health <= 0.
//     }
//   }



//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i].classList.contains('playerShip') || cells[i].classList.contains('alienBomb')) {
// //! damage player;
// //! if cell[i] has class playerShip and alienBomb > disapear bomb, lower player health ,update score down, if healt <=0 => game over;
//     playerCurrentHealth -= cells[i].value;
//     cells[i].classList.remove('alienBomb');
//     playerOneScore -= 10; 
// }
//   }

//   //game over scenarios
// if (playerCurrentHealth <= 0) {
//   //!GAME OVER
// }

// on kestroke space visualise laser [location = player - grid.width] //Player shoots

// laserLocation - grid.width every 0.2 sec? {loop} //laser moves
// Player laser - damages or mises; damage takes health, updates score