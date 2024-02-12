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
            movePiece(selectedSquare, square);
            selectedSquare = null;
            return;
        }

        if (square.classList.contains('red-piece') || square.classList.contains('black-piece')) {
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
            isRedTurn = !isRedTurn;
        } else if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2) {
            const capturedRow = fromRow + dy;
            const capturedCol = fromCol + dx;
            const capturedSquare = document.querySelector(`.square[data-row='${capturedRow}'][data-col='${capturedCol}']`);

            if (capturedSquare && (isRedTurn && capturedSquare.classList.contains('black-piece') || !isRedTurn && capturedSquare.classList.contains('red-piece'))) {
                toSquare.className = fromSquare.className;
                fromSquare.className = 'square';
                capturedSquare.className = 'square';
                isRedTurn = !isRedTurn;
            }
        }
    }

    let selectedSquare = null;

  
    createBoard();
});
