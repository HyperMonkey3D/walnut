const grid = document.getElementById('grid');
const dropdown = document.getElementById('grid-dropdown');
const startButton = document.getElementById('start-button');
const counter = document.getElementById('counter');
const finalScoreCounter = document.getElementById('final-score');
const cellImage = "./public/walnut.png"
let gridDropdownValue
let isGridActive = false
let cellsArray
let gridCell
let yellowArray = []
let randomElement
let isChallengeComplete = false;
let whiteToYellowCounter = 0

function setGrid() {
    switch (gridDropdownValue) {
        case "small":
            createCellsArray(20)
            break;
        case "regular":
            createCellsArray(25)
            break;
        case "large":
            createCellsArray(30)
            break;
        default:
            return
    }
}

function createCellsArray(value) {
    grid.innerHTML = ''
    yellowArray = []
    whiteToYellowCounter = 0
    counter.innerHTML = "0"
    cellsArray = new Array(value).fill("x")

    cellsArray.forEach((cell, i) => {
        let randomN = Math.random().toFixed(0);
        gridCell = document.createElement('div');
        gridCell.id = "cell"
        gridCell.classList.add(parseInt(randomN) === 1 ? 'cell-white' : "cell-yellow");

        if (parseInt(randomN) === 0) {
            yellowArray.push(i)
        }

        grid.append(gridCell);
        cellOnHover(gridCell, i);
    })
    randomElement = yellowArray[Math.floor(Math.random() * yellowArray.length)]
}

function cellOnHover(cell, index) {
    cell.addEventListener('mouseover', () => {
        if (!isChallengeComplete) {
            if (cell.classList.contains('cell-white')) {
                cell.classList.remove('cell-white');
                cell.classList.add('cell-yellow');
                whiteToYellowCounter++
                counter.innerText = whiteToYellowCounter.toString()
            } else if (index === randomElement && !cell.querySelector("img")) {
                let image = document.createElement("img");
                image.id = "image"
                image.src = cellImage;
                cell.appendChild(image);
                finalScoreCounter.innerText = whiteToYellowCounter
                isChallengeComplete = true;
            } else {
                cell.classList.remove('cell-yellow');
                cell.classList.add('cell-white');
            }
        }
    })
}

function activateAttributes() {
    startButton.innerText = "Disable Grid"
    setGrid();
    dropdown.selectedIndex = 0
    dropdown.disabled = true
    isGridActive = true;
}

function disableAttributes() {
    grid.innerHTML = ''
    dropdown.selectedIndex = 0
    dropdown.disabled = false
    startButton.innerText = 'Start Grid';
    startButton.disabled = true
    whiteToYellowCounter = 0
    counter.innerText = '0';
    isGridActive = false;
    gridDropdownValue = "pick mode"
}

startButton.addEventListener('click', () => {
    if (isGridActive) {
        disableAttributes()
    } else {
        finalScoreCounter.innerText = '0'
        isChallengeComplete = false
        activateAttributes()
    }
})

dropdown.addEventListener('change', () => {
    gridDropdownValue = dropdown.value;
    if (gridDropdownValue !== "pick mode") {
        startButton.disabled = false
    } else {
        startButton.disabled = true
    }
})





