const gridElement = document.getElementById("grid");
const button = document.getElementById("button");
let isCreated = false;
let canReset = false;

button.addEventListener("click", function(){
    gridElement.classList.add("container");

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
    return item;
}

function reset(){
    let selectedCells = document.getElementsByClassName("selected");

    while(selectedCells.length){
        selectedCells[0].classList.remove("selected");
        canReset = false;
    }

    return selectedCells;
}