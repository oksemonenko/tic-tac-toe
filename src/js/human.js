(function () {
    let globals = {};

    this.onCellClick = () => {

    };

    this.onStartBtnClick = () => {

    };

    let startBtn = document.querySelector('.start');

    startBtn.addEventListener('onclick', this.onStartBtnClick);

    let cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        cell.addEventListener('onclick', this.onCellClick)
    })
})();
