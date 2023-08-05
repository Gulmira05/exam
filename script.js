let input1 = document.querySelector(".input1");
let input2 = document.querySelector(".input2");
let image = document.querySelector(".image");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");

let updInput1 = document.querySelector(".updInput1");
let updInput2 = document.querySelector(".updInput2");
let updImage = document.querySelector(".updImage");
let btnSave = document.querySelector(".btnSave");
read();

btn.addEventListener("click", () => {
  let obj = {
    name: input1.value,
    lastName: input2.value,
    img: image.value,
  };
  let data = JSON.parse(localStorage.getItem("person")) || [];
  data.push(obj);
  localStorage.setItem("person", JSON.stringify(data));
  read();
});

function read() {
  let newData = JSON.parse(localStorage.getItem("person")) || [];
  list.innerHTML = "";
  newData.forEach((el, index) => {
    let infoDiv = document.createElement("div");
    let infoText = document.createElement("div");
    let btns = document.createElement("div");
    let btnDel = document.createElement("button");
    let btnEdit = document.createElement("button");

    let image = document.createElement("img");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");

    infoDiv.classList.add("infoDiv");
    infoText.classList.add("infoText");
    btns.classList.add("btns");

    btnDel.classList.add("btnDel");
    btnEdit.classList.add("btnEdit");

    image.src = el.img;
    p1.innerText = `name: ${el.name}`;
    p2.innerText = `last name: ${el.lastName}`;
    btnDel.innerText = "Delete";
    btnEdit.innerText = "Edit";

    btnDel.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
    btnEdit.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;

    infoText.append(p1);
    infoText.append(p2);
    infoDiv.append(image);
    infoDiv.append(infoText);
    infoDiv.append(btns);
    btns.append(btnDel);
    btns.append(btnEdit);
    list.append(infoDiv);

    btnDel.addEventListener("click", () => {
      del(index);
    });
    btnEdit.addEventListener("click", () => {
      edit(index);
    });
  });
}

function del(index) {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  data.splice(index, 1);
  localStorage.setItem("person", JSON.stringify(data));
  read();
}

function edit(index) {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  updInput1.setAttribute("id", index);
  updInput2.setAttribute("id", index);
  updImage.setAttribute("id", index);

  updInput1.value = data[index].name;
  updInput2.value = data[index].lastName;
  updImage.value = data[index].img;
}

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("person")) || [];
  let nameId = updInput1.value;
  let lastNameId = updInput2.value;
  let imgId = updImage.value;

  let newObj = {
    name: updInput1.value,
    lastName: updInput2.value,
    img: updImage.value,
  };
  data.splice(nameId, 1, newObj);
  data.splice(lastNameId, 1, newObj);
  data.splice(imgId, 1, newObj);

  localStorage.setItem("person", JSON.stringify(data));
  read();
});
