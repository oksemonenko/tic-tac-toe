import AIAction from './AIAction';
import {LevelEnum} from "./enums/Level.enum";
import Game from "./Game";
import {CellValueEnum} from "./enums/CellValue.enum";
import {ResultEnum} from "./enums/Result.enum";

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
        gameLevel === LevelEnum.EASY ? this._takeEasyMove(turn) : this._takeHardMove(turn);
    };

    _takeEasyMove(turn) {
        const availableTurns = this.game.currentState.emptyCells();
        const cell = availableTurns[Math.floor(Math.random() * availableTurns.length)];
        const action = new AIAction(cell);
        const nextState = action.applyTurnToState(this.game.currentState);
        this.game.ui.insertSymbolAtCell(cell, turn);
        this.game.transferGameToANextState(nextState);
    };

    _takeHardMove(turn) {
        const availableTurns = this.game.currentState.emptyCells();

        const availableActions = availableTurns.map(position => {
            const action = new AIAction(position);
            const nextState = action.applyTurnToState(this.game.currentState);
            action.minimaxVal = this.minimaxValue(nextState);
            return action;
        });

        if (turn === CellValueEnum.X) {
            availableActions.sort(AIAction.descendingSort);
        }
        else {
            availableActions.sort(AIAction.ascendingSort);
        }

        const chosenAction = availableActions[0];
        const nextState = chosenAction.applyTurnToState(this.game.currentState);

        this.game.ui.insertSymbolAtCell(chosenAction.movePosition, turn);
        this.game.transferGameToANextState(nextState);
    };

    minimaxValue(state) {
        if (state.result !== ResultEnum.NORESULT) {
            return Game.score(state);
        }
        else {
            let stateScore;

            if (state.turn === CellValueEnum.X) {
                stateScore = -1000;
            }
            else {
                stateScore = 1000;
            }

            const availableTurns = state.emptyCells();

            const availableNextStates = availableTurns.map(position => {
                const action = new AIAction(position);
                return action.applyTurnToState(state);
            });

            availableNextStates.forEach(nextState => {
                const nextScore = this.minimaxValue(nextState);

                if (state.turn === CellValueEnum.X) {
                    if (nextScore > stateScore) {
                        stateScore = nextScore;
                    }
                }
                else {
                    if (nextScore < stateScore) {
                        stateScore = nextScore;
                    }
                }
            });

            return stateScore;
        }
    }

};
