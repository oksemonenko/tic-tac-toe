import AI from './AI';
import Game from './Game';
import {Level} from "./constants";

export default function Human () {
    console.log('human');
    let globals = {};

    function onCellClick() {
        console.log('cell clicked');
    }

    function onLevelBtnClick(event) {
        const clickedLevelBtn = event.target;
        const selected = document.querySelector('.selected');
        const level = event.target.getAttribute('id');
        if (!selected) {
            clickedLevelBtn.classList.add('selected');
        }
        else {
            selected.classList.toggle('selected');
            clickedLevelBtn.classList.add('selected');
        }
        console.log('level choose', level);
    }

    function onStartBtnClick() {
        const selectedLevel = document.querySelector('.selected')
            ? document.querySelector('.selected').getAttribute('id')
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

    let levels = document.querySelectorAll('.level');

    levels.forEach(level => {
        level.addEventListener('click', onLevelBtnClick);
    });

    let startBtn = document.querySelector('.start');

    startBtn.addEventListener('click', onStartBtnClick);

    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('click', onCellClick)
    })
};
