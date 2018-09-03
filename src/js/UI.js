import {ResultEnum} from "./enums/Result.enum";

export default class UI {

    constructor() {
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
        if (this.startControls) {
            this.startControls = false;

            const startControlsElement = document.querySelector('.controls__start');
            startControlsElement.classList.add('controls__start--hidden')
        }

        if (result !== ResultEnum.NORESULT) {
            const messageElement = document.getElementById(result);

            messageElement.classList.add('controls__game--visible');
        }
    }
}
