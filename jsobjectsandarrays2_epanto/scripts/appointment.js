const patients = [];

function addPatient() {
  const nameInput = document.getElementById("nameInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");
  const statusInput = document.getElementById("statusInput");

  const patient = {
    id: patients.length + 1,
    name: nameInput.value,
    date: dateInput.value,
    time: timeInput.value,
    status: statusInput.value,
  };

  patients.push(patient);

  nameInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  statusInput.value = "";
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
    const row = document.createElement("tr");
    row.className = index == 0 ? "table-active" : "";

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

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${patient.name}</td>
      <td>${patient.date}</td>
      <td>${patient.time}</td>
      <td class="status-cell">
        <span class="badge bg-${categoryColor}">
          <i class="bi bi-capsule"></i> ${patient.status}
        </span>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

const form = document.getElementById("form");
const tableBody = document.getElementById("table-body");

function appointmentScheduler(event) {
  event.preventDefault();
  console.log("SUBMIT");

  addPatient();
  sortPatients();
  displayAll(patients, tableBody);

  console.log(patients);
}
