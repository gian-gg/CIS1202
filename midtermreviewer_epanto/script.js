const inventory = [];
const shoppingList = [];
const shoppingOptions = [];

const discountedAlternatives = {
  milk: ["Soy Milk", "Almond Milk", "Oat Milk"],
  bread: ["Whole Wheat Bread", "Gluten-Free Bread", "Multigrain Bread"],
  rice: ["Organic Brown Rice", "Basmati Rice", "Jasmine Rice"],
  butter: ["Plant-Based Butter", "Unsalted Butter", "Margarine"],
  pasta: ["Gluten-Free Pasta", "Whole Grain Pasta", "Low-Carb Pasta"],
  sauce: [
    "Low-Sodium Soy Sauce",
    "Organic Tomato Sauce",
    "Vegan Alfredo Sauce",
  ],
  sweeteners: ["Organic Honey", "Stevia", "Maple Syrup"],
};

const tableBodyInv = document.getElementById("table-body-inventory");
const nameInputInv = document.getElementById("nameInput-inventory");
const quantityInputInv = document.getElementById("quantityInput-inventory");
const dateInputInv = document.getElementById("dateInput-inventory");
const currentDateElement = document.getElementById("currentDate");

const tableBodyShop = document.getElementById("table-body-shopping");
const itemInputShop = document.getElementById("itemInput-shopping");
const discountInputShop = document.getElementById("discountInput-shopping");

function addInventoryItem(
  inventory,
  nameInput,
  quantityInput,
  dateInput,
  shoppingOptions
) {
  const quantityStatusValue = handleQuantityStatus(quantityInput.value);
  const inventoryItem = {
    id: inventory.length + 1,
    name: nameInput.value,
    quantity: quantityInput.value,
    date: dateInput.value,
    dateStatus: "success",
    quantityStatus: quantityStatusValue,
  };

  if (quantityStatusValue === "danger" || quantityStatusValue === "warning") {
    const shoppingItem = {
      id: shoppingOptions.length + 1,
      name: nameInput.value,
    };

    shoppingOptions.push(shoppingItem);
  }

  inventory.push(inventoryItem);

  nameInput.value = "";
  quantityInput.value = "";
  dateInput.value = "";
}

function addShoppingItem(shoppingList, itemInputShop, discountInputShop) {
  const shoppingItem = {
    id: shoppingList.length + 1,
    name:
      discountInputShop.value === ""
        ? itemInputShop.value
        : discountInputShop.value,
  };

  shoppingList.push(shoppingItem);

  itemInputShop.value = "";
  discountInputShop.value = "";
}

function getDaysBetween(currentDate, itemDate) {
  return (new Date(itemDate) - new Date(currentDate)) / (1000 * 60 * 60 * 24);
}

function handleDateStatus(items, tableBody, currentDateElement) {
  setInterval(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    currentDateElement.innerHTML = currentDate;
    if (items.length > 0) {
      items.forEach((item) => {
        const daysBetween = getDaysBetween(currentDate, item.date);

        if (daysBetween < 1) {
          item.dateStatus = "danger";
        } else if (daysBetween <= 5) {
          item.dateStatus = "warning";
        } else {
          item.dateStatus = "success";
        }
      });

      displayInventory(items, tableBody);
    }
  }, 1000);
}

function handleQuantityStatus(quantity) {
  if (quantity < 1) {
    return "danger";
  } else if (quantity <= 5) {
    return "warning";
  } else {
    return "success";
  }
}

function displayInventory(items, tableBody) {
  tableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td class="status-cell">
        <span class="badge bg-${item.quantityStatus}">
            ${item.quantity}
        </span>
      </td>
      <td class="status-cell">
        <span class="badge bg-${item.dateStatus}">
            ${item.date}
        </span>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function displayShoppingList(items, tableBody) {
  tableBody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
    `;

    tableBody.appendChild(row);
  });
}

function displayShoppingOptions(shoppingOptions, itemInput) {
  itemInput.disabled = true;
  if (shoppingOptions.length < 1) {
    return;
  }

  itemInput.innerHTML = "<option selected>----</option>";
  itemInput.removeAttribute("disabled");

  shoppingOptions.forEach((item) => {
    const option = document.createElement("option");

    option.innerHTML = `
      <option value="${item.name}">${item.name}</option>
    `;

    itemInput.appendChild(option);
  });
}

function displayDiscountedAlternatives(
  discountedAlternatives,
  itemInputShop,
  discountInputShop
) {
  itemInputShop.addEventListener("change", function () {
    const selectedItem = itemInputShop.value.toLowerCase();
    discountInputShop.innerHTML = "";
    discountInputShop.disabled = true;
    if (discountedAlternatives[selectedItem]) {
      discountInputShop.innerHTML = "<option selected>----</option>";
      discountInputShop.removeAttribute("disabled");

      discountedAlternatives[selectedItem].forEach((item) => {
        const option = document.createElement("option");

        option.innerHTML = `
          <option value="${item}">${item}</option>
        `;

        discountInputShop.appendChild(option);
      });
    }
  });
}

handleDateStatus(inventory, tableBodyInv, currentDateElement);
displayDiscountedAlternatives(
  discountedAlternatives,
  itemInputShop,
  discountInputShop
);

function handleInventoryForm(event) {
  event.preventDefault();
  console.log("INVENTORY SUBMIT");

  addInventoryItem(
    inventory,
    nameInputInv,
    quantityInputInv,
    dateInputInv,
    shoppingOptions
  );
  displayShoppingOptions(shoppingOptions, itemInputShop);
  displayInventory(inventory, tableBodyInv);
}

function handleShoppingForm(event) {
  event.preventDefault();
  if (itemInputShop.value === "") {
    return;
  }

  console.log("SHOPPING SUBMIT");

  addShoppingItem(shoppingList, itemInputShop, discountInputShop);

  displayShoppingList(shoppingList, tableBodyShop);
}
