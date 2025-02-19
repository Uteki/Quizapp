let currentQuestion = 0;
let rightQuestion = 0;

let audioRight = new Audio('./assets/sounds/rightanswer.mp3');
let audioWrong = new Audio('./assets/sounds/wronganswer.mp3');

function init() {
    let maxNum = document.querySelectorAll(".max-count");
    maxNum.forEach(num => {
        num.innerHTML = questions.length;
    })

    showQuestion(currentQuestion);
}

function showQuestion(currentQuestion) {
    if (gameOver()) {
        showEndscreen();
    } else {
        updateProgress();
        updateScreen();
    }
}

function gameOver() {
    return currentQuestion >= questions.length;
}

function showEndscreen() {
    document.querySelector(".progress-bar").innerHTML = `100 %`;
    document.querySelector(".progress-bar").style.width = `100%`;

    document.getElementById("endScreen").classList.toggle("d_none");
    document.getElementById("startScreen").classList.toggle("d_none");

    document.getElementById("right-questions").innerHTML = rightQuestion;
}

function updateScreen() {
    let question = questions[currentQuestion];

    document.getElementById('curr-count').innerHTML = currentQuestion +1;
    document.getElementById("questiontext").innerHTML = question['question'];

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).innerHTML = question[`answer_${i}`];
    }
}

function updateProgress() {
    let percent = Math.round((currentQuestion / questions.length)*100);

    document.querySelector(".progress-bar").innerHTML = `${percent} %`;
    document.querySelector(".progress-bar").style.width = `${percent}%`;
}

function answer(answer) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = answer.slice(-1);
    if (ifClicked()) return;

    if (chosenAnswerBool(selectedQuestionNumber,  question)) {
        rightQuestion++;
        audioRight.play();
        document.getElementById(answer).parentNode.classList.add('bg-success');
    } else {
        audioWrong.play();
        document.getElementById(answer).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_` + question['right_answer']).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-button').disabled = false;
}

function ifClicked() {
    return [1, 2, 3, 4].some(i =>
        document.getElementById(`answer_${i}`).parentNode.classList.contains('bg-success')
    );
}

function chosenAnswerBool(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;

    for (i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-success');
        document.getElementById(`answer_${i}`).parentNode.classList.remove('bg-danger');
    }

    showQuestion(currentQuestion);
}

function restartGame() {
    currentQuestion = 0;
    rightQuestion = 0;

    showQuestion(currentQuestion);

    document.getElementById("endScreen").classList.toggle("d_none");
    document.getElementById("startScreen").classList.toggle("d_none");
}