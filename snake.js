/*
    up: 0
    right: 1
    down: 2
    left: 3
*/
let direction = 0;
let snake = [];
let foodList = [];
let eating = false;
let lifeCounter, foodCounter;

const handleCreateRange = () => {
    direction = 0;
    snake = [];
    foodList = [];
    eating = false;
    const wrapper = document.getElementById('playground');
    const rows = [];
    for (let i = 0; i < 10; i++) {
        const row = ['<div class="row">'];
        for (let j = 0; j < 10; j++) {
            row.push(`<span id="${i+''+j}" class="grid"></span>`);
        }
        row.push('</div>');
        rows.push(row.join(''));
    };
    wrapper.innerHTML = rows.join('');
    handleCreateSnake();
}

const setActive = (id) => {
    const point = document.getElementById(id);
    point.className = 'active-grid';
}

const setNormal = (id) => {
    const point = document.getElementById(id);
    point.className = 'grid';
}

const handleCreateSnake = () => {
    const startId = '55';
    snake.push(startId);
    setActive(startId);
}

const handleMove = () => {
    const curr = snake[0];
    if (foodList.includes(curr)) {
        eating = true;
        console.log('eattingggggg');
        foodList.splice(foodList.indexOf(curr), 1);
    }
    const x = Number(curr[1]);
    const y = Number(curr[0]);
    let next;
    switch (direction) {
        // up
        case 0:
            if (y === 0) {
                next = (9+''+x);
            } else {
                next = ((y-1)+''+x);
            }
            break;
        // right
        case 1:
            next = (y+''+((x+1)%10));
            break;
        // down
        case 2:
            next = (((y+1)%10)+''+x);
            break;
        // left
        default:
            if (x === 0) {
                next = (y+''+9);
            } else {
                next = (y+''+(x-1));
            }
            break;
    }
    if (snake.includes(next)) {
        clearInterval(lifeCounter);
        clearInterval(foodCounter);
        alert('You ate yourself! Please try again.');
        handleCreateRange();
        return;
    } else {
        snake.unshift(next);
    }
    setActive(snake[0]);
    if (!eating) {
        setNormal(snake.pop());
    } else {
        eating = false;
    }
}

const handleStartMove = () => {
    lifeCounter = setInterval(() => {
        handleMove();
    }, 100);
    foodCounter = setInterval(() => {
        handleCreateFood();
    }, 1000);
}

const changeDirection = (dir = 1) => {
    if (Math.abs(direction - dir) === 2) {
        return;
    };
    direction = dir;
}

const handleCreateFood = () => {
    const randomX = Math.floor(Math.random()*10);
    const randomY = Math.floor(Math.random()*10);
    const position = randomY+''+randomX;
    if (snake.includes(position)) {
        handleCreateFood();
    } else {
        const foodElement = document.getElementById(position);
        foodElement.className = 'food';
        foodList.push(position);
    }
}