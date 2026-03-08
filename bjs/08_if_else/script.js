document.querySelector('#game-card').hidden = true;
let answerNumber;
let orderNumber ;
let gameRun;
let minValue;
let maxValue;

// Глобальные массивы - константы, где хранятся названия чисел

const UNITS_ARRAY = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];

// При избавлении от сотен и переходу к работе с десятками, нужно проверить онтносится ли число к этому массиву
// иначе перейти далее
const TEN_TO_NINETEEN= ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];

const TENS = ['двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
const UNITS = [ 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];


function startGame (){
    minValue = parseInt(document.querySelector('#inputMin').value) || 0;
    minValue = (minValue>999)? 999: (minValue<-999)? -999: minValue;
    maxValue = parseInt(document.querySelector('#inputMax').value) || 100;
    maxValue = (maxValue>999)? 999: (maxValue<-999)? -999: maxValue;
    // Проверка на правильность введения
    if (minValue>maxValue){
        [minValue,maxValue] =[maxValue,minValue] 

    }
    
    document.querySelector('#min-text').textContent = minValue;
    document.querySelector('#max-text').textContent = maxValue;
    document.querySelector('#inputMin').value = "";
    document.querySelector('#inputMax').value = "";
    document.querySelector('#game-card').hidden = false;
    document.querySelector('#inputCard').hidden = true;
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;
    orderNumberField.innerText = orderNumber;
    answerField.innerText = generateAnswerVariants(answerNumber);
    console.log(answerNumber);
    
}

document.querySelector('#startGameButton').addEventListener('click', startGame);
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');


// Функция для генерации вариантов вопроса с преобразованием числа в текстовый вид
function generateAnswerVariants(answerNumber){
    let answerPhrase;
    let answerText= '';
    
    // проверка для сохранения знака числа и одновременно текстовая переменная для ответа
    let minusText=(answerNumber<0)? "минус ": '';
    let buffAnswerNumber = Math.abs(answerNumber);
    if (buffAnswerNumber==0){
        answerText += "ноль"
    }
    if (minusText) {
        answerText += `${minusText}`;
    }
    if ((buffAnswerNumber/100)>=1) {
        answerText += `${UNITS_ARRAY[Math.trunc(buffAnswerNumber/100) - 1]} `;
        buffAnswerNumber = buffAnswerNumber%100;
    }
    if (buffAnswerNumber>= 10 && buffAnswerNumber<= 19) {
        answerText += `${TEN_TO_NINETEEN[buffAnswerNumber%10]} `;
        buffAnswerNumber = null;
    }
    if ((buffAnswerNumber/10)>=1){
            answerText += `${TENS[Math.trunc(buffAnswerNumber/10) - 2]} `;
            buffAnswerNumber = buffAnswerNumber%10;
        }
    if (buffAnswerNumber>0){
        answerText += `${UNITS[buffAnswerNumber-1]}`;
        buffAnswerNumber = null;
        
    } 
    if (answerText.length>=20) {
        answerText = answerNumber
    }
    const phraseRandom = Math.round( Math.random()*3);
    switch (phraseRandom) {
        case 0:
            answerPhrase= `Да это легко! Ты загадал ${answerText}?`;
            break;
        case 1:
            answerPhrase= `Вы загадали число ${answerText }?`;
            break;
        default:
            answerPhrase= `Может быть это ${answerText }?`;
    }

    return answerPhrase;

}



document.getElementById('btnRetry').addEventListener('click', function () {
    document.querySelector('#game-card').hidden = true;
    document.querySelector('#inputCard').hidden = false;
    

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
        if (minValue === maxValue || minValue>maxValue){
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

document.querySelector('#min-number').addEventListener('click', ()=>{
        document.querySelector('#inputMin').value = -999;
})
document.querySelector('#max-number').addEventListener('click', ()=>{
        document.querySelector('#inputMax').value = 999;
})