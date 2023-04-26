const questions = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    answer: '3. alerts',
  },
  {
    questionText: 'Arrays in JavaScript can be used to store ______.',
    options: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    answer: '4. all of the above',
  },
  {
    questionText:
      'String values must be enclosed within _____ when being assigned to variables.',
    options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
    answer: '3. quotes',
  },
  {
    questionText:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    options: [
      '1. JavaScript',
      '2. terminal/bash',
      '3. for loops',
      '4. console.log',
    ],
    answer: '4. console.log',
  },
  {
    questionText:
      'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
    options: ['1. break', '2. stop', '3. halt', '4. exit'],
    answer: '1. break',
  },
];

let score = 0;
let currentQuestionIndex = 0;
let timeLeft = 0;
let timerId;
let scoreNames = [];

const initialContainer = document.getElementById('main-section-id');
const quizContainer = document.getElementById('quiz-section');
const questionElement = document.getElementById('question');
const answerElements = document.getElementsByClassName('answer-section');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('time-left');
const startButton = document.getElementById('start-button');
const statusElement = document.getElementById('status-id');
const lastSection = document.getElementById('last-page');
const scoreDesc = document.getElementById('score-desc');
const submitButton = document.getElementById('submit-button');
const highScorePage = document.getElementById('highscore-page');

const startQuiz = () => {
  initialContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  displayQuiz();
  startTimer();
};

const displayQuiz = () => {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.questionText;
  Array.from(answerElements).forEach((answerElement, index) => {
    answerElement.textContent = currentQuestion.options[index];
    answerElement.addEventListener('click', handleAnswer);
  });
};

const handleAnswer = (event) => {
  const currentQuestion = questions[currentQuestionIndex];
  const answer = event.target.textContent;
  if (answer === currentQuestion.answer) {
    score++;
    scoreElement.textContent = score;
    statusElement.textContent = 'correct';
  } else {
    statusElement.textContent = 'incorrect';
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    finishQuiz();
  } else {
    displayQuiz();
  }
};

const startTimer = () => {
  timeLeft = 60;
  timerElement.textContent = timeLeft;
  timerId = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerId);
      handleAnswer(-1);
    }
  }, 1000);
};
const finishQuiz = () => {
  clearInterval(timerId);
  quizContainer.classList.add('hidden');
  scoreDesc.textContent = `Your score is ${score}`;
  lastSection.classList.remove('hidden');
  submitButton.onclick = () => showHighScore();

  // reset variables to their initial values
  currentQuestionIndex = 0;
  timeLeft = 0;
  scoreNames = [];
};

const showHighScore = () => {
  const name = document.getElementById('text-box').value;
  scoreNames.push({ name: name, score: score });
  localStorage.setItem('scores', JSON.stringify(scoreNames));
  highScorePage.classList.remove('hidden');
  lastSection.classList.add('hidden');
  const highscores = document.getElementById('high-scores');
  const highScoreData = JSON.parse(localStorage.getItem('scores'));
  highScoreData.map((scoreData) => {
    highscores.textContent = scoreData.name + ' ' + scoreData.score;
  });
  const restartButton = document.getElementById('restart-button');
  restartButton.addEventListener('click', () => {
    initialContainer.classList.remove('hidden');
    highScorePage.classList.add('hidden');
    score = 0;
    scoreNames = [];
  });
};

startButton.addEventListener('click', startQuiz);
