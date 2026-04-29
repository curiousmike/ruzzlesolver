import { globalWordList } from "./globalwordlist.js";

// Word Scramble Solver with Advanced Scoring System
// Includes all recent updates: path multipliers, node multipliers, proper stacking

// 4x4 Grid with complex multipliers
// const grid = [
//     [
//         { letter: 'e', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }, // Normal node
//         { letter: 'i', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }, // Normal node
//         { letter: 'e', value: 1, nodeMultiplier: 1, pathMultiplier: 2 }, // Normal node
//         { letter: 'a', value: 1, nodeMultiplier: 2, pathMultiplier: 1 }  // Normal node
//     ],
//     [
//         { letter: 's', value: 1, nodeMultiplier: 3, pathMultiplier: 1 }, // Normal node
//         { letter: 'p', value: 4, nodeMultiplier: 1, pathMultiplier: 3 }, // Double letter
//         { letter: 'm', value: 3, nodeMultiplier: 1, pathMultiplier: 1 }, // Triple word
//         { letter: 'r', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }  // Double word
//     ],
//     [
//         { letter: 'p', value: 4, nodeMultiplier: 1, pathMultiplier: 1 }, // Normal node
//         { letter: 'a', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }, // Triple letter
//         { letter: 'i', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }, // Double word
//         { letter: 'u', value: 2, nodeMultiplier: 1, pathMultiplier: 1 }  // Normal node
//     ],
//     [
//         { letter: 'n', value: 1, nodeMultiplier: 1, pathMultiplier: 2 }, // Normal node
//         { letter: 't', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }, // Normal node
//         { letter: 'r', value: 1, nodeMultiplier: 1, pathMultiplier: 2 }, // Normal node
//         { letter: 'r', value: 1, nodeMultiplier: 3, pathMultiplier: 1 }  // Normal node
//     ]
// ];

const grid = [
  [
    { letter: 'l', value: 0, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'e', value: 1, nodeMultiplier: 1, pathMultiplier: 3 },
    { letter: 'n', value: 1, nodeMultiplier: 1, pathMultiplier: 3 },
    { letter: 's', value: 1, nodeMultiplier: 3, pathMultiplier: 1 }
  ],
  [
    { letter: 'a', value: 0, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'i', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'a', value: 1, nodeMultiplier: 3, pathMultiplier: 1 },
    { letter: 's', value: 1, nodeMultiplier: 1, pathMultiplier: 1 }
  ],
  [
    { letter: 'r', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 't', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'o', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'b', value: 4, nodeMultiplier: 1, pathMultiplier: 1 }
  ],
  [
    { letter: 'u', value: 2, nodeMultiplier: 1, pathMultiplier: 2 },
    { letter: 'e', value: 1, nodeMultiplier: 1, pathMultiplier: 2 },
    { letter: 'a', value: 1, nodeMultiplier: 1, pathMultiplier: 1 },
    { letter: 'c', value: 4, nodeMultiplier: 2, pathMultiplier: 1 }
  ]
];
// Convert matrix index to character
function indexToChar(index) {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return grid[row][col].letter;
}

// Convert character to matrix index
function charToIndex(char) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].letter === char) {
                return i * 4 + j;
            }
        }
    }
    return -1;
}

// Convert matrix position to character
function positionToChar(row, col) {
    return grid[row][col].letter;
}

// Method to check if a path represents a valid word
function isWord(pathString) {
    if (globalWordList.includes(pathString)) return true;
    return false;
}

// Calculate score with proper stacking of ALL path multipliers
function calculateScore(path) {
    let baseScore = 0;
    let pathMultiplierProduct = 1;
    
    // Calculate base score and multiply path multipliers
    for (let i = 0; i < path.length; i++) {
        const node = grid[path[i][0]][path[i][1]];
        const letterScore = node.value * node.nodeMultiplier;
        baseScore += letterScore;
        pathMultiplierProduct *= node.pathMultiplier;
    }
    
    const finalScore = baseScore * pathMultiplierProduct;
    return finalScore;
}

// Generate all possible paths of a given length
function generatePaths(length) {
    const paths = [];
    const visited = Array(4).fill().map(() => Array(4).fill(false));
    
    // Helper function to check if a position is valid
    function isValid(row, col) {
        return row >= 0 && row < 4 && col >= 0 && col < 4 && !visited[row][col];
    }
    
    // Helper function to get adjacent positions
    function getAdjacent(row, col) {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];
        const adjacent = [];
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (isValid(newRow, newCol)) {
                adjacent.push([newRow, newCol]);
            }
        }
        return adjacent;
    }
    
    // DFS to generate paths
    function dfs(row, col, currentPath) {
        if (currentPath.length === length) {
            paths.push([...currentPath]);
            return;
        }
        
        visited[row][col] = true;
        const adjacent = getAdjacent(row, col);
        
        for (const [newRow, newCol] of adjacent) {
            currentPath.push([newRow, newCol]);
            dfs(newRow, newCol, currentPath);
            currentPath.pop();
        }
        
        visited[row][col] = false;
    }
    
    // Start DFS from each position
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            dfs(row, col, [[row, col]]);
        }
    }
    
    return paths;
}

// Generate all possible words of a given length
function generateWordsOLD(length) {
    const words = [];
    const paths = generatePaths(length);
    
    for (const path of paths) {
        let word = '';
        for (const [row, col] of path) {
            word += grid[row][col].letter;
        }
        if (isWord(word)) {
            const score = calculateScore(path);
            words.push({
                word: word,
                path: path,
                score: calculateScore(path)
            });
        }
    }
    
    return words;
}

function generateWords(length) {
    const words = [];
    const paths = generatePaths(length);
    
    for (const path of paths) {
        let word = '';
        for (const [row, col] of path) {
            word += grid[row][col].letter;
        }
        if (isWord(word)) {
            const score = calculateScore(path);
            
            // Check if word already exists in words array
            const existingWordIndex = words.findIndex(w => w.word === word);
            
            if (existingWordIndex === -1) {
                // Word doesn't exist, add it
                words.push({
                    word: word,
                    path: path,
                    score: score
                });
            } else if (score > words[existingWordIndex].score) {
                // Word exists but has lower score, replace it
                words[existingWordIndex] = {
                    word: word,
                    path: path,
                    score: score
                };
            }
            // If score is <= existing score, don't add/replace
        }
    }
    
    return words;
}


// Main solver function
function solveOLD() {
    console.log("=== Word Scramble Solver ===");
    
    // Generate words of different lengths
    const minWordLength = 2;
    const maxWordLength = 8;
    const results = {};
    for (let length = minWordLength; length <= maxWordLength; length++) {
        console.log(`\n=== Words of length ${length} ===`);
        const words = generateWords(length);
        console.log('words generated = ', words.length);
        results[length] = words;
        
        // Sort by score (descending)
        words.sort((a, b) => b.score - a.score);
        
        for (let i = 0; i < Math.min(10, words.length); i++) {
            const word = words[i];
            console.log(`"${word.word}" - Score: ${word.score}`);
        }
    }
    
    return results;
}
function solve() {
    console.log("=== Word Scramble Solver ===");
    
    // Generate words of different lengths
    const minWordLength = 3;
    const maxWordLength = 8;
    const results = {};
    const allWords = [];
    
    for (let length = minWordLength; length <= maxWordLength; length++) {
        console.log(`\n=== Words of length ${length} ===`);
        const words = generateWords(length);
        console.log('words generated = ', words.length);
        results[length] = words;
        
        // Add all words from this length to the master array
        allWords.push(...words);
        
        // Sort by score (descending)
        words.sort((a, b) => b.score - a.score);
        
        for (let i = 0; i < Math.min(10, words.length); i++) {
            const word = words[i];
            console.log(`"${word.word}" - Score: ${word.score}`);
        }
    }
    
    // Sort all words by score (highest to lowest)
    allWords.sort((a, b) => b.score - a.score);
    
    // Log the top 10 highest scoring words overall
    const topWordCount = 30;
    console.log(`\n=== Top ${topWordCount} Highest Scoring Words Overall ===`);
    let totalScore = 0;
    for (let i = 0; i < Math.min(topWordCount, allWords.length); i++) {
        const word = allWords[i];
        console.log(`"${word.word}" - Score: ${word.score} (Length: ${word.word.length})`);
        totalScore += word.score;
    }
    console.log('total score = ', totalScore);
    return allWords; // Return all words sorted by score
}


// Run the solver
const results = solve();
// console.log('Final Results = ', results);

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        grid,
        calculateScore,
        generateWords,
        solve
    };
}
