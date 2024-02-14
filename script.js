document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    let squares = [];
    let isRedTurn = true;
    let canMoveBlack = false;
    let canMoveRed = true;

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

        if (selectedSquare) {
            // If the clicked square contains a piece of the same color, select it instead of moving onto it
            if (square.classList.contains(selectedSquare.classList.contains('red-piece') ? 'red-piece' : 'black-piece')) {
                // Deselect the previously selected square and select the new one
                selectedSquare.classList.remove('selected');
                square.classList.add('selected');
                selectedSquare = square;
                return;
            }

            // If the selected square is trying to move onto another piece, return without moving
            if (canMovePiece(selectedSquare, square)) {
                movePiece(selectedSquare, square);
                selectedSquare = null;
                toggleTurn();
                return;
            }
        }

        if (canSelectPiece(square)) {
            square.classList.add('selected');
            selectedSquare = square;
        }
    }

    function movePiece(fromSquare, toSquare) {
        const fromRow = parseInt(fromSquare.dataset.row);
        const fromCol = parseInt(fromSquare.dataset.col);
        const toRow = parseInt(toSquare.dataset.row);
        const toCol = parseInt(toSquare.dataset.col);
    
        const dx = Math.sign(toCol - fromCol);
        const dy = Math.sign(toRow - fromRow);
    
        if (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1 && !toSquare.classList.contains('red-piece') && !toSquare.classList.contains('black-piece')) {
            toSquare.className = fromSquare.className;
            fromSquare.className = 'square';
        } else if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
            const capturedRow = fromRow + dy;
            const capturedCol = fromCol + dx;
            const capturedSquare = document.querySelector(`.square[data-row='${capturedRow}'][data-col='${capturedCol}']`);
    
            if (capturedSquare && (isRedTurn && capturedSquare.classList.contains('black-piece') || !isRedTurn && capturedSquare.classList.contains('red-piece')) &&
                !toSquare.classList.contains('red-piece') && !toSquare.classList.contains('black-piece')) {
                toSquare.className = fromSquare.className;
                fromSquare.className = 'square';
                capturedSquare.className = 'square';
            }
        }
    }
    

    function canMovePiece(fromSquare, toSquare) {
        const fromRow = parseInt(fromSquare.dataset.row);
        const fromCol = parseInt(fromSquare.dataset.col);
        const toRow = parseInt(toSquare.dataset.row);
        const toCol = parseInt(toSquare.dataset.col);

        if (toSquare.classList.contains('red-piece') || toSquare.classList.contains('black-piece')) {
            return false; // Can't move onto an occupied square
        }

        if (isRedTurn && fromSquare.classList.contains('black-piece')) {
            // Black piece cannot move backward
            if (toRow > fromRow)
                return false;
        } else if (!isRedTurn && fromSquare.classList.contains('red-piece')) {
            // Red piece cannot move backward
            if (toRow < fromRow)
              return false;
        }
        return true;
    }

    function toggleTurn() {
        isRedTurn = !isRedTurn;
        canMoveBlack = !canMoveBlack;
        canMoveRed = !canMoveRed;
    }

    function canSelectPiece(square) {
        if (isRedTurn && square.classList.contains('red-piece') && canMoveRed) {
            return true;
        } else if (!isRedTurn && square.classList.contains('black-piece') && canMoveBlack) {
            return true;
        }
        return false;
    }

    let selectedSquare = null;

    createBoard();
});
