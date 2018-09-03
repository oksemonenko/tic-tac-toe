import AI from './AI';
import Game from './Game';
import State from './State';
import {CellValueEnum} from "./enums/CellValue.enum";
import {LevelEnum} from "./enums/Level.enum";
import {StatusEnum} from "./enums/Status.enum";

export default function Human () {
    let globals = {};

    function onCellClick(event) {
        if (!Object.keys(globals).length) {
            alert('Please click "Start game!" button to start');
            return;
        }
        const cell = event.target;
        const occupiedCellClassName = 'board__cell--occupied';
        if (
            globals.game.status === StatusEnum.RUNNING
            && globals.game.currentState.turn === CellValueEnum.X
            && !cell.classList.contains(occupiedCellClassName)
        ) {
            const index = Number(cell.getAttribute('id'));
            const nextState = new State(globals.game.currentState);
            nextState.board[index] = CellValueEnum.X;

            globals.game.ui.insertSymbolAtCell(index, CellValueEnum.X);
            nextState.nextTurn();
            globals.game.transferGameToANextState(nextState);
        }
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
    }

    function onStartBtnClick() {
        const selectedLevelClassName = 'difficulty__level--selected';
        const selectedLevel = document.querySelector('.' + selectedLevelClassName)
            ? document.querySelector('.' + selectedLevelClassName).getAttribute('id')
            : LevelEnum.EASY;

        if (!selectedLevel) {
            return;
        }
        const aiPlayer = new AI(selectedLevel);
        globals.game = new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();
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
