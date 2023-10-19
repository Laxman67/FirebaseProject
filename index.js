import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
  databaseURL:
    "https://fir-app-43b96-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSetting);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const addBtnEl = document.getElementById("add-button");
const inputFieldEl = document.getElementById("input-field");
const shoppingListEl = document.getElementById("shopping-list");

addBtnEl.addEventListener("click", () => {
  let inputValue = inputFieldEl.value;
  push(shoppingListInDB, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    const itemArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let index = 0; index < itemArray.length; index++) {
      let currentItem = itemArray[index];
      const currentItemID = currentItem[0];
      const currentItemValue = currentItem[1];

      appendItem(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No item here .... Yet";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}
function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItem(item) {
  let itemID = item[0];
  let itemValue = item[1];

  const newEl = document.createElement("li");
  newEl.textContent = itemValue;
  shoppingListEl.append(newEl);

  newEl.addEventListener("dblclick", () => {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
}
