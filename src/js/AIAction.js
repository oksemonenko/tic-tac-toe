import State from './State'

export default class AIAction {

    constructor(position) {
        this.movePosition = position;
    }

    applyTurnToState(state) {
        let nextState = new State(state);

        nextState.board[this.movePosition] = state.turn;
        nextState.nextTurn();

        return nextState;
    }
}