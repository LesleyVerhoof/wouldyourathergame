const questionEl = document.getElementById('Would You Rather');
const option1Btn = document.getElementById('option1');
const option2Btn = document.getElementById('option2');
const newQuestionBtn = document.getElementById('newQuestion');
const resultEl = document.getElementById('result');

// Sample questions
const questions = [
  {
    question: 'Would you rather...eat',
    option1: 'Waffles',
    option2: 'Pancakes',
    response1: 'Roaring success! A dragon would make every day epic!',
    response2: 'Abracadabra! Casting spells sounds magical!'
  },
  {
    question: 'Would you rather...',
    option1: 'Live in a treehouse',
    option2: 'Live underwater',
    response1: 'Tree-mendous choice! Nature’s your new neighbor!',
    response2: 'Dive in! Life under the sea is a splash!'
  },
  {
    question: 'Would you rather...',
    option1: 'Never sleep again',
    option2: 'Never eat again',
    response1: 'Night owl vibes! You’ll have endless time to hustle!',
    response2: 'Foodie sacrifice! You’re powered by pure willpower!'
  }
];

// Display a random question
function displayQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[randomIndex];

  questionEl.textContent = currentQuestion.question;
  option1Btn.textContent = currentQuestion.option1;
  option2Btn.textContent = currentQuestion.option2;
  option1Btn.disabled = false;
  option2Btn.disabled = false;
  resultEl.textContent = '';

  option1Btn.dataset.response = currentQuestion.response1;
  option2Btn.dataset.response = currentQuestion.response2;
}

// Handle option selection
function handleChoice(response) {
  resultEl.textContent = response;
  option1Btn.disabled = true;
  option2Btn.disabled = true;
}

// Event listeners
option1Btn.addEventListener('click', () => handleChoice(option1Btn.dataset.response));
option2Btn.addEventListener('click', () => handleChoice(option2Btn.dataset.response));
newQuestionBtn.addEventListener('click', displayQuestion);

// Initialize with a question
displayQuestion();