// player factory function
const player = (name, marker) => {
  return { name, marker };
};

const player1 = player('Player X', 'X');
const player2 = player('Player O', 'O');

// gameBoard module
const gameBoard = (function () {
  let boardTemplate = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = player1;
  let gameOver = false;
  const display = document.querySelector('.display');

  const displayBoard = () => {
    const boardContainer = document.querySelector('.board');
    for (let i = 0; i < boardTemplate.length; i++) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      squareDiv.setAttribute('data-square', i);
      squareDiv.textContent = boardTemplate[i];
      boardContainer.appendChild(squareDiv);
    }
  };

  const changePlayer = () => {
    if (currentPlayer === player1) {
      currentPlayer = player2;
    } else {
      currentPlayer = player1;
    }
  };

  const checkWin = () => {
    const winningCombos = [
      [boardTemplate[0], boardTemplate[1], boardTemplate[2]],
      [boardTemplate[3], boardTemplate[4], boardTemplate[5]],
      [boardTemplate[6], boardTemplate[7], boardTemplate[8]],
      [boardTemplate[0], boardTemplate[3], boardTemplate[6]],
      [boardTemplate[1], boardTemplate[4], boardTemplate[7]],
      [boardTemplate[2], boardTemplate[5], boardTemplate[8]],
      [boardTemplate[0], boardTemplate[4], boardTemplate[8]],
      [boardTemplate[2], boardTemplate[4], boardTemplate[6]],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const combo = winningCombos[i];
      if (
        combo.every((square) => square === player1.marker) ||
        combo.every((square) => square === player2.marker)
      ) {
        display.textContent = `${currentPlayer.name} wins!`;
        gameOver = true;
      } else if (boardTemplate.every((square) => square !== '')) {
        display.textContent = 'Tie game!';
        gameOver = true;
      }
    }
  };

  const playerMove = () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', () => {
        if (!gameOver && square.textContent !== '') {
          alert('This square is already taken');
        } else if (!gameOver) {
          const attr = square.getAttribute('data-square');
          boardTemplate[attr] = currentPlayer.marker;
          square.textContent = currentPlayer.marker;
          display.textContent = `${currentPlayer.name}'s turn`;
          checkWin();
          changePlayer();
        } else {
          alert('Game over! Please refresh the page to play again.');
        }
      });
    });
  };

  return { displayBoard, playerMove };
})();

gameBoard.displayBoard();
gameBoard.playerMove();
