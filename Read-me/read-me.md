### ![Invaders 23 by Dimitar Vidolov](https://dumblevor.github.io/spce_inv1/assets/animatedLogo.gif) Dimitar Vidolov, Software Engineered this.
# Invaders 23
 

## Overview

First project as part of the software engineering immersive course at GA London. The assignment was to create a grid-based game to be rendered in the browser, using HTML, CSS and JavaScript. The project was to be completed **individually** within **one week**.

Given a list of options from GA, I chose to re-create the classic game **Space Invaders**. 

You can launch the game on GitHub pages [here](https://dumblevor.github.io/spce_inv1/) and the repo [here](https://github.com/Dumblevor/spce_inv1).

## Brief

- **Render a game in the browser**
- **Design logic for winning & visually display when player wins**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Stupid Simple)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (while adhering to best practices)

## Technologies used !

- HTML
- CSS
- JavaScript
- Git and GitHub

## Approach

Actitivities are broken down into seperate components, hardcoding is kept quite low for the most part.
The grid is generated (by makeGrid()) with fixed size, elements on the grid are moved by adding and removing classes on the grid with time intervals and I put listeners to detect collisions.
The location for some of the elements are kept in seperate arrays.

### Elements set-up 
None of the elements (aliens, rocks, player's ship, etc.) are hard hardcoded, but generated when needed.
The end of movement of the aliens to the right starts the movement to the left. 
Player's lasers and aliens' bombs move with intervals, new bombs deployment speeds up on level change.
Level changes are stored in local storage.
Variables are grouped in the beginning, followed by all the functions needed, gameInit() starts the game and it is followed by the modal for the player's name and win screen. 

### Bits & bobs
Lasers dissapear on collision with aliens, when they reach the end of the screen and when they hit a rock (most of the time, see cheat code below).
Aliens' bombs dissapear on collision with palyer and end of screen.
Aliens can appear on opposite end of screen on higher levels which can be improved. 
***Cheat code*** if you shoot lasers very quickly they will pass through the rocks.


## Assets & credit

- Logo: Dimitar Vidolov  (canva.com).
- Ship flame 'animation': Dimitar Vidolov (canva.com).
- Player 1 spaceship: Dimitar Vidolov (canva.com).
- Sounds from 
- Icons (rocks, ships) from flaticon.com


