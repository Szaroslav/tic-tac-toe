let playersTurn = 'x';
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

const createMark = (target, mark) => {
    const m = document.createElement('span');
    m.setAttribute('class', `tic-tac-toe__mark ${mark}`);
    target.appendChild(m);
};

const isGameOver = () => {
    for (const winCondition of winConditions) {
        const a = game[winCondition[0]];
        const b = game[winCondition[1]];
        const c = game[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && a === c) return true;
    }

    return false;
};

//const validateLine = (a, b, c) => /^(x|o)$/.test(game[a]) && game[a] === game[b] && game[a] === game[c];

board.addEventListener('click', e => {
    const t = e.target;
    console.log(e);

    if (t.classList.contains('tic-tac-toe__cell') && !t.classList.contains('filled')) {
        createMark(t, playersTurn);
        t.classList.add('filled');

        game[Number.parseInt(t.getAttribute('data-index'))] = playersTurn;
        playersTurn = playersTurn === 'x' ? 'o' : 'x';

        console.log(isGameOver());
    }
});
