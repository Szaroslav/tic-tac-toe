let playersTurn = 'x';
let gameOver = false;
const game = ['', '', '', '', '', '', '', '', ''];
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

const createMark = (target, mark) => {
    const m = document.createElement('span');
    m.setAttribute('class', `tic-tac-toe__mark ${mark} animated`);
    const ma = target.appendChild(m);
    setTimeout(() => ma.classList.remove('animated'), 50);
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

    return false;
};

const handleGameOver = (a, b, c) => {
    gameOver = true;

    Array.from(board.querySelectorAll('.tic-tac-toe__cell'))
        .filter((cell, i) => i !== a && i !== b && i !== c)
        .forEach(cell => {
            const mark = cell.querySelector('.tic-tac-toe__mark');
            if (mark) mark.classList.add('no-win');
        });

    setTimeout(() => gameOverContainer.classList.add('active'), 2500);
};

board.addEventListener('click', e => {
    if (gameOver) return;

    const t = e.target;

    if (t.classList.contains('tic-tac-toe__cell') && !t.classList.contains('filled')) {
        //createMark(t, playersTurn);
        t.classList.add('filled');

        const m = t.querySelector(`.${playersTurn}`);
        m.classList.remove('hidden');
        m.classList.add('animated');
        setTimeout(() => m.classList.remove('animated'), 10);

        game[Number.parseInt(t.getAttribute('data-index'))] = playersTurn;
        playersTurn = playersTurn === 'x' ? 'o' : 'x';

        isGameOver(handleGameOver);
    }
});
