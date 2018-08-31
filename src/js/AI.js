import AIAction from './AIAction';
import {Level} from "./constants";

export default class AI {

    constructor(level) {
        this.gameLevel = level;
        this.game = {};
    }

    plays(_game) {
        this.game = _game;
    };

    notify(turn) {
        const gameLevel = this.gameLevel;
        gameLevel === Level.easy ? this._takeEasyMove(turn) : this._takeHardMove(turn);
    };

    _takeEasyMove(turn) {
        const availableTurns = this.game.currentState.emptyCells();
        const cell = availableTurns[Math.floor(Math.random() * availableTurns.length)];
        const action = new AIAction(cell);
        const nextState = action.applyTurnToState(this.game.currentState);

        this.game.transferGameToANextState(nextState);
    };

    _takeHardMove(turn) {

    };

};
