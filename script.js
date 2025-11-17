let allContainer = document.getElementById("allContainer");
let addText = document.getElementById("addText");

// BASE LINK (only change this)
let baseURL = "https://testcrudbackend-production.up.railway.app";

window.onload = showall;

//GET
async function showall() {
  const response = await fetch(`${baseURL}/all`);
  const resGet = await response.json();

  resGet.sort((a, b) => a.id - b.id);

  let list = `<h2>All Test</h2>`;
  resGet.forEach((element, index) => {
    list += `<li>${index + 1} - ${element.testVar}
            <span><button onclick="updateTest(${element.id},'${
      element.testVar
    }')">Update</button></span>
            <span><button onclick="deleteTest(${
              element.id
            })">Delete</button></span></li>`;
  });

  allContainer.innerHTML = list;
}

//POST
async function addTest() {
  let addTextValue = addText.value;

  await fetch(`${baseURL}/post?testVar=${encodeURIComponent(addTextValue)}`, {
    method: "POST",
  });

  addText.value = "";
  showall();
}

//UPDATE
async function updateTest(id, testVar) {
  let updateValue = prompt("Enter the new value", testVar);

  await fetch(
    `${baseURL}/update/${id}?testVar=${encodeURIComponent(updateValue)}`,
    {
      method: "PUT",
    }
  );

  showall();
}

//DELETE
async function deleteTest(id) {
  await fetch(`${baseURL}/delete/${id}`, {
    method: "DELETE",
  });

  showall();
}

//CLEAR
async function clearTest(params) {
  await fetch(`${baseURL}/clear`, {
    method: "DELETE",
  });

  showall();
}
