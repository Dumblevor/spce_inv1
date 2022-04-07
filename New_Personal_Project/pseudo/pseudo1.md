 //basic variables
 let currentLevel = 1;
let playerLocation = 0;
 let playerOneScore = 0; //keeps track of his score
 let playerCurrentDamage = 10; //player damage per hit of 1 laser
 let playerCurrentHealth = 10; //player outstanding health points
   let alienLine1 = [
    alienicon1 = /assets/alientype1.png;
    alienhealth1 = 10;
    alienpower1 = 10;
    alienlocation1 = grid[15];
    ];             //healthPoints = 10; powerPoints = 10

   let alienLine2 = [ ]; //healthPoints = 10; powerPoints = 10
   let alienLine3 = [ ]; //healthPoints = 15; powerPoints = 15 // extra health+power - stretch goal 
   let alienLine4 = [ ]; //healthPoints = 15; powerPoints = 15 // extra health+power - stretch goal 

 //? let aliensHealth = [ alien1health, alien2health, etc.];
 let outstandingAliens = // list of aliens that are alive


//display
logo
score
mapGrid
rocks x 3 (stretch) rocks = assets/rock1.png
playerLocation = middle []
place outstandingAliens on grid


 //alien movements and bombs
Aliens  move left right (loop)
 let alienBomb = /assets/alienLaser.png;
Aliens drop bombs (loop)
Alien bomb damages or misses; damage takes health, updates player score DOWN
Aliens move down (loop)

 //player movements and shots
on keystroke< playerLocation -- //moves left
on keystroke> playerLocation ++ //Player moves right
on kestroke space visualise laser [location = player - grid.width] //Player shoots
laserLocation + grid.width every 0.2 sec? {loop} //laser moves
Player laser - damages or mises; damage takes health, updates score UP

 // killingAnAlien
 for alien[i] in outstandingAliens {
  if alienHealth <= 0 => {splice || redux outstandingAliens
  }
 }

 //game over scenarios

  // 1. check if alien touches rock / 'planet surface'
  if (alien location[i] == rock location[i]) {
   game over
  }

  // 2. check if player alive
  if (playerCurrentHealth <= 0) {
   game over
  }

 // 3. check if all aliens dead
  if (outstandingAliens = 0) {
    game over
   }