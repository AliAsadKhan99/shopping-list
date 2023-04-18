const itemForm = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const itemInput = document.getElementById("item-input");

// Add event listener

itemForm.addEventListener("submit", addItem);

function addItem(e) {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Sorry, the input field can not be empty");
    return;
  }

  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  const btn = createButton(icon);

  const li = createLi(btn);

  itemList.appendChild(li);

  itemInput.value = "";
}

function createButton(icon) {
  const btn = document.createElement("button");
  btn.className = "remove-item btn-link text-red";
  btn.appendChild(icon);

  return btn;
}

function createLi(btn) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(itemInput.value));
  li.appendChild(btn);
  return li;
}
