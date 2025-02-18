let currentQuestion = 0;
let rightQuestion = 0;

function init() {
    let maxNum = document.querySelectorAll(".max-count");
    maxNum.forEach(num => {
        num.innerHTML = questions.length;
    })

    document.getElementById("endScreen").classList.add("d_none");

    showQuestion(currentQuestion);
}

function showQuestion(currentQuestion) {
    if (currentQuestion >= questions.length) {
        document.querySelector(".progress-bar").innerHTML = `100 %`;
        document.querySelector(".progress-bar").style.width = `100 %`;

        document.getElementById("endScreen").classList.toggle("d_none");
        document.getElementById("startScreen").classList.toggle("d_none");

        document.getElementById("right-questions").innerHTML = rightQuestion;
    } else {
        let question = questions[currentQuestion];

        document.getElementById('curr-count').innerHTML = currentQuestion +1;

        let percent = Math.round((currentQuestion / questions.length)*100);
        document.querySelector(".progress-bar").innerHTML = `${percent} %`;
        document.querySelector(".progress-bar").style.width = `${percent}%`;

        document.getElementById("questiontext").innerHTML = question['question'];
        document.getElementById("answer_1").innerHTML = question['answer_1'];
        document.getElementById("answer_2").innerHTML = question['answer_2'];
        document.getElementById("answer_3").innerHTML = question['answer_3'];
        document.getElementById("answer_4").innerHTML = question['answer_4'];
    }

}

function answer(answer) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = answer.slice(-1);

    if (selectedQuestionNumber == question['right_answer']) {
        rightQuestion++;
        document.getElementById(answer).parentNode.classList.add('bg-success');
    } else {
        document.getElementById(answer).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_` + question['right_answer']).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-button').disabled = false;
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