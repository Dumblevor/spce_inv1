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
let laserPositionsArray = [];
let aliensPosArray1 = [];
let aliensPosArray2 = [];
let aliensPosArray3 = [];

function makeGrid() { // make grid map
  for (let i = 0; i < (cellCount); i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell); //add divs in html under div.grid
    cells.push(cell); //push div cells into cells array
    cell.innerHTML = i; //cells innerhtml is their index
  }
}
makeGrid(); //make grid map
cells[playerPosit].classList.add('playerShip'); // add player ship on map

for (let i = 0; i < 5 ; i++) { //add aliens
  cells[cellCount * (i + 10) /100].classList.add('alienShip'); //creates 1st set of aliens
  aliensPosArray1.push(cellCount * (i + 10) /100);
  cells[cellCount * (i + 20) /100].classList.add('alienShip2'); //creates 2nd set of aliens
  aliensPosArray2.push(cellCount * (i + 20) /100);
  cells[cellCount * (i + 30) /100].classList.add('alienShip3'); // creates 3rd set of aliens
  aliensPosArray3.push(cellCount * (i + 30) /100);
}
function moveAliensRight() {
  for (let i = 0; i < 5; i++){
    cells[aliensPosArray1[i]].classList.remove('alienShip');
    aliensPosArray1[i] ++;
    cells[aliensPosArray1[i]].classList.add('alienShip');
  
    cells[aliensPosArray2[i]].classList.remove('alienShip2');
    aliensPosArray2[i] ++;
    cells[aliensPosArray2[i]].classList.add('alienShip2');
  
    cells[aliensPosArray3[i]].classList.remove('alienShip3');
    aliensPosArray3[i] ++;
    cells[aliensPosArray3[i]].classList.add('alienShip3');
   }
  }
function moveAliensLeft() {
    for (let i = 0; i < 5; i++){
      cells[aliensPosArray1[i]].classList.remove('alienShip');
      aliensPosArray1[i] --;
      cells[aliensPosArray1[i]].classList.add('alienShip');
    
      cells[aliensPosArray2[i]].classList.remove('alienShip2');
      aliensPosArray2[i] --;
      cells[aliensPosArray2[i]].classList.add('alienShip2');
    
      cells[aliensPosArray3[i]].classList.remove('alienShip3');
      aliensPosArray3[i] --;
      cells[aliensPosArray3[i]].classList.add('alienShip3');
     }
    }
function moveFourRight() {
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3) {
    moveAliensRight();
    movemenet ++;
     } else {
      clearInterval(moveAliens);
      moveFourLeft(); //alternate with move left
     }
}, 700)
}
function moveFourLeft() {
  let movemenet = 0;
  let moveAliens = setInterval(() => {
    if(movemenet < 3) {
    moveAliensLeft();
    movemenet ++;
    console.log('1');
     } else {
      clearInterval(moveAliens);
      moveFourRight(); //alternate with move right
     }
}, 700)
}

moveFourRight(); //alternates with left, moves 3 not 4.


function addPlayerShip() {                        //place playership
  cells[playerPosit].classList.add('playerShip');
}
function removePlayerShip() {                      //remove playership
cells[playerPosit].classList.remove('playerShip');
}
function removeAlienShip(z) {                      //remove playership
  cells[z].classList.remove('alienShip');
  }


















  
  function addLaser() {                      
    cells[playerLaserLoc].classList.add('playerLaser');

  };

  function removeLaser(x) {                      
    cells[x].classList.remove('playerLaser');

  }

  function playerShootLaser() {      //shoot laser
    let timeLoop1 = setInterval(() => {
      if ((playerLaserLoc - width) > 0) {
      removeLaser(playerLaserLoc); //remove previous laser
      playerLaserLoc -= width; //change position
      addLaser(); //add laser
      
      } else {
        removeLaser(playerLaserLoc);  //dissapears if offscreen
        clearInterval(timeLoop1); //stops this loop
      }  
    }, 300);
  }



function newLaser() {
  let initialPos = playerPosit - width;
  

}

document.addEventListener('keydown', (event) =>{
  if (event.code === 'Space') {
    newLaser()
    //playerShootLaser();
  }})



const moveLasers = setInterval(() =>{ //move all lasers
for (let i = 0; i < laserPositionsArray.length || ; i++){
  laserPositionsArray[i] ++
}}, 1000);


document.addEventListener('keydown', (event) =>{ //player move around
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


// for (let i = 0; i < 18; i++) { //make some alien ships
//   let x = i + 5;
// }


//   for (let i = 0; i < cells.length; i++) {
//     if (cells[i].classList.contains('alienShip') || cells[i].classList.contains('playerLaser')) {
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

