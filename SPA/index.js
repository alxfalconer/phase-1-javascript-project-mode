// declare and initialize constant variables using document method

const cardText = document.getElementById('card-text'),
        userText = document.getElementById('user-text'),
        userData = document.getElementById('user-data'),
        genCardBtn = document.getElementById('card-btn'),
        clearBtn = document.getElementById('clear-user'),
        userBtn = document.getElementById('user-btn'),
        saveBtn = document.getElementById('save-btn'),
        url = 'http://brianeno.needsyourhelp.org/draw';


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
    window.localStorage.clear(userData);
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
    constructor() {
      this.dataStore = [];
    }

    add({ problem, solution }){
      this.dataStore.push({
        problem,
        solution
      });
    }
  }

  const dataStore = new DataSystem();
  
  function saveData() {
    dataStore.add({
      problem: userText.value,
      solution: cardText.innerText,
    })
    displayData();
  }
  
  function displayData() {
    const parent = userData;
    parent.innerHTML = "";
    
    dataStore.dataStore.map(data => {
      const elm = document.createElement("div");
      elm.classList.add("user-data");
      
      const prob = document.createElement("div");
      prob.classList.add("user-text");
      prob.textContent = data.problem;
      
      const solu = document.createElement("div");
      solu.classList.add("card-text");
      solu.textContent = data.solution;

      elm.appendChild(prob);
      elm.appendChild(solu);
      
      parent.appendChild(elm);
    });
  }
  
  saveData();