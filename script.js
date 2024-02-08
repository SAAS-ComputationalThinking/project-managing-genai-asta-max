
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let squares = [];
    let isRedTurn = true;
    let selectedSquare = null;
    let isPieceMoved = false; // Flag to track if a piece has been moved in the current turn

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

                // Adjusted placement of black and red pieces
                if ((i === 0 || i === 2) && (j + i + 1) % 2 !== 0) {
                    square.classList.add('black-piece');
                } else if (i === 1 && (j + i) % 2 === 0) {
                    square.classList.add('black-piece');
                } else if ((i === 5 || i === 7) && (j + i + 1) % 2 !== 0) {
                    square.classList.add('red-piece');
                } else if (i === 6 && (j + i) % 2 === 0) {
                    square.classList.add('red-piece');
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

        // Check if it's the current player's turn and a piece is clicked
        if ((isRedTurn && square.classList.contains('red-piece')) || (!isRedTurn && square.classList.contains('black-piece'))) {
            selectPiece(square);
        } else if (selectedSquare && canMove(selectedSquare, square)) {
            movePiece(selectedSquare, square);
            isPieceMoved = true; // Set the flag to true after a successful move
            selectedSquare = null;
            isRedTurn = !isRedTurn; // Switch turns after a successful move
        }
    }

    function selectPiece(square) {
        if (selectedSquare) {
            selectedSquare.classList.remove('selected');
        }
        square.classList.add('selected');
        selectedSquare = square;
    }

    function canMove(fromSquare, toSquare) {
        const fromRow = parseInt(fromSquare.dataset.row);
        const fromCol = parseInt(fromSquare.dataset.col);
        const toRow = parseInt(toSquare.dataset.row);
        const toCol = parseInt(toSquare.dataset.col);

        return Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1 && !toSquare.classList.contains('red-piece') && !toSquare.classList.contains('black-piece');
    }

    function movePiece(fromSquare, toSquare) {
        toSquare.className = fromSquare.className;
        fromSquare.className = 'square';
    }

    // Add event listener to the board
    board.addEventListener('click', () => {
        // Check if a piece has been moved in the current turn
        if (!isPieceMoved) {
            return; // Do nothing if no piece has been moved
        }
        
        isPieceMoved = false; // Reset the flag for the next turn
    });

    createBoard();
});

