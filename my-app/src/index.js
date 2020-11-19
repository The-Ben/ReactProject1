import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import './index.css';

const MyButton = styled(({ color, ...other }) => <Button {...other} />)({
  background: (props) =>
  props.color === 'R'
      ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', /* convert to nutral color TODO */
  border: 1,
  borderRadius: 0,
  boxShadow: (props) =>
    props.color === 'R'
      ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
      : '0 3px 5px 2px rgba(33, 203, 243, .3)',/* convert to nutral color TODO */
  color: 'black',
  height: 48,
  padding: '0 10px',
  margin: 1,
});

const MyButtonBlue = styled(({ color, ...other }) => <Button {...other} />)({
  background: (props) =>
  props.color === 'B'
      ?'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
      : 'linear-gradient(45deg, rgb(33, 150, 243) 30%, rgb(33, 203, 243) 90%)',/* convert to nutral color TODO */
  border: 1,
  borderRadius: 0,
  boxShadow: (props) =>
    props.color === 'B'
      ? '0 3px 5px 2px rgba(33, 203, 243, .3)'
      : '0 3px 5px 2px rgba(33, 203, 243, .3)',/* convert to nutral color TODO */
  color: 'black',
  height: 48,
  padding: '0 10px',
  margin: 1,
});


function Square(props) {
  return (
    <Button className="square"
            onClick={props.onClick}
            variant='outlined'>
      {props.value}
    </Button>
  );
}
  
  class Board extends React.Component {
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares)|| squares[i]){
        return;
      }
      squares[i] = this.state.redIsNext ? 'R' : 'B';
      this.setState({
        squares: squares,
        redIsNext: !this.state.redIsNext,
        player: this.props.color = !this.state.redIsNext});

    }

    renderSquare(i) {
      return (<Square
      
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}/>
       );
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
            {this.renderSquare(12)}
            {this.renderSquare(13)}
          </div>
          <div className="board-row">
            {this.renderSquare(14)}
            {this.renderSquare(15)}
            {this.renderSquare(16)}
            {this.renderSquare(17)}
            {this.renderSquare(18)}
            {this.renderSquare(19)}
            {this.renderSquare(20)}
          </div>
          <div className="board-row">
            {this.renderSquare(21)}
            {this.renderSquare(22)}
            {this.renderSquare(23)}
            {this.renderSquare(24)}
            {this.renderSquare(25)}
            {this.renderSquare(26)}
            {this.renderSquare(27)}
          </div>
          <div className="board-row">
            {this.renderSquare(28)}
            {this.renderSquare(29)}
            {this.renderSquare(30)}
            {this.renderSquare(31)}
            {this.renderSquare(32)}
            {this.renderSquare(33)}
            {this.renderSquare(34)}
          </div>
          <div className="board-row">
            {this.renderSquare(35)}
            {this.renderSquare(36)}
            {this.renderSquare(37)}
            {this.renderSquare(38)}
            {this.renderSquare(39)}
            {this.renderSquare(40)}
            {this.renderSquare(41)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        redIsNext: true,
      };
    }
    
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.redIsNext ? 'R' : 'B';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        redIsNext: !this.state.redIsNext,
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber: step,
        redIsNext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <Button 
            variant='contained'
            onClick={() => this.jumpTo(move)}>{desc}</Button>
          </li>
        );
      });

      let status;
      if (winner) {
        let name ='';
        if(winner == 'R'){
          name = 'Red';
        }else if(winner == 'B'){
          name = 'Blue';
        }
        status = 'Winner: ' + name;
      } else {
        status = 'Next player: ' + (this.state.redIsNext ? 'Red' : 'Blue');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares){
    const lines = [
      /* >  */
      [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
      [7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
      [14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
      [21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
      [28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
      [35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
      /* V */
      [0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
      [1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
      [2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
      [3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
      [4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
      [5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
      [6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
      /* \ + V  */
      [0, 8, 16, 24], [8, 16, 24, 32], [16, 24, 32, 40],
      [1, 9, 17, 25], [9, 17, 25, 33], [17, 25, 33, 41],
      [14, 22, 30, 38], [2, 10, 18, 26], [10, 18, 26, 34],
      [3, 11, 19, 27], [7, 15, 23, 31], [15, 23, 31, 39],
      /* / + ^ */
      [34, 29, 23, 17], [29, 23, 17, 11], [23, 17, 11, 5],
      [36, 30, 24, 18], [30, 24, 18, 12], [24, 18, 12, 6],
      [37, 31, 25, 19], [31, 25, 19, 13], [38, 32, 26, 20],
      /* / + V */
      [6, 12, 18, 24], [12, 18, 24, 30], [18, 24, 30, 36],
      [5, 11, 17, 23], [11, 17, 23, 29], [17, 23, 29, 34],
      [4, 10, 16, 22], [10, 16, 22, 28], [3, 9, 15, 21],
      [13, 19, 25, 31], [19, 25, 31, 37],
      [12, 18, 24, 30], [20, 26, 32, 38],
      /* \ + ^ */
      [41, 33, 25, 17], [33, 25, 17, 9], [25, 17, 9, 1],
      [40, 32, 24, 16], [32, 24, 16, 8], [24, 16, 8, 0],
      [39, 31, 23, 15], [31, 23, 15, 7], [38, 30, 22, 14],
      [34, 26, 18, 10], [26, 18, 10, 2], [27, 19, 11, 3],
      [24, 16, 8, 0]


    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
  }