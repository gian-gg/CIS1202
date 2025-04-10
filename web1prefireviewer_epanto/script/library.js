const tableBody = document.getElementById("table-body");

function bookStatus(status) {
  const badgeColor = (status === "available") ? "success" : "danger";
  return `<span class="badge bg-${badgeColor}">${status}</span>`
}

function displayData(books) {
  tableBody.innerHTML = "";

  books.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${bookStatus(book.status)}</td>
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

  fetchData("../data/library.json");
}
