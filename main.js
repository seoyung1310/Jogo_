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
        explanation: "Na pintura, as cores primárias tradicionais são vermelho, amarelo e azul."
      },
      {
        category: "CORES",
        text: "Que cor aparece ao misturarmos azul e amarelo?",
        options: ["Roxo", "Verde", "Laranja", "Rosa"],
        answer: 1,
        explanation: "Azul e amarelo são cores primárias que, misturadas, formam o verde."
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
        explanation: "Verde, laranja e roxo são cores secundárias, formadas pela mistura de cores primárias."
      },
      {
        category: "CORES",
        text: "Quais cores costumam ser chamadas de quentes?",
        options: [
          "Azul, verde e violeta",
          "Preto, branco e cinza",
          "Vermelho, laranja e amarelo",
          "Azul, rosa e verde"
        ],
        answer: 2,
        explanation: "Vermelho, laranja e amarelo são associadas ao calor e são chamadas de cores quentes."
      }
    ]
  },
  {
    title: "Mundo da música",
    questions: [
      {
        category: "MÚSICA",
        text: "Qual é a função do ritmo em uma música?",
        options: [
          "Organizar os sons e as pausas no tempo",
          "Escolher as cores de um desenho",
          "Indicar os personagens de uma peça",
          "Mudar o formato dos instrumentos"
        ],
        answer: 0,
        explanation: "O ritmo organiza a duração dos sons e das pausas na música."
      },
      {
        category: "MÚSICA",
        text: "Qual destes é um instrumento de percussão?",
        options: ["Flauta", "Violino", "Tambor", "Clarinete"],
        answer: 2,
        explanation: "O tambor é um instrumento de percussão: seu som é produzido ao ser golpeado."
      },
      {
        category: "MÚSICA",
        text: "O que é uma paisagem sonora?",
        options: [
          "Uma pintura feita com notas musicais",
          "Os sons que podemos ouvir em um lugar",
          "Uma lista de nomes de instrumentos",
          "Um palco sem músicos"
        ],
        answer: 1,
        explanation: "Paisagem sonora é o conjunto de sons de um ambiente, como vozes, pássaros ou trânsito."
      },
      {
        category: "MÚSICA",
        text: "Em uma música, o que é a melodia?",
        options: [
          "Uma sequência de notas que forma uma ideia musical",
          "O nome dado ao palco",
          "O material usado para pintar",
          "Uma pausa entre duas peças teatrais"
        ],
        answer: 0,
        explanation: "A melodia é uma sequência de notas que percebemos como uma ideia musical."
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
        explanation: "O palco é o espaço onde os atores apresentam a peça para o público."
      },
      {
        category: "TEATRO",
        text: "Quem interpreta personagens em uma peça?",
        options: ["Os cenógrafos", "Os atores", "Os pintores", "Os espectadores"],
        answer: 1,
        explanation: "Os atores interpretam os personagens usando voz, corpo e expressão."
      },
      {
        category: "TEATRO",
        text: "Para que servem os figurinos no teatro?",
        options: [
          "Para ajudar a mostrar quem são os personagens",
          "Para afinar os instrumentos",
          "Para misturar tintas",
          "Para marcar o ritmo da música"
        ],
        answer: 0,
        explanation: "Figurinos são as roupas usadas pelos personagens e ajudam a contar quem eles são."
      },
      {
        category: "TEATRO",
        text: "O que é uma improvisação teatral?",
        options: [
          "Uma cena criada na hora, sem estar totalmente planejada",
          "Uma música tocada sempre do mesmo jeito",
          "Uma pintura feita com muitas camadas",
          "Uma pausa para trocar a iluminação"
        ],
        answer: 0,
        explanation: "Na improvisação, os participantes criam falas e ações durante a própria cena."
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
const player = document.getElementById("player");

const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const resultBunny = document.getElementById("result-bunny");

let roundIndex = 0;
let questionIndex = 0;
let score = 0;
let answered = false;

const totalQuestions = rounds.reduce(
  (total, round) => total + round.questions.length,
  0
);

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
nextButton.addEventListener("click", goToNextQuestion);

function startGame() {
  roundIndex = 0;
  questionIndex = 0;
  score = 0;
  answered = false;

  scoreDisplay.textContent = score;
  intro.classList.add("hidden");
  result.classList.add("hidden");
  quiz.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  const round = rounds[roundIndex];
  const question = round.questions[questionIndex];
  const questionNumber = getQuestionNumber();

  answered = false;
  roundLabel.textContent = `RODADA ${roundIndex + 1} DE ${rounds.length}`;
  roundTitle.textContent = round.title;
  questionCount.textContent = `Pergunta ${questionNumber} de ${totalQuestions}`;
  category.textContent = question.category;
  questionText.textContent = question.text;

  const progress = Math.round((questionNumber / totalQuestions) * 100);
  progressPercent.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;

  feedback.className = "feedback hidden";
  feedback.textContent = "";
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
  const answerButtons = answersContainer.querySelectorAll(".answer");
  const isCorrect = selectedIndex === question.answer;

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    } else if (index === selectedIndex) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    score += 10;
    scoreDisplay.textContent = score;
    feedback.textContent = `Acertou! ${question.explanation}`;
    feedback.className = "feedback good";
    jumpBunny();
  } else {
    feedback.textContent = `Quase! ${question.explanation}`;
    feedback.className = "feedback bad";
  }

  const isLastQuestion =
    roundIndex === rounds.length - 1 &&
    questionIndex === rounds[roundIndex].questions.length - 1;

  nextButton.innerHTML = isLastQuestion
    ? 'Ver resultado <span>★</span>'
    : 'Próxima <span>➜</span>';

  nextButton.classList.remove("hidden");
}

function goToNextQuestion() {
  questionIndex++;

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

  finalScore.textContent = score;
  resultText.textContent = `Você respondeu às ${totalQuestions} perguntas das rodadas de cores, música e teatro.`;

  if (score === totalQuestions * 10) {
    resultTitle.textContent = "Artista incrível!";
    resultMessage.textContent = "Você acertou todas! O coelhinho comemora com você!";
    resultBunny.textContent = "🐰";
  } else if (score >= totalQuestions * 5) {
    resultTitle.textContent = "Mandou muito bem!";
    resultMessage.textContent = "Você já sabe bastante sobre artes. Continue criando e aprendendo!";
    resultBunny.textContent = "🐰";
  } else {
    resultTitle.textContent = "Boa aventura!";
    resultMessage.textContent = "Cada rodada é uma chance de aprender algo novo sobre artes!";
    resultBunny.textContent = "🐇";
  }
}
function getQuestionNumber() {
  let count = questionIndex;

  for (let i = 0; i < roundIndex; i++) {
    count += rounds[i].questions.length;
  }

  return count + 1;
}