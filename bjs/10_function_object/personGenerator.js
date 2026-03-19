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

    // json с мужскими отчествами
    patronymicMaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александрович",
            "id_2": "Максимович",
            "id_3": "Иванович",
            "id_4": "Артемович",
            "id_5": "Дмитриевич",
            "id_6": "Никитич",
            "id_7": "Михайлович",
            "id_8": "Даниилович",
            "id_9": "Егорович",
            "id_10": "Андреевич"
        }
    }`,
    
    // json с женскими отчествами
    patronymicFemaleJson: `{
        "count": 10,
        "list": {
            "id_1": "Александровна",
            "id_2": "Максимовна",
            "id_3": "Ивановна",
            "id_4": "Артемовна",
            "id_5": "Дмитриевна",
            "id_6": "Никитична",
            "id_7": "Михайловна",
            "id_8": "Данииловна",
            "id_9": "Егоровна",
            "id_10": "Андреевна"
        }
    }`,

    // json c мужскими профессиями
    maleOnlyJobs: `{
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
    commonJobs: `{
        "count": 10,
        "list": {
            "id_1": "Водитель автомобиля",
            "id_2": "Слесарь",
            "id_3": "Сварщик",
            "id_4": "Безработный",
            "id_5": "Врач-стоматолог ",
            "id_6": "Продавец",
            "id_7": "Разработчик (веб-разработчик)",
            "id_8": "Повар",
            "id_9": "Маляр",
            "id_10": "Специалист по уходу "
        }
    }`,

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

        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomYear = Math.floor(Math.random() * (this.currentDate.getFullYear() - (this.currentDate.getFullYear() - 80) + 1) + (this.currentDate.getFullYear() - 80));
        const maxDay = this.randomDayGenerator(randomMonth, randomYear);
        const randomDay = Math.floor(Math.random() * maxDay) + 1;
        return [randomDay, randomMonth, randomYear]
        
        
    },

    // генерация дня
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
        const monthText = (date[1] < 10)?   `0${date[1]}` : date [1];
        return `${dayText}.${monthText}.${date[2]}`;
    },
    
   randomPatronomyc: function(gender) {
        const json = (gender === this.GENDER_MALE)? this.patronymicMaleJson : this.patronymicFemaleJson;
        return this.randomValue(json)
   },

   randomJob: function(gender, age){
        const jsonMale = (Math.random() < 0.5)? this.maleOnlyJobs : this.commonJobs;
        let json;
        // console.log(age);
        if (age <= 17){
            json = this.childStatusJson
        }else if (age >= 55){
            json = this.pensionerStatusJson
        }else{
            json = (gender === this.GENDER_MALE)? jsonMale : this.commonJobs;
        }

        return this.randomValue(json)
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
        return this.person;
    }

};
