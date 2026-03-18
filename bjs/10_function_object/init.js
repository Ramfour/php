
window.onload = function()
{
    const initPerson = personGenerator.getPerson();
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    document.getElementById('birthYearOutput').innerText = initPerson.age;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
    document.getElementById('JobOutput').innerText = initPerson.job;
};

