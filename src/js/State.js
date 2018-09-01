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

    nextTurn() {
        this.turn = this.turn === CellValue.X ? CellValue.O : CellValue.X;
    };

    emptyCells() {
        let emptyCellsIndexes = [];
        this.board.forEach((cell, i) => {
            if (cell === CellValue.Empty) {
                emptyCellsIndexes.push(i);
            }
        });
        return emptyCellsIndexes;
    };

    isFinished() {
        let board = this.board;
        if (
            this._checkRows(board)
            || this._checkColumns(board)
            || this._checkDiagonals(board)
        ) {
            return true;
        }
        if (!this._checkAvailableTurn()) {
            this.result = Result.draw;
            return true;
        }
        return false;
    };

    _checkRows(board) {
        for (let i = 0; i < 20; i = i + 5) {
            if (board[i] !== CellValue.Empty) {
                if (board[i] === board[i+1]
                    && board[i] === board[i+2]
                    && board[i] === board[i+3]
                    && board[i] === board[i+4]
                ) {
                    this.result = board[i] === CellValue.X ? Result.XWin : Result.OWin;
                    return true;
                }
            }
        }
        return false;
    };

    _checkColumns(board) {
        for (let i = 0; i < 4; i++) {
            if (
                board[i] !== CellValue.Empty
                && board[i] === board[i+5]
                && board[i] === board[i+10]
                && board[i] === board[i+15]
                && board[i] === board[i+20]
            ) {
                this.result = board[i] === CellValue.X ? Result.XWin : Result.OWin;
                return true;
            }
        }
        return false;
    }  ;

    _checkDiagonals(board) {
        return this._checkFirstDiagonal(board) || this._checkSecondDiagonal(board);
    };

    _checkFirstDiagonal(board) {
        if (board[0] !== CellValue.Empty
            && board[0] === board[6]
            && board[0] === board[12]
            && board[0] === board[18]
            && board[0] === board[24]) {
            this.result = board[0] === CellValue.X ? Result.XWin : Result.OWin;
            return true;
        }
        return false;
    }


    _checkSecondDiagonal(board) {
        if (board[4] !== CellValue.Empty
            && board[4] === board[8]
            && board[4] === board[12]
            && board[4] === board[16]
            && board[4] === board[20]) {
            this.result = board[4] === CellValue.X ? Result.XWin : Result.OWin;
            return true;
        }
        return false;
    }

    _checkAvailableTurn() {
        let emptyCells = this.emptyCells();
        return !!emptyCells.length;
    }
}
