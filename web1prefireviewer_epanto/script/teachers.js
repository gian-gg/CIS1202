const tableBody = document.getElementById("table-body");

function displayData(teachers) {
  tableBody.innerHTML = "";

  teachers.forEach((teacher) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${teacher.id}</td>
      <td>${teacher.name}</td>
      <td>${teacher.subject}</td>
    `;

    tableBody.appendChild(row);
  });
}

function fetchData(dataURL) {
  fetch(dataURL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load courses");
      }
      return res.json();
    })
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.error("Error fetching courses: ", error);
    });
}

function loadData() {
  console.log("CLICK");

  fetchData("../data/teachers.json");
}
