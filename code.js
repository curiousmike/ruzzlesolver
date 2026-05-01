// Export the functions so they can be used by the HTML
export { collectGridData, resetGrid, doSolve };

import { solve } from './solver.js';
// code.js
// Initialize grid
const gridSize = 4;
let grid = [];

const nodeKey = 'Letter';
const pathKey = 'Word';

const sampleGrid = [
    [
        { letter: 't', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'a', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'i', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'c', value: 4, nodeMultiplier: 1, pathMultiplier: 1 }
    ],
    [
        { letter: 's', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'd', value: 2, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'r', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 's', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }
    ],
    [
        { letter: 'u', value: 2, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'n', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'o', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'l', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }
    ],
    [
        { letter: 'd', value: 2, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'h', value: 4, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'o', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
        { letter: 'e', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }
    ]
];

// Create grid
function createGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';

    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Letter input
            const letterInput = document.createElement('input');
            letterInput.type = 'text';
            letterInput.maxLength = 1;
            letterInput.dataset.row = row;
            letterInput.dataset.col = col;
            letterInput.placeholder = 'A';
            letterInput.addEventListener('input', handleLetterInput);

            // Value input
            const valueInput = document.createElement('input');
            valueInput.type = 'number';
            valueInput.placeholder = '1';
            valueInput.dataset.row = row;
            valueInput.dataset.col = col;
            valueInput.min = '0';
            valueInput.step = '1';
            valueInput.style.fontSize = '10px';
            valueInput.addEventListener('input', handleValueInput);

            // Node multiplier buttons
            const nodeMultiplierContainer = document.createElement('div');
            nodeMultiplierContainer.className = 'cell-controls';
            const nodeMultiplierBtn = document.createElement('button');
            nodeMultiplierBtn.className = 'multiplier-btn';
            nodeMultiplierBtn.dataset.row = row;
            nodeMultiplierBtn.dataset.col = col;
            nodeMultiplierBtn.textContent = `${nodeKey}: 1`;
            nodeMultiplierBtn.addEventListener('click', handleNodeMultiplierClick);

            // Path multiplier buttons
            const pathMultiplierContainer = document.createElement('div');
            pathMultiplierContainer.className = 'cell-controls';
            const pathMultiplierBtn = document.createElement('button');
            pathMultiplierBtn.className = 'multiplier-btn';
            pathMultiplierBtn.dataset.row = row;
            pathMultiplierBtn.dataset.col = col;
            pathMultiplierBtn.textContent = `${pathKey}: 1`;
            pathMultiplierBtn.addEventListener('click', handlePathMultiplierClick);

            cell.appendChild(letterInput);
            cell.appendChild(valueInput);
            cell.appendChild(nodeMultiplierBtn);
            cell.appendChild(pathMultiplierBtn);

            gridContainer.appendChild(cell);

            // Initialize grid data with default values
            grid[row][col] = {
                letter: 'a',
                value: 2, // Default value
                nodeMultiplier: 1,
                pathMultiplier: 1
            };
        }
    }
}

// Handle letter input
function handleLetterInput(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const letter = event.target.value.toUpperCase();

    if (letter && letter.match(/[A-Z]/)) {
        grid[row][col].letter = letter.toLowerCase();
        // Set default value based on letter range
        const letterValue = getLetterValue(letter);
        grid[row][col].value = letterValue;
        // Update the value input field
        const valueInput = event.target.nextElementSibling;
        valueInput.value = letterValue;
    } else {
        grid[row][col].letter = 'a';
        grid[row][col].value = 2;
        const valueInput = event.target.nextElementSibling;
        valueInput.value = 2;
    }
    updateCellStyles(row, col);
}

// Get default value based on letter range
function getLetterValue(letter) {
    // Letters a-m (1-13) default to 2
    // Letters n-z (14-26) default to 3
    const letterValues = {
        'a': 1, 'e': 1, 'i': 1, 'o': 1, 'l': 1, 'n': 1, 's': 1, 't': 1, 'r': 1,
        'd': 2, 'u': 2,
        'm': 3, 'g': 3,
        'p': 4, 'b': 4, 'c': 4, 'f': 4, 'h': 4, 'v': 4, 'w': 4, 'y': 4,
        'k': 5,
        'j': 8, 'x': 8,
        'q': 10, 'z': 10
    };
    // console.log(`letter ${letter} value = ${letterValues[letter.toLowerCase()]}`)
    return letterValues[letter.toLowerCase()];
}

// Handle value input
function handleValueInput(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const value = parseInt(event.target.value) || 0;
    grid[row][col].value = value;
}

// Handle node multiplier button click
function handleNodeMultiplierClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const current = grid[row][col].nodeMultiplier;
    const next = current === 1 ? 2 : current === 2 ? 3 : 1;
    grid[row][col].nodeMultiplier = next;
    event.target.textContent = `${nodeKey}: ${next}`;
    updateCellStyles(row, col);
}

// Handle path multiplier button click
function handlePathMultiplierClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const current = grid[row][col].pathMultiplier;
    const next = current === 1 ? 2 : current === 2 ? 3 : 1;
    grid[row][col].pathMultiplier = next;
    event.target.textContent = `${pathKey}: ${next}`;
    updateCellStyles(row, col);
}

// Update cell styles based on multipliers
function updateCellStyles(row, col) {
    const cell = document.querySelector(`.grid-cell[data-row="${row}"][data-col="${col}"]`);
    cell.className = 'grid-cell';

    // Add multiplier classes
    if (grid[row][col].nodeMultiplier === 2) {
        cell.classList.add('node-2');
    } else if (grid[row][col].nodeMultiplier === 3) {
        cell.classList.add('node-3');
    }

    if (grid[row][col].pathMultiplier === 2) {
        cell.classList.add('path-2');
    } else if (grid[row][col].pathMultiplier === 3) {
        cell.classList.add('path-3');
    }
}

function doSolve() {
    console.log('doSolve - gridData = ', grid);
    const foundWordOutput = document.getElementById('foundWordOutput');
    foundWordOutput.textContent = "SOLVING PLEASE WAIT";

    const words = solve(grid);
    console.log('final words i might display = ', words);
    let formattedData = '';
    words.forEach((item) => {
        formattedData += `${item.word}  ${item.score}\n`;
    })
    foundWordOutput.textContent = formattedData;
}

// Reset grid to initial state
function resetGrid() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Reset letter input
            const letterInput = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
            letterInput.value = '';

            // Reset value input
            const valueInput = letterInput.nextElementSibling;
            valueInput.value = 2;

            // Reset multiplier buttons
            const nodeBtn = valueInput.nextElementSibling;
            const pathBtn = nodeBtn.nextElementSibling;
            nodeBtn.textContent = `${nodeKey}: 1`;
            pathBtn.textContent = `${pathKey}: 1`;

            // Reset grid data
            grid[row][col] = {
                letter: 'a',
                value: 2,
                nodeMultiplier: 1,
                pathMultiplier: 1
            };
            updateCellStyles(row, col);
        }
    }

    // Clear output
    // document.getElementById('gridOutput').textContent = '';
}

// Collect and display grid data
function collectGridData() {
    // const gridOutput = document.getElementById('gridOutput');

    // Format the data for display
    let formattedData = '[\n';
    for (let row = 0; row < gridSize; row++) {
        formattedData += '  [\n';
        for (let col = 0; col < gridSize; col++) {
            const cell = grid[row][col];
            formattedData += `    { letter: '${cell.letter}', value: ${cell.value}, nodeMultiplier: ${cell.nodeMultiplier}, pathMultiplier: ${cell.pathMultiplier} }`;
            if (col < gridSize - 1) formattedData += ',\n';
        }
        formattedData += '\n  ]';
        if (row < gridSize - 1) formattedData += ',\n';
    }
    formattedData += '\n]';

    // gridOutput.textContent = formattedData;

    // Also log to console for debugging
    console.log('Grid Data:', grid);
}

function doDefaults() {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            // Reset letter input
            const letterInput = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
            letterInput.value = sampleGrid[row][col].letter;

            // Reset value input
            const valueInput = letterInput.nextElementSibling;
            valueInput.value = sampleGrid[row][col].value;

            // Reset multiplier buttons
            const nodeBtn = valueInput.nextElementSibling;
            const pathBtn = nodeBtn.nextElementSibling;
            nodeBtn.textContent = `${nodeKey}: 1`;
            pathBtn.textContent = `${pathKey}: 1`;

            // Reset grid data
            grid[row][col] = sampleGrid[row][col];
        }
    }

    // Clear output
    // document.getElementById('gridOutput').textContent = '';

}

// Initialize the grid when the page loads
window.onload = function () {
    createGrid();
    // Add event listeners to buttons
    // document.querySelector('.done-btn').addEventListener('click', collectGridData);
    document.querySelector('.reset-btn').addEventListener('click', resetGrid);
    document.querySelector('.solve-btn').addEventListener('click', doSolve);
    document.querySelector('.defaults-btn').addEventListener('click', doDefaults);
};
