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