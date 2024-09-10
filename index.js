let list = document.querySelector("ul.list");
let btnAdd = document.getElementById("btnAdd");
let listItems = [
  {
    content: "Content Task 1",
    status: "doing",
  },
  {
    content: "Content Task 2",
    status: "complete",
  },
];

if (localStorage.getItem("listItems") != null) {
  listItems = JSON.parse(localStorage.getItem("listItems"));
}

function saveLocalStorge() {
  localStorage.setItem("listItems", JSON.stringify(listItems));
}

btnAdd.onclick = function (event) {
  event.preventDefault();
  let content = document.getElementById("task").value;

  if (content != "") {
    listItems.unshift({
      content: content,
      status: "doing",
    });
  }
  addTask();
  document.getElementById("task").value = "";
  saveLocalStorge();
};

function addTask() {
  list.innerHTML = "";
  listItems.forEach((item, index) => {
    let newItem = document.createElement("li");
    newItem.classList.add(item.status);
    newItem.innerHTML = `
        <div class="complete-icon" onClick="completeTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
        </div>

        <div class="content">${item.content}</div>
          <div class="close-icon" onClick="deleteTask(${index})">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
        
        `;
    list.appendChild(newItem);
  });
}

addTask();

function completeTask(index) {
  listItems[index].status = "complete";
  addTask();
  saveLocalStorge();
}

function deleteTask(index) {
  listItems = listItems.filter((item, newIndex) => {
    return newIndex != index;
  });
  addTask();
  saveLocalStorge();
}
