let playersTurn = 'x';
const game = ['', '', '', '', '', '', '', '', ''];

const board = document.querySelector('.tic-tac-toe__board');

const createMark = (target, mark) => {
    const m = document.createElement('span');
    m.setAttribute('class', `tic-tac-toe__mark ${mark}`);
    target.appendChild(m);
};

board.addEventListener('click', e => {
    const t = e.target;

    if (t.classList.contains('tic-tac-toe__cell') && !t.classList.contains('filled')) {
        createMark(t, playersTurn);
        t.classList.add('filled');

        game[Number.parseInt(t.getAttribute('data-index'))] = playersTurn;
        playersTurn = playersTurn === 'x' ? 'o' : 'x';

        console.log(game);
    }
});
