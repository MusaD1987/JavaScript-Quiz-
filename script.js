const questions = [
    {
        question: "How many states are in the United States of America?",
        answers: [
            {text: "20", correct: false},
            {text: "44", correct: false},
            {text: "51", correct: false},
            {text: "50", correct: true}
        ]
    },

    {
        question: "What is the captial of New York?",
        answers: [
            {text: "Manhattan", correct: false},
            {text: "Albany", correct: true},
            {text: "Syracuse", correct: false},
            {text: "Monticello", correct: false}
        ]
    },

    {
        question: "What State in the United States of America has the largest population?",
        answers: [
            {text: "California", correct: true},
            {text: "Texas", correct: false},
            {text: "Washington", correct: false},
            {text: "New York", correct: false}
        ]
    },


    {
        question: "What State is the Statue of Liberty Located?",
        answers: [
            {text: "Georgia", correct: false},
            {text: "Texas", correct: false},
            {text: "Rhode Island", correct: false},
            {text: "New York", correct: true}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }


        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }

    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }

    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{

    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } 

    else{
        startQuiz();
    }



});

startQuiz();

