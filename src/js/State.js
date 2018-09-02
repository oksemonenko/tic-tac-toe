import {ResultEnum} from "./enums/Result.enum";
import {CellValueEnum} from "./enums/CellValue.enum";

export default class State {
    
    constructor(oldState) {
        this.turn = '';
        this.oMovesCount = 0;
        this.result = ResultEnum.NORESULT;
        this.board = [];

        if (oldState) {
            this.turn = oldState.turn;
            this.oMovesCount = oldState.oMovesCount;
            this.result = oldState.result;
            this.board = oldState.board.slice();
        }
    }

    nextTurn() {
        this.turn = this.turn === CellValueEnum.X ? CellValueEnum.O : CellValueEnum.X;
    };

    emptyCells() {
        let emptyCellsIndexes = [];
        this.board.forEach((cell, i) => {
            if (cell === CellValueEnum.EMPTY) {
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
            this.result = ResultEnum.DRAW;
            return true;
        }
        return false;
    };

    _checkRows(board) {
        for (let i = 0; i < 20; i = i + 5) {
            if (board[i] !== CellValueEnum.EMPTY) {
                if (board[i] === board[i+1]
                    && board[i] === board[i+2]
                    && board[i] === board[i+3]
                    && board[i] === board[i+4]
                ) {
                    this.result = board[i] === CellValueEnum.X ? ResultEnum.XWIN : ResultEnum.OWIN;
                    return true;
                }
            }
        }
        return false;
    };

    _checkColumns(board) {
        for (let i = 0; i < 4; i++) {
            if (
                board[i] !== CellValueEnum.EMPTY
                && board[i] === board[i+5]
                && board[i] === board[i+10]
                && board[i] === board[i+15]
                && board[i] === board[i+20]
            ) {
                this.result = board[i] === CellValueEnum.X ? ResultEnum.XWIN : ResultEnum.OWIN;
                return true;
            }
        }
        return false;
    }  ;

    _checkDiagonals(board) {
        return this._checkFirstDiagonal(board) || this._checkSecondDiagonal(board);
    };

    _checkFirstDiagonal(board) {
        if (board[0] !== CellValueEnum.EMPTY
            && board[0] === board[6]
            && board[0] === board[12]
            && board[0] === board[18]
            && board[0] === board[24]) {
            this.result = board[0] === CellValueEnum.X ? ResultEnum.XWIN : ResultEnum.OWIN;
            return true;
        }
        return false;
    }


    _checkSecondDiagonal(board) {
        if (board[4] !== CellValueEnum.EMPTY
            && board[4] === board[8]
            && board[4] === board[12]
            && board[4] === board[16]
            && board[4] === board[20]) {
            this.result = board[4] === CellValueEnum.X ? ResultEnum.XWIN : ResultEnum.OWIN;
            return true;
        }
        return false;
    }

    _checkAvailableTurn() {
        let emptyCells = this.emptyCells();
        return !!emptyCells.length;
    }
}
