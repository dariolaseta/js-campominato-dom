const gridElement = document.getElementById("grid");
const button = document.getElementById("button");
let isCreated = false;
let canReset = false;
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
    console.log(item.textContent);
    canReset = true;
    item.classList.add("selected");
    score++;
    console.log(score);
    return item;
}

function reset(){
    let selectedCells = document.getElementsByClassName("selected");

    while(selectedCells.length){
        selectedCells[0].classList.remove("selected");
        canReset = false;
    }
    bombs = [];

    score = 0;
    console.log(score);

    return selectedCells;
}

function generateRandomNumber(min, max){
    return Math.floor(Math.random() * max) + min;
}

function isInArray(array, element){
    let result = false;

    for(i = 0; i < array.lenght; i++){
        if(array[i] === element){
            result = true;
        }
    }

    return result;
}

function generateBombs(){
    while(bombs.length < 16){
        let randomNumbers = generateRandomNumber(1, 100);
        let findNumber = isInArray(bombs, randomNumbers);
        if(findNumber == false){
            bombs.push(randomNumbers);
        }
    }

    return bombs;
}