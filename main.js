
const rounds = [
  {
    title: "Mundo das cores",
    questions: [
      {
        category: "CORES",
        text: "Quais são as três cores primárias na pintura?",
        options: [
          "Vermelho, amarelo e azul",
          "Verde, laranja e roxo",
          "Rosa, preto e branco",
          "Azul, verde e marrom"
        ],
        answer: 0,
        explanation: "Vermelho, amarelo e azul são cores primárias na pintura."
      },
      {
        category: "CORES",
        text: "Que cor surge ao misturarmos azul e amarelo?",
        options: ["Roxo", "Verde", "Laranja", "Rosa"],
        answer: 1,
        explanation: "A mistura de azul com amarelo forma o verde."
      },
      {
        category: "CORES",
        text: "Quais são as cores secundárias?",
        options: [
          "Vermelho, azul e amarelo",
          "Verde, laranja e roxo",
          "Preto, branco e cinza",
          "Azul, rosa e marrom"
        ],
        answer: 1,
        explanation: "Verde, laranja e roxo são cores secundárias."
      },
      {
        category: "CORES",
        text: "Qual grupo contém apenas cores quentes?",
        options: [
          "Azul, verde e violeta",
          "Preto, branco e cinza",
          "Vermelho, laranja e amarelo",
          "Verde, azul e rosa"
        ],
        answer: 2,
        explanation: "Vermelho, laranja e amarelo são exemplos de cores quentes."
      }
    ]
  },
  {
    title: "Mundo da música",
    questions: [
      {
        category: "MÚSICA",
        text: "O que o ritmo organiza em uma música?",
        options: [
          "Os sons e as pausas no tempo",
          "As cores de uma pintura",
          "Os personagens de uma peça",
          "O formato dos instrumentos"
        ],
        answer: 0,
        explanation: "O ritmo organiza os sons e as pausas no tempo."
      },
      {
        category: "MÚSICA",
        text: "Qual destes é um instrumento de percussão?",
        options: ["Flauta", "Violino", "Tambor", "Clarinete"],
        answer: 2,
        explanation: "O tambor é um instrumento de percussão."
      },
      {
        category: "MÚSICA",
        text: "O que é uma paisagem sonora?",
        options: [
          "Uma pintura feita com notas",
          "Os sons que ouvimos em um lugar",
          "Uma lista de instrumentos",
          "Um palco sem músicos"
        ],
        answer: 1,
        explanation: "Paisagem sonora é o conjunto de sons de um ambiente."
      },
      {
        category: "MÚSICA",
        text: "O que é a melodia?",
        options: [
          "Uma sequência de notas que forma uma ideia musical",
          "O nome dado ao palco",
          "O material usado para pintar",
          "Uma pausa entre peças"
        ],
        answer: 0,
        explanation: "A melodia é uma sequência de notas que forma uma ideia musical."
      }
    ]
  },
  {
    title: "Mundo do teatro",
    questions: [
      {
        category: "TEATRO",
        text: "Onde os atores geralmente representam uma peça?",
        options: ["No palco", "Na moldura", "No cavalete", "Na partitura"],
        answer: 0,
        explanation: "O palco é o espaço onde os atores apresentam a peça."
      },
      {
        category: "TEATRO",
        text: "Quem interpreta personagens em uma peça?",
        options: ["Os cenógrafos", "Os atores", "Os pintores", "Os espectadores"],
        answer: 1,
        explanation: "Os atores interpretam os personagens."
      },
      {
        category: "TEATRO",
        text: "Para que servem os figurinos no teatro?",
        options: [
          "Para ajudar a mostrar quem são os personagens",
          "Para afinar instrumentos",
          "Para misturar tintas",
          "Para marcar o ritmo"
        ],
        answer: 0,
        explanation: "Figurinos são roupas usadas pelos personagens."
      },
      {
        category: "TEATRO",
        text: "O que é uma improvisação teatral?",
        options: [
          "Uma cena criada na hora",
          "Uma música tocada sempre igual",
          "Uma pintura com muitas camadas",
          "Uma troca de iluminação"
        ],
        answer: 0,
        explanation: "Na improvisação, os participantes criam a cena na hora."
      }
    ]
  }
];

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const nextButton = document.getElementById("next-button");

const roundLabel = document.getElementById("round-label");
const roundTitle = document.getElementById("round-title");
const questionCount = document.getElementById("question-count");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");
const scoreDisplay = document.getElementById("score");

const category = document.getElementById("category");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const scene = document.getElementById("scene");
const stairs = document.getElementById("stairs");
const player = document.getElementById("player");

const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const finalScore = document.getElementById("final-score");
const resultBunny = document.getElementById("result-bunny");

let roundIndex = 0;
let questionIndex = 0;
let score = 0;
let bunnyStep = 0;
let answered = false;

const totalQuestions = rounds.reduce(
  (total, round) => total + round.questions.length,
  0
);

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);

function startGame() {
  roundIndex = 0;
  questionIndex = 0;
  score = 0;
  bunnyStep = 0;
  answered = false;

  scoreDisplay.textContent = "0";
  intro.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  createStairs();
  moveBunny(false);
  showQuestion();
}

function createStairs() {
  stairs.replaceChildren();

  for (let i = 0; i < totalQuestions; i++) {
    const step = document.createElement("div");
    step.className = "stair-step";
    step.style.left = `${4 + i * 5.7}%`;
    step.style.bottom = `${20 + i * 7}px`;
    stairs.appendChild(step);
  }
}

function showQuestion() {
  const round = rounds[roundIndex];
  const question = round.questions[questionIndex];
  const number = getQuestionNumber();

  answered = false;
  roundLabel.textContent = `RODADA ${roundIndex + 1} DE ${rounds.length}`;
  roundTitle.textContent = round.title;
  category.textContent = question.category;
  questionText.textContent = question.text;
  questionCount.textContent = `Pergunta ${number} de ${totalQuestions}`;

  const percentage = Math.round((number / totalQuestions) * 100);
  progressPercent.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;

  feedback.textContent = "";
  feedback.className = "feedback hidden";
  nextButton.classList.add("hidden");
  answersContainer.replaceChildren();

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    answersContainer.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const question = rounds[roundIndex].questions[questionIndex];
  const buttons = answersContainer.querySelectorAll(".answer");
  const isCorrect = selectedIndex === question.answer;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score += 10;
    scoreDisplay.textContent = String(score);
    bunnyStep = Math.min(bunnyStep + 1, totalQuestions);
    feedback.textContent = `Acertou! ${question.explanation}`;
    feedback.className = "feedback good";
    moveBunny(true);
  } else {
    bunnyStep = Math.max(bunnyStep - 1, 0);
    feedback.textContent = `Ops! O coelho caiu um degrau. ${question.explanation}`;
    feedback.className = "feedback bad";
    moveBunny(false);
  }

  const isLastQuestion =
    roundIndex === rounds.length - 1 &&
    questionIndex === rounds[roundIndex].questions.length - 1;

  nextButton.textContent = isLastQuestion
    ? "Ver resultado ★"
    : "Próxima pergunta ➜";

  nextButton.classList.remove("hidden");
}

function moveBunny(jump) {
  if (!scene || !player) return;

  const sceneWidth = scene.clientWidth;
  const maxLeft = Math.max(0, sceneWidth - player.offsetWidth - 12);
  const left = Math.min(12 + bunnyStep * 22, maxLeft);
  const bottom = 12 + bunnyStep * 7;

  player.style.left = `${left}px`;
  player.style.bottom = `${bottom}px`;

  player.classList.remove("jump", "fall");

  // Reinicia a animação para que ela toque de novo em cada resposta.
  void player.offsetWidth;

  if (jump) {
    player.classList.add("jump");
  } else if (answered) {
    player.classList.add("fall");
  }
}

function nextQuestion() {
  questionIndex++;

```javascript
  if (questionIndex >= rounds[roundIndex].questions.length) {
    roundIndex++;
    questionIndex = 0;
  }

  if (roundIndex >= rounds.length) {
    showResult();
    return;
  }

  showQuestion();
}

function showResult() {
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  finalScore.textContent = String(score);

  if (score === totalQuestions * 10) {
    resultTitle.textContent = "Você conseguiu!";
    resultText.textContent =
      "O coelhinho acertou todas e chegou à casinha! Parabéns, artista!";
    resultBunny.textContent = "🐰";
  } else {
    resultTitle.textContent = "A aventura terminou!";
    resultText.textContent =
      `Você fez ${score} pontos. O coelhinho não chegou à casinha desta vez, mas pode tentar novamente!`;
    resultBunny.textContent = "🐇";
  }
}

function getQuestionNumber() {
  let number = questionIndex;

  for (let i = 0; i < roundIndex; i++) {
    number += rounds[i].questions.length;
  }

  return number + 1;
}

// Reposiciona o coelho se a tela mudar de tamanho.
window.addEventListener("resize", () => {
  if (!quiz.classList.contains("hidden")) {
    moveBunny(false);
  }
});
```
  
