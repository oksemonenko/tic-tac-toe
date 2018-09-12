!function(e){var t={};function n(u){if(t[u])return t[u].exports;var r=t[u]={i:u,l:!1,exports:{}};return e[u].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,u){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:u})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var u=Object.create(null);if(n.r(u),Object.defineProperty(u,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(u,r,function(t){return e[t]}.bind(null,r));return u},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.CellValueEnum={X:"X",O:"O",EMPTY:"Empty"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ResultEnum={NORESULT:"no-result",XWIN:"XWin",OWIN:"OWin",DRAW:"draw"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(t,n,u){return n&&e(t.prototype,n),u&&e(t,u),t}}(),r=n(1),a=n(0);var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.turn="",this.oMovesCount=0,this.result=r.ResultEnum.NORESULT,this.board=[],t&&(this.turn=t.turn,this.oMovesCount=t.oMovesCount,this.result=t.result,this.board=t.board.slice())}return u(e,[{key:"nextTurn",value:function(){this.turn=this.turn===a.CellValueEnum.X?a.CellValueEnum.O:a.CellValueEnum.X}},{key:"emptyCells",value:function(){var e=[];return this.board.forEach(function(t,n){t===a.CellValueEnum.EMPTY&&e.push(n)}),e}},{key:"isFinished",value:function(){var e=this.board;return!!(this._checkRows(e)||this._checkColumns(e)||this._checkDiagonals(e))||!this._checkAvailableTurn()&&(this.result=r.ResultEnum.DRAW,!0)}},{key:"_checkRows",value:function(e){for(var t=0;t<=20;t+=5)if(e[t]!==a.CellValueEnum.EMPTY&&e[t]===e[t+1]&&e[t]===e[t+2]&&e[t]===e[t+3]&&e[t]===e[t+4])return this.result=e[t]===a.CellValueEnum.X?r.ResultEnum.XWIN:r.ResultEnum.OWIN,!0;return!1}},{key:"_checkColumns",value:function(e){for(var t=0;t<=4;t++)if(e[t]!==a.CellValueEnum.EMPTY&&e[t]===e[t+5]&&e[t]===e[t+10]&&e[t]===e[t+15]&&e[t]===e[t+20])return this.result=e[t]===a.CellValueEnum.X?r.ResultEnum.XWIN:r.ResultEnum.OWIN,!0;return!1}},{key:"_checkDiagonals",value:function(e){return this._checkFirstDiagonal(e)||this._checkSecondDiagonal(e)}},{key:"_checkFirstDiagonal",value:function(e){return e[0]!==a.CellValueEnum.EMPTY&&e[0]===e[6]&&e[0]===e[12]&&e[0]===e[18]&&e[0]===e[24]&&(this.result=e[0]===a.CellValueEnum.X?r.ResultEnum.XWIN:r.ResultEnum.OWIN,!0)}},{key:"_checkSecondDiagonal",value:function(e){return e[4]!==a.CellValueEnum.EMPTY&&e[4]===e[8]&&e[4]===e[12]&&e[4]===e[16]&&e[4]===e[20]&&(this.result=e[4]===a.CellValueEnum.X?r.ResultEnum.XWIN:r.ResultEnum.OWIN,!0)}},{key:"_checkAvailableTurn",value:function(){return!!this.emptyCells().length}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.LevelEnum={EASY:"easy",HARD:"hard"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(t,n,u){return n&&e(t.prototype,n),u&&e(t,u),t}}(),r=s(n(2)),a=s(n(10)),l=n(0),i=n(5),o=n(1);function s(e){return e&&e.__esModule?e:{default:e}}var c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ai=t,this.ui=new a.default,this.currentState=new r.default,this.currentState.board=[];for(var n=0;n<=24;n++)this.currentState.board.push(l.CellValueEnum.EMPTY);this.currentState.turn=l.CellValueEnum.X,this.status=i.StatusEnum.STARTING}return u(e,[{key:"start",value:function(){this.status===i.StatusEnum.STARTING&&(this.transferGameToANextState(this.currentState),this.status=i.StatusEnum.RUNNING)}},{key:"transferGameToANextState",value:function(e){this.currentState=e;var t=e.isFinished();this.ui.switchViewTo(e.result),t?this.status=i.StatusEnum.FINISHED:this.currentState.turn===l.CellValueEnum.O&&this.ai.notify(l.CellValueEnum.O)}}],[{key:"score",value:function(e){if(e.result!==o.ResultEnum.NORESULT)return e.result===o.ResultEnum.XWIN?26-e.oMovesCount:e.result===o.ResultEnum.OWIN?-26+e.oMovesCount:0}}]),e}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.StatusEnum={STARTING:"starting",RUNNING:"running",FINISHED:"finished"}},function(e,t,n){"use strict";var u=function(e){return e&&e.__esModule?e:{default:e}}(n(7));n(12),(0,u.default)()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e={};function t(t){if(Object.keys(e).length){var n=t.target;if(e.game.status===o.StatusEnum.RUNNING&&e.game.currentState.turn===l.CellValueEnum.X&&!n.classList.contains("board__cell--occupied")){var u=+n.getAttribute("id"),r=new a.default(e.game.currentState);r.board[u]=l.CellValueEnum.X,e.game.ui.insertSymbolAtCell(u,l.CellValueEnum.X),r.nextTurn(),e.game.transferGameToANextState(r)}}else alert('Please click "Start game!" button to start')}function n(e){var t=e.target,n=document.querySelector(".difficulty__level--selected");e.target.getAttribute("id");n?(n.classList.toggle("difficulty__level--selected"),t.classList.add("difficulty__level--selected")):t.classList.add("difficulty__level--selected")}document.querySelectorAll(".difficulty__level").forEach(function(e){e.addEventListener("click",n)}),document.querySelector(".start-btn").addEventListener("click",function(){var t=document.querySelector(".difficulty__level--selected")?document.querySelector(".difficulty__level--selected").getAttribute("id"):i.LevelEnum.EASY;if(!t)return;var n=new u.default(t);e.game=new r.default(n),n.plays(e.game),e.game.start()}),document.querySelectorAll(".board__cell").forEach(function(e){e.addEventListener("click",t)})};var u=s(n(8)),r=s(n(4)),a=s(n(2)),l=n(0),i=n(3),o=n(5);function s(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(t,n,u){return n&&e(t.prototype,n),u&&e(t,u),t}}(),r=c(n(9)),a=n(3),l=c(n(4)),i=n(0),o=n(1),s=n(11);function c(e){return e&&e.__esModule?e:{default:e}}var f=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.gameLevel=t,this.game={}}return u(e,[{key:"plays",value:function(e){this.game=e}},{key:"notify",value:function(e){this.gameLevel===a.LevelEnum.EASY?this._takeEasyMove(e):this._takeHardMove(e)}},{key:"_takeEasyMove",value:function(e){var t=this.game.currentState.emptyCells(),n=t[Math.floor(Math.random()*t.length)],u=new r.default(n).applyTurnToState(this.game.currentState);this.game.ui.insertSymbolAtCell(n,e),this.game.transferGameToANextState(u)}},{key:"_takeHardMove",value:function(e){var t=this,n=this.game.currentState.emptyCells(),u=void 0;if(n.length>=8){var a=this._getNextOTurn();if(-1===a)this._takeEasyMove(e);else{var l=(u=new r.default(a)).applyTurnToState(this.game.currentState);this.game.ui.insertSymbolAtCell(u.movePosition,e),this.game.transferGameToANextState(l)}}else{var o=n.map(function(e){var n=new r.default(e),u=n.applyTurnToState(t.game.currentState);return n.minimaxVal=t.minimaxValue(u),n});e===i.CellValueEnum.X?o.sort(r.default.descendingSort):o.sort(r.default.ascendingSort);var s=(u=o[0]).applyTurnToState(this.game.currentState);this.game.ui.insertSymbolAtCell(u.movePosition,e),this.game.transferGameToANextState(s)}}},{key:"_countX",value:function(e,t){var n=0;return t.forEach(function(t){e[t]===i.CellValueEnum.X&&n++}),n}},{key:"_getAnyIndexOfOTurn",value:function(e,t){var n=[];return t.forEach(function(t){e[t]===i.CellValueEnum.EMPTY&&n.push(t)}),n[0]}},{key:"_getNextOTurn",value:function(){var e=this,t=-1;return s.WinCombinations.forEach(function(n){if(4===e._countX(e.game.currentState.board,n)){var u=e._getAnyIndexOfOTurn(e.game.currentState.board,n);void 0!==u&&(t=u)}}),t>=0?t:-1}},{key:"minimaxValue",value:function(e){var t=this;if(e.result!==o.ResultEnum.NORESULT)return l.default.score(e);var n=void 0;return n=e.turn===i.CellValueEnum.X?-1e3:1e3,e.emptyCells().map(function(t){return new r.default(t).applyTurnToState(e)}).forEach(function(u){var r=t.minimaxValue(u);e.turn===i.CellValueEnum.X?r>n&&(n=r):r<n&&(n=r)}),n}}]),e}();t.default=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(t,n,u){return n&&e(t.prototype,n),u&&e(t,u),t}}(),r=function(e){return e&&e.__esModule?e:{default:e}}(n(2)),a=n(0);var l=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.movePosition=t,this.minimaxVal=0}return u(e,[{key:"applyTurnToState",value:function(e){var t=new r.default(e);return t.board[this.movePosition]=e.turn,e.turn===a.CellValueEnum.O&&t.oMovesCount++,t.nextTurn(),t}}],[{key:"ascendingSort",value:function(e,t){return e.minimaxVal<t.minimaxVal?-1:e.minimaxVal>t.minimaxVal?1:0}},{key:"descendingSort",value:function(e,t){return e.minimaxVal>t.minimaxVal?-1:e.minimaxVal<t.minimaxVal?1:0}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var u=t[n];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(e,u.key,u)}}return function(t,n,u){return n&&e(t.prototype,n),u&&e(t,u),t}}(),r=n(1);var a=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.startControls=!0}return u(e,[{key:"insertSymbolAtCell",value:function(e,t){var n=document.querySelectorAll(".board__cell")[e];n.classList.contains("board__cell--occupied")||(n.innerHTML=t,n.classList.add("board__cell--occupied"))}},{key:"switchViewTo",value:function(e){this.startControls&&(this.startControls=!1,document.querySelector(".controls__start").classList.add("controls__start--hidden"));e!==r.ResultEnum.NORESULT&&document.getElementById(e).classList.add("controls__game--visible")}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.WinCombinations=[[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],[0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],[0,6,12,18,24],[4,8,12,16,20]]},function(e,t,n){}]);