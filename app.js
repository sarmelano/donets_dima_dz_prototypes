function submitForm() {
  let personName = document.getElementById("personName").value;
  let personAge = document.getElementById("personAge").value;
  let carMake = document.getElementById("carMake").value;
  let carModel = document.getElementById("carModel").value;
  let carYear = document.getElementById("carYear").value;

  // Clear any previous error messages
  let errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].innerHTML = "";
  }

  // Check for input validity
  let isValid = true;
  function invalidSpanMessage (elem, OurinnerText) {
    let element = document.getElementById(elem);
    element.innerHTML = OurinnerText;
    return element;
  }

  let namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
  if (personName === "" || !namePattern.test(personName)) {
    invalidSpanMessage("personNameError", "Пожалуйста введите корректное имя")
    isValid = false;
  }

  if (personAge === "") {
    invalidSpanMessage("personAgeError", "Пожалуйста введите возраст");
    isValid = false;
  } else if (parseInt(personAge) <= 18) {
    invalidSpanMessage("personAgeError", "Возраст должен превышать 18 лет");
    isValid = false;
  }

  if (carMake === "") {
    invalidSpanMessage("carMakeError", "Пожалуйста введите марку машины");
    isValid = false;
  }

  if (carModel === "") {
    invalidSpanMessage("carModelError", "Пожалуйста введите модель машины");
    isValid = false;
  }

  if (carYear === "") {
    invalidSpanMessage("carYearError", "Пожалуйста введите год выпуска автомобиля");
    isValid = false;
  } else if (carYear <= 1950) {
    invalidSpanMessage("carYearError", "Автомобиль слишком старый");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Create objects "Person" and "Car"
  let person = new Person(personName, personAge);
  let car = new Car(carMake, carModel, carYear);

  // Assign the owner to the car
  car.setOwner(person);

  // Display data on the page
  person.displayData();
  car.displayData();
}