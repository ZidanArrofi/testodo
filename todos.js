const storageKey = "STORAGE_KEY";
const btnTambahkan = document.querySelector("#addToDoList");
const tbody = document.querySelector("#content-list");

function randomStrings(panjang) {
  var randomStrings = "";
  var characters = "1234567890";
  for (var i = 0; i < panjang; i++) {
    randomStrings += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomStrings;
}

function checkForStorage() {
  return typeof Storage !== "undefined";
}

function addToStorage(data) {
  if (checkForStorage()) {
    let dataTodos = [];
    if (localStorage.getItem(storageKey) !== null) {
      dataTodos = JSON.parse(localStorage.getItem(storageKey));
    }

    dataTodos.unshift(data);
    if (dataTodos.length > 5) {
      dataTodos.pop();
    }

    localStorage.setItem(storageKey, JSON.stringify(dataTodos));
  }
}

function getData() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } else {
    return [];
  }
}

function renderData() {
  const getDataStorage = getData();

  tbody.innerHTML = "";

  getDataStorage.forEach((todos) => {
    const tr = document.createElement("tr");
    tr.classList.add("task-row");

    const tdTask = document.createElement("td");
    tdTask.innerHTML = todos.content;
    if (todos.isComplete) {
      tdTask.style.textDecoration = "line-through";
    }

    const tdDate = document.createElement("td");
    tdDate.innerHTML = todos.date || "";

    const tdAction = document.createElement("td");

    const btnCeklist = document.createElement("button");
    btnCeklist.setAttribute("class", "btn-ceklist");
    btnCeklist.innerHTML = "✔️";
    btnCeklist.value = todos.id;
    btnCeklist.style.backgroundColor = "#00FFD1";

    const btnDelete = document.createElement("button");
    btnDelete.setAttribute("class", "btn-delete");
    btnDelete.innerHTML = "❌";
    btnDelete.value = todos.id;
    btnDelete.style.backgroundColor = "#FF6666";

    tdAction.appendChild(btnCeklist);
    tdAction.appendChild(btnDelete);

    tr.appendChild(tdTask);
    tr.appendChild(tdDate);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });

  document.querySelector("#titleToDoList").value = "";
}

function getButtonElemen(e) {
  e.preventDefault();
  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Apakah yakin menghapus List ini?")) {
      const elemen = e.target.parentElement.parentElement.parentElement;
      removeList(elemen);
      elemen.remove();
    }
  } else if (e.target.classList.contains("btn-ceklist")) {
    const elemen = e.target.parentElement.parentElement.parentElement;
    completeList(elemen);
  }
}

function completeList(elemen) {
  const list = getData();

  list.forEach((isi, index) => {
    if (e.target.value === isi.id) {
      isi.isComplete = true;
    }
  });

  localStorage.setItem(storageKey, JSON.stringify(list));
  renderData();
}

function removeList(elemen) {
  const list = getData();

  list.forEach((isi, index) => {
    if (elemen.querySelector(".btn-delete").value === isi.id) {
      list.splice(index, 1);
    }
  });
  localStorage.setItem(storageKey, JSON.stringify(list));
}

btnTambahkan.addEventListener("click", (e) => {
  e.preventDefault();
  const textList = document.querySelector("#titleToDoList").value;
  const dateList = document.querySelector("#dateToDoList").value;

  const newTodos = {
    id: randomStrings(5),
    content: textList,
    date: dateList,
    isComplete: false,
  };

  addToStorage(newTodos);
  renderData();
});

window.addEventListener("load", function () {
  if (checkForStorage()) {
    if (localStorage.getItem(storageKey) !== null) {
      renderData();
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }
});
