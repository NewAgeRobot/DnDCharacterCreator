let backgroundsObj;
let racesObj;
let classesObj;

function getRaceInfo(){
  const url = "https://api.open5e.com/races/?format=json";
  if(localStorage.getItem('raceInfo') == null){
    console.log("race info grabbing");
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      localStorage.setItem("raceInfo",JSON.stringify(data));
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });  
  }
  loadRaces();
}

function getClassInfo(){
  const url = "https://api.open5e.com/classes/?format=json";
  if(localStorage.getItem('classInfo') == null){
    console.log("class info grabbing");
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      localStorage.setItem("classInfo",JSON.stringify(data));
      
    })
    .catch(err => {
        console.log(`error ${err}`)
    });  
  }
  loadClasses();
}

function getBackgroundInfo(){
  const url = "https://api.open5e.com/backgrounds/?format=json";

  if(localStorage.getItem('backgroundInfo') == null){
    console.log("background info grabbing");
    fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      localStorage.setItem("backgroundInfo",JSON.stringify(data));
    })
    .catch(err => {
        console.log(`error ${err}`)
    });  
  }
  loadBackgrounds();
}

function loadBackgrounds(){
  backgroundsObj = JSON.parse(localStorage.getItem("backgroundInfo"));
  console.log("bg obj", backgroundsObj);
}
function loadRaces(){
  racesObj = JSON.parse(localStorage.getItem("raceInfo"));
  console.log("race obj", racesObj);
}
function loadClasses(){
  classesObj = JSON.parse(localStorage.getItem("classInfo"));
  console.log("class obj", classesObj);
}
function loadChoices(){
  document.querySelector('#name').value = localStorage.getItem('characterName');
  document.querySelector('#notes').value = localStorage.getItem('characterNotes');
  document.querySelector('#str').value = localStorage.getItem('cStr');
  document.querySelector('#dex').value = localStorage.getItem('cDex');
  document.querySelector('#int').value = localStorage.getItem('cInt');
  document.querySelector('#con').value = localStorage.getItem('cCon');
  document.querySelector('#wis').value = localStorage.getItem('cWis');
  document.querySelector('#cha').value = localStorage.getItem('cCha');
  let myRace = document.querySelector('#race');
  let myClass = document.querySelector('#class');
  let myBackground = document.querySelector('#background');

  if(localStorage.getItem('chosenRace') != null){
    console.log("pulling race on page load");
    for(var i, j = 0; i = myRace.options[j]; j++) {
      if(i.value.toLowerCase() == localStorage.getItem('chosenRace')) {
        myRace.selectedIndex = j;
        raceChange();
          break;
      }
    }
  }
  if(localStorage.getItem('chosenClass') != null){
    console.log("pulling c on page load");
    for(var k, l = 0; k = myClass.options[l]; l++) {
      if(k.value.toLowerCase() == localStorage.getItem('chosenClass')) {
        myClass.selectedIndex = l;
        classChange();
          break;
      }
    }
  }
  if(localStorage.getItem('chosenBackground') != null){
    console.log("pulling bg on page load");
    for(var x, y = 0; x = myBackground.options[y]; y++) {
      if(x.value.toLowerCase() == localStorage.getItem('chosenBackground')) {
        myBackground.selectedIndex = y;
        backgroundChange();
          break;
      }
    }
  }
}

getRaceInfo();
getBackgroundInfo();
getClassInfo();
loadChoices();


document.querySelector('#race').addEventListener('change',raceChange);
document.querySelector('#background').addEventListener('change',backgroundChange);
document.querySelector('#class').addEventListener('change',classChange);
document.querySelector('#name').addEventListener('input',saveName);
document.querySelector('#notes').addEventListener('input',trackNotes);


document.querySelector('#rollStr').addEventListener('click',rollStrength);
document.querySelector('#str').addEventListener('change',rollStrength);
document.querySelector('#rollCha').addEventListener('click',rollCharisma);
document.querySelector('#cha').addEventListener('change',rollCharisma);
document.querySelector('#rollInt').addEventListener('click',rollIntelligence);
document.querySelector('#int').addEventListener('change',rollIntelligence);
document.querySelector('#rollDex').addEventListener('click',rollDexterity);
document.querySelector('#dex').addEventListener('change',rollDexterity);
document.querySelector('#rollCon').addEventListener('click',rollConstitution);
document.querySelector('#con').addEventListener('change',rollConstitution);
document.querySelector('#rollWis').addEventListener('click',rollWisdom);
document.querySelector('#wis').addEventListener('change',rollWisdom);

function raceChange(){
  console.log("racing");
  let cRace = document.querySelector('#race').value;
  let loadDesc = racesObj.results.find(e=>e.name.toLowerCase() == cRace).desc;
  let cRaceDescParsed = loadDesc.slice(loadDesc.indexOf("\n")+1);
  document.querySelector('#raceDesc').innerText = cRaceDescParsed;
  localStorage.setItem('chosenRace',cRace);
}
function classChange(){
  console.log("classing");
  let cClass = document.querySelector('#class').value;
  let loadDesc = classesObj.results.find(e=>e.name.toLowerCase() == cClass).desc;
  let cClassDescParsed = loadDesc.match(/(^##.*?)\n \n(.*?)\n(.*?)/)[2];
  document.querySelector('#classDesc').innerText = cClassDescParsed;
  localStorage.setItem('chosenClass',cClass);
}
function backgroundChange(){
  console.log("backgrounding");
  let cBackground = document.querySelector('#background').selectedOptions[0].innerHTML;
  let loadDesc = backgroundsObj.results.find(e=>e.name.toLowerCase() == cBackground.toLowerCase()).desc;
  let cBackgroundDescParsed = loadDesc.slice(loadDesc.indexOf("\n")+1);
  document.querySelector('#backgroundDesc').innerText = cBackgroundDescParsed;
  localStorage.setItem('chosenBackground',cBackground.toLowerCase().replace(" ",""));
}

function getRandRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function rollStrength(e){
  if(e.type !== "change"){
    document.querySelector('#str').value = getRandRange(8,18);
  }
  localStorage.setItem('cStr',document.querySelector('#str').value);
}
function rollDexterity(e){
  if(e.type !== "change"){
    document.querySelector('#dex').value = getRandRange(8,18);
  }
  localStorage.setItem('cDex',document.querySelector('#dex').value);
}
function rollConstitution(e){
  if(e.type !== "change"){
    document.querySelector('#con').value = getRandRange(8,18);
  }
  localStorage.setItem('cCon',document.querySelector('#con').value);
}
function rollWisdom(e){
  if(e.type !== "change"){
    document.querySelector('#wis').value = getRandRange(8,18);
  }
  localStorage.setItem('cWis',document.querySelector('#wis').value);
}
function rollIntelligence(e){
  if(e.type !== "change"){
    document.querySelector('#int').value = getRandRange(8,18);
  }
  localStorage.setItem('cInt',document.querySelector('#int').value);
}
function rollCharisma(e){
  if(e.type !== "change"){
    document.querySelector('#cha').value = getRandRange(8,18);
  }
  localStorage.setItem('cCha',document.querySelector('#cha').value);
}

function trackNotes(){
  let cNotes = document.querySelector('#notes').value;
  localStorage.setItem('characterNotes',cNotes)
}

function saveName(){
  let cName = document.querySelector('#name').value;
  localStorage.setItem('characterName',cName)
}