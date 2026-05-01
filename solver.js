import { globalWordList, wordIndices } from "./globalwordlist.js";
import { globalPaths } from './paths2.js';
// console.log('paths[3] = ', paths[7]);
const minWordLength = 3;
const maxWordLength = 8; // 8;
// Word Scramble Solver with Advanced Scoring System
// Includes all recent updates: path multipliers, node multipliers, proper stacking
// 4x4 Grid with complex multipliers
let grid;

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
    const startChar = pathString.charAt(0).toLowerCase();
    const charDetails = wordIndices[startChar];
    for (let i = charDetails.start; i < charDetails.end; i++) {
        if (globalWordList[i] === pathString) {
            return true;
        }
    }
    // if (globalWordList.includes(pathString)) return true;
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
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
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


function generateWords(length) {
    const words = [];
    console.log('Generate Paths for length = ', length);
    let paths;
    if (globalPaths[length]) {
        console.log('using global path for ', length);
        paths = globalPaths[length].data;
    } else {
        console.log('BAD generating path of length ', length);
        paths = generatePaths(length);
    }

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


export function solve(theGrid) {
    console.log('Starting solve...');
    grid = theGrid;
    // Generate words of different lengths
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
    const topScoringWords = [];
    console.log(`\n=== Top ${topWordCount} Highest Scoring Words Overall ===`);
    let totalScore = 0;
    for (let i = 0; i < Math.min(topWordCount, allWords.length); i++) {
        const word = allWords[i];
        console.log(`"${word.word}" - Score: ${word.score} (Length: ${word.word.length})`);
        totalScore += word.score;
        topScoringWords.push(word);
    }
    console.log('total score = ', totalScore);
    // return allWords; // Return all words sorted by score
    return topScoringWords;
}


// Run the solver
// const results = solve();
// console.log('Final Results = ', results);

// Export for use in other files if needed
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         grid,
//         calculateScore,
//         generateWords,
//         solve
//     };
// }
