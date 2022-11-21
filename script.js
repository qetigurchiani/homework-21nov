const usersWrapper = document.querySelector(".Users");
const usList = document.querySelector(".usersList");

function getUsers1() {
  fetch("https://reqres.in/api/unknown", { method: "GET" })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error();
      }
      return res.json();
    })
    .then((res) => {
      const fragment = document.createDocumentFragment();
      res.data.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = `${item.name} ${item.year}`;
        fragment.appendChild(li);
      });

      usList.appendChild(fragment);
    })
    .catch((err) => {
      const p = document.createElement("p");
      p.innerText = err.message;
      usersWrapper.appendChild(p);
    });
}

getUsers1();

// fetch-> xml http requist
const usersWrapper1 = document.querySelector(".users");
const list = document.querySelector(".userList");
const next = document.getElementById("forward");
const previous = document.getElementById("backward");

let totalPages;
let current = 1;

function getUsers(pageNum) {
  let request = new XMLHttpRequest();
  request.addEventListener("load", () => {
    let responsetxt = request.responseText;
    let parsedjs = JSON.parse(responsetxt);
    const fragment = new DocumentFragment();
    parsedjs.data.forEach((user) => {
      let li = document.createElement("li");
      li.innerText = `${user.first_name} ${user.last_name}`;
      fragment.appendChild(li);
    });
    list.innerHTML = " ";
    list.appendChild(fragment);
    totalPages = parsedjs.total_pages;
  });

  request.addEventListener("error", () => {
    let p = document.createElement("p");
    p.innerText = "404 Server Not Found";
    usersWrapper.appendChild(p);
  });

  request.open("get", "https://reqres.in/api/users?page=" + pageNum);
  request.send();
}

getUsers(current);

previous.addEventListener("click", () => {
  if (current === 1) {
    return;
  }

  current--;
  getUsers(current);
});

next.addEventListener("click", () => {
  if (current === totalPages) {
    return;
  }

  current++;
  getUsers(current);
});
