/* ============================================
   PIXEL RABBIT BROS v2 - Coelho visível!
   ============================================ */

// ==================== PERGUNTAS ====================
const questions = [
    { world: "1-1", category: "MUSIC", question: "Quantas notas musicais existem na música ocidental?", options: ["5 notas", "7 notas", "10 notas", "12 notas"], correct: 1 },
    { world: "1-2", category: "MUSIC", question: "Qual desses instrumentos é de sopro?", options: ["Violão", "Flauta", "Piano", "Bateria"], correct: 1 },
    { world: "1-3", category: "MUSIC", question: "Qual figura musical vale 4 tempos?", options: ["Semínima", "Mínima", "Semibreve", "Colcheia"], correct: 2 },
    { world: "1-4", category: "MUSIC", question: "Quem é considerado o 'Rei do Rock'?", options: ["Elvis Presley", "Michael Jackson", "Freddie Mercury", "John Lennon"], correct: 0 },
    { world: "2-1", category: "COLORS", question: "Quais são as cores primárias?", options: ["Verde, roxo e laranja", "Vermelho, azul e amarelo", "Preto, branco e cinza", "Rosa, azul e verde"], correct: 1 },
    { world: "2-2", category: "COLORS", question: "Ao misturar azul e amarelo, obtemos...", options: ["Roxo", "Laranja", "Verde", "Marrom"], correct: 2 },
    { world: "2-3", category: "COLORS", question: "Quais são as cores secundárias?", options: ["Vermelho, azul e amarelo", "Verde, laranja e roxo", "Preto, branco e cinza", "Rosa, verde e azul"], correct: 1 },
    { world: "2-4", category: "COLORS", question: "O que são cores complementares?", options: ["Cores iguais", "Cores opostas no círculo cromático", "Cores escuras", "Cores claras"], correct: 1 },
    { world: "3-1", category: "THEATER", question: "O que é um monólogo no teatro?", options: ["Uma peça com muitos atores", "Um ator falando sozinho", "Uma dança teatral", "Um tipo de figurino"], correct: 1 },
    { world: "3-2", category: "THEATER", question: "Onde os atores se apresentam?", options: ["Bastidores", "Plateia", "Palco", "Camarim"], correct: 2 },
    { world: "3-3", category: "THEATER", question: "O que é figurino?", options: ["O texto da peça", "A roupa usada pelos atores", "O cenário do teatro", "A música da peça"], correct: 1 },
    { world: "3-4", category: "THEATER", question: "Quem escreve as peças de teatro?", options: ["Diretor", "Ator", "Dramaturgo", "Cenógrafo"], correct: 2 }
];

// ==================== ESTADO ====================
let state = {
    currentQuestion: 0,
    correctAnswers: 0,
    lives: 3,
    coins: 0,
    timeLeft: 300,
    currentStep: 0,
    maxStep: 10,
    answered: false,
    gameActive: false,
    timerInterval: null,
    platformData: []
};

// ==================== ELEMENTOS ====================
const el = {};

function cacheElements() {
    el.world = document.getElementById('world');
    el.rabbit = document.getElementById('rabbit');
    el.castle = document.getElementById('castle');
    el.scoreDisplay = document.getElementById('scoreDisplay');
    el.livesDisplay = document.getElementById('livesDisplay');
    el.timeDisplay = document.getElementById('timeDisplay');
    el.worldDisplay = document.getElementById('worldDisplay');
    el.hpDisplay = document.getElementById('hpDisplay');
    el.stepDisplay = document.getElementById('stepDisplay');
    el.questionText = document.getElementById('questionText');
    el.optionsGrid = document.getElementById('optionsGrid');
    el.feedback = document.getElementById('feedback');
    el.nextBtn = document.getElementById('nextBtn');
    el.qWorld = document.getElementById('qWorld');
    el.qCategory = document.getElementById('qCategory');
    el.qCount = document.getElementById('qCount');
    el.qProgressFill = document.getElementById('qProgressFill');
    el.startOverlay = document.getElementById('startOverlay');
    el.startBtn = document.getElementById('startBtn');
    el.endOverlay = document.getElementById('endOverlay');
    el.endTitle = document.getElementById('endTitle');
    el.endText = document.getElementById('endText');
    el.endEmoji = document.getElementById('endEmoji');
    el.endStats = document.getElementById('endStats');
    el.restartBtn = document.getElementById('restartBtn');
    el.floatFeedback = document.getElementById('floatFeedback');
    el.rabbitStatus = document.getElementById('rabbitStatus');
}

// ==================== ESTRELAS ====================
function createStars() {
    const sf = document.getElementById('starfield');
    for (let i = 0; i < 60; i++) {
        const star = document.createElement('div');
        star.className = 'star-px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 2 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        sf.appendChild(star);
    }
}

// ==================== CRIAR MUNDO ====================
function createWorld() {
    el.world.innerHTML = '';
    
    // Castelo
    const castle = document.createElement('div');
    castle.className = 'castle';
    castle.id = 'castle';
    castle.innerHTML = `
        <div class="castle-top"></div>
        <div class="castle-flag">🏁</div>
        <div class="castle-body"><div class="castle-door"></div></div>
    `;
    el.world.appendChild(castle);
    el.castle = castle;

    // Chão
    const ground = document.createElement('div');
    ground.className = 'ground';
    el.world.appendChild(ground);

    // Coelho
    const rabbit = document.createElement('div');
    rabbit.className = 'rabbit-player';
    rabbit.id = 'rabbit';
    rabbit.innerHTML = `
        <div class="rabbit-sprite">
            <div class="rb-ear left"></div>
            <div class="rb-ear right"></div>
            <div class="rb-head">
                <div class="rb-eye left"></div>
                <div class="rb-eye right"></div>
                <div class="rb-nose"></div>
            </div>
            <div class="rb-body"></div>
            <div class="rb-foot left"></div>
            <div class="rb-foot right"></div>
            <div class="rb-tail"></div>
        </div>
    `;
    el.world.appendChild(rabbit);
    el.rabbit = rabbit;

    // Plataformas
    state.platformData = [];
    const stageWidth = el.world.clientWidth || 800;
    const stageHeight = el.world.clientHeight || 620;
    
    const startX = 60;
    const endX = stageWidth - 190;
    const startY = 60;
    const endY = stageHeight - 160;
    
    for (let i = 0; i < 10; i++) {
        const ratio = i / 9;
        const x = startX + (endX - startX) * ratio;
        const y = startY + (endY - startY) * ratio;
        
        const platform = document.createElement('div');
        platform.className = 'platform';
        platform.dataset.step = i;
        platform.style.left = x + 'px';
        platform.style.bottom = y + 'px';
        el.world.appendChild(platform);
        
        // Moeda na plataforma
        const coin = document.createElement('div');
        coin.className = 'coin';
        coin.dataset.step = i;
        coin.style.left = (x + 32) + 'px';
        coin.style.bottom = (y + 30) + 'px';
        el.world.appendChild(coin);
        
        state.platformData.push({
            element: platform,
            coin: coin,
            x: x,
            y: y,
            step: i
        });
    }
}

// ==================== POSIÇÃO DO COELHO ====================
function updateRabbitPosition(animate = true, isJump = false) {
    if (!el.rabbit) return;
    
    let targetX, targetBottom;
    
    if (state.currentStep === 0) {
        targetX = 30;
        targetBottom = 62;
    } else {
        const p = state.platformData[state.currentStep - 1];
        if (p) {
            targetX = p.x + 5;
            targetBottom = p.y + 24;
        } else {
            targetX = 30;
            targetBottom = 62;
        }
    }
    
    el.rabbit.style.left = targetX + 'px';
    el.rabbit.style.bottom = targetBottom + 'px';
    
    if (animate) {
        el.rabbit.classList.remove('jumping', 'falling');
        void el.rabbit.offsetWidth;
        el.rabbit.classList.add(isJump ? 'jumping' : 'falling');
    }
}

// ==================== ATUALIZAR PLATAFORMAS ====================
function updatePlatforms() {
    state.platformData.forEach((p, i) => {
        p.element.classList.remove('passed', 'current');
        
        if (i < state.currentStep - 1) {
            // Já passou (verde)
            p.element.classList.add('passed');
            if (!p.coin.classList.contains('collected')) {
                p.coin.classList.add('collected');
            }
        } else if (i === state.currentStep - 1) {
            // Atual (rosa)
            p.element.classList.add('passed');
            if (!p.coin.classList.contains('collected')) {
                p.coin.classList.add('collected');
            }
        } else if (i === state.currentStep) {
            // Próxima (rosa pulsante)
            p.element.classList.add('current');
        }
    });
    
    // Atualizar status do coelho
    if (el.stepDisplay) {
        el.stepDisplay.textContent = state.currentStep + '/10';
    }
}

// ==================== HUD ====================
function updateHUD() {
    el.scoreDisplay.textContent = '×' + String(state.coins).padStart(2, '0');
    el.livesDisplay.textContent = '×' + state.lives;
    el.timeDisplay.textContent = String(state.timeLeft).padStart(3, '0');
    
    const q = questions[state.currentQuestion] || questions[questions.length - 1];
    el.worldDisplay.textContent = q.world;
    
    const hp = Math.max(0, state.lives);
    el.hpDisplay.textContent = '❤'.repeat(hp) + '🖤'.repeat(Math.max(0, 3 - hp));
}

// ==================== FEEDBACK FLUTUANTE ====================
function showFloatFeedback(text, type) {
    el.floatFeedback.textContent = text;
    el.floatFeedback.className = 'float-feedback ' + type;
    void el.floatFeedback.offsetWidth;
    el.floatFeedback.classList.add('show');
}

// ==================== TIMER ====================
function startTimer() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    state.timerInterval = setInterval(() => {
        if (!state.gameActive) return;
        state.timeLeft--;
        if (state.timeLeft <= 0) {
            state.timeLeft = 0;
            endGame(false, 'TIME UP!');
        }
        updateHUD();
    }, 1000);
}

// ==================== CARREGAR PERGUNTA ====================
function loadQuestion() {
    state.answered = false;
    el.feedback.textContent = '';
    el.feedback.className = 'q-feedback';
    el.nextBtn.style.display = 'none';
    
    const q = questions[state.currentQuestion];
    
    el.qWorld.textContent = `WORLD ${q.world}`;
    el.qCategory.textContent = q.category;
    el.qCount.textContent = `${String(state.currentQuestion + 1).padStart(2, '0')}/12`;
    el.questionText.textContent = q.question;
    
    // Progresso
    const progress = (state.currentQuestion / questions.length) * 100;
    el.qProgressFill.style.width = progress + '%';
    
    el.optionsGrid.innerHTML = '';
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.addEventListener('click', () => selectAnswer(index));
        el.optionsGrid.appendChild(btn);
    });
    
    updateHUD();
    updatePlatforms();
}

// ==================== RESPONDER ====================
function selectAnswer(selectedIndex) {
    if (state.answered) return;
    state.answered = true;
    
    const q = questions[state.currentQuestion];
    const buttons = el.optionsGrid.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    
    if (selectedIndex === q.correct) {
        // ACERTOU!
        state.correctAnswers++;
        state.coins++;
        buttons[selectedIndex].classList.add('correct');
        el.feedback.textContent = '★ CORRECT! ★ O coelho subiu! 🐰⬆️';
        el.feedback.className = 'q-feedback correct-fb';
        
        showFloatFeedback('★ CORRECT! ★', 'correct');
        
        // Subir degrau - o coelho SOBE VISIVELMENTE
        if (state.currentStep < state.maxStep) {
            state.currentStep++;
            updateRabbitPosition(true, true);
            updatePlatforms();
        }
    } else {
        // ERROU!
        state.lives--;
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
        el.feedback.textContent = '✗ WRONG! ✗ -1 vida 💔';
        el.feedback.className = 'q-feedback wrong-fb';
        
        showFloatFeedback('✗ WRONG! ✗', 'wrong');
        
        // Descer degrau - o coelho CAI VISIVELMENTE
        if (state.currentStep > 0) {
            state.currentStep--;
            updateRabbitPosition(true, false);
            updatePlatforms();
        }
        
        if (state.lives <= 0) {
            setTimeout(() => endGame(false, 'GAME OVER'), 1500);
        }
    }
    
    updateHUD();
    
    el.nextBtn.style.display = 'block';
    el.nextBtn.textContent = state.currentQuestion < questions.length - 1 ? '▶ CONTINUE' : '★ FINISH';
}

// ==================== PRÓXIMA ====================
function nextQuestion() {
    state.currentQuestion++;
    
    if (state.currentQuestion >= questions.length) {
        setTimeout(() => endGame(true), 500);
        return;
    }
    
    if (state.lives > 0 && state.gameActive) {
        loadQuestion();
    }
}

// ==================== FIM DE JOGO ====================
function endGame(won, customTitle) {
    state.gameActive = false;
    if (state.timerInterval) clearInterval(state.timerInterval);
    
    let title, text, emoji;
    
    if (won && state.lives > 0) {
        if (state.currentStep >= state.maxStep) {
            title = '★ YOU WIN! ★';
            text = 'O coelho chegou no castelo! Você é um mestre das artes!';
            emoji = '🐰🏰👑';
            if (el.castle) el.castle.classList.add('win');
            // Coelho pula para o castelo
            const castleX = (el.world.clientWidth || 800) - 130;
            el.rabbit.style.left = castleX + 'px';
            el.rabbit.style.bottom = '100px';
            el.rabbit.classList.add('jumping');
        } else {
            title = '★ FINISH! ★';
            text = `Você completou! ${state.correctAnswers}/12 acertos. O coelho chegou ao degrau ${state.currentStep}/10.`;
            emoji = '🐰⭐';
        }
    } else {
        title = customTitle || 'GAME OVER';
        text = state.lives <= 0 
            ? 'O coelho ficou sem vidas! Estude mais e tente novamente!' 
            : 'O tempo acabou! Seja mais rápido da próxima vez!';
        emoji = '🐰💀';
    }
    
    el.endTitle.textContent = title;
    el.endText.textContent = text;
    el.endEmoji.textContent = emoji;
    el.endStats.innerHTML = `
        SCORE: ${state.coins * 100}<br>
        COINS: 🪙 ×${state.coins}<br>
        ACERTOS: ${state.correctAnswers}/12<br>
        DEGRAU: ${state.currentStep}/10<br>
        LIVES: ${state.lives > 0 ? '❤'.repeat(state.lives) : '💀'}
    `;
    
    el.endOverlay.classList.add('show');
}

// ==================== INICIAR JOGO ====================
function startGame() {
    state = {
        currentQuestion: 0,
        correctAnswers: 0,
        lives: 3,
        coins: 0,
        timeLeft: 300,
        currentStep: 0,
        maxStep: 10,
        answered: false,
        gameActive: true,
        timerInterval: null,
        platformData: []
    };
    
    el.startOverlay.classList.add('hidden');
    el.endOverlay.classList.remove('show');
    
    createWorld();
    
    setTimeout(() => {
        updateRabbitPosition(false);
        updatePlatforms();
        updateHUD();
        startTimer();
        loadQuestion();
    }, 150);
}

// ==================== EVENTOS ====================
function attachEvents() {
    el.nextBtn.addEventListener('click', nextQuestion);
    el.startBtn.addEventListener('click', startGame);
    el.restartBtn.addEventListener('click', startGame);
}

// Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (state.gameActive) {
            createWorld();
            setTimeout(() => {
                updateRabbitPosition(false);
                updatePlatforms();
            }, 50);
        }
    }, 300);
});

// ==================== INIT ====================
window.addEventListener('load', () => {
    cacheElements();
    attachEvents();
    createStars();
    createWorld();
    // Posição inicial do coelho
    setTimeout(() => {
        updateRabbitPosition(false);
        updatePlatforms();
    }, 100);
});