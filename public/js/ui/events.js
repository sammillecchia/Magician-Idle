//manges or setups for event listeners
import { resetGame } from "../game/saveload.js";
import { gameState } from "../game/game.js";

const resetButton = document.getElementById('resetButton');
const trainingMenuButton = document.getElementById('trainingMenuButton');
const cultivationMenuButton = document.getElementById('cultivationMenuButton');
const statMenuButton = document.getElementById('statMenuButton');
const explorationMenuButton = document.getElementById('explorationMenuButton');

const trainingMenu = document.getElementById('trainingMenu');
const statsMenu = document.getElementById('statsMenu');
const explorationMenu = document.getElementById('explorationMenu');
const cultivationMenu = document.getElementById('cultivationMenu');

export function setupMenuButtons() {
    resetButton.addEventListener('click', resetGame);
    trainingMenuButton.addEventListener('click', displayTrainingMenu);
    cultivationMenuButton.addEventListener('click', displayCultivationMenu);
    statMenuButton.addEventListener('click', displayStatsMenu);
    explorationMenuButton.addEventListener('click', displayExplorationMenu);
}

function setTrainingMenu(menuName) {
    
    trainingMenu.style.display = 'none';
    statsMenu.style.display = 'none';
    explorationMenu.style.display = 'none';
    cultivationMenu.style.display = 'none';

    

    if (gameState.hasOwnProperty(menuName)) {
        const activeMenuElement = document.getElementById(menuName);
        gameState.trainingMenu = false;
        gameState.cultivationMenu = false;
        gameState.statsMenu = false;
        gameState.explorationMenu = false;
        gameState[menuName] = true;
        activeMenuElement.style.display = 'flex';
    }
    
    

}

//sets the visble mainBody to training menu
export function displayTrainingMenu() {
    console.log("displayTrainingMenu");
    //display logic
    setTrainingMenu('trainingMenu');

    //gamestate logic for animations
}

//sets the visble mainBody to cultivation menu
export function displayCultivationMenu() {
    console.log("displayCultivationMenu");
    //display logic
    setTrainingMenu('cultivationMenu');

    //gamestate logic for animations
}

//sets the visble mainBody to stats menu
export function displayStatsMenu() {
    console.log("displayStatsMenu");
    //display logic
    setTrainingMenu('statsMenu');

    //gamestate logic for animations
}

//sets the visble mainBody to exploration menu
export function displayExplorationMenu() {
    console.log("displayExplorationMenu");
    //display logic
    setTrainingMenu('explorationMenu');

    //gamestate logic for animations
}