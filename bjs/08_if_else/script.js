document.querySelector('#game-card').hidden = true;
let minValue = document.querySelector('#inputMin').value;
let maxValue = document.querySelector('#inputMax').value;
document.querySelector('#startGameButton').addEventListener('click', function(){
    minValue = parseInt(minValue) || 0 ;
    maxValue = parseInt(maxValue) || 0 ;
    document.querySelector('#game-card').hidden = false;
    document.querySelector('#inputCard').hidden = true;
})

alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber  = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;
answerField.innerText = generateAnswerVariants(answerNumber);
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
    minValue = 0;
    maxValue = 100;
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${answerNumber }?`;
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

