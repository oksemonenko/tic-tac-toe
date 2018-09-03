import State from './State'
import {CellValueEnum} from "./enums/CellValue.enum";

export default class AIAction {

    constructor(position) {
        this.movePosition = position;
        this.minimaxVal = 0;
    }

    applyTurnToState(state) {
        let nextState = new State(state);

        nextState.board[this.movePosition] = state.turn;

        if (state.turn === CellValueEnum.O) {
            nextState.oMovesCount++;
        }
        nextState.nextTurn();

        return nextState;
    }

    static ascendingSort(firstAction, secondAction) {
        if (firstAction.minimaxVal < secondAction.minimaxVal) {
            return -1;
        }
        else if (firstAction.minimaxVal > secondAction.minimaxVal) {
            return 1;
        }
        else {
            return 0;
        }
    }

    static descendingSort(firstAction, secondAction) {
        if (firstAction.minimaxVal > secondAction.minimaxVal) {
            return -1;
        }
        else if (firstAction.minimaxVal < secondAction.minimaxVal) {
            return 1;
        }
        else {
            return 0;
        }
    }
}