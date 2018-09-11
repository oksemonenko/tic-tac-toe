import AIAction from './AIAction';
import {LevelEnum} from "./enums/Level.enum";
import Game from "./Game";
import {CellValueEnum} from "./enums/CellValue.enum";
import {ResultEnum} from "./enums/Result.enum";

export default class AI {

    constructor(level) {
        this.gameLevel = level;
        this.game = {};
        this.currentCount = 0;
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

    _countX(board, combination) {
        let count = 0;
        combination.forEach(item => {
            if (board[item] === CellValueEnum.X) {
                count++;
            }
        });
        console.log('count X', combination, count);
        return count;
    }

    _getAnyIndexOfOTurn(board, combination) {
        let emptyCells = [];
        combination.forEach(item => {
            if (board[item] === CellValueEnum.EMPTY) {
                emptyCells.push(item);
            }
        });
        console.log('emptyCells[0]', emptyCells[0]);
        return emptyCells[0];
    }

    _getNextOTurn() {
        const winCombinations = [
            [0,1,2,3,4],
            [5,6,7,8,9],
            [10,11,12,13,14],
            [15,16,17,18,19],
            [20,21,22,23,24],

            [0,5,10,15,20],
            [1,6,11,16,21],
            [2,7,12,17,22],
            [3,8,13,18,23],
            [4,9,14,19,24],

            [0,6,12,18,24],
            [4,8,12,16,20]
        ];

        let nextTurn = -1;
        winCombinations.forEach(combination => {
            if (this._countX(this.game.currentState.board, combination) === 4) {
                let newNextTurn =  this._getAnyIndexOfOTurn(this.game.currentState.board, combination);
                if (newNextTurn !== undefined) {
                    nextTurn = newNextTurn;
                }
            }
        });
        if (nextTurn >= 0) {
            return nextTurn;
        }
        else {
            return -1;
        }
    }

    _takeHardMove(turn) {
        const availableTurns = this.game.currentState.emptyCells();
        let chosenAction;

        if (availableTurns.length >= 8) {
            let nextTurn = this._getNextOTurn();

            if (nextTurn === -1) {
                this._takeEasyMove(turn);
            }
            else {
                chosenAction = new AIAction(nextTurn);
                const nextState = chosenAction.applyTurnToState(this.game.currentState);

                this.game.ui.insertSymbolAtCell(chosenAction.movePosition, turn);
                this.game.transferGameToANextState(nextState);
            }
        }
        else {
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

            chosenAction = availableActions[0];
            const nextState = chosenAction.applyTurnToState(this.game.currentState);

            this.game.ui.insertSymbolAtCell(chosenAction.movePosition, turn);
            this.game.transferGameToANextState(nextState);
        }
    };

    minimaxValue(state) {
        this.currentCount++;
        console.log('currentCount', this.currentCount);

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
