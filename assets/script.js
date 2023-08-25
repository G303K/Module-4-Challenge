const questions = [
  {
    question: "Commonly used data types do NOT include:",
    answers: [
      { text: "Strings", correct: false},
      { text: "Booleans", correct: false},
      { text: "Alerts", correct: true},
      { text: "Numbers", correct: false},
    ]
  },
  {
    question: "The condition is in if / else statement is enclosed within:",
    answers: [
      { text: "Quotes", correct: false},
      { text: "Curley brackets", correct: true},
      { text: "Paretheses", correct: false},
      { text: "Square brackets", correct: false},
    ] 
  },
  {
    question: "Arrays in Javascript can be used to store:",
    answers: [
      { text: "Numbers or strings", correct: false},
      { text: "Other arrays", correct: false},
      { text: "Booleans", correct: false},
      { text: "All of the above", correct: true},
    ]
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables.",
    answers: [
      { text: "Commas", correct: false},
      { text: "Curly brackets", correct: false},
      { text: "Quotes", correct: true},
      { text: "Parentheses", correct: false},
    ]
  },
  {
    question: "A very useful tool during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "Javascript", correct: false},
      { text: "Terminal/Bash", correct: false},
      { text: "For loops", correct: false},
      { text: "Console log", correct: true},
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startquiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next"
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.
  question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.
  length}!`; 
  nextButton.innerHTML = "Play again?";
  nextButton.style.display = "block";
}


function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startquiz();
  }
});

startquiz();

