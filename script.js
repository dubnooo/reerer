document.addEventListener('DOMContentLoaded', () => {
    const searchTrigger = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');
    const closeBtn = document.querySelector('.close-btn');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar-menu');
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');

    let isGameRunning = false;

    // Відкриття гри
    searchTrigger.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        resetDinoGame();
    };

    // Закриття гри
    closeBtn.onclick = () => {
        modal.classList.add('hidden');
        isGameRunning = false;
    };

    // Бічне меню
    menuBtn.onclick = () => {
        sidebar.classList.toggle('hidden');
    };

    // --- ЛОГІКА ГРИ ---
    let dino = { x: 50, y: 110, w: 30, h: 30, dy: 0, jump: -10, ground: 110 };
    let cactus = { x: 600, y: 120, w: 20, h: 30, speed: 5 };
    let score = 0;

    function resetDinoGame() {
        isGameRunning = true;
        score = 0;
        cactus.x = 600;
        dino.y = 110;
        dino.dy = 0;
        runLoop();
    }

    function runLoop() {
        if (!isGameRunning) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Фізика
        dino.dy += 0.6; // Гравітація
        dino.y += dino.dy;
        if (dino.y > dino.ground) {
            dino.y = dino.ground;
            dino.dy = 0;
        }

        // Кактус
        cactus.x -= cactus.speed;
        if (cactus.x < -20) {
            cactus.x = 600;
            score++;
            cactus.speed += 0.1;
        }

        // Малювання
        ctx.fillStyle = "#666"; ctx.fillRect(dino.x, dino.y, dino.w, dino.h); // Дино
        ctx.fillStyle = "green"; ctx.fillRect(cactus.x, cactus.y, cactus.w, cactus.h); // Кактус
        ctx.fillStyle = "black"; ctx.fillText("Рахунок: " + score, 530, 20);

        // Зіткнення
        if (cactus.x < dino.x + 30 && cactus.x > dino.x && dino.y > 90) {
            isGameRunning = false;
            alert("Гру закінчено! Твій рахунок: " + score);
            modal.classList.add('hidden');
        }

        requestAnimationFrame(runLoop);
    }

    // Стрибок при натисканні пробілу
    window.onkeydown = (e) => {
        if (e.code === "Space" && dino.y === dino.ground && isGameRunning) {
            dino.dy = dino.jump;
        }
    };
});
