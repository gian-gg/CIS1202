const tableBody = document.getElementById("table-body");

function displayData(data) {
  tableBody.innerHTML = "";

  const students = data.filter(item => item.grade > 85)
  
  students.forEach((student) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.grade}</td>
      <td>${student.course}</td>
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

  fetchData("../data/students.json");
}
