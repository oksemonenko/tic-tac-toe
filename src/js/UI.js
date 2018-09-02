import {ResultEnum} from "./enums/Result.enum";

export default class UI {

    constructor() {
        this.currentView = '';
        this.startControls = true;
    }

    insertSymbolAtCell(index, symbol) {
        const board = document.querySelectorAll('.board__cell');
        let cell = board[index];

        if (!cell.classList.contains('board__cell--occupied')) {
            cell.innerHTML = symbol;
            cell.classList.add('board__cell--occupied')
        }
    }

    switchViewTo(result) {
        this.currentView = result;

        if (this.startControls) {
            this.startControls = false;

            const startControlsElement = document.querySelector('.controls__start');
            startControlsElement.classList.add('controls__start--hidden')
        }

        const messageElements = document.querySelectorAll('.controls__game--visible');
        messageElements.forEach(messageElement => {
            if (messageElement.classList.contains('controls__game--visible')) {
                messageElement.classList.remove('controls__game--visible');
            }
        });

        const messageElement = document.getElementById(result);
        messageElement.classList.add('controls__game--visible');
    }
}
