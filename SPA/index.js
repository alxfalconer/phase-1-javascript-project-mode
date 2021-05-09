const url = 'http://brianeno.needsyourhelp.org/draw'

const cardText = document.getElementById('card-text'),
        userText = document.getElementById('user-text'),
        userData = document.getElementById('user-data'),
        genCardBtn = document.getElementById('card-btn'),
        clearBtn = document.getElementById('clear-user'),
        userBtn = document.getElementById('user-btn'),
        saveBtn = document.getElementById('save-btn');


function randomCard() {
    fetch(url)
    .then(r => r.json())
    .then(data => {
        cardText.textContent = data.strategy;
    });
}

genCardBtn.addEventListener('click', randomCard)
clearBtn.addEventListener('click', clearUser)
saveBtn.addEventListener('click', saveData, false);


function clearText() {
    userText.value = "";
    cardText.innerText = "";
}

function clearUser() {
    userData.innerHTML = "";
    sessionStorage.clear();
}

function learnMore() {
    window.open('http://music.hyperreal.org/artists/brian_eno/osfaq2.html', '_blank')
}

function checkInput() {
    if (userText.value === "" )
    {
        userText.value = errorMessage()
    }
    else randomCard()
}

function errorMessage() {
    window.alert("A dilemma must be entered. Try again.")
    return userText.value
}

class DataSystem {
    // constructor function is ran when the class is called.
    constructor() {
      this.dataStore = [];
    }
  
    // made class method to add a new data object to data array.
    add({ problem, solution }){
      this.dataStore.push({
        problem,
        solution
      });
    }
  }
  
  // making a new data system
  const dataStore = new DataSystem();
  
  // adding a click event to the add button, so when you click it it adds the data to the data system and re-renders the DOM.
  //document.querySelector("button").addEventListener("click", () => saveData());
  
  function saveData() {
    // using add method to add new data.
    dataStore.add({
      // selecting the value of the element with id of problem;
      problem: userText.value,
      // selecting the value of the element with id of solution;
      solution: cardText.innerText,
    })
    // rerendering the data list in the DOM
    displayData();
  }
  
  // loops through the data and adds them to dom.
  function displayData() {
    // selecting element with id of data
    const parent = userData;
    // clearing it so it has noting inside.
    // do this so we don't have duplicate data.
    parent.innerHTML = "";
    
    // looping through each data in the data system.
    dataStore.dataStore.forEach(t => {
      // making a new div element.
      const elm = document.createElement("div");
      // giving it a class of data
      elm.classList.add("user-data");
      
      // making a new div element.
      const prob = document.createElement("div");
      // giving it a class of problem
      prob.classList.add("user-text");
      //setting it's text value to the current data problem;
      prob.textContent = t.problem;
      
      // making a new div element.
      const solu = document.createElement("div");
      // giving it a class of solution
      solu.classList.add("card-text");
      //setting it's text value to the current data solution;
      solu.textContent = t.solution;
      
      // adding the problem and solution div to the data div.
      elm.appendChild(prob);
      elm.appendChild(solu);
      
      // adding the ticket div to the tickets div.
      parent.appendChild(elm);
    });
  }
  
  saveData();