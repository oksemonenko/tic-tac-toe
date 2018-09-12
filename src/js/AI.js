import AIAction from './AIAction';
import {LevelEnum} from "./enums/Level.enum";
import Game from "./Game";
import {CellValueEnum} from "./enums/CellValue.enum";
import {ResultEnum} from "./enums/Result.enum";
import {WinCombinations} from "./constants/WinCombinations";

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
        let chosenAction;

        // If there are more then 8 empty cells use algorithm to take move on line
        // where there are 4 of X cells or if there are no such lines take a random move
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
        // If there are less then 8 empty cells use minimax algorithm
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

    _countX(board, combination) {
        let count = 0;
        combination.forEach(item => {
            if (board[item] === CellValueEnum.X) {
                count++;
            }
        });
        return count;
    }

    _getAnyIndexOfOTurn(board, combination) {
        let emptyCells = [];
        combination.forEach(item => {
            if (board[item] === CellValueEnum.EMPTY) {
                emptyCells.push(item);
            }
        });
        return emptyCells[0];
    }

    _getNextOTurn() {
        const winCombinations = WinCombinations;
        let nextTurn = -1;
        winCombinations.forEach(combination => {
            if (this._countX(this.game.currentState.board, combination) === 4) {
                let newNextTurn = this._getAnyIndexOfOTurn(this.game.currentState.board, combination);
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
