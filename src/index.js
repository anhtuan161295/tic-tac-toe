import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    let red = props.winner ? " red" : "";
    return (
        <button className={"square" + red} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, row, col, win) {
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i, row, col)}
                winner={win}
            />
        );
    }

    render() {
        let squares = []; // square array
        let num = 0; // square number or square index
        let row = []; // row array
        let win = false; // the flag to identify the square that causes the wiin
        let rowNum = 3; // number of rows
        let colNum = 3; // number of colums

        // every square will have row and column value begin from 1 e.g (1, 1) (1, 2) and so on
        for (let i = 1; i <= rowNum; i++) {
            row = []; // reset this array at the begin of new row
            for (let j = 1; j <= colNum; j++) {

                if (this.props.winSquares) {
                    win = this.props.winSquares.indexOf(num) !== -1 ? true : false;
                }

                row.push(this.renderSquare(num, i, j, win));
                num++;
            }
            squares.push(<div key={num} className="board-row">{row}</div>);
        }

        return (
            <div>
                {squares}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    clicked: Array(2).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            ascendingOrder: true
        };
    }

    handleClick(i, row, col) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    clicked: [row, col]
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext

        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    toggleOrder() {
        this.setState({
            ascendingOrder: !this.state.ascendingOrder
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const draw = isDraw(current.squares);
        let winSquares = null;

        const moves = history.map((value, index) => {

            let desc = 'Go to game start';
            let row = null;
            let col = null;

            if (index > 0) {
                desc = 'Go to move #' + index;
                row = this.state.history[index].clicked[0];
                col = this.state.history[index].clicked[1];
                desc += " (Row: " + row + ", Column: " + col + ")";
            }

            // bold selected button, we add css class based on index
            // Every history has a step number, so we can get the selected history based on comparing index == step number
            let bold = index === this.state.stepNumber ? "bold" : "";

            return (
                <li key={index}>
                    <button className={bold} onClick={() => this.jumpTo(index)}>
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner[0];
            // If winner is set, set the array of win squares keys to winSquares and pass it to Board
            winSquares = winner[1];
        } else if (draw) {
            status = "Result is draw"
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        //Add a toggle button that lets you sort the moves in either ascending or descending order.
        if (!this.state.ascendingOrder) {
            moves.sort(function (a, b) {
                return b.key - a.key;
            });
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i, row, col) => this.handleClick(i, row, col)}
                        winSquares={winSquares}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.toggleOrder()}>Change order</button>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}

function isDraw(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            return false;
        }
    }
    return true;
}
