document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let squares = [];
    let isRedTurn = true;

    function createBoard() {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.dataset.row = i;
                square.dataset.col = j;

                if ((i + j) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }

                square.addEventListener('click', () => handleClick(square));
                board.appendChild(square);
                squares.push(square);
            }
        }
    }

    function handleClick(square) {
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);

        // Example: Toggle piece color on click
        if (isRedTurn) {
            if (!square.classList.contains('black-piece')) {
                square.classList.toggle('red-piece');
                isRedTurn = false;
            }
        } else {
            if (!square.classList.contains('red-piece')) {
                square.classList.toggle('black-piece');
                isRedTurn = true;
            }
        }
    }

    createBoard();
});

// Global variable to keep track of the selected square
let selectedSquare = null;

function handleClick(square) {
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);

    // If a square is already selected, try to move the piece to the clicked square
    if (selectedSquare) {
        movePiece(selectedSquare, square);
        selectedSquare = null; // Reset selected square
        return;
    }

    // If no square is selected yet, check if there is a piece on the clicked square to select
    if (square.classList.contains('red-piece') || square.classList.contains('black-piece')) {
        // Highlight the selected square
        square.classList.add('selected');
        selectedSquare = square; // Set selected square
    }
}

function movePiece(fromSquare, toSquare) {
    // Check if the move is valid (diagonal and empty destination square)
    const fromRow = parseInt(fromSquare.dataset.row);
    const fromCol = parseInt(fromSquare.dataset.col);
    const toRow = parseInt(toSquare.dataset.row);
    const toCol = parseInt(toSquare.dataset.col);

    if (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1 && !toSquare.classList.contains('red-piece') && !toSquare.classList.contains('black-piece')) {
        // Move the piece to the destination square
        toSquare.className = fromSquare.className;
        fromSquare.className = 'square';
        // Switch turn
        isRedTurn = !isRedTurn;
    } else {
        // Invalid move, do nothing
        return;
    }
}

// Add event listener to the document to handle square clicks
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    board.addEventListener('click', (event) => {
        const clickedSquare = event.target;
        handleClick(clickedSquare);
    });
});
