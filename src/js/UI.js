export default class UI {

    constructor() {
        this.currentView = '';
        this.startControls = true;
    }

    static insertSymbolAtCell(index, symbol) {
        const board = document.querySelectorAll('.board__cell');
        let cell = board[index];

        if (!cell.classList.contains('board__cell--occupied')) {
            cell.innerHTML = symbol;
            cell.classList.add('board__cell--occupied')
        }
    }

    static switchViewTo(player) {
        if (this.startControls) {
            this.startControls = false;

            const startControlsElement = document.querySelector('.controls__start');
            startControlsElement.classList.add('.controls__start--visible')
        }
    }
}
