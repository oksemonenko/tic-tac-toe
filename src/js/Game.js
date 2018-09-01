import State from './State'
import {
    CellValue,
    Status
} from "./constants";

export default class Game {

    constructor(autoPlayer) {
        this.ai = autoPlayer;
        this.currentState = new State();

        this.currentState.board = [];

        for (let i = 0; i <= 24; i++) {
            this.currentState.board.push(CellValue.Empty);
        }

        this.currentState.turn = CellValue.X;
        this.status = Status.starting;
        console.log('game loaded');
    }

    start() {
        if (this.status === Status.starting) {
            this.transferGameToANextState(this.currentState);
            this.status = Status.running;
        }
    }

    transferGameToANextState(_state) {
        this.currentState = _state;
        const isStateFinished = _state.isFinished();

        if(isStateFinished) {
            this.status = Status.finished;
        }
        else {
            console.log('transferGameToANextState');
        }
    }
}