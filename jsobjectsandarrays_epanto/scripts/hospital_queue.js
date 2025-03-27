const patients = [];

function addPatient() {
  const nameInput = document.getElementById("nameInput");
  const statusInput = document.getElementById("statusInput");

  const patient = {
    id: patients.length + 1,
    name: nameInput.value,
    status: statusInput.value,
  };
  patients.push(patient);

  nameInput.value = "";
  statusInput.value = "";
}

function removePatient(id) {
  const index = patients.findIndex((item) => item.id === id);
  if (index !== -1) patients.splice(index, 1);

  displayAll(patients, tableBody);
}

function sortPatients() {
  patients.sort((a, b) => {
    const statusOrder = {
      Emergency: 1,
      Priority: 2,
      Regular: 3,
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });
}

function displayAll(patients, tableBody) {
  tableBody.innerHTML = "";

  patients.forEach((patient, index) => {
    let categoryColor;
    switch (patient.status) {
      case "Regular":
        categoryColor = "success";
        break;
      case "Priority":
        categoryColor = "warning";
        break;
      default: // Emergency
        categoryColor = "danger";
    }

    const row = document.createElement("tr");
    row.className = index == 0 ? "table-active" : "";
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${patient.name}</td>
      <td class="status-cell">
        <span class="badge bg-${categoryColor}">
          <i class="bi bi-capsule"></i> ${patient.status}
        </span>
      </td>
      <td>
        <button onclick="removePatient(${
          patient.id
        })" class="btn p-0 btn-ghost custom-btn-hover custom-text-secondary">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

const form = document.getElementById("form");
const tableBody = document.getElementById("table-body");

function PatientQueue(event) {
  event.preventDefault();
  console.log("SUBMIT");

  addPatient();
  sortPatients();
  displayAll(patients, tableBody);
}
