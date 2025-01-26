const grid = document.getElementById('grid');
const dropdown = document.getElementById('grid-dropdown');
const startButton = document.getElementById('start-button');
const counter = document.getElementById('counter');
const welcomeMessage = document.querySelector('.welcome');
const scoreCounter = document.querySelector('.game-on');
const cellImage = "./public/walnut.png"
const logoGameOverModal = "./public/walnut-logo.png"
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
            createCellsArray(16)
            grid.classList.remove('regular')
            grid.classList.remove('large')
            grid.classList.add('small')
            break;
        case "regular":
            createCellsArray(25)
            grid.classList.remove('small')
            grid.classList.remove('large')
            grid.classList.add('regular')
            break;
        case "large":
            createCellsArray(36)
            grid.classList.remove('regular')
            grid.classList.remove('small')
            grid.classList.add('large')
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

function createGameOverModal() {
    setTimeout(() => {
        let gridModal = document.createElement("div")
        gridModal.classList.add("grid-modal")
        let modalContainer = document.createElement("div")
        modalContainer.classList.add("modal-container")
        modalContainer.innerHTML = `
        <div class="modal-message">
                <div class="message-box">
                    <div class="modal-logo">
                        <img src="${logoGameOverModal}" alt="walnut logo">
                    </div >
                    <p>You Won!👍🏼</p>
                    <span>Click the Disable Grid button to start again</span>
                </div>
        </div>
       `
        gridModal.append(modalContainer);
        grid.append(gridModal);
    }, 1500)
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
                isChallengeComplete = true;
                grid.classList.add('shake');
                createGameOverModal();
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
    welcomeMessage.classList.remove('visible');
    scoreCounter.classList.add('visible');
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
    welcomeMessage.classList.add('visible');
    scoreCounter.classList.remove('visible');
    gridDropdownValue = "pick mode"
}

startButton.addEventListener('click', () => {
    if (isGridActive) {
        disableAttributes()
        grid.classList.remove('regular')
        grid.classList.remove('small')
        grid.classList.remove('large')
        grid.classList.remove('shake')
    } else {
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





