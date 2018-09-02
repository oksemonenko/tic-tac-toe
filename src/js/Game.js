import State from './State';
import UI from './UI';
import {CellValueEnum} from "./enums/CellValue.enum";
import {StatusEnum} from "./enums/Status.enum";

export default class Game {

    constructor(autoPlayer) {
        this.ai = autoPlayer;
        this.ui = new UI();
        this.currentState = new State();

        this.currentState.board = [];

        for (let i = 0; i <= 24; i++) {
            this.currentState.board.push(CellValueEnum.EMPTY);
        }

        this.currentState.turn = CellValueEnum.X;
        this.status = StatusEnum.STARTING;
        console.log('game loaded');
    }

    start() {
        if (this.status === StatusEnum.STARTING) {
            this.transferGameToANextState(this.currentState);
            this.status = StatusEnum.RUNNING;
        }
    }

    transferGameToANextState(_state) {
        this.currentState = _state;
        const isStateFinished = _state.isFinished();
        this.ui.switchViewTo(_state.result);

        if(isStateFinished) {
            this.status = StatusEnum.FINISHED;
        }
        else {
            if (this.currentState.turn === CellValueEnum.O) {
                this.ai.notify(CellValueEnum.O);
            }

            console.log('transferGameToANextState', _state.result);
        }
    }
}