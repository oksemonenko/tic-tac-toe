import AI from './AI';
import Game from './Game';
import State from './State';
import UI from './UI';
import {
    CellValue,
    Level,
    Status
} from "./constants";

export default function Human () {
    console.log('human');
    let globals = {};

    function onCellClick(event) {
        if (!Object.keys(globals).length) {
            return;
        }
        const cell = event.target;
        const occupiedCellClassName = 'board__cell--occupied';
        if (
            globals.game.status === Status.running
            && globals.game.currentState.turn === CellValue.X
            && !cell.classList.contains(occupiedCellClassName)
        ) {
            const index = Number(cell.getAttribute('id'));
            const nextState = new State(globals.game.currentState);
            nextState.board[index] = CellValue.X;

            UI.insertSymbolAtCell(index, CellValue.X);
            nextState.nextTurn();
            globals.game.transferGameToANextState(nextState);
        }
        console.log('cell clicked');
    }

    function onLevelBtnClick(event) {
        const selectedLevelClassName = 'difficulty__level--selected';
        const clickedLevelBtn = event.target;
        const selected = document.querySelector('.' + selectedLevelClassName);
        const level = event.target.getAttribute('id');
        if (!selected) {
            clickedLevelBtn.classList.add(selectedLevelClassName);
        }
        else {
            selected.classList.toggle(selectedLevelClassName);
            clickedLevelBtn.classList.add(selectedLevelClassName);
        }
        console.log('level choose', level);
    }

    function onStartBtnClick() {
        const selectedLevelClassName = 'difficulty__level--selected';
        const selectedLevel = document.querySelector('.' + selectedLevelClassName)
            ? document.querySelector('.' + selectedLevelClassName).getAttribute('id')
            : Level.easy;

        if (!selectedLevel) {
            return;
        }
        const aiPlayer = new AI(selectedLevel);
        globals.game = new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();

        console.log('start clicked', selectedLevel);
    }

    let levels = document.querySelectorAll('.difficulty__level');

    levels.forEach(level => {
        level.addEventListener('click', onLevelBtnClick);
    });

    let startBtn = document.querySelector('.start-btn');

    startBtn.addEventListener('click', onStartBtnClick);

    let cells = document.querySelectorAll('.board__cell');

    cells.forEach(cell => {
        cell.addEventListener('click', onCellClick)
    });
};
