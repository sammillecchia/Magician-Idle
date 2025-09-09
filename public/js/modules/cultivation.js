//logic for cultivation
import * as playerData from "../player/playerData.js";
import { menus } from "../game/menus.js";
import { gameState } from "../game/game.js"
import { updateProgressCircle } from "../utils/progressbar.js";
import { cultivationConstants } from "../game/constants.js";
import { setCultivationSubMenu } from "../ui/events.js";

const awakeningButton = document.getElementById('awakening');
const awakeningProgressCircle = document.getElementById('awakeningProgressCircle');

const cultivationSubMenuButtons = document.getElementById('cultivationSubMenuButtons');
const cultivationSubMenu = document.getElementById('cultivationSubMenu');
const awakenCostDisplay = document.getElementById('awakenCost');

export let elements = {
    elements: ["Fire", "Ice", "Earth", "Water", "Wind","Lightning" ],
    lockedElements: ["Fire", "Ice", "Earth", "Water", "Wind","Lightning" ],
    unlockedElements: [], //hopefully ordered

    elementColors: {
        Fire: "#cc0000",
        Ice: "#33cccc",
        Earth: "#996633",
        Water: "#0000cc",
        Wind: "#33cc33",
        Lightning: "#ff00ff"
    },
    
    //uuuh
    currentElements: {
        1: "None",
        2: "None"
    }
    


    // totalElements: Object.keys(possibleElements.elements).length
}

export function generateSubmenus() {
    const removeSubMenuButtons = document.querySelectorAll('.elementSubMenuButton');
    const removeSubMenus = document.querySelectorAll('.elementSubMenu');
    //LOL SO FUCKING CONFUSING
    removeSubMenus.forEach(element => {
        element.remove();
    })

    removeSubMenuButtons.forEach(element => {
        element.remove();
    })


    //ganerates all submenu
    let i = 0;
    elements.unlockedElements.forEach(element => {
        i++;

        //create a button for each element
        //console.log(`Generating Button for ${element} number ${i}`);
        const elementButton = document.createElement('div');
        elementButton.className = `cultivationSubMenuButton elementSubMenuButton`;
        elementButton.id = `${element}SubMenuButton`;
        
        elementButton.textContent = `${element}`;
        elementButton.style.backgroundColor =  elements.elementColors[element];

        cultivationSubMenuButtons.appendChild(elementButton);


        //create a display/submenu for each element
        const elementDisplay = document.createElement('div');
        elementDisplay.className = "cultivationSubMenu elementSubMenu";
        elementDisplay.id = `element${i}Display`;

        elementDisplay.textContent = `${element}`;
        elementDisplay.style.backgroundColor =  elements.elementColors[element];
        elementDisplay.style.display = 'none';

        cultivationSubMenu.appendChild(elementDisplay)

        //save menu handler to object associated with element
        const number = i
        const elementName = `element${i}`
        const value = 'value'
        console.log(`element${i}`);
        if (!menus.cultivationSubMenus[elementName]) {
            menus.cultivationSubMenus[elementName] = {};
            menus.cultivationSubMenus[elementName][value] = () => {return document.getElementById(`element${number}Display`)};
            
        }

        //add event listener to button that runs the function to set the submenu
        elementButton.addEventListener('click', () => {setCultivationSubMenu(menus.cultivationSubMenus[elementName][value])});
    })

    console.log(menus);
}


//unlocks a new currently random element once awakening is complete
function unlockElement() {
    if (elements.lockedElements.length === 0) {
        console.error("No Elements Left in elements.lockedElements");
        return "Cant Unlock";
    }

    const random = Math.floor(Math.random() * elements.lockedElements.length);
    const chosenElement = elements.lockedElements.splice(random, 1)[0];
    elements.unlockedElements.push(chosenElement);

    updateAwakeningCost()
    generateSubmenus();

    console.log(`Unlocked element ${chosenElement}`);
}

export function setupEventListeners() {
    updateAwakeningCost()
    awakeningButton.addEventListener('click', awakening);
}

export function updateAwakeningCost() {
    awakenCostDisplay.textContent = `${cultivationConstants.awakeningCosts[elements.unlockedElements.length]}`;
}

//Run when awakening button is clicked, sets up gameState for awakening if have enough MP
function awakening() {

    //If magicPower gte the cost of next element
    if (!gameState.awakeningRunning) {
        const currentCost = cultivationConstants.awakeningCosts[elements.unlockedElements.length];
        console.log(currentCost);
        if (playerData.playerData.magicPower.gte(currentCost)) {
            playerData.decreaseMagicPower(currentCost)
            gameState.awakeningRunning = true;
            gameState.awakeningStart = Date.now();
        } else {
            console.log('cant awaken, not enough MP')
        }
    }

    

}

//Like updateProgressBars except for a circle :p
export function updateProgressCircles() {
    if (gameState.awakeningRunning) {
        let awakeningFinished = gameState.awakeningStart + gameState.awakeningLength;
        const awakeningProgress = Math.min(100, Math.round((Date.now() - gameState.awakeningStart) / (awakeningFinished - gameState.awakeningStart)* 100));
        updateProgressCircle(awakeningProgress, awakeningProgressCircle);
    }
}

export function awakeningComplete() {
    console.log("awakening Complete");
    updateProgressCircle(0, awakeningProgressCircle);
    unlockElement();
}



