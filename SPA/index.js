
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
        userText.value = window.alert("A dilemma must be entered. Try again.")
        return userText.value
    }
    else randomCard()
}

class DataSystem {
    constructor() {
      this.dataStore = [];
    }

    add({ dilemma, strategy }){
      this.dataStore.push({
        dilemma,
        strategy
      });
    }
  }

  const dataStore = new DataSystem();
  
  function saveData() {
    dataStore.add({
      dilemma: userText.value,
      strategy: cardText.innerText,
    })
    displayData();
  }
  
  function displayData() {
    const parent = userData;
    parent.innerHTML = "";
    
    dataStore.dataStore.map(data => {
      const store = document.createElement("div");
      store.classList.add("user-data");
      
      const dil = document.createElement("div");
      dil.classList.add("user-text");
      dil.textContent = data.dilemma;
      
      const strat = document.createElement("div");
      strat.classList.add("card-text");
      strat.textContent = data.strategy;

      store.appendChild(dil);
      store.appendChild(strat);
      
      parent.appendChild(store);
    });
  }