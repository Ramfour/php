/* Задание:
Создание генератора случайных пользовательских данных: ФИО, пола, даты рождения и профессии. С возможностью сбрасывать информацию.*/

// Объект с свойствами, которые идут для генерации данных людей
const personGenerator = {
    // json'ы нужны для имитации получения данных с сервера файла, формата json
    // json с фамилиями, count 15 исправлен на 16, иначе "Морозов" никогда не сработает
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    // json с мужскими именами
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    
    // json с мужскими именами
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александра",
            "id_2": "Мария",
            "id_3": "Ирина",
            "id_4": "Анна",
            "id_5": "Дарья",
            "id_6": "Наталья",
            "id_7": "Татьяна",
            "id_8": "София",
            "id_9": "Елена",
            "id_10": "Ольга"
        }
    }`,


    // json c мужскими профессиями
    maleOnlyJobsJson: `{
        "count": 10,
        "list": {
            "id_1": "Проходчик",
            "id_2": "Взрывник (в шахтах)",
            "id_3": "Сталевар",
            "id_4": "Литейщик металлов (на ручных работах)",
            "id_5": "Водолаз",
            "id_6": "Монтажник-высотник",
            "id_7": "Машинист горных выемочных машин",
            "id_8": "Котельщик (при ручной ковке и клепке)",
            "id_9": "Аппаратчик-гидрометаллург",
            "id_10": "Выморозчик судов"
        }
    }`,

    // json c мужскими профессиями
    commonJobsJson: `{
        "count": 10,
        "list": {
            "id_1": "Водитель автомобиля",
            "id_2": "Слесарь",
            "id_3": "Сварщик",
            "id_4": "Безработный",
            "id_5": "Парикмахер",
            "id_6": "Продавец",
            "id_7": "Разработчик (веб-разработчик)",
            "id_8": "Повар",
            "id_9": "Маляр",
            "id_10": "Специалист по уходу "
        }
    }`,

    // json'ы с "профессией" детей и пенсионеров
    childStatusJson: `{
        "count": 1,
        "list": {
            "id_1": "Иждивенец"
        }
    }`,

    pensionerStatusJson: `{
        "count": 1,
        "list": {
            "id_1": "Пенсионер"
        }
    }`,

    //json c месяцами
    /* В задании требование на месяцы, в которых только 31 день.
    Убирать заранее из json их не стал, так такой подход
    ограничивает универсальность json */
    monthsNamesJson: `{
        "count": 12,
        "list": {
            "id_1": "января",
            "id_2": "февраля",
            "id_3": "марта",
            "id_4": "апреля",
            "id_5": "мая",
            "id_6": "июня",
            "id_7": "июля",
            "id_8": "августа",
            "id_9": "сентября",
            "id_10": "октября",
            "id_11": "ноября",
            "id_12": "декабря"
        }
    }`,
    
    // json с фото пользователей (мужской пол) 18–34 лет
    maleYoungPhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/adult/male/young/person1.jpeg",
            "id_2": "image/adult/male/young/person2.jpeg",
            "id_3": "image/adult/male/young/person3.jpeg"
        }
    }`,

    // json с фото пользователей (мужской пол) 35-55 лет
    maleMaturePhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/adult/male/mature/person1.jpeg",
            "id_2": "image/adult/male/mature/person2.jpeg",
            "id_3": "image/adult/male/mature/person3.jpeg"
        }
    }`,

    // json с фото пользователей (женский пол) 18–34 лет
    femaleYoungPhotoJson: `{
        "count": 8,
        "list": {
            "id_1": "image/adult/female/young/person1.jpeg",
            "id_2": "image/adult/female/young/person2.jpeg",
            "id_3": "image/adult/female/young/person3.jpeg",
            "id_4": "image/adult/female/young/person4.jpeg",
            "id_5": "image/adult/female/young/person5.jpeg",
            "id_6": "image/adult/female/young/person6.jpeg",
            "id_7": "image/adult/female/young/person7.jpeg",
            "id_8": "image/adult/female/young/person8.jpeg"
        }
    }`,

    // json с фото пользователей (женский пол) 35-55 лет
    femaleMaturePhotoJson: `{
        "count": 5,
        "list": {
            "id_1": "image/adult/female/mature/person1.jpeg",
            "id_2": "image/adult/female/mature/person2.jpeg",
            "id_3": "image/adult/female/mature/person3.jpeg",
            "id_4": "image/adult/female/mature/person4.jpeg",
            "id_5": "image/adult/female/mature/person5.jpeg"
        }
    }`,

    // json с фото - заглушкой (дети от 1 до 15 лет)
    childPhotoJson: `{
        "count": 1,
        "list": {
            "id_1": "image/kid/child/person1.jpeg"
        }
    }`,

    // json с фото пользователей (женский пол) (дети от 16 до 17 лет)
    femaleKidPhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/kid/female/person1.jpeg",
            "id_2": "image/kid/female/person2.jpeg",
            "id_3": "image/kid/female/person3.jpeg"
        }
    }`,   


    // json с фото пользователей (мужской пол) (дети от 16 до 17 лет)
    maleKidPhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/kid/male/person1.jpeg",
            "id_2": "image/kid/male/person2.jpeg",
            "id_3": "image/kid/male/person3.jpeg"
        }
    }`,   

    // json с фото пользователей (женский пол) (дети от 56 до 80 лет)
    femalePensionerPhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/pensioner/female/person1.jpeg",
            "id_2": "image/pensioner/female/person2.jpeg",
            "id_3": "image/pensioner/female/person3.jpeg"
        }
    }`,   

    // json с фото пользователей (мужской пол) (дети от 56 до 80 лет)
    malePensionerPhotoJson: `{
        "count": 3,
        "list": {
            "id_1": "image/pensioner/male/person1.jpeg",
            "id_2": "image/pensioner/male/person2.jpeg",
            "id_3": "image/pensioner/male/person3.jpeg"
        }
    }`,   


    // Массив для исключений возраста
    AGE_EXCEPTIONS: [12, 13, 14] ,
    
    // Текущая дата
    currentDate: new Date(),


    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',

    // Метод генерации случайного числа, со сдвигом, где min включительно, а max + 1 не включительно
    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    // функция, которая получает json, преобразует в объект
    randomValue: function (json) {
        const obj = JSON.parse(json);
        // В константу записываем id_ + случайное число из метода randomIntNumber
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomGender: function() {

        return (Math.random() < 0.5)? this.GENDER_MALE: this.GENDER_FEMALE;
    },

    randomFirstName: function(gender) {

        const json = (gender === this.GENDER_MALE)? this.firstNameMaleJson : this.firstNameFemaleJson ;
        return this.randomValue(json)
    },

     randomSurname: function(gender) {

        const surname = this.randomValue(this.surnameJson);
        return (gender === this.GENDER_MALE)? surname : surname + 'a' ;
    },

    // Генератор возраста
    randomAge: function([randomDay, randomMonth, randomYear]) {
        
        let age;

        if (randomMonth < this.currentDate.getMonth() + 1) {
            age = this.currentDate.getFullYear() - randomYear;
        } else if (randomMonth > this.currentDate.getMonth() + 1) {
            age = this.currentDate.getFullYear() - randomYear - 1;
        } else if (randomMonth == this.currentDate.getMonth() + 1) {
           age = (randomDay <= this.currentDate.getDate())? this.currentDate.getFullYear() - randomYear : this.currentDate.getFullYear() - randomYear - 1;
        }

        return age
   },

   // Возраст + текст
   ageToText: function (age) {
        let ageText = age; 
        if (age % 10 == 1 && age != 11 || age == 1) {
                ageText += ' год';
        
            }else if (( 4 >= (age % 10) && (age % 10) >= 2) && !(this.AGE_EXCEPTIONS.includes(age))) {
                ageText += ' года'
        }else{
                ageText += ' лет'
        }
        return ageText
   },

   // Генератор даты рождения
    randomDateOfBirth: function() {
        const randomMonth = this.randomMonthGenerator(); // теперь генерируем любой месяц от 1 до 12
        const randomYear = this.randomYearGenerator();
        const maxDay = this.randomDayGenerator(randomMonth, randomYear);
        const randomDay = Math.floor(Math.random() * maxDay) + 1;
        return [randomDay, randomMonth, randomYear];
    },

    // Генерация месяца
    randomMonthGenerator: function() {
        let randomMonth = this.randomIntNumber(12, 1);
        return randomMonth
    },

    // Генерация года
    randomYearGenerator: function() {
        // Ограничение от 1 до 80 лет
        let maxYear = this.currentDate.getFullYear() - 1;
        let minYear = this.currentDate.getFullYear() - 80;
        let randomYear = this.randomIntNumber(maxYear, minYear);
        return randomYear
    },

    // Генерация количества дней в месяце с учётом високосного года.
    
    /*Использована математическая формула из статьи: https://habr.com/ru/articles/261773/
    Альтернативный (и более простой) способ: new Date(year, month + 1, 0).getDate().
    Оставил этот вариант как эксперимент с математическими вычислениями.*/
    
    randomDayGenerator: function (randomMonth, randomYear) {
        // проверка на високосный год
        const leapYearCheck = ((randomYear % 4 == 0 && randomYear % 100 != 0) || (randomYear % 400 == 0))? 1 : 0;
        // коэффициент для учитывания февраля
        const febCoeff = (randomMonth == 2)? 1 : 0;
        let term1 = (randomMonth + Math.floor(randomMonth / 8)) % 2;
        let term2 = 2 % randomMonth;
        let term3 = 2 * Math.floor(1 / randomMonth);
        const numbDayOfMonth = 28 + term1 + term2 + term3 + febCoeff * leapYearCheck;
        return numbDayOfMonth
    },

    // Преобразователь даты в текст
    dateToText: function ([day, month, year]){
        const date = [day, month, year];
        const dayText = (date[0] < 10)?  `0${date[0]}` : date[0];
        const obj = JSON.parse(this.monthsNamesJson);
        const prop = `id_${month}`;
        const monthText = obj.list[prop];
        return `${dayText} ${monthText} ${date[2]}`;
    },

    // Образование и написание отчеств http://zags.kurganobl.ru/obrazovanie_i_napisanie_otchestv.html
     randomPatronomyc: function(gender) {
        let firstName = this.randomFirstName(this.GENDER_MALE);
        const lastLetter = firstName.slice(-1);
        if (["б", "в", "г", "д", "з", "к", "л", "м", "н", "п", "р", "с", "т", "ф", "х"].includes(lastLetter)){
            return (gender === this.GENDER_MALE)? firstName + "ович" : firstName + "овна";
        }else if (["а", "у", "ы"].includes(lastLetter)){
            return (gender === this.GENDER_MALE)? firstName.slice(0, -1) + "ич" : firstName.slice(0, -1) + "ична";
        }else if (lastLetter === "й") {
            return (gender === this.GENDER_MALE)? firstName.slice(0, -1) + "евич" : firstName.slice(0, -1) + "евна";
        }else{
            return (gender === this.GENDER_MALE) ? firstName + "евич" : firstName + "евна";
        }

   },

   randomJob: function(gender, age){
        const jsonMale = (Math.random() < 0.5)? this.maleOnlyJobsJson : this.commonJobsJson;
        let json;
        if (age <= 17){
            json = this.childStatusJson
        }else if (age >= 55){
            json = this.pensionerStatusJson
        }else{
            json = (gender === this.GENDER_MALE)? jsonMale : this.commonJobsJson;
        }

        return this.randomValue(json)
   },

    // Генерация случайного фото
     randomPhotoGenerator: function(gender, age) {
        let json;
        if (age < 16){
            json = this.childPhotoJson
            return this.randomValue(json)
        }
        if (age <= 34 && age >= 18){
            if (gender === this.GENDER_MALE) {
                json = this.maleYoungPhotoJson;
                return this.randomValue(json)
            }else{
                json = this.femaleYoungPhotoJson;
                return this.randomValue(json)
            }
        }else if (age >= 35 && age <= 55){
            if (gender === this.GENDER_MALE) {
                json = this.maleMaturePhotoJson;
                return this.randomValue(json)
            }else{
                json = this.femaleMaturePhotoJson;
                return this.randomValue(json)
            }
        }else if (age > 55){
            if (gender === this.GENDER_MALE) {
                json = this.malePensionerPhotoJson;
                return this.randomValue(json)
            }else{
                json = this.femalePensionerPhotoJson;
                return this.randomValue(json)
            }
        }else if (age >= 16 && age <=17) {
                if (gender === this.GENDER_MALE) {
                json = this.maleKidPhotoJson;
                return this.randomValue(json)
            }else{
                json = this.femaleKidPhotoJson;
                return this.randomValue(json)
            }
        }

     },

    getPerson: function () {
        // Создаем объект пользователя
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        const dateOfBirthArray = this.randomDateOfBirth();
        const age = this.randomAge(dateOfBirthArray);
        this.person.patronymic = this.randomPatronomyc(this.person.gender);
        this.person.job = this.randomJob(this.person.gender, age);
        this.person.dateOfBirth = this.dateToText(dateOfBirthArray);
        this.person.age = this.ageToText(age);
        this.person.photo = this.randomPhotoGenerator(this.person.gender, age);
        return this.person;
    }

};
