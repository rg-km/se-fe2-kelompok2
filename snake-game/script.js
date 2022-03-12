const CELL_SIZE = 20;

const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//this
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
const MOVE_INTERVAL = 120;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

let snake1 = {
  color: "purple",
  position: initPosition(),
  direction: initDirection(),
  score: 0,
};
let apple1 = {
  color: "red",
  position: initPosition(),
};

let apple2 = {
  color: "green",
  position: initPosition(),
};

function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
    scoreCanvas = document.getElementById("score1Board");
  }
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawCell(ctx, snake1.position.x, snake1.position.y, snake1.color);
    let img = document.getElementById("apple");
    ctx.drawImage(img, apple1.position.x * CELL_SIZE, apple1.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    ctx.drawImage(img, apple2.position.x * CELL_SIZE, apple2.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    drawScore(snake1);
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.position.x < 0) {
    snake.position.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.position.x >= WIDTH) {
    snake.position.x = 0;
  }
  if (snake.position.y < 0) {
    snake.position.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.position.y >= HEIGHT) {
    snake.position.y = 0;
  }
}

// Soal no 4: tambah apple2 parameter
function eat(snake, apple1, apple2) {
  if (snake.position.x == apple1.position.x && snake.position.y == apple1.position.y) {
    apple1.position = initPosition();
    snake.score++;
  }
  if (snake.position.x == apple2.position.x && snake.position.y == apple2.position.y) {
    apple2.position = initPosition();
    snake.score++;
  }
}

function moveLeft(snake) {
  snake.position.x--;
  teleport(snake);
  eat(snake, apple1, apple2);
}

function moveRight(snake) {
  snake.position.x++;
  teleport(snake);
  eat(snake, apple1, apple2);
}

function moveDown(snake) {
  snake.position.y++;
  teleport(snake);
  eat(snake, apple1, apple2);
}

function moveUp(snake) {
  snake.position.y--;
  teleport(snake);
  eat(snake, apple1, apple2);
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  setTimeout(function () {
    move(snake);
  }, MOVE_INTERVAL);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    snake1.direction = DIRECTION.LEFT;
  } else if (event.key === "ArrowRight") {
    snake1.direction = DIRECTION.RIGHT;
  } else if (event.key === "ArrowUp") {
    snake1.direction = DIRECTION.UP;
  } else if (event.key === "ArrowDown") {
    snake1.direction = DIRECTION.DOWN;
  }
});

move(snake1);
