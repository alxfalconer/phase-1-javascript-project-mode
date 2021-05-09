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
  
    // made class method to add a new ticket object to tickets array.
    add({ problem, solution }){
      this.dataStore.push({
        problem,
        solution
      });
    }
  }
  
  // making a new ticket system
  const dataStore = new DataSystem();
  
  // adding a click event to the add button, so when you click it it adds the ticket to the ticket system and re-renders the DOM.
  //document.querySelector("button").addEventListener("click", () => saveData());
  
  function saveData() {
    // using add method to add new ticker.
    dataStore.add({
      // selecting the value of the element with id of problem;
      problem: userText.value,
      // selecting the value of the element with id of solution;
      solution: cardText.innerText,
    })
    // rerendering the ticket list in the DOM
    displayData();
  }
  
  // loops through the tickets and adds them to dom.
  function displayData() {
    // selecting element with id of tickets
    const parent = userData;
    // clearing it so it has noting inside.
    // do this so we don't have duplicate data.
    parent.innerHTML = "";
    
    // looping through each ticket in the ticket system.
    dataStore.dataStore.forEach(t => {
      // making a new div element.
      const elm = document.createElement("div");
      // giving it a class of ticket
      elm.classList.add("user-data");
      
      // making a new div element.
      const prob = document.createElement("div");
      // giving it a class of problem
      prob.classList.add("user-text");
      //setting it's text value to the current tickets problem;
      prob.textContent = t.problem;
      
      // making a new div element.
      const solu = document.createElement("div");
      // giving it a class of solution
      solu.classList.add("card-text");
      //setting it's text value to the current tickets solution;
      solu.textContent = t.solution;
      
      // adding the problem and solution div to the ticket div.
      elm.appendChild(prob);
      elm.appendChild(solu);
      
      // adding the ticket div to the tickets div.
      parent.appendChild(elm);
    });
  }
  
  saveData();

/*let dataStore = []

let user = "";
    strategy = "";

function saveData() {
    newPair = {dilemma: userText.value, strategy: cardText.innerText};
    dataStore.push( newPair )
    displayData();
}

function doSmtElse( element ) {
 
    console.log( "element is here : " , element , element.dilemma , element.strategy)
 

    for (let i = 0; i < dataStore.length; i++) {
        if (i === 0) {break;}
        const element = dataStore[i];
        doSmtElse(element )
    }
}

function displayData() {
 
    console.log( "dataStore is here : " , dataStore)
 

    for (let i = 0; i < dataStore.length; i++) {
        const element = dataStore[i];
        userData.innerHTML = doSmtElse(element)
    }
}




/*function saveData() {
    let userDilemma = userText.value;
    let userStrategy = cardText.innerText;
    user[user.length] = userDilemma;
    strategy[strategy.length] = userStrategy;
    displayData();
}
    
function displayData(){
    let data = ("<b>Dilemma : Strategy</b></br>");
    for(let i = 0; i < user.length; i++) {
        data +=user[i]+"&nbsp<b>:</b>&nbsp";
    }
    for(let i = 0; i < strategy.length; i++) {
        data += strategy[i]+"<br>";
    }
    userData.innerHTML = data;
}

/*function doSmtElse( element ) {
 
    console.log( "element is here : " , element , element.dilemma , element.strategy)
 

    for (let index = 0; index < dataStore.length; index++) {
        const element = dataStore[index];
        doSmtElse(element )
    }
}


let dilemma = new Array();
    strategy = new Array();

function saveData() {
    newPair = {dilemma: userText.value, strategy: cardText.innerText};
    dataStore = [...dataStore, newPair];
    console.log(dataStore);
}

function displayData() {
    dataStore = userData.innerHTML
    userData.innerHTML = (console.log(dataStore));
}

function displayData(){
    let data = ("<b>Dilemma : Strategy</b></br>");
    for(let i = 0; i < user.length; i++) {
        data +=user[i]+"&nbsp<b>:</b>&nbsp";
    }
    for(let i = 0; i < strategy.length; i++) {
        data += strategy[i]+"<br>";
    }
    userData.innerHTML = data;
}*/
