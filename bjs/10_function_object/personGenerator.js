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

    // Массив для исключений возраста
    AGE_EXCEPTIONS: [12, 13, 14] ,
    
    // Текущая дата
    currentYear: new Date().getFullYear(),

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
    
    randomAge: function() {
       let age = Math.round(Math.random()*80);
       let ageText = age; 

       if (age % 10 == 1 && age != 11){
            ageText += ' год';
       
        }else if (( 4 >= (age % 10) && (age % 10) >= 2) && !(this.AGE_EXCEPTIONS.includes(age))) {
            ageText += ' года'

       }else{
            ageText += ' лет'
       }

       return `${ageText} (${this.currentYear - age} год)`
   },

   randomPatronomyc: function(gender) {
        const json = (gender == this.GENDER_MALE)? this.patronymicMaleJson : this.patronymicFemaleJson;
        return this.randomValue(json)
   },

    getPerson: function () {
        // Создаем объект пользователя
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        this.person.age = this.randomAge();
        this.person.patronymic = this.randomPatronomyc(this.person.gender);
        return this.person;
    }
};
