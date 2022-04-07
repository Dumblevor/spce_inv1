 //basic variables
 let playerOneScore = 0; //keeps track of his score
 let playerCurrentDamage = 10;
 let playerCurrentHealth = 10;
 let currentLevel = 1;
 let alienLine1 = [
  alienicon1 = /assets/alientype1.png;
  alienhealth1 = 10;
  alienpower1 = 10;
  alienlocation1 = grid[15];
  ];             //healthPoints = 10; powerPoints = 10

 let alienLine2 = [ ]; //healthPoints = 10; powerPoints = 10
 let alienLine3 = [ ]; //healthPoints = 15; powerPoints = 15 (stretch)
 let alienLine4 = [ ]; //healthPoints = 15; powerPoints = 15 (stretch)

 //? let aliensHealth = [ alien1health, alien2health, etc.];
 let outstandingAliens = //alive aliens


//display
logo
score
mapGrid
rocks x 3 (stretch) rocks = assets/rock1.png
player flexbottom
place outstandingAliens on grid


 //alien movements and bombs
Aliens  move left right (loop)
 let alienBomb = /assets/alienLaser.png;
Aliens drop bombs (loop)
Alien bomb damages or misses; damage takes health, updates player score DOWN
Aliens move down (loop)

 //player movements and shots
Player moves left
Player moves right
Player shoots
Player laser - damages or mises; damage takes health, updates score UP

 // killingAnAlien
 for alien[i] in outstandingAliens {
  if alienHealth <= 0 => {splice outstandingAliens
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


