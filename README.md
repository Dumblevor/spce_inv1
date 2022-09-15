### ![Invaders 23 by Dimitar Vidolov](https://dumblevor.github.io/spce_inv1/assets/animatedLogo.gif)

# Invaders 23
 
Developed by Dimitar Vidolov.

## Overview

This is the first project of the software engineering immersive course at GA London. The assignment was to create a grid-based game to be rendered in the browser, using HTML, CSS and JavaScript. The project was to be completed **individually** within **6 days** over 3 weeks. 

Given a list of options from GA, I chose to recreate the classic game **Space Invaders**. 

You can [play it here](https://dumblevor.github.io/spce_inv1/).

Preview: ![Invaders-23-Gameplay](./readme-assets/readme_demo.gif)
Controls are clearly visible on the right-hand side and you can toggle playing a catchy tune to go with your gameplay (stretch goal), not to mention the sound effects (stretch goal) and your pointer will disappear while playing (stretch goal).

## Technologies used 

- HTML
- CSS
- JavaScript
- Git and GitHub

## Approach

Space Invaders was one of the more interesting, with several moving parts and it seemed like a worthy challenge. 
Breaking it all down was key, from the 'sign-off' of the project.

Activities are broken down into separate components, hardcoding is kept quite low for the most part.
The grid is generated (by makeGrid()) with a fixed size, elements on the grid are moved by adding and removing classes on the grid with time intervals and I put listeners to detect collisions.
The locations of the elements are all kept in separate arrays.

It was an amazing learning experience form the beginning. Like in most games I started off thinking that aliens and the player should have health points and damage points, but quickly realized that was not the case back in the 90s, it was more of a one shot one kill type of deal. You can see below my thinking in the beginning for power and health, but this was not implemented in the end.
The main concepets to be considered was how to move the aliens around, how and when to restrict movements for both aliens and players.

The main barrier along the way was the debugging.

Whiteboarding it using Miro:
![Invaders-23-Whteboarding](./readme-assets/whiteboard.png)

## Timeline
- Day 1 - Planning & pseudo
- Day 2 - MVP up
- Day 4 - Improving movement, adding infinite levels (stretch 2 goals) and a modal (stretch 2 goal).
- Day 5 - High-value low-effort features added like music, background, animations for explosions and a 'flying' ship. 

### Day 2
Set up the grid, and figured out the spacing, positions and limitations needed for the game to function properly. 
![Invaders-23-day1](./readme-assets/Screen1.png)

### Day 2
MVP done!
![Invaders-23-day2](./readme-assets/Screen2.png)

### Day 4
![Invaders-23-day3](./readme-assets/Screen3.png)

### Day 5
Mostly focused on adding music, sound and visual effects to the game, as well as adding button shortcuts and disappearing cursor on game start, only across the grid of the game though:

```
grid.style.cursor = 'none'; //!hide cursor when game starts
```

## Elements set-up 
None of the elements, e.g. aliens, rocks, player's ship, are hard-coded, but **generated** when needed.

- The grid is generated with a loop via makeGrid(), rocks via createRocks()

```
function makeGrid() { // make grid map
 for (let i = 0; i < cellCount; i++) {
 const cell = document.createElement("div");
 cell.classList.add('cell');
 grid.appendChild(cell); //add divs in html under div.grid
 cells.push(cell); //push div cells into cells array
 }
}
```

- Buttons are generated with makeButtons(), invaders via createAliens()
- Enemy ships move sideways and towards the player via time loops (i.e. time intervals)inside the moveFourRight(), moveFourLeft() and moveAliensDown functions.
- dropBombsinitiates() enemy bombs via newBombInit() which move with a timeloop in moveBombs()
- Player's laser works in the same way, but on hitting the spacebar. This is done via an event listener in addEventListeners()
- Player movement operates in the same way. 

The end of the movement of the aliens to the right starts the movement to the left. 
The Player's lasers and aliens' bombs move with setInterval(s), and new bombs deployment speeds up on level change.
Level changes are stored in local storage.
Variables are grouped at the beginning of the code, followed by all the functions needed, gameInit() starts the game and it is followed by the modal for the player's name input and win screen.
Hitting the enter acts as clicking the button for next level/play again/enter the name which was a last-minute add-on feature. 

## Bits & bobs
- Lasers disappear on collision with aliens, when they reach the end of the screen and when they hit a rock (most of the time, see cheat code below).
- Aliens' bombs disappear on collision with the player and end of the screen.
- Aliens can appear on the opposite end of the screen on higher levels which can be improved. 


## Animations & sound effects

- damagePlayer() visualises an explosion when the player dies.
- The following creates the animation behind the ship to create the illusion that it is moving.
```
.speed {
 background-size: contain;
 background-repeat: no-repeat;
 background-position: center;
 animation: speedMove 1s infinite;
}
```
- I've also added sound effects on shooting a laser and destroying an invader.

## Game Over
Checks if it's time for the game to be over and initiates next steps:

(please see inline comments for details)
```

function gameScoreOnGO() { //displayig score on Game Over
 const allAliens = aliensPosArray1.concat(aliensPosArray2, aliensPosArray3);
 if (allAliens === 0) {
 gameOver = 1;
 }
 if (gameOver === 1 && playerCurrentHealth > 0) {
 modal.style.display = "block"; // show modal
 const nxtLvlBut = document.createElement("button"); //create button
 nxtLvlBut.classList.add('submit'); //add class to button for CSS 
 nxtLvlBut.innerHTML = "PLAY NEXT LEVEL"; //gives instructions to player what's going to happen if they press the button
 nxtLvlBut.onclick = function () { //button function
 nxtLvlBut.remove(); //remove button
 modal.style.display = "none"; // close modal
 levelChange(currentLevel); //update level +1 and run game
 }
 document.querySelector(".modal-content").innerHTML = "Level cleared, " + playerNameHtml.innerHTML + "! Your score is " + playerOneScore + "!"; //displayed text on win 
 document.querySelector(".modal-content").appendChild(nxtLvlBut); //button element being added to the modal
 document.addEventListener('keydown', (event) => {
 if (event.code === 'Enter') {
 nxtLvlBut.click();
 }
 })
 } else if (gameOver === 1 && playerCurrentHealth <= 0) {
 modal.style.display = "block"; // show modal
 const nxtLvlBut = document.createElement("button"); //create button
 nxtLvlBut.classList.add('submit'); //add class to button for CSS 
 nxtLvlBut.innerHTML = "PLAY AGAIN"; //gives instructions to player what's going to happen if they press the button
 nxtLvlBut.onclick = function () { //button function
 nxtLvlBut.remove(); //remove button
 modal.style.display = "none"; // close modal
 resetFun(); //restarts game from level 1
 }
 document.querySelector(".modal-content").innerHTML = playerNameHtml.innerHTML + ", your ship was destroyed. Better luck next time. Your score is " + playerOneScore + ""; // displayed text on win 
 document.querySelector(".modal-content").appendChild(nxtLvlBut); //button element being added to the modal
 document.addEventListener('keydown', (event) => {
 if (event.code === 'Enter') {
 nxtLvlBut.click();
}})}
 ```

On game start the code initiates all functions needed with gameInit():
```function gameInit() { //initiates games basically, calls all initial functions
 if (localStorage.getItem("level") !== null) {
 updateLvlOnStart(localStorage.getItem("level"));
 } //update level from local storage
 playerNameHtml.innerHTML = localStorage.getItem("playerName"); //update name from local storage
 makeGrid();
 bombsTimingUpdate(Number(currentLevel)); // update bombs timing to level
 moveLasers();
 moveBombs();
 createRocks();
 addPlayerShip(); //initiates player ship
 createAliens(Number(currentLevel)); //create aliens dependent on level
 moveFourRight(); //alternates with left, moves 3 not 4.
 dropBombs(bombsTiming); //initiates bomb dropping by aliens
 addEventListeners();
 grid.style.cursor = 'none'; //!hide cursor when game starts
}
```


## Wins
I was very excited to be able to implement small animations and progressively harder infinite levels on my first project. Not to mention the modal functionality, debugging the numerous bugs that came up along the way and getting the time intervals just right. Biggest win was watching people enjoying the game afterwards!


## Key Learnings

- Animations
Some last minute perks were added to make the game more dynamic.
Speed on the back of the player ship, here is the CSS
```
@keyframes speedMove {
  0% {
    background-image: url('assets/1.png');
  }
  11% {
    background-image: url('assets/2.png');
  }
  22% {
    background-image: url('assets/3.png');
  }
  33% {
    background-image: url('assets/4.png');
  }
  44% {
    background-image: url('assets/5.png');
  }
  55% {
    background-image: url('assets/6.png');
  }
  66% {
    background-image: url('assets/7.png');
  }
  78% {
    background-image: url('assets/8.png');
  }
  90% {
    background-image: url('assets/9.png');
  }
  100% {
    background-image: url('assets/10.png');
  }
}
```

As well as some explostion effects:
```
.supernova {
  background-image: url('assets/supernova.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: rotation2 5s infinite linear;
}

.explosion {
  background-image: url('assets/stars.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  animation: rotation 7s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@keyframes rotation2 {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-359deg);
  }
}
```

- Modal:
A neat feature I decided to add in the end to wrap up the game, useful across the board.
- Event listeners:
Listening for keystrokes is relevant for most games and it was a key learning here.
- Local storage:
I had heard of cookies storing data on local machines, but local storage is a ok tool to use for small projects like this one. 
- Programmatic vs hard coded:
Learning to programmatically generate elements was one of the key learnings, although out of scope of the our lessons.
Of course one can hard code the map elements, but generating them allows for changes and scalability.
In the example bellow with the map grid - if we change the cellcount, the grid will change as well and scale with the cellcount. 
```
function makeGrid() {                                                    // make grid map
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add('cell');
    grid.appendChild(cell);                                        //add divs in html under div.grid
    cells.push(cell);                                                  //push div cells into cells array
  }
}
```

## Bugs
Bombs from aliens on the top rows overstep the aliens bellow on their way.
- ***Cheat code*** if you shoot lasers quick enough they will pass through the rocks.


## Assets & credit

- Logo: Dimitar Vidolov (canva.com).
- Ship flame 'animation': Dimitar Vidolov (canva.com).
- Player 1 spaceship: Dimitar Vidolov (canva.com).
- Icons (rocks, ships) from flaticon.com
--------

