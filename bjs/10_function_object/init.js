window.onload = function() {
    saveText(); 
    document.querySelector('#generateButton').addEventListener('click', generatePerson);
    document.querySelector('#resetButton').addEventListener('click', resetPerson);
};

function saveText() {
    originalText.firstName = document.getElementById('firstNameOutput').innerText;
    originalText.gender = document.getElementById('genderOutput').innerText;
    originalText.surname = document.getElementById('surnameOutput').innerText;
    originalText.age = document.getElementById('ageOutput').innerText;
    originalText.birthYear = document.getElementById('birthYearOutput').innerText;
    originalText.patronymic = document.getElementById('patronymicOutput').innerText;
    originalText.job = document.getElementById('JobOutput').innerText;
    originalText.photo = document.getElementById('photoOutput').src;
}

function resetPerson() {
    document.getElementById('firstNameOutput').innerText = originalText.firstName;
    document.getElementById('genderOutput').innerText = originalText.gender;
    document.getElementById('surnameOutput').innerText = originalText.surname;
    document.getElementById('ageOutput').innerText = originalText.age;
    document.getElementById('birthYearOutput').innerText = originalText.birthYear;
    document.getElementById('patronymicOutput').innerText = originalText.patronymic;
    document.getElementById('JobOutput').innerText = originalText.job;
    document.getElementById('photoOutput').src = originalText.photo;
}

function generatePerson ()
{
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    document.getElementById('ageOutput').innerText = initPerson.age;
    document.getElementById('birthYearOutput').innerText = initPerson.dateOfBirth;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
    document.getElementById('JobOutput').innerText = initPerson.job;
    document.getElementById('photoOutput').src = initPerson.photo;
};

let originalText = {};


