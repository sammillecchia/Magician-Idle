//manges or setups for event listeners
import { resetGame } from "../game/saveload.js";
import { menus } from "../game/menus.js";

const resetButton = document.getElementById('resetButton');
const trainingMenuButton = document.getElementById('trainingMenuButton');
const cultivationMenuButton = document.getElementById('cultivationMenuButton');
const statMenuButton = document.getElementById('statMenuButton');
const explorationMenuButton = document.getElementById('explorationMenuButton');

const trainingMenu = document.getElementById('trainingMenu');
const statsMenu = document.getElementById('statsMenu');
const explorationMenu = document.getElementById('explorationMenu');
const cultivationMenu = document.getElementById('cultivationMenu');

const awakeningMenuButton = document.getElementById('awakeningMenuButton');
const testMenuButton = document.getElementById('testMenuButton');


export function setupMenuButtons() {
    resetButton.addEventListener('click', resetGame);
    trainingMenuButton.addEventListener('click', displayTrainingMenu);
    cultivationMenuButton.addEventListener('click', displayCultivationMenu);
    statMenuButton.addEventListener('click', displayStatsMenu);
    explorationMenuButton.addEventListener('click', displayExplorationMenu);

    
    awakeningMenuButton.addEventListener('click', () => {setCultivationSubMenu(menus.cultivationSubMenus.awakening.value)});
    testMenuButton.addEventListener('click', () => {setCultivationSubMenu(menus.cultivationSubMenus.test.value)} )
}


export function setCultivationSubMenu(menuFunction) {

    
    const setMenu = menuFunction();
    console.log(setMenu);
    if (menus.currentCultivationSubMenu) {
        menus.currentCultivationSubMenu.style.display = 'none';
    }

    

    
        // If it exists, set it as the new current submenu and show it
        menus.currentCultivationSubMenu = setMenu;
        menus.currentCultivationSubMenu.style.display = 'flex';
    
}

function setMenu(menuName) {
    


    menus.currentMenu.style.display = 'none';
    if (menus.allMenus[menuName]) {  
        menus.currentMenu = menus.allMenus[menuName];  
    } else {
        console.log('menu does not exist');
    }
    menus.currentMenu.style.display = 'flex'

    
    
    

}

//TODO: Remove these functions as they're redundant and animation/gamestate should be 
//handled in their own location

//sets the visble mainBody to training menu
export function displayTrainingMenu() {
    console.log("displayTrainingMenu");
    //display logic
    setMenu('training');

    //gamestate logic for animations
}

//sets the visble mainBody to cultivation menu
export function displayCultivationMenu() {
    console.log("displayCultivationMenu");
    //display logic
    setMenu('cultivation');

    //gamestate logic for animations
}

//sets the visble mainBody to stats menu
export function displayStatsMenu() {
    console.log("displayStatsMenu");
    //display logic
    setMenu('stats');

    //gamestate logic for animations
}

//sets the visble mainBody to exploration menu
export function displayExplorationMenu() {
    console.log("displayExplorationMenu");
    //display logic
    setMenu('exploration');

    //gamestate logic for animations
}