const gridElement = document.getElementById("grid");
const button = document.getElementById("button");
let isCreated = false;
let canReset = false;
let score = 0;

button.addEventListener("click", function(){
    gridElement.classList.add("container");

    randomNumberGenerator(1, 100, 16);

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
    item.classList.toggle("selected");
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
    score = 0;
    console.log(score);

    return selectedCells;
}

function randomNumberGenerator(min, max, element){
    let numberArray = [];

    if((max - min) < element){
        return [];
    }

    while(numberArray.length < element){
        let randomNumber = Math.floor(Math.random() * max) + min;
        if(!numberArray.includes(randomNumber)){
            numberArray.push(randomNumber);
        }
    }
    console.log(numberArray);

    return numberArray;
}