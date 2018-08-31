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

    }

    transferGameToANextState(_state) {
        this.currentState = _state;

        if(_state.isFinished()) {
            this.status = Status.finished;
        }
        else {

        }
    }
}