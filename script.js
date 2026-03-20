let xp = 0
let level = 1
let playerName = "Herói"

const xpText = document.getElementById("xp")
const levelText = document.getElementById("level")
const xpFill = document.getElementById("xpFill")
const missionList = document.getElementById("missionList")
const nameText = document.getElementById("playerName")

function saveGame(){

localStorage.setItem("xp",xp)
localStorage.setItem("level",level)
localStorage.setItem("name",playerName)

}

function loadGame(){

let savedXP = localStorage.getItem("xp")
let savedLevel = localStorage.getItem("level")
let savedName = localStorage.getItem("name")

if(savedXP !== null){
xp = parseInt(savedXP)
}

if(savedLevel !== null){
level = parseInt(savedLevel)
}

if(savedName !== null){
playerName = savedName
}

}

function updateUI(){

xpText.innerText = xp
levelText.innerText = level
nameText.innerText = playerName

let percent = (xp/100)*100
xpFill.style.width = percent + "%"

saveGame()

}

function addMission(){

let missionInput = document.getElementById("missionInput")
let xpInput = document.getElementById("xpInput")

let mission = missionInput.value
let reward = parseInt(xpInput.value)

if(mission === "" || isNaN(reward)) return

let li = document.createElement("li")

li.innerHTML = `
${mission} (+${reward} XP)
<button onclick="completeMission(this,${reward})">✔</button>
`

missionList.appendChild(li)

missionInput.value = ""
xpInput.value = ""

}

function completeMission(button,reward){

xp += reward

if(xp >= 100){

xp = xp - 100
level++

alert("LEVEL UP!")

}

button.parentElement.remove()

updateUI()

}

function changeName(){

let nameInput = document.getElementById("nameInput").value

if(nameInput === "") return

playerName = nameInput

updateUI()

}

loadGame()
updateUI()
document.addEventListener('DOMContentLoaded', function() {

let calendarEl = document.getElementById('calendar')

let calendar = new FullCalendar.Calendar(calendarEl, {

initialView: 'dayGridMonth',

dateClick: function(info){

let mission = prompt("Nova missão para este dia:")

if(mission){

calendar.addEvent({
title: mission,
start: info.dateStr
})

}

}

})

calendar.render()

})