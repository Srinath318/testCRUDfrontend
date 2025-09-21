let allContainer = document.getElementById("allContainer");
let addText = document.getElementById("addText");

window.onload = showall;

//GET
async function showall() {
  const response = await fetch(
    "https://testcrudbackend-production.up.railway.app/all"
  );
  const resGet = await response.json();

  let list = `<h2>All Test</h2>`;
  resGet.forEach((element, index) => {
    list += `<li>${index + 1} - ${element.testVar}
            <span><button onclick=updateTest(${element.id},"${
      element.testVar
    }")>Update</button></span>
            <span><button onclick=deleteTest(${
              element.id
            })>Delete</button></span></li>`;
  });

  allContainer.innerHTML = list;
}

//POST
async function addTest() {
  let addTextValue = addText.value;

  await fetch(
    `https://testcrudbackend-production.up.railway.app/post?testVar=${encodeURIComponent(
      addTextValue
    )}`,
    {
      method: "POST",
    }
  );

  addText.value = "";
  showall();
}

//UPDATE
async function updateTest(id, testVar) {
  let updateValue = prompt("Enter the new value", testVar);

  await fetch(
    `https://testcrudbackend-production.up.railway.app/update/${id}?testVar=${encodeURIComponent(
      updateValue
    )}`,
    {
      method: "PUT",
    }
  );

  showall();
}

//DELETE
async function deleteTest(id) {
  await fetch(
    `https://testcrudbackend-production.up.railway.app/delete/${id}`,
    {
      method: "DELETE",
    }
  );

  showall();
}

//CLEAR
async function clearTest(params) {
  await fetch(`https://testcrudbackend-production.up.railway.app/clear`, {
    method: "DELETE",
  });

  showall();
}
