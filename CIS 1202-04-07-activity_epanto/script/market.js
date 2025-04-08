const tableBody = document.getElementById("table-body");

function displayStock(stock) {
  tableBody.innerHTML = "";

  stock.forEach((course, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${course.symbol}</td>
      <td>${course.price}</td>
      <td>${course.change}</td>
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
      displayStock(data);
    })
    .catch((error) => {
      console.error("Error fetching courses: ", error);
    });
}

function loadStock() {
  console.log("CLICK");

  fetchData("../data/stocks.json");
}
