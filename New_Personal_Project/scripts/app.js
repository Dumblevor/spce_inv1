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
let laserNum = 0;


function makeGrid() { // make grid map
  for (let i = 0; i < (cellCount); i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell);
    cells.push(cell);
    cell.innerHTML = i;

  }
}
makeGrid();
cells[playerPosit].classList.add('playerShip');

// cells[i + 5].classList.add('alienShip'); //make some alien ships

function addPlayerShip() {                        //place playership
  cells[playerPosit].classList.add('playerShip');
}
function removePlayerShip() {                      //remove playership
cells[playerPosit].classList.remove('playerShip');
}
function removeAlienShip(z) {                      //remove playership
  cells[z].classList.remove('alienShip');
  }

document.addEventListener('keydown', (event) =>{
  removePlayerShip();
      if (event.code === 'ArrowRight' && playerPosit < cellCount) { //move right on key left arrow and not going out of screen
        playerPosit += 1;
        console.log(event.key);
        console.log(playerPosit);
      } else if (event.code === 'ArrowLeft' || playerPosit > (cellCount - width)) { //move left on key left arrow and not going out of screen
        playerPosit -= 1;
        console.log(event.key);
      }
  addPlayerShip();
});

// for (let i = 0; i < 18; i++) { //make some alien ships
//   let x = i + 5;
// }
function playerShootLaser(laserNum) {      //self-explanatory
    setInterval(() => {
      if ((playerLaserLoc - width) > cellCount) {
      playerLaserLoc -= width; //change position
      cells[playerLaserLoc].classList.add('playerLaser' + laserNum); //add laser
      cells[playerLaserLoc - width].classList.remove('playerLaser' + laserNum); //remove previous laser
      } else {
        cells[playerLaserLoc - width].classList.remove('playerLaser' + laserNum);  //dissapears if offscreen
      }  
    }, 1000);
  }

document.addEventListener('keydown', (event) =>{ //ship shoots laser on spacebar key
  if (event.code === "SpaceBar") {
    console.log(event.key);
    playerShootLaser(event);
  }})


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

