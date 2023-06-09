const gridElement = document.getElementById("grid");
const button = document.getElementById("button");
let isCreated = false;
let canReset = false;
let win = 0;
let score = 0;
let userCellClick = [];
let bombs = [];

button.addEventListener("click", function(){
    gridElement.classList.add("container");

    generateBombs();
    console.log(bombs);

    if(!isCreated){
        for (let i = 0; i < 100; i++) {
            const newCell = createCell(i);

            newCell.addEventListener("click", function(){
                toggleBackground(newCell);
                canReset = true;
            });
            
            gridElement.append(newCell);
        }
        isCreated = true;
    }

    if(canReset){
        reset();
        generateBombs();
        console.log(bombs)
    }
});

function createCell(cellNumber) {
    const cell = document.createElement("div");
    cell.classList.add("cells");
    cell.innerHTML = `<span>${cellNumber + 1}</span>`;
    return cell;
}

function toggleBackground(item){
    if(win == 0){
        console.log(item.textContent);
        canReset = true;
        item.classList.add("selected");
    }
    
    let number = (parseInt(item.textContent));
    if(!userCellClick.includes(number) && win == 0){
        userCellClick.push(number);
        ++score;
        document.getElementById("score").innerHTML = "Punteggio: " + score;
    }

    if(bombs.includes(number) && win == 0){
        document.getElementById("score").innerHTML = "Hai perso!";
        item.classList.add("red");
        win = 1;
    }

    if(score === 100 - bombs.length && win == 0){
        document.getElementById("score").innerHTML = "Hai vinto! Il tuo punteggio è: " + score;
        win = 2;
    }
    console.log(userCellClick)
    
    return item;
}

function reset(){
    let selectedCells = document.getElementsByClassName("selected");

    while(selectedCells.length){
        selectedCells[0].classList.remove("selected", "red");
        canReset = false;
    }
    
    bombs = [];
    userCellClick = [];
    win = 0;
    score = 0;
    document.getElementById("score").innerHTML = "Punteggio: " + score;
    console.log(score);

    return selectedCells;
}

function generateRandomNumber(min, max){
    return Math.floor(Math.random() * max) + min;
}

function generateBombs(){
    while(bombs.length < 16){
        let randomNumbers = generateRandomNumber(1, 100);
        if(!bombs.includes(randomNumbers)){
            bombs.push(randomNumbers);
        }
    }

    return bombs;
}