let currentQuestion = 0;

function init() {
    document.getElementById("max-count").innerHTML = questions.length;

    showQuestion(currentQuestion);
}

function showQuestion(currentQuestion) {
    let question = questions[currentQuestion];

    document.getElementById("questiontext").innerHTML = question['question'];
    document.getElementById("answer_1").innerHTML = question['answer_1'];
    document.getElementById("answer_2").innerHTML = question['answer_2'];
    document.getElementById("answer_3").innerHTML = question['answer_3'];
    document.getElementById("answer_4").innerHTML = question['answer_4'];
}

function answer(answer) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = answer.slice(-1);

    if (selectedQuestionNumber == question['right_answer']) {
        console.log(true);
        document.getElementById(answer).parentNode.classList.add('bg-success');
    } else {
        console.log(false);
        document.getElementById(answer).parentNode.classList.add('bg-danger');
        document.getElementById(`answer_` + question['right_answer']).parentNode.classList.add('bg-success');
    }

    document.getElementById('next-button').disabled = false;
}