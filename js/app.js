let playersTurn = 'x';
let turn = 1;
let gameOver = false;
let game = ['', '', '', '', '', '', '', '', ''];
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const board = document.querySelector('.tic-tac-toe__board');
const gameOverContainer = document.querySelector('.tic-tac-toe__game-over');
const playAgainButton = document.querySelector('.game-over__button');

const resetGame = () => {
    playersTurn = 'x';
    turn = 1;
    gameOver = false;
    game = ['', '', '', '', '', '', '', '', ''];

    board.classList.remove('game-over');
    board.querySelectorAll('.tic-tac-toe__cell').forEach(cell => {
        cell.classList.remove('filled');
        cell.querySelectorAll('.tic-tac-toe__mark').forEach(mark => {
            mark.classList.add('hidden');
            mark.classList.remove('no-win');
        });
    });

    gameOverContainer.classList.remove('active');
};

const isGameOver = callback => {
    for (const winCondition of winConditions) {
        const a = game[winCondition[0]];
        const b = game[winCondition[1]];
        const c = game[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && a === c) {
            callback(winCondition[0], winCondition[1], winCondition[2]);
            return true;
        }
    }

    if (turn === 9) callback();

    return false;
};

const handleGameOver = (a = -1, b = -1, c = -1) => {
    gameOver = true;
    board.classList.add('game-over');

    Array.from(board.querySelectorAll('.tic-tac-toe__cell'))
        .filter((cell, i) => i !== a && i !== b && i !== c)
        .forEach(cell => cell.querySelectorAll('.tic-tac-toe__mark').forEach(mark => mark.classList.add('no-win')));

    gameOverContainer.querySelector('.game-over__player').textContent = playersTurn.toUpperCase();
    gameOverContainer.querySelector(`.${playersTurn}`).classList.remove('hidden');

    setTimeout(() => gameOverContainer.classList.add('active'), 2500);
};

board.addEventListener('click', e => {
    if (gameOver) return;

    const t = e.target;

    if (t.classList.contains('tic-tac-toe__cell') && !t.classList.contains('filled')) {
        t.classList.add('filled');

        const m = t.querySelector(`.${playersTurn}`);
        m.classList.remove('hidden');
        m.classList.add('animated');
        setTimeout(() => m.classList.remove('animated'), 10);

        game[Number.parseInt(t.getAttribute('data-index'))] = playersTurn;

        if (!isGameOver(handleGameOver)) {
            playersTurn = playersTurn === 'x' ? 'o' : 'x';
            turn++;
        }
    }
});

playAgainButton.addEventListener('click', () => resetGame());
