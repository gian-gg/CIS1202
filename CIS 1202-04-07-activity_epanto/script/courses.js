const tableBody = document.getElementById("table-body");

function displayCourses(courses) {
  tableBody.innerHTML = "";

  courses.forEach((course, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${course.title}</td>
      <td>${course.instructor}</td>
      <td>${course.schedule["time"]}</td>
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
      displayCourses(data);
    })
    .catch((error) => {
      console.error("Error fetching courses: ", error);
    });
}

function loadCourses() {
  console.log("CLICK");

  fetchData("../data/courses.json");
}
