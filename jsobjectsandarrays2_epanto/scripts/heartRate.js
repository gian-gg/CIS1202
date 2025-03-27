const HHR = [];
const NHR = [];
const LHR = [];

function heartRateAnalyzer(patientData) {
  let array;
  let status;
  if (patientData.heartRate > 220) {
    array = HHR;
    status = "High";
  } else if (patientData.heartRate >= 150) {
    array = NHR;
    status = "Normal";
  } else {
    array = LHR;
    status = "Low";
  }

  patientData.status = status;
  array.push(patientData);
}

function addPatient() {
  const nameInput = document.getElementById("nameInput");
  const heartInput = document.getElementById("heartInput");

  const patientData = {
    id: HHR.length + NHR.length + LHR.length + 1,
    name: nameInput.value,
    heartRate: heartInput.value,
  };

  heartRateAnalyzer(patientData);

  nameInput.value = "";
  heartInput.value = "";
}

function displayAll(tableBody) {
  tableBody.innerHTML = "";

  const array = [HHR, NHR, LHR];

  let idCounter = 1;
  array.forEach((list) => {
    list.forEach((patient) => {
      const row = document.createElement("tr");

      let categoryColor;
      switch (patient.status) {
        case "Normal":
          categoryColor = "success";
          break;
        case "Low":
          categoryColor = "warning";
          break;
        default: // Emergency
          categoryColor = "danger";
      }
      row.innerHTML = `
        <td>${idCounter++}</td>
        <td>${patient.name}</td>
        <td>${patient.heartRate}</td>
        <td class="status-cell">
          <span class="badge bg-${categoryColor}">${patient.status}</span>
        </td>
      `;

      tableBody.appendChild(row);
    });
  });
}

const form = document.getElementById("form");
const tableBody = document.getElementById("table-body");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("SUBMIT");

  addPatient();
  displayAll(tableBody);
});
