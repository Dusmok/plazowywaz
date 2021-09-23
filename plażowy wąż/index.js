const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
const nameDisplay = document.getElementById('name')
const highscoreDisplay = document.getElementById('highscore')
const width = 20

let squares = []
let currentSnake = []
let direction = 1
let appleIndex = 0
let winnerName = localStorage.getItem("winner")
let score = 0
let highscore = localStorage.getItem("scoreboard")
let intervalTime = 200
let speed = 0.9
let timerId = 0
let music = new Audio("coco.mp3")
let pop = new Audio("pop.wav")

function playMusic(){
    music.play()  
}
function stopMusic(){
    music.pause()  
    music.currentTime = 0
}

nameDisplay.innerText = winnerName
highscoreDisplay.innerText = highscore


function popSound(){ 
    pop.play()
    pop.currentTime=0
}


function createGrid() {
    for (let i=0; i < width*width; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
    squares.push(square)
    }
    
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))


function startGame() {
    
    for (let square of squares){
        square.classList.remove('snake')
        square.classList.remove('apple')
        
    }
    
    playMusic()
    clearInterval(timerId)
    currentSnake = [410,1,2]
    
    score = 0
    scoreDisplay.innerText = score
   
    document.querySelector('#scoreboard').innerText = ('Sianko')
    
     document.querySelector('body').style.background = "aqua"
     document.querySelector('html').style.background = "aqua"
    
    direction = -width
    intervalTime = 300
    generateApple()

    
    timerId = setInterval(move, intervalTime)
}

function move() {

    /////////////////////  --------------------- GAME OVER 

    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        document.querySelector('body').style.background = "grey"
        document.querySelector('html').style.background = "grey"
        stopMusic()
    
        document.querySelector('#scoreboard').innerText = 'UPS, Chyba ktoś ma pecha'

        if (score > highscore) {
            winnerName = prompt("Najs! Jak masz na imię mordeczko?")
            nameDisplay.innerText = winnerName;
            localStorage.setItem("winner", winnerName)

            highscore = score

            highscoreDisplay.innerText = (highscore)
            
            localStorage.setItem("scoreboard", highscore);

        }
        
        
        return clearInterval(timerId)
        
    }

//////////////////////////// ---------------------MOVING ON

    else{

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)

    
    
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        console.log(tail)
        currentSnake.push(tail)
        
        generateApple()
        popSound()
        score++
        scoreDisplay.textContent = score
        clearInterval(timerId)
        
        intervalTime = intervalTime * speed
       
        timerId = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add('snake')
}
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 


function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)

