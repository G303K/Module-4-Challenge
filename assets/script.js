// Array of questions and their answers
const questions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Alerts", correct: true },
      { text: "Numbers", correct: false },
    ],
  },
  {
    question: "The condition is in if / else statement is enclosed within:",
    answers: [
      { text: "Quotes", correct: false },
      { text: "Curley brackets", correct: true },
      { text: "Paretheses", correct: false },
      { text: "Square brackets", correct: false },
    ],
  },
  {
    question: "Arrays in Javascript can be used to store:",
    answers: [
      { text: "Numbers or strings", correct: false },
      { text: "Other arrays", correct: false },
      { text: "Booleans", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      { text: "Commas", correct: false },
      { text: "Curly brackets", correct: false },
      { text: "Quotes", correct: true },
      { text: "Parentheses", correct: false },
    ],
  },
  {
    question:
      "A very useful tool during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "Javascript", correct: false },
      { text: "Terminal/Bash", correct: false },
      { text: "For loops", correct: false },
      { text: "Console log", correct: true },
    ],
  },
];

// Selecting HTML elements for actions
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables to keep track of the quiz
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Function displaying the current question
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  // Creating answer buttons and setting up event listeners
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Function to reset the interface
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Function to display the final score and submit it to the scoreboard
function showScore() {
  resetState();

  // Create input box for user initials and submit button
  const initialsInput = document.createElement("input");
  initialsInput.type = "text";
  initialsInput.placeholder = "Enter your initials";

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", function () {
    const initials = initialsInput.value;
    if (initials) {
      // Save score to local storage
      const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
      savedScores.push({ initials, score });
      localStorage.setItem("scores", JSON.stringify(savedScores));
      // Hide input and submit button after submission
      initialsInput.value = "";
      initialsInput.style.display = "none";
      submitButton.style.display = "none";

      questionElement.innerHTML = `Score submitted successfully!`;
      updateScoreboard(savedScores);
    }
  });
  // Display user's score
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
  questionElement.appendChild(initialsInput);
  questionElement.appendChild(submitButton);

  nextButton.innerHTML = "Play again?";
  nextButton.style.display = "block";
}
// Function to update the scoreboard
function updateScoreboard(scores) {
  // Sort the scores array in descending order based on the score
  scores.sort((a, b) => b.score - a.score);

  const scoreboardElement = document.createElement("div");
  scoreboardElement.innerHTML = "<h2>Scoreboard</h2>";

  if (scores.length === 0) {
    scoreboardElement.innerHTML += "No scores yet.";
  } else {
    for (const entry of scores) {
      scoreboardElement.innerHTML += `<p>${entry.initials}: ${entry.score}</p>`;
    }
  }
  // Update and display the new scoreboard
  const oldScoreboard = document.getElementById("scoreboard");
  if (oldScoreboard) {
    oldScoreboard.parentNode.removeChild(oldScoreboard);
  }
  scoreboardElement.id = "scoreboard";
  document.body.appendChild(scoreboardElement);
}

// Function to handle the "Next" button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
// Start the quiz and update the scoreboard
startQuiz();
updateScoreboard(JSON.parse(localStorage.getItem("scores")) || []);
