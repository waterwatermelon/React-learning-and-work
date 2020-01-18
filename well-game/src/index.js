import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// TODO:
// 如果你还有充裕的时间，或者想练习一下刚刚学会的 React 新技能，这里有一些可以改进游戏的想法供你参考，这些功能的实现顺序的难度是递增的：
// ok 1.在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。 =>修改history的结构，每个元素中添加action对象，保存每一步棋的坐标
// ok 2.在历史记录列表中加粗显示当前选择的项目。 => 将stepNumber与当前项目进行比对
// 3.使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
// ok 4.添加一个可以升序或降序显示历史记录的按钮。 =>拷贝一份history用于显示。数组排序。
// ok 5.每当有人获胜时，高亮显示连成一线的 3 颗棋子。 =>保存连成一线的下标，渲染棋子时，用来判断该棋子是否需要强调显示。样式。
// ok 6.当无人获胜时，显示一个平局的消息。 =>当棋盘下满时，还未分成胜负。给出平局提示。
function Square(props) {
  return (
    <button
      className="square"
      style={props.em ?{color:'#abcdef'}:null}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}
// class Square extends React.Component {
//     onClick=()=>{
//         this.props.onClick();
//     }
//     render() {
//         return (
//             <button 
//               className="square" 
//               onClick={()=>{ this.onClick();}}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        em={this.props.winIndexs.indexOf(i)!==-1}
        value={this.props.squares[i]}
        onClick={() => { this.props.onClick(i) }}
      />)
  }
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
        seq:0,
        squares: Array(9).fill(null),
        action: {
          row: 0,
          col: 0,
        }
      }],
      xIsNext: true,
      stepNumber: 0,
      isAsec:true,
      winIndexs:[],
    }
  }
  jumpTo(step) {
    console.log('step :', step);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 === 0)
    });
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    let winner = calculateWinner(current.squares);
    if (winner || current.squares[i]) {
      return;
    }

    const squares = current.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const action = {
      row: parseInt(i / 3) + 1,
      col: parseInt(i % 3) + 1
    };
    winner = calculateWinner(squares);
    const seq = this.state.stepNumber+1;
    this.setState({
      winIndexs:winner ? winner.winIndexs:[],
      history: history.concat([{
        seq,
        squares: squares,
        action,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  handleSortHistory(){
    this.setState({
      isAsec:!this.state.isAsec,
    });
  }
  render() {
    const history = this.state.history.slice();
    let stepNumber = this.state.stepNumber;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    if(!this.state.isAsec){
      history.reverse();
      stepNumber = history.length-stepNumber -1;
    }
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={step.seq}>
          <button
            onClick={() => this.jumpTo(step.seq)} 
            style={{ marginRight: '10px' }}
          >
            {desc}
          </button>
            <span style={{ marginRight: '10px' }}>
            {`(${step.action.col},${step.action.row})`}
            </span>
          {move === stepNumber ? '<<' : ''}
        </li>
      );
    });
    let status;
    if (winner) {
      status = 'GAME OVER! WINNER IS :' + winner.winner;
    } else if( this.state.stepNumber === 9){
      status = 'EVEN! NO WIN OR LOSE.'
    }else{
      status = 'Next player is :' + (this.state.xIsNext ? 'X' : 'O');
    }
    console.log('moves', moves);
    return (
      <div className="game">
        <div className="game-board">
          <Board
            winIndexs={this.state.winIndexs}
            squares={current.squares}
            xIsNext={this.state.xIsNext}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={()=> this.handleSortHistory()}>{this.state.isAsec?'降序查看':'升序查看'}</button>
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
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winIndexs: lines[i]
      }
    }
  }
  return null;
}