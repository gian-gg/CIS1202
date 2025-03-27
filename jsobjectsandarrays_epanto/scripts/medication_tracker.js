const medications = [];

function addMedication() {
  const medicineNameInput = document.getElementById("medicineInput");
  const dosageInput = document.getElementById("dosageInput");
  const frequencyInput = document.getElementById("frequencyInput");
  const timeInput = document.getElementById("timeInput");

  const medication = {
    id: medications.length + 1,
    name: medicineNameInput.value,
    dosage: dosageInput.value,
    frequency: frequencyInput.value,
    lastTakenTime: timeInput.value, // 20:22
    status: "Not Due",
  };
  medications.push(medication);

  medicineNameInput.value = "";
  dosageInput.value = "";
  frequencyInput.value = "";
  timeInput.value = "";
}

function displayAll(medications, tableBody) {
  const row = document.createElement("tr");
  medications.forEach((medicine) => {
    row.id = `med-${medicine.id}`;

    row.innerHTML = `
    <th>${medicine.id}</th>
    <td>${medicine.name}</td>
    <td>${medicine.dosage}</td>
    <td>${medicine.frequency}</td>
    <td class="status-cell">
      <span class="badge ${
        medicine.status === "Due" ? "bg-danger" : "bg-success"
      }">
        <i class="bi bi-capsule"></i> ${medicine.status}
      </span>
    </td>
  `;

    tableBody.appendChild(row);
  });
}

function MedsTracker(medications, currentTimeDisplayElement) {
  setInterval(() => {
    const now = new Date();
    const currentTime =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

    currentTimeDisplayElement.innerText = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; // needs to be padding `0` but hey

    medications.forEach((medicine) => {
      const [hh, mm] = medicine.lastTakenTime.split(":").map(Number);
      const medicineTime = hh * 3600 + mm * 60; // Convert last taken time to seconds

      const interval = (24 * 60 * 60) / medicine.frequency; // Interval per dose
      let nextDueTime = (medicineTime + interval) % 86400; // Keep within 24-hour cycle

      // console.log("Current Time: " + currentTime);
      // console.log("Next Due Time: " + nextDueTime);
      const rowElement = document.getElementById(`med-${medicine.id}`);
      if (currentTime >= nextDueTime) {
        medicine.status = "Due";
        const statusCell = rowElement.querySelector(".status-cell");
        statusCell.innerHTML = `<span class="badge bg-danger">
        <i class="bi bi-capsule"></i> ${medicine.status}
      </span>`;
      }
    });
  }, 1000);
}

const currentTimeDisplayElement = document.getElementById(
  "current-time-display"
);
const tableBody = document.getElementById("table-body");
const formElement = document.getElementById("form");

function MedsTracker(event) {
  event.preventDefault();
  console.log("SUBMIT");

  addMedication();
  displayAll(medications, tableBody);
}

MedsTracker(medications, currentTimeDisplayElement);
