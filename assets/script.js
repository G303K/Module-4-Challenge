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

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();

  // Create an input field for initials
  const initialsInput = document.createElement("input");
  initialsInput.type = "text";
  initialsInput.placeholder = "Enter your initials";
  
  // Create a button to submit the initials and store the score
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", function() {
    const initials = initialsInput.value;
    if (initials) {
      // Store the score and initials in a database or storage
      // For example: You can use localStorage or send it to a server
      
      // Reset the input field after submission
      initialsInput.value = "";
      // Hide the input field and submit button after submission
      initialsInput.style.display = "none";
      submitButton.style.display = "none";
      
      // Update the message to show successful submission
      questionElement.innerHTML = `Score submitted successfully!`;
    }
  });

  function showScore() {
  resetState();

  const initialsInput = document.createElement("input");
  initialsInput.type = "text";
  initialsInput.placeholder = "Enter your initials";

  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  submitButton.addEventListener("click", function() {
    const initials = initialsInput.value;
    if (initials) {
      // Retrieve existing scores from local storage or initialize an empty array
      const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
      savedScores.push({ initials, score });

      // Save the updated scores to local storage
      localStorage.setItem("scores", JSON.stringify(savedScores));

      initialsInput.value = "";
      initialsInput.style.display = "none";
      submitButton.style.display = "none";

      questionElement.innerHTML = `Score submitted successfully!`;

      // Update the scoreboard display
      updateScoreboard(savedScores);
    }
  });

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
  questionElement.appendChild(initialsInput);
  questionElement.appendChild(submitButton);

  nextButton.innerHTML = "Play again?";
  nextButton.style.display = "block";
}

function updateScoreboard(scores) {
  const scoreboardElement = document.createElement("div");
  scoreboardElement.innerHTML = "<h2>Scoreboard</h2>";
  
  if (scores.length === 0) {
    scoreboardElement.innerHTML += "No scores yet.";
  } else {
    for (const entry of scores) {
      scoreboardElement.innerHTML += `<p>${entry.initials}: ${entry.score}</p>`;
    }
  }
  
  // Replace the previous scoreboard with the updated one
  const oldScoreboard = document.getElementById("scoreboard");
  if (oldScoreboard) {
    oldScoreboard.parentNode.removeChild(oldScoreboard);
  }
  scoreboardElement.id = "scoreboard";
  document.body.appendChild(scoreboardElement);
}

// Call this function to initially load the scoreboard from local storage
updateScoreboard(JSON.parse(localStorage.getItem("scores")) || []);


  // Add the input field and submit button to the questionElement
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>`;
  questionElement.appendChild(initialsInput);
  questionElement.appendChild(submitButton);

  // Update the nextButton
  nextButton.innerHTML = "Play again?";
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startquiz();
  }
});

startquiz();

