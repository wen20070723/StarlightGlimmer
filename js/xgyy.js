// 获取按钮和显示引用的元素
const quoteBtn = document.getElementById('quote-btn');
const quoteDisplay = document.getElementById('quote-display');

// 星光熠熠的金句数组
const quotes = [
    "真正的平等不是消除差异，而是尊重并珍惜每一份独特。",
    "友谊是魔法，能让我们在黑暗中找到彼此的光芒。",
    "成长就是学会放下固执，拥抱新的可能。",
    "每一个瞬间都是珍贵的礼物，用心去感受，友谊会在其中绽放。",
    "不要害怕改变，因为那是通往更好自己的桥梁。",
    "用爱和理解去对待他人，你会发现世界充满温暖。"
];

// 为按钮添加点击事件监听器
quoteBtn.addEventListener('click', function () {
    // 随机选择一条金句
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex]}</p>`;

    // 点击按钮后添加星光闪烁特效
    for (let i = 0; i < 8; i++) {
        const star = document.createElement('div');
        star.className = 'star-effect';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(star);
        setTimeout(() => {
            star.remove();
        }, 1200);
    }
});

// 鼠标移动时添加流星轨迹特效
let trails = [];
document.addEventListener('mousemove', function (e) {
    const trail = document.createElement('div');
    trail.className = 'meteor-trail';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    trails.push(trail);
    if (trails.length > 15) {
        trails.shift().remove();
    }
});

// 动态添加星光和流星轨迹的CSS样式
const style = document.createElement('style');
style.textContent = `
.star-effect {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #FFD700;
    border-radius: 50%;
    animation: starFade 1.2s ease;
}
@keyframes starFade {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0);
        opacity: 0;
    }
}
.meteor-trail {
    position: absolute;
    width: 3px;
    height: 12px;
    background: linear-gradient(45deg, #fff, transparent);
    pointer-events: none;
    animation: meteorFade 1s linear forwards;
}
@keyframes meteorFade {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
}
`;
document.head.appendChild(style);

// 迷你游戏：收集星星
const canvas = document.getElementById('star-collect-canvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score-display');
let score = 0;
let stars = [];
const starRadius = 12;
const playerRadius = 25;
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;

// 设置画布大小
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffd700';
    ctx.fill();
    ctx.closePath();
}

function drawStars() {
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, starRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
    });
}

function generateStars() {
    const newStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    };
    stars.push(newStar);
}

function checkCollision() {
    stars.forEach((star, index) => {
        const dx = playerX - star.x;
        const dy = playerY - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < playerRadius + starRadius) {
            stars.splice(index, 1);
            score++;
            scoreDisplay.textContent = `分数: ${score}`;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawStars();
    checkCollision();
    if (stars.length < 5) {
        generateStars();
    }
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    playerX = e.clientX - rect.left;
    playerY = e.clientY - rect.top;

    // 边界检查
    if (playerX < playerRadius) {
        playerX = playerRadius;
    } else if (playerX > canvas.width - playerRadius) {
        playerX = canvas.width - playerRadius;
    }
    if (playerY < playerRadius) {
        playerY = playerRadius;
    } else if (playerY > canvas.height - playerRadius) {
        playerY = canvas.height - playerRadius;
    }
});