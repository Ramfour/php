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

    // Глобальные константы полов
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


    getPerson: function () {
        // Создаем объект пользователя
        this.person = {};
        this.person.gender = this.randomGender();
        this.person.firstName = this.randomFirstName(this.person.gender);
        this.person.surname = this.randomSurname(this.person.gender);
        return this.person;
    }
};
