import "./main.css";
import "./index.html";

const rangeInput = document.querySelector(".height__range");
const heightLabel = document.querySelector("#height__label");
const weightDecrease = document.querySelector(".weight__decrease");
const weightIncrease = document.querySelector(".weight__increase");
const weightLabel = document.querySelector("#weight__label");
const ageDecrease = document.querySelector(".age__decrease");
const ageIncrease = document.querySelector(".age__increase");
const ageLabel = document.querySelector("#age__label");
const calculateBtn = document.querySelector(".btn__calculate");
const maleBlock = document.querySelector(".male");
const femaleBlock = document.querySelector(".female");
const calculatorContainer = document.querySelector(".calculator__container");
const resultBlock = document.querySelector(".calculator__result");
const resultStatus = document.querySelector(".result__status");
const resultBmi = document.querySelector(".result__bmi");
const resultDescription = document.querySelector(".result__description");
const resultBtn = document.querySelector(".btn__recalculate");

maleBlock.addEventListener("click", () => {
  maleBlock.classList.add("active");
  femaleBlock.classList.remove("active");
});

femaleBlock.addEventListener("click", () => {
  femaleBlock.classList.add("active");
  maleBlock.classList.remove("active");
});

function updateHeight() {
  heightLabel.innerHTML = `${rangeInput.value}<span>cm</span>`;
}

rangeInput.addEventListener("input", updateHeight);

updateHeight();

let weightCount = 50;
let ageCount = 25;

function updateCounter(action, count, label, min = 0) {
  if (action === "increase") count++;
  if (action === "decrease" && count > min) count--;
  else if (action === "decrease") alert("Value can't be less than 0");

  label.innerHTML = count;
  return count;
}

weightIncrease.addEventListener("click", () => {
  weightCount = updateCounter("increase", weightCount, weightLabel);
});

weightDecrease.addEventListener("click", () => {
  weightCount = updateCounter("decrease", weightCount, weightLabel);
});

ageIncrease.addEventListener("click", () => {
  ageCount = updateCounter("increase", ageCount, ageLabel);
});

ageDecrease.addEventListener("click", () => {
  ageCount = updateCounter("decrease", ageCount, ageLabel);
});

function calc() {
  const height = +(rangeInput.value / 100).toFixed(2);
  const weight = weightCount;
  const age = ageCount;

  if (height <= 0 || weight <= 0 || age <= 0) {
    alert("Height, weight, and age must be greater than 0");
    return;
  }

  const gender = maleBlock.classList.contains("active") ? "male" : "female";

  let bmi = weight / height ** 2;

  let K = 1;

  if (age >= 20) {
    if (gender === "male") {
      K = 1 + (age - 20) / 100;
    } else if (gender === "female") {
      K = 0.95 + (age - 20) / 200;
    }
  }

  bmi = (bmi * K).toFixed(2);

  if (bmi < 18.5) {
    resultStatus.innerHTML = "Underweight";
    resultStatus.style.color = "yellow";
    resultDescription.innerHTML =
      "You have a lower than normal body weight. Try to eat more.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    resultStatus.innerHTML = "Healthy";
    resultStatus.style.color = "green";
    resultDescription.innerHTML = "You have a normal body weight. Good job!";
  } else if (bmi >= 25 && bmi < 29.9) {
    resultStatus.innerHTML = "Overweight";
    resultStatus.style.color = "orange";
    resultDescription.innerHTML =
      "You have a higher than normal body weight. Try to exercise more.";
  } else if (bmi >= 30 && bmi <= 34.9) {
    resultStatus.innerHTML = "Obese";
    resultStatus.style.color = "red";
    resultDescription.innerHTML =
      "You have a very high body weight. Be careful.";
  } else if (bmi >= 35) {
    resultStatus.innerHTML = "Extremely Obese";
    resultStatus.style.color = "red";
    resultDescription.innerHTML =
      "You have a very high body weight. Be careful.";
  }

  resultBmi.innerHTML = bmi;
  resultBlock.classList.remove("hidden");
  resultBlock.classList.add("visible");
  calculatorContainer.classList.add("hidden");
  calculateBtn.classList.add("hidden");
  resultBtn.classList.remove("hidden");
}

calculateBtn.addEventListener("click", calc);

function reset() {
  weightCount = 50;
  ageCount = 25;
  rangeInput.value = 170;
  updateHeight();
  weightLabel.innerHTML = weightCount;
  ageLabel.innerHTML = ageCount;
  resultBlock.classList.remove("visible");
  resultBlock.classList.add("hidden");
  calculatorContainer.classList.remove("hidden");
  resultBtn.classList.add("hidden");
  calculateBtn.classList.remove("hidden");
}

resultBtn.addEventListener("click", reset);
