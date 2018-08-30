import {
    Result,
    CellValue
} from './constants'

export default class State {
    
    constructor(oldState) {
        this.turn = '';
        this.oMovesCount = 0;
        this.result = Result.running;
        this.board = [];

        if (oldState) {
            this.turn = oldState.turn;
            this.oMovesCount = oldState.oMovesCount;
            this.result = oldState.result;
            this.board = oldState.board.slice();
        }
    }

    nextTurn = () => {
        this.turn = this.turn === CellValue.X ? CellValue.O : CellValue.X;
    };

    emptyCells = () => {
        let emptyCellsIndexes = [];
        this.board.forEach((cell, i) => {
            if (cell === CellValue.Empty) {
                emptyCellsIndexes.push(i);
            }
        });
        return emptyCellsIndexes;
    };

    isFinished = () => {
        let board = this.board;
        if (
            this._checkRows(board)
            || this._checkColumns(board)
            || this._checkDiagonals(board)
        ) {
            this.result = Result.win;
            return true;
        }
        if (!this._checkAvailableTurn()) {
            this.result = Result.draw;
            return true;
        }
        return false;
    };

    _checkRows = (board) => {
        for (let i = 0; i <= 20; i = i + 3) {
            if (
                board[i] !== CellValue.Empty
                && board[i] === board[i+1]
                && board[i] === board[i+2]
                && board[i] === board[i+3]
                && board[i] === board[i+4]
            ) {
                return true;
            }
        }
    };

    _checkColumns = (board) => {
        for (let i = 0; i <= 4; i = i++) {
            if (
                board[i] !== CellValue.Empty
                && board[i] === board[i+5]
                && board[i] === board[i+10]
                && board[i] === board[i+15]
                && board[i] === board[i+20]
            ) {
                return true;
            }
        }
    }  ;

    _checkDiagonals = (board) => {
        for (let i = 0, j = 6; i <= 4; i = i + 4, j = j - 2) {
            if (
                board[i] !== CellValue.Empty
                && board[i] === board[i+j]
                && board[i] === board[i+2*j]
            ) {
                return true;
            }
        }
    };

    _checkAvailableTurn = () => {
        let emptyCells = this.emptyCells();
        return !!emptyCells.length;
    }
}
