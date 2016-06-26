/*
00 10 20
01 11 21
02 12 22
*/
//var human = [];
// diagonals wont matter for human, middle is ours

var hr = [0, 0, 0];
var hc = [0, 0, 0];
var computer;
var humanWins = false;
var m;
var turnCount = 0;
var gameOver = false;
var top1;
var left;
var width;
var deg;
var audio = document.getElementById("myAudio");
var audio2 = document.getElementById("myAudio2");

//two loops cross reference each column for match. then diagonals
var board = [

  ["00", null],
  ["10", null],
  ["20", null],
  ["01", null],
  ["11", null],
  ["21", null],
  ["02", null],
  ["12", null],
  ["22", null]

];

function moveFinder() {
  //find the best possible move
  //start out with the least priority
  turnCount++;
  if (turnCount === 5) {
    gameOver = "turns";
  }
  c = null;
  turn = "computer";
  // computer at end
  for (i = 0; i < board.length; i++) {
    if (board[i][1] === null) {
      c = document.getElementById(board[i][0]);
      m = i;
      break;
    }
  }

  for (i = 0; i < 3; i++) {
    if (hr[i] === 3) {
      humanWins = true;
      left = "50%;";
      if (i === 0) {
        top1 = "calc(50% - 201px);";
      } else if (i === 1) {
        top1 = "50%;";
      } else {
        top1 = "calc(50% + 201px);";
      }
      deg = "0";
      width = "500px;";
      break;
    } else if (hc[i] === 3) {
      humanWins = true;
      top1 = "50%;";
      if (i === 0) {
        left = "calc(50% - 201px);";
      } else if (i === 1) {
        left = "50%;";
      } else {
        left = "calc(50% + 201px);";
      }
      deg = "90";
      width = "500px;";
      break;
    }
  }
  if (humanWins === false) {

    for (i = 0; i < 3; i++) {
      if (hr[i] === 2) {
        //turn to string
        for (j = 0; j < board.length; j++) {
          if (board[j][0].substr(1, 1) === String(i) && board[j][1] === null) {
            c = document.getElementById(board[j][0]);
            m = j;
          }
        }
      } else if (hc[i] === 2) {
        for (j = 0; j < board.length; j++) {
          if (board[j][0].substr(0, 1) === String(i) && board[j][1] === null) {
            c = document.getElementById(board[j][0]);
            m = j;
          }
        }
      }

    }

    //corners
    if (board[0][1] === null && board[8][1] === computer) {
      c = document.getElementById(board[0][0]);
      m = 0;
      gameOver = "computerWins";
      top1 = "50%;";
      left = "50%;";
      deg = "45";
      width = "650px;";

    } else if (board[0][1] === computer && board[8][1] === null) {
      c = document.getElementById(board[8][0]);
      m = 8;
      gameOver = "computerWins";
      top1 = "50%;";
      left = "50%;";
      deg = "45";
      width = "650px;";

    } else if (board[2][1] === computer && board[6][1] === null) {
      c = document.getElementById(board[6][0]);
      m = 6;
      gameOver = "computerWins";
      top1 = "50%;";
      left = "50%;";
      deg = "135";
      width = "650px;";
    } else if (board[2][1] === null && board[6][1] === computer) {
      c = document.getElementById(board[2][0]);
      m = 2;
      gameOver = "computerWins";
      top1 = "50%;";
      left = "50%;";
      deg = "135";
      width = "650px;";
    }

    for (i = 0; i < board.length; i++) {
      for (j = 0; j < board.length; j++) {
        if (i !== j) {
          if (board[i][0].substr(0, 1) === board[j][0].substr(0, 1) &&
            board[i][1] === computer && board[j][1] === computer) {
            for (t = 0; t < board.length; t++) {
              if (t !== i && t !== j && board[t][0].substr(0, 1) === board[i][0].substr(0, 1) &&
                board[t][1] === null) {
                c = document.getElementById(board[t][0]);
                m = t;
                gameOver = "computerWins";

                top1 = "50%;";
                if (board[t][0].substr(0, 1) === "0") {
                  left = "calc(50% - 201px);";
                } else if (board[t][0].substr(0, 1) === "1") {
                  left = "50%;";
                } else {
                  left = "calc(50% + 201px);";
                }

                deg = "90";
                width = "500px;";
                break;
              }
            }
          }

          if (board[i][0].substr(1, 1) === board[j][0].substr(1, 1) &&
            board[i][1] === computer && board[j][1] === computer) {
            for (t = 0; t < board.length; t++) {
              if (t !== i && t !== j && board[t][0].substr(1, 1) === board[i][0].substr(1, 1) &&
                board[t][1] === null) {
                c = document.getElementById(board[t][0]);
                m = t;
                gameOver = "computerWins";

                left = "50%;";
                if (board[t][0].substr(1, 1) === "0") {
                  top1 = "calc(50% - 201px);";
                } else if (board[t][0].substr(1, 1) === "1") {
                  top1 = "50%;";
                } else {
                  top1 = "calc(50% + 201px);";
                }

                deg = "0";
                width = "500px;";
                break;
              }
            }
          }
        }
      }
    }

    board[m][1] = computer;
  }
}

var l = 2;
var c = document.getElementById("11");
var draw;
var side = false;

function user(text) {

  side = text;
  document.body.style.background = "#fff";
  document.getElementById("message").remove();
  if (side === "O") {
    draw = setInterval(ex, 20);
    computer = "X";
  } else {
    draw = setInterval(circle, 20);
    computer = "O";
  }
  board[4][1] = computer;
  turnCount++;
}

function circle() {

  var r = 60;
  var ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();

  var x = c.width / 2;
  var y = c.height / 2;

  ctx.arc(x, y, r, l * Math.PI, 2 * Math.PI);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath;
  l = l - .1;
  if (l < -.1) {

    l = 2;
    clearInterval(draw);

    if (gameOver === "computerWins") {

      var div = document.createElement('div');
      div.setAttribute("id", "win");

      document.body.appendChild(div);

      var css = "transform: translate(-50%,-50%) rotate(" + deg + "deg); position: absolute; top:" + top1 + "left:" + left + "width:" + width + "border: 3px dashed red; animation: blinker 1s linear infinite;";

      div.style.cssText = css;

      audio.play();

      alert("You Lose!!");
      div.remove();

      hr = [0, 0, 0];
      hc = [0, 0, 0];

      for (i = 0; i < board.length; i++) {
        c = document.getElementById(board[i][0]);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        board[i][1] = null;
      }
      c = document.getElementById(board[4][0]);
      draw = setInterval(circle, 20);
      board[4][1] = computer;
      turnCount = 1;
      gameOver = false;

    } else if (gameOver === "turns") {

      audio.play();
      alert("No one wins!");

      hr = [0, 0, 0];
      hc = [0, 0, 0];

      for (i = 0; i < board.length; i++) {
        c = document.getElementById(board[i][0]);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        board[i][1] = null;
      }
      c = document.getElementById(board[4][0]);
      draw = setInterval(circle, 20);
      board[4][1] = computer;
      turnCount = 1;
      gameOver = false;
    }
    if (turn === "human") {
      //has to be x
      //move finder for c then run 

      moveFinder();
      if (humanWins === false) {
        draw = setInterval(ex, 20);
      } else {

        humanWins = false;

        var div = document.createElement('div');
        div.setAttribute("id", "win");

        document.body.appendChild(div);

        var css = "transform: translate(-50%,-50%) rotate(" + deg + "deg); position: absolute; top:" + top1 + "left:" + left + "width:" + width + "border: 3px dashed red; animation: blinker 1s linear infinite;";

        div.style.cssText = css;
        audio2.play();
        alert("You Win!!");
        div.remove();

        hr = [0, 0, 0];
        hc = [0, 0, 0];

        for (i = 0; i < board.length; i++) {
          c = document.getElementById(board[i][0]);
          var ctx = c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
          board[i][1] = null;
        }
        c = document.getElementById(board[4][0]);
        draw = setInterval(ex, 20);
        board[4][1] = computer;
        turnCount = 1;
        gameOver = false;

      }
    }
  }
}

function ex() {

  var r = 60;
  var ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();

  var x = c.width;
  var y = c.height;

  if (l > 1) {
    ctx.moveTo(45, 45);
    ctx.lineTo(155 - ((l - 1) * 115), 155 - ((l - 1) * 115));
  } else {
    ctx.moveTo(45, 45);
    ctx.lineTo(155, 155);

    ctx.moveTo(x - 45, 45);
    ctx.lineTo(45 + l * 115, 155 - l * 115);
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.stroke();
  ctx.closePath;
  l = l - .05;
  if (l < -.05) {
    l = 2;
    clearInterval(draw);

    if (gameOver === "computerWins") {

      var div = document.createElement('div');
      div.setAttribute("id", "win");

      document.body.appendChild(div);

      var css = "transform: translate(-50%,-50%) rotate(" + deg + "deg); position: absolute; top:" + top1 + "left:" + left + "width:" + width + "border: 3px dashed red; animation: blinker 1s linear infinite;";

      div.style.cssText = css;

      audio.play();

      alert("You Lose!!");
      div.remove();

      hr = [0, 0, 0];
      hc = [0, 0, 0];

      for (i = 0; i < board.length; i++) {
        c = document.getElementById(board[i][0]);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        board[i][1] = null;
      }
      c = document.getElementById(board[4][0]);
      draw = setInterval(ex, 20);
      board[4][1] = computer;
      turnCount = 1;
      gameOver = false;

    } else if (gameOver === "turns") {

      audio.play();
      alert("No one wins!");

      hr = [0, 0, 0];
      hc = [0, 0, 0];

      for (i = 0; i < board.length; i++) {
        c = document.getElementById(board[i][0]);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        board[i][1] = null;
      }
      c = document.getElementById(board[4][0]);
      draw = setInterval(ex, 20);
      board[4][1] = computer;
      turnCount = 1;
      gameOver = false;
    }
    if (turn === "human") {
      //has to be x
      //move finder for c then run 

      moveFinder();
      if (humanWins === false) {
        draw = setInterval(circle, 20);
      } else {

        humanWins = false;

        var div = document.createElement('div');
        div.setAttribute("id", "win");

        document.body.appendChild(div);

        var css = "transform: translate(-50%,-50%) rotate(" + deg + "deg); position: absolute; top:" + top1 + "left:" + left + "width:" + width + "border: 3px dashed red; animation: blinker 1s linear infinite;";

        div.style.cssText = css;
        audio2.play();
        alert("You Win!!");
        div.remove();

        hr = [0, 0, 0];
        hc = [0, 0, 0];

        for (i = 0; i < board.length; i++) {
          c = document.getElementById(board[i][0]);
          var ctx = c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
          board[i][1] = null;
        }
        c = document.getElementById(board[4][0]);
        draw = setInterval(circle, 20);
        board[4][1] = computer;
        turnCount = 1;
        gameOver = false;

      }
    }
  }
}

var turn;
//this.id
function drawing(square) {
  turn = "human";
  //this should prevent double clicking
  if (l === 2) {

    for (i = 0; i < board.length; i++) {
      if (board[i][0] === square.id) {
        if (board[i][1] === null) {

          board[i][1] = side;

          if (side !== false) {
            c = document.getElementById(square.id);
            if (side === "X") {

              draw = setInterval(ex, 20);
            } else {

              draw = setInterval(circle, 20);
            }
          }

          if (square.id.substr(0, 1) === "0") {
            hc[0]++;
          } else if (square.id.substr(0, 1) === "1") {
            hc[1]++;
          } else {
            hc[2]++;
          }

          if (square.id.substr(1, 1) === "0") {
            hr[0]++;
          } else if (square.id.substr(1, 1) === "1") {
            hr[1]++;
          } else {
            hr[2]++;
          }
        }
      }
    }

  }
}