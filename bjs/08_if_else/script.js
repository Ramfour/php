document.querySelector('#game-card').hidden = true;
    let answerNumber;
    let orderNumber ;
    let gameRun;
    let minValue;
    let maxValue;
function startGame (){
    minValue = parseInt(document.querySelector('#inputMin').value) || 0;
    minValue = (minValue>999)? 999: (minValue<-999)? -999: minValue;
    maxValue = parseInt(document.querySelector('#inputMax').value) || 100;
    maxValue = (maxValue>999)? 999: (maxValue<-999)? -999: maxValue;
    document.querySelector('#inputMin').value = "";
    document.querySelector('#inputMax').value = "";
    console.log(minValue);
    console.log(maxValue);
    document.querySelector('#game-card').hidden = false;
    document.querySelector('#inputCard').hidden = true;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = generateAnswerVariants(answerNumber);
    console.log(answerNumber);
    document.querySelector('#startGameButton').removeEventListener('click', startGame);
}

document.querySelector('#startGameButton').addEventListener('click', startGame);
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');


// Функция для генерации вариантов вопроса
function generateAnswerVariants(answerNumber){
    let answerPhrase;
    const phraseRandom = Math.round( Math.random()*3);
    switch (phraseRandom) {
        case 0:
            answerPhrase= `Да это легко! Ты загадал ${answerNumber}?`;
            break;
        case 1:
            answerPhrase= `Вы загадали число ${answerNumber }?`;
            break;
        default:
            answerPhrase= `Может быть это ${answerNumber }?`;
    }

    return answerPhrase;

}



document.getElementById('btnRetry').addEventListener('click', function () {
    document.querySelector('#game-card').hidden = true;
    document.querySelector('#inputCard').hidden = false;
    document.querySelector('#startGameButton').addEventListener('click', startGame);

})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = generateAnswerVariants(answerNumber);
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = generateAnswerVariants(answerNumber);
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
            let answerPhrase;
            const phraseRandom = Math.round( Math.random()*3);
            switch (phraseRandom) {
                case 0:
                    answerPhrase= `Я всегда угадываю\n\u{1F60E}`;
                    break;
                case 1:
                    answerPhrase= `Лучший в мире за работой!`;
                    break;
                default:
                    answerPhrase= `Слишком изи\n\u{1F92D}`;
            }

                answerField.innerText = answerPhrase
                gameRun = false;
            }
})

