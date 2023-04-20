const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const itemFilter = document.getElementById("filter");
const itemInput = document.getElementById("item-input");
const clearBtn = document.getElementById("clear");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStroge();

  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Sorry, the input field can not be empty");
    return;
  }
  const item = itemInput.value;

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(item)) {
      alert("That element already exists");
      return;
    }
  }

  // Create the DOM element
  addItemToDom(item);

  // Add Item to local Storage
  addItemToStorage(item);

  checkUI();
  itemInput.value = "";
}

function addItemToDom(item) {
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  console.log("Live server is running");

  const btn = createButton(icon);

  const li = createLi(btn, item);

  itemList.appendChild(li);
}

function createButton(icon) {
  const btn = document.createElement("button");
  btn.className = "remove-item btn-link text-red";
  btn.appendChild(icon);

  return btn;
}

function createLi(btn, item) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));
  li.appendChild(btn);
  return li;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStroge();

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStroge() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStroge();
  if (itemsFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach(function (i) {
    return i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are You Sure?")) {
    // Remove Item from DOM
    item.remove();

    // Remove Item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStroge();

  //  Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  // Clear from local Storage
  localStorage.removeItem("items");

  checkUI();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll("li");

  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });

  // console.log(texst);
}

function checkUI() {
  itemInput.value = "";
  const items = document.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
}

// Initialize app
function init() {
  // Add event listener
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  window.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
