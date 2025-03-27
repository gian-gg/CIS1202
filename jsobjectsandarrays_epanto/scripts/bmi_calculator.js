const patients = [];

function CompBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

function BMICategory(BMI) {
  let result;

  if (BMI < 18.5) {
    result = "Underweight";
  } else if (BMI <= 24.9) {
    result = "Normal";
  } else if (BMI <= 29.9) {
    result = "Overweight";
  } else if (BMI <= 39.9) {
    result = "Obesity";
  } else {
    result = "Extreme Obesity";
  }

  return result;
}

function addPatient() {
  const nameInput = document.getElementById("nameInput");
  const weightInput = document.getElementById("weightInput");
  const heightInput = document.getElementById("heightInput");

  const bmi = CompBMI(weightInput.value, heightInput.value);

  const patient = {
    id: patients.length + 1,
    name: nameInput.value,
    weight: weightInput.value,
    height: heightInput.value,
    bmi: bmi,
    category: BMICategory(bmi),
  };
  patients.push(patient);

  nameInput.value = "";
  weightInput.value = "";
  heightInput.value = "";
}

function displayAll(patients, tableBody) {
  const row = document.createElement("tr");
  let categoryColor;
  patients.forEach((patient) => {
    switch (patient.category) {
      case "Underweight":
        categoryColor = "warning";
        break;
      case "Normal":
        categoryColor = "success";
        break;
      case "Overweight":
        categoryColor = "warning";
        break;
      default:
        categoryColor = "danger";
    }

    row.innerHTML = `
    <td>${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.weight}</td>
    <td>${patient.height}</td>
    <td>${patient.bmi}</td>
    <td class="status-cell">
      <span class="badge bg-${categoryColor}">
        <i class="bi bi-capsule"></i> ${patient.category}
      </span>
    </td>
  `;

    tableBody.appendChild(row);
  });
}

const form = document.getElementById("form");
const tableBody = document.getElementById("table-body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("SUBMIT");

  addPatient();
  displayAll(patients, tableBody);
});
