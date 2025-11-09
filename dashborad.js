function OpenFeatures() {
  var allElem = document.querySelectorAll('.elem')
  var allFullElem = document.querySelectorAll('.fullElem')
  var allFullBcakbtn = document.querySelectorAll('.fullElem .back')

  allElem.forEach(function (elem) {
    elem.addEventListener('click', function () {
      allFullElem[elem.id].style.display = 'block'
    })
  })

  allFullBcakbtn.forEach(function (back) {
    back.addEventListener('click', function () {
      allFullElem[back.id].style.display = 'none'
    })

  })

}
OpenFeatures()

function Todolist(){
  let TaskInput = document.querySelector('.addTask form input')
let TaskDetailInput = document.querySelector('.addTask form textarea')
let form = document.querySelector('.addTask form')

let CurrentTask = []
if(localStorage.getItem('CurrentTask')){
  CurrentTask = JSON.parse(localStorage.getItem('CurrentTask'))
}else{
  console.log('Task list is empty');
  
}
function RenderTask(){
  var allTask = document.querySelector('.allTask')
var sum = ''
CurrentTask.forEach(function (e) {
  sum = sum + `<div class="task">
                 <h5> ${e.task} </h5>
                 <button>Mark as completed</button>
         </div>`
})

allTask.innerHTML = sum
}
RenderTask()
form.addEventListener('submit', function(e){
 e.preventDefault()
  CurrentTask.push({task:TaskInput.value , Detail:TaskDetailInput.value})
  console.log(CurrentTask);

  
  TaskInput.value = ''
  TaskDetailInput.value = ''
  

  RenderTask()
  
})
}

Todolist()
 function DailyPlanner(){
   var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var dayPlanner = document.querySelector('.daily-planner')

var hours = Array.from({length:18},(_,idx)=> `${6+idx}:00 - ${7+idx}:00`)



var WholeDaySum = ''
hours.forEach(function(elem,idx){
  savedData = (dayPlanData[idx] || '');
  
  WholeDaySum = WholeDaySum + ` <div class="daliy">
                        <p>${elem}</p>
                      <input id=${idx} type="text" placeholder='...' value=${savedData}>
                </div>`
})

var dayPlanner = document.querySelector('.daily-planner')

dayPlanner.innerHTML = WholeDaySum

var dailyPlanerInput = document.querySelectorAll('.daily-planner input')
dailyPlanerInput.forEach(function(elem){
 elem.addEventListener('input', function(){
   dayPlanData[elem.id] = elem.value
   localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
   
 })
  
})
 }
 DailyPlanner()

function MotivationalQuotes(){
  var motivationQuote = document.querySelector('.motivational-2 h2')
var motivationalAuthor = document.querySelector('.motivational-3 h4')

 async function fetchQuote(){
  let response = await fetch('https://dummyjson.com/quotes/random')  
  let data = await response.json()
  motivationQuote.innerHTML = data.quote
  motivationalAuthor.innerHTML = data.author
}

fetchQuote()
}
MotivationalQuotes()


function Pomodoro(){
  let timer = document.querySelector('.pomodoro1 h1')
let Startbtn = document.querySelector('.pomodoro1 .start-timer')
let Resetbtn = document.querySelector('.pomodoro1 .reset-timer')
let Pausebtn = document.querySelector('.pomodoro1 .Pause-timer')
var session = document.querySelector('.pomodoro-fullpage .sessions h3')
let timerPause = null
let totalsecond = 25*60
let worksessions = true

function updateTime(){
   let minuts = Math.floor(totalsecond/60)
   let second = totalsecond%60
   timer.innerHTML = `${String(minuts).padStart('2','0')}:${String(second).padStart('2','0')}`  
}

function StartTimer(){
  clearInterval(timerPause)
   if(worksessions){
   
    timerPause = setInterval(function(){
     if(totalsecond > 0){
      totalsecond--
      updateTime()
     }else{
       worksessions = false
       clearInterval(timerPause)
       timer.innerHTML = '05:00'
       session.innerHTML = 'Take a break'
       session.style.backgroundColor = 'cyan'
        totalsecond = 5*60
     }
  },1000)
   }else{
    timerPause = setInterval(function(){
     if(totalsecond > 0){
      totalsecond--
      updateTime()
     }else{
      worksessions = true
      clearInterval(timerPause)
      
      timer.innerHTML = '25:00'
      session.innerHTML = 'work sessions'
      session.style.backgroundColor = 'green'
      totalsecond = 25*60
     }
  },1000)
   }
}


function PauseINterval(){
  clearInterval(timerPause)
}
function ResetTimer(){
  clearInterval(timerPause)
  totalsecond = 25*60
  updateTime()
}

Resetbtn.addEventListener('click',ResetTimer)
Pausebtn.addEventListener('click', PauseINterval)
Startbtn.addEventListener('click', StartTimer)

}
Pomodoro()

function wearther(){
  var city = 'mumbai'
var header1Date = document.querySelector('.header1 h1')
var header2Date = document.querySelector('.header1 h2')
var header2temp  = document.querySelector('.header2 h2')
var header2hum  = document.querySelector('.header2 h3')
var header2wind  = document.querySelector('.header2 p')
var weathercondition = document.querySelector('.header2 .condition')
var imagesChange = document.querySelector('header')
 
  async function weatherAPICall(){
   var apikey = '2dad16428a1b421eaf7154757250611'
   var response = await fetch(` http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`)
   var data = await response.json()
   console.log(data);
   var humandity = data.current.humidity
   var wind = data.current.wind_kph
   console.log(wind);
   
   var degree = data.current.temp_c
   var condition = data.current.condition.text
   weathercondition.innerHTML = `${condition}`
   header2hum.innerHTML = `Humidity:${humandity}`
   header2temp.innerHTML = `${degree}°C`
   header2wind.innerHTML = `Wind:${wind}KPM`  
}

weatherAPICall()

var date = null
function timeDate(){
  const totalDayofday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
 const monthName = months[today.getMonth()];
  date = new Date() 
  var daysofWeek = totalDayofday[date.getDay()];
  var dayshours = date.getHours()
  var daysminuts = date.getMinutes()
  var second = date.getSeconds()
  var dates  = date.getDate()
  var years = date.getFullYear()
  
    
  header2Date.innerHTML = `${dates} ${monthName} ${years}`
   
   if(dayshours>12){
    header1Date.innerHTML = `${daysofWeek}, ${String(dayshours-12).padStart('2','0')}:${String(daysminuts).padStart('2','0')}:${String(second).padStart('2','0')} PM`
   }else{
     header1Date.innerHTML = `${daysofWeek}, ${String(dayshours).padStart('2','0')}:${String(daysminuts.padStart('2','0'))}:${String(second).padStart('2','0')} AM`
   }

   
}
setInterval(() => {
   timeDate()
}, 1000);

function changeImage(){
   const today = new Date();
      var hour = today.getHours()
      if( hour >= 5 && hour < 12){
        imagesChange.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1661897016268-b77ad5186d02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2t5JTIwbW9yaW5pbmd8ZW58MHwwfDB8fHww&auto=format&fit=crop&q=60&w=500')"
      }else if(hour >= 12 && hour < 17 ){
         imagesChange.style.backgroundImage = "url('https://images.unsplash.com/photo-1636668347938-b3e8dcfbbfbf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHNreSUyMGFmdGVybm9vbnxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500')"
      }else if(hour >= 17 && hour < 20){
           imagesChange.style.backgroundImage = "url('https://images.unsplash.com/photo-1624951562969-4240656ccc5c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2t5JTIwZXZlbmluZ3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500')"
      }else{
        imagesChange.style.backgroundImage = "url('https://images.unsplash.com/photo-1635645262831-0fc4fb679750?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMGV2ZW5pbmd8ZW58MHwwfDB8fHww&auto=format&fit=crop&q=60&w=500')"
      }
   }
   changeImage()
}
wearther()

function changeTheme(){
  var theme = document.querySelector('.nav-in button')
var rootElement = document.documentElement
var flag = 0
theme.addEventListener('click', function(){
  if(flag == 0){
  rootElement.style.setProperty('--pri', '#0C2B4E')
  rootElement.style.setProperty('--sec', '#1A3D64')
  rootElement.style.setProperty('--tri', '#1D546C')
  rootElement.style.setProperty('--tri1', '#758A93')
 flag = 1
  } else if( flag = 1){
     rootElement.style.setProperty('--pri', '#FA812F')
     rootElement.style.setProperty('--sec', '#d89d44')
     rootElement.style.setProperty('--tri', '#B6771D')
     rootElement.style.setProperty('--tri1', '#FFC29B')
     flag = 2
  }else if(flag == 2){
     rootElement.style.setProperty('--pri', '#B6AE9F')
     rootElement.style.setProperty('--sec', '#C5C7BC')
     rootElement.style.setProperty('--tri', '#DEDED1')
     rootElement.style.setProperty('--tri1', '#FBF3D1')
     flag = 2
  }
})

}
changeTheme()









