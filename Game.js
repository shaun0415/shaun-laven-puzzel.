const boardSize = 4;
const totalTiles = boardSize * boardSize;
let board = [];
let emptyIndex = totalTiles - 1;

const gameBoard = document.getElementById('game-board');
const shuffleButton = document.getElementById('shuffle-btn');

const targetText = ['S', 'H', 'A', 'U', 'N', 'L', 'A', 'V', 'E', 'N'];

function initGame() {
    board = [];
    for (let i = 0; i < targetText.length; i++) {
        board.push(targetText[i]);
    }
    board.push(null); // Empty space at the end
    renderBoard();
}

function renderBoard() {
    gameBoard.innerHTML = '';
    board.forEach((tile, index) => {
        const tileElement = document.createElement('div');
        tileElement.classList.add('tile');
        if (tile !== null) {
            tileElement.textContent = tile;
            tileElement.addEventListener('click', () => moveTile(index));
        } else {
            tileElement.classList.add('empty');
        }
        gameBoard.appendChild(tileElement);
    });
}

function moveTile(index) {
    const emptyRow = Math.floor(emptyIndex / boardSize);
    const emptyCol = emptyIndex % boardSize;
    const tileRow = Math.floor(index / boardSize);
    const tileCol = index % boardSize;

    // Check if the tile is adjacent to the empty space
    const isAdjacent = (Math.abs(emptyRow - tileRow) === 1 && emptyCol === tileCol) ||
                       (Math.abs(emptyCol - tileCol) === 1 && emptyRow === tileRow);

    if (isAdjacent) {
        // Swap the tile with the empty space
        board[emptyIndex] = board[index];
        board[index] = null;
        emptyIndex = index;
        renderBoard();

        if (checkWin()) {
            alert('Congratulations! You solved the puzzle! - Shaun Laven');
        }
    }
}

function checkWin() {
    for (let i = 0; i < targetText.length; i++) {
        if (board[i] !== targetText[i]) {
            return false;
        }
    }
    return true;
}

function shuffleBoard() {
    for (let i = 0; i < 1000; i++) {
        const randomIndex = Math.floor(Math.random() * totalTiles);
        if (board[randomIndex] !== null) {
            moveTile(randomIndex);
        }
    }
}

shuffleButton.addEventListener('click', shuffleBoard);

initGame();
