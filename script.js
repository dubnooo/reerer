document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-trigger');
    const modal = document.getElementById('search-modal');
    const closeBtn = document.querySelector('.close-btn');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar-menu');
    const canvas = document.getElementById('dinoCanvas');
    const ctx = canvas.getContext('2d');

    let gameActive = false;

    // Відкриття гри
    searchBtn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        resetGame();
    };

    closeBtn.onclick = () => {
        modal.classList.add('hidden');
        gameActive = false;
    };

    menuBtn.onclick = () => sidebar.classList.toggle('hidden');

    // ЛОГІКА ГРИ З ЕМОДЗІ
    let dino = { x: 50, y: 100, dy: 0, size: 40 };
    let cactus = { x: 600, y: 110, size: 30, speed: 6 };
    let score = 0;

    function resetGame() {
        gameActive = true;
        score = 0;
        cactus.x = 600;
        cactus.speed = 6;
        dino.y = 100;
        dino.dy = 0;
        update();
    }

    function update() {
        if (!gameActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Гравітація та стрибок
        dino.dy += 0.6;
        dino.y += dino.dy;
        if (dino.y > 100) {
            dino.y = 100;
            dino.dy = 0;
        }

        // Кактус
        cactus.x -= cactus.speed;
        if (cactus.x < -30) {
            cactus.x = 600;
            score++;
            cactus.speed += 0.2;
        }

        // Малюємо Динозаврика 🦖
        ctx.font = "40px Arial";
        ctx.fillText("🦖", dino.x, dino.y + 35);

        // Малюємо Кактус 🌵
        ctx.font = "30px Arial";
        ctx.fillText("🌵", cactus.x, cactus.y + 25);

        // Рахунок
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText("Рахунок: " + score, 520, 25);

        // Зіткнення (Collision)
        if (cactus.x < dino.x + 30 && cactus.x > dino.x - 20 && dino.y > 70) {
            gameActive = false;
            alert("Гру закінчено! Твій результат: " + score);
            modal.classList.add('hidden');
        }

        requestAnimationFrame(update);
    }

    window.onkeydown = (e) => {
        if (e.code === "Space" && dino.y === 100 && gameActive) {
            dino.dy = -12;
        }
    };
});
