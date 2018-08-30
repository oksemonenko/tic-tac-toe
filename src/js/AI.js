import {Level} from "./constants";

export default class AI {

    constructor(level) {
        this.gameLevel = level;
        this.game = {};
    }

    plays = (_game) => {
        this.game = _game;
    };

    notify = (turn) => {
        const gameLevel = this.gameLevel;
        gameLevel === Level.easy ? this._takeEasyMove(turn) : this._takeHardMove(turn);
    };

    _takeEasyMove = (turn) => {

    };

    _takeHardMove = (turn) => {

    };

};
