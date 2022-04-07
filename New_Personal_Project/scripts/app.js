const grid = document.querySelector('.grid');
const width = 25;
const height = 40;
const cellCount = width * height;
let playerPosit = 1000 - 12;
let enemyPosit = 1;
let cells = [];

function createGrid() {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElemet('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
    cells.push(cell);


  }

}