let playersTurn = 'x';
let turn = 1;
let gameOver = false;
let pause = true;
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
const header = document.querySelector('.tic-tac-toe__header');

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

    gameOverContainer.querySelectorAll('.tic-tac-toe__mark').forEach(mark => mark.classList.add('hidden'));
    if (a >= 0) {
        gameOverContainer.querySelector('.game-over__heading').innerHTML = `
            <span class="game-over__player">Player ${playersTurn.toUpperCase()}</span> has won
        `;
        gameOverContainer.querySelector(`.${playersTurn}`).classList.remove('hidden');
    } else {
        gameOverContainer.querySelector('.game-over__heading').innerHTML = 'Draw';
        gameOverContainer.querySelectorAll('.tic-tac-toe__mark').forEach(mark => mark.classList.remove('hidden'));
    }

    setTimeout(() => gameOverContainer.classList.add('active'), 1500);
};

const animate = () => {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
    const cells = document.querySelectorAll('.tic-tac-toe__cell');

    anime({
        targets: '.tic-tac-toe__header',
        duration: 400,
        delay: 300,
        translateY: [100, 0],
        scale: [0, 1],
        easing: 'easeOutCubic',
    });

    indexes.forEach((index, i) =>
        anime({
            targets: cells[index],
            duration: 300,
            delay: 700 + 125 * i,
            opacity: [0, 1],
            easing: 'easeOutCubic',
            complete: () => (pause = i !== 8),
        })
    );
};

board.addEventListener('click', e => {
    if (gameOver || pause) return;

    const t = e.target;

    if (t.classList.contains('tic-tac-toe__cell') && !t.classList.contains('filled')) {
        t.classList.add('filled');

        const m = t.querySelector(`.${playersTurn}`);
        m.classList.remove('hidden');
        if (playersTurn === 'x') {
            m.querySelectorAll('.mark-svg').forEach((line, i) => {
                anime({
                    targets: line,
                    strokeDashoffset: [90, 0],
                    duration: 200,
                    delay: 200 * i,
                    easing: 'easeOutQuint',
                });
            });
        } else {
            anime({
                targets: m.querySelector('.mark-svg'),
                strokeDashoffset: [204, 0],
                duration: 400,
                easing: 'easeOutQuint',
            });
        }

        game[Number.parseInt(t.getAttribute('data-index'))] = playersTurn;

        if (!isGameOver(handleGameOver)) {
            playersTurn = playersTurn === 'x' ? 'o' : 'x';
            turn++;
        }
    }
});

playAgainButton.addEventListener('click', () => resetGame());

animate();
