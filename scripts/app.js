// Constructor functions
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.displayInfo = function() {
  const personDataElement = document.getElementById('personData');
  personDataElement.innerHTML = `<li>Name: ${this.name}</li><li>Age: ${this.age}</li>`;
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = null; //if the displayInfo called before the owner has been assigned
}

Car.prototype.displayInfo = function() {
  const carDataElement = document.getElementById('carData');
  carDataElement.innerHTML = `<li>Make: ${this.make}</li><li>Model: ${this.model}</li><li>Year: ${this.year}</li><li>Owner: ${this.owner ? this.owner.name : 'No'}</li>`;
}

Car.prototype.assignOwner = function(owner) {
  this.owner = owner;
}

// Validation functions
function validateName(name) {
  const namePattern = /^[A-Za-zА-Яа-яЁё\s]+$/;
  return name !== "" && namePattern.test(name);
}

function validateAge(age) {
  const minimumAge = 18;
  age = parseInt(age, 10);
  return age && age >= minimumAge;
}

function validateCarYear(year) {
  const currentYear = new Date().getFullYear(); 
  year = parseInt(year, 10);
  if (!year) {
    return "Please enter the car year";
  } else if (year <= 1950) {
    return "The car is too old";
  } else if (year > currentYear) {
    return "Please enter the correct year of car";
  } else {
    return true;
  }
}

function validateNonEmpty(value) {
  return value !== "";
}

// Error handling functions
function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = message;
  }
}

function clearErrors() {
  const errorElements = document.getElementsByClassName("error");
  for (let i = 0; i < errorElements.length; i++) {
    errorElements[i].innerHTML = "";
  }
}

// Form submission function
function submitForm() {
  // Inputs
  const personName = document.getElementById("personName").value;
  const personAge = document.getElementById("personAge").value;
  const carMake = document.getElementById("carMake").value;
  const carModel = document.getElementById("carModel").value;
  const carYear = document.getElementById("carYear").value;

  // Clear any previous error messages
  clearErrors();

  // Check for input validity
  let isValid = true;

  if (!validateName(personName)) {
    showError("personNameError", "Please enter the correct name");
    isValid = false;
  }

  if (!validateAge(personAge)) {
    showError("personAgeError", "Must be over the age of 18 years");
    isValid = false;
  }

  if (!validateNonEmpty(carMake)) {
    showError("carMakeError", "Please enter the make of car");
    isValid = false;
  }

  if (!validateNonEmpty(carModel)) {
    showError("carModelError", "Please enter the car model");
    isValid = false;
  }

  const carYearValidationResult = validateCarYear(carYear);
  if (carYearValidationResult !== true) {
    showError("carYearError", carYearValidationResult);
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Create objects "Person" and "Car"
  const person = new Person(personName, personAge);
  const car = new Car(carMake, carModel, carYear);

  // Assign the owner to the car and display data
  car.assignOwner(person);
  person.displayInfo();
  car.displayInfo();
}