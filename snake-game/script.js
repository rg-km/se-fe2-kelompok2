const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 100;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let MOVE_INTERVAL = 160;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color, color1) {
  return {
    gambar: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    scorelife: 3,
    gambar1: color1,
    level: 1,
  };
}
let snake1 = initSnake("./assets/head_snake.png", "./assets/body.png");

let apple = {
  color: "red",
  position: initPosition(),
};

let apple2 = {
  color: "blue",
  position: initPosition(),
};

let rintangan = {
  color: "black",
  status: false,
  position: {
    x: 9,
    y: 10,
  },
};

let life = {
  position: initPosition(),
  status: false,
};

function drawCell(ctx, x, y, color, level) {
  ctx.fillStyle = color;
  for (let i = 0; i <= 15; i++) {
    if (level == 2) {
      ctx.fillRect((x + i) * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.fillRect((x + i) * CELL_SIZE, (y + 5) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } else if (level == 3) {
      ctx.fillRect((x + i) * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.fillRect((x + i) * CELL_SIZE, (y + 5) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.fillRect((x + i) * CELL_SIZE, (y + 10) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } else if (level == 4) {
      ctx.fillRect(x * CELL_SIZE, (y + i) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.fillRect((x + 14) * CELL_SIZE, (y + i) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    } else if (level == 5) {
      ctx.fillRect((x + i) * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      ctx.fillRect((x + 14) * CELL_SIZE, (y + i) * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
  }
}

function bilanganPrima(num) {
  var x = 0;
  for (var i = 2; i <= Math.floor(num / 2); i++) {
    x++;
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

function naikLevel(snake) {
  if (snake.score % 5 == 0) {
    snake.level += 1;
    MOVE_INTERVAL -= 25;
    var audio = new Audio("./assets/sound.mp3");
    audio.play();
    if (snake.level < 5) {
      rintangan.status = true;
    }
  }
}

function cekRintangan(snake) {
  if (snake.level == 2) {
    for (let i = 0; i <= 15; i++) {
      if ((snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) || (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 5 && rintangan.status == true)) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    }
  } else if (snake.level == 3) {
    for (let i = 0; i <= 15; i++) {
      if (
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) ||
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 5) ||
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 10 && rintangan.status == true)
      ) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    }
  } else if (snake.level == 4) {
    for (let i = 0; i <= 15; i++) {
      if (((snake.head.x == rintangan.position.x && snake.head.y == rintangan.position.y + i) || (snake.head.x == rintangan.position.x + 14 && snake.head.y == rintangan.position.y + i)) && rintangan.status == true) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    }
  } else if (snake.level == 5) {
    for (let i = 0; i <= 15; i++) {
      if ((snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) || (snake.head.x == rintangan.position.x + 14 && snake.head.y == rintangan.position.y + i && rintangan.status == true)) {
        for (let j = 1; j < snake.body.length; j++) {
          snake.body.pop();
          if (snake.body.length > 1) {
            snake.body.pop();
          }
        }
      }
    }
  }
}

function drawBuah(ctx, x, y) {
  // const image = new Image();
  // image.src = "./assets/apple.png";
  let image = document.getElementById("apple");
  ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawlife(ctx, x, y) {
  // const image = new Image();
  // image.src = "./life.webp";
  let image = document.getElementById("life");
  if (life.status) {
    ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
  }
}

function drawSnake(ctx, x, y, gambar) {
  const image = new Image();
  image.src = gambar;
  ctx.drawImage(image, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
  let scoreCanvas;
  scoreCanvas = document.getElementById("score1Board");
  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  scoreCtx.fillStyle = "blue";
  scoreCtx.fillText(snake.score, 40, 35);
}
function drawLife(snake) {
  const image = new Image();
  image.src = "./assets/life.png";
  let lifeCanvas = document.getElementById("lifes");
  let lifeCtx = lifeCanvas.getContext("2d");

  lifeCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  let lebar = 1;
  let tinggi = 1;
  let a = snake.scorelife;
  for (let i = 0; i < a; i++) {
    lifeCtx.drawImage(image, lebar, tinggi, 20, 20);
    lebar += 30;
  }
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    drawSnake(ctx, snake1.head.x, snake1.head.y, snake1.gambar);
    for (let i = 1; i < snake1.body.length; i++) {
      drawSnake(ctx, snake1.body[i].x, snake1.body[i].y, snake1.gambar1);
    }
    drawBuah(ctx, apple.position.x, apple.position.y, apple.color);
    drawBuah(ctx, apple2.position.x, apple2.position.y, apple2.color);

    drawCell(ctx, rintangan.position.x, rintangan.position.y, rintangan.color, snake1.level);

    setInterval(function () {
      drawlife(ctx, life.position.x, life.position.y, life.color);
    }, 2000);

    drawScore(snake1);
    drawLife(snake1);
    document.getElementById("speed").innerHTML = MOVE_INTERVAL;
    document.getElementById("level").innerHTML = snake1.level;
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function cekRintangancollecsion(snake) {
  let isCollide = false;
  if (snake.level == 2) {
    for (let i = 0; i <= 15; i++) {
      if ((snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) || (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 5 && rintangan.status == true)) {
        cekRintangan(snake);
        snake.scorelife--;
        snake.head = initPosition();
        if (snake.scorelife == 0) {
          isCollide = true;
        }
      }
    }
  } else if (snake.level == 3) {
    for (let i = 0; i <= 15; i++) {
      if (
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) ||
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 5) ||
        (snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y + 10 && rintangan.status == true)
      ) {
        cekRintangan(snake);
        snake.scorelife--;
        snake.head = initPosition();
        if (snake.scorelife == 0) {
          isCollide = true;
        }
      }
    }
  } else if (snake.level == 4) {
    for (let i = 0; i <= 15; i++) {
      if ((snake.head.x == rintangan.position.x && snake.head.y == rintangan.position.y + i) || (snake.head.x == rintangan.position.x + 14 && snake.head.y == rintangan.position.y + i && rintangan.status == true)) {
        cekRintangan(snake);
        snake.scorelife--;
        snake.head = initPosition();
        if (snake.scorelife == 0) {
          isCollide = true;
        }
      }
    }
  } else if (snake.level == 5) {
    for (let i = 0; i <= 15; i++) {
      if ((snake.head.x == rintangan.position.x + i && snake.head.y == rintangan.position.y) || (snake.head.x == rintangan.position.x + 14 && snake.head.y == rintangan.position.y + i && rintangan.status == true)) {
        cekRintangan(snake);
        snake.scorelife--;
        snake.head = initPosition();
        if (snake.scorelife == 0) {
          isCollide = true;
        }
      }
    }
  }
  return isCollide;
}

function eat(snake, apple) {
  cekRintangan(snake);
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    naikLevel(snake);
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    if (snake.score > 1 && bilanganPrima(snake.score) == true) {
      life.status = true;
      setTimeout(function () {
        life.status = false;
        cekRintangan(snake);
      }, 3000);
    }
  } else if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
    apple2.position = initPosition();
    snake.score++;
    naikLevel(snake);
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    if (snake.score > 1 && bilanganPrima(snake.score) == true) {
      life.status = true;
      setTimeout(function () {
        life.status = false;
        cekRintangan(snake);
      }, 3000);
    }
  } else if (snake.head.x == life.position.x && snake.head.y == life.position.y && life.status == true) {
    life.position = initPosition();
    life.status = false;
    snake.score++;
    snake.scorelife++;
  }
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple);
}

function checkCollision(snakes) {
  let isCollide = false;
  let isWin = false;
  //this
  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
          snakes[i].scorelife--;
          if (snakes[i].scorelife == 0) {
            isCollide = true;
          }
        }
      }
    }
  }
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i].level == 6) {
      isWin = true;
    }
  }

  if (cekRintangancollecsion(snakes[0]) == true) {
    isCollide = true;
  }

  if (isCollide) {
    var audio = new Audio("./assets/game-over.mp3");
    audio.play();

    alert("Game over dengan skor : " + snake1.score + " dan level " + snake1.level);
    snake1 = initSnake("./assets/head_snake.png", "./assets/body.png");
    return isCollide;
  } else if (isWin) {
    alert("You Winner");
    snake1 = initSnake("./assets/head_snake.png", "./assets/body.");
    return isWin;
  }
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
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
    MOVE_INTERVAL = 100;
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();
