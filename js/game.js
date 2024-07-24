const board = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
let snake = [{x: 200, y: 200}];
let food = {};
let direction = 'right';
let score = 0;
let gameLoop;

function createFood() {
    food = {
        x: Math.floor(Math.random() * 20) * 20,
        y: Math.floor(Math.random() * 20) * 20
    };
}

function drawSnake() {
    snake.forEach((part, index) => {
        const snakePart = document.createElement('div');
        snakePart.style.left = `${part.x}px`;
        snakePart.style.top = `${part.y}px`;
        snakePart.classList.add('snake-part');
        snakePart.style.backgroundColor = `hsl(${index * 10}, 100%, 50%)`;
        board.appendChild(snakePart);
    });
}

function drawFood() {
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    foodElement.style.animation = 'pulse 0.5s infinite';
    board.appendChild(foodElement);
}

function moveSnake() {
    const head = {...snake[0]};
    switch(direction) {
        case 'up': head.y -= 20; break;
        case 'down': head.y += 20; break;
        case 'left': head.x -= 20; break;
        case 'right': head.x += 20; break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = `Score: ${score}`;
        createFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameLoopFunction() {
    board.innerHTML = '';
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        alert('Game Over!');
        snake = [{x: 200, y: 200}];
        direction = 'right';
        score = 0;
        scoreElement.textContent = 'Score: 0';
        createFood();
        gameLoop = setInterval(gameLoopFunction, 100);
    }
    drawGrid();
    drawSnake();
    drawFood();
}

function drawGrid() {
    for (let i = 0; i < 20; i++) {
        const vertical = document.createElement('div');
        vertical.classList.add('grid-line', 'vertical');
        vertical.style.left = `${i * 20}px`;
        board.appendChild(vertical);

        const horizontal = document.createElement('div');
        horizontal.classList.add('grid-line', 'horizontal');
        horizontal.style.top = `${i * 20}px`;
        board.appendChild(horizontal);
    }
}

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
        case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
        case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
        case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
    }
});

createFood();
gameLoop = setInterval(gameLoopFunction, 100);