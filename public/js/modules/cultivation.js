//logic for cultivation
import * as playerData from "../player/playerData.js";
import { menus } from "../game/menus.js";
import { gameState } from "../game/game.js"
import { updateProgressCircle, updateDustSquare } from "../utils/progressbar.js";
import { cultivationConstants } from "../game/constants.js";
import { setCultivationSubMenu, changeCultivationSubMenu } from "../ui/events.js";
import { saveGame } from "../game/saveload.js";

const awakeningButton = document.getElementById('awakening');
const awakeningProgressCircle = document.getElementById('awakeningProgressCircle');

const cultivationSubMenuButtons = document.getElementById('cultivationSubMenuButtons');
const cultivationSubMenu = document.getElementById('cultivationSubMenu');
const awakenCostDisplay = document.getElementById('awakenCost');


//Need to eventually refactor this out, used to handle state for elements
//Holds colors for each element
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

    tiers: ["Star", "Path", "Map", "Contellation", "Vision", "Manifestation"],
    tierNames: ["stars", "paths", "maps", "constellations", "visions", "manifestations"],
    tierButtonLabels: ["STAR", "PATH", "MAP", "CONSTELLATE", "VISION", "MANIFEST"]
}   

export function checkFormationMilestones() {
    //TODO:
    //check all playerData.playerData.elements for
    //element1 through element5
    //if star - manifestation amount is > 6, if so:
    //make the container for the progress bar relating to that element and tier 
    //element.style.display = "flex"
    
}

//Generates submenus, run on init and when a new element is added
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
    playerData.playerData.unlockedElements.forEach(element => {
        i++;

        const elementValue = `element`;

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
        elementDisplay.className = "elementSubMenu";
        elementDisplay.id = `element${i}Display`;

        //elementDisplay.textContent = `${element}`;
        //elementDisplay.style.backgroundColor =  elements.elementColors[element];
        elementDisplay.style.display = 'none';

        

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
        
        //Creates menu and buttons for gather/formation
        const cultivationSubMenuSelector = document.createElement('div');
        cultivationSubMenuSelector.className = "cultivationSelector";

        const gatherButton = document.createElement('div');
        gatherButton.className = "cultivationSelectorButton";
        gatherButton.id = `gatherButton${element}`;
        gatherButton.textContent = "gather"

        

        const formationButton = document.createElement('div');
        formationButton.className = "cultivationSelectorButton";
        formationButton.id = `formationButton${element}`;
        formationButton.textContent = "formation"

        cultivationSubMenuSelector.appendChild(gatherButton);
        cultivationSubMenuSelector.appendChild(formationButton);

        //TTTTTOOOOOOOOOODOOOOOOOOOOOOOO
            //NEEDS TO BE DUSTPROGRESS CLASS/ID NOT AWAKENING
        //Creates dust progress square
        
        const elementNameDisplay = document.createElement('div');
        elementNameDisplay.textContent = `${element}`;
        elementNameDisplay.style.color = elements.elementColors[element];

        const dustDisplay = document.createElement('div');
        dustDisplay.id = `${number}DustDisplay`
        dustDisplay.textContent = "Dust: PLACEHOLDER";
        dustDisplay.style.color = elements.elementColors[element];

        const dustProgress = document.createElement('div');
        dustProgress.className = "awakeningProgress";
        
        const dustProgressCenter = document.createElement('div');
        dustProgressCenter.className = "progressCenter";
        dustProgressCenter.id = `progressCenter${i}`;

        dustProgress.appendChild(dustProgressCenter);

        //Creates div for slider and display
        const dustSliderContainer = document.createElement('div');
        dustSliderContainer.className = "dustSliderContainer";
        dustSliderContainer.id = `${element}dustSliderContainer`

        //Creates dust percentage slider
        const dustSlider = document.createElement('div');
        dustSlider.id = "slideBody";

            //SLIDER AND MYRANGE ALSO NEED TO BE REFACTORED
        
        const dustInput = document.createElement('input');
        dustInput.type = "range";
        dustInput.min = "0";
        dustInput.value = "0";
        dustInput.max = "100";
        dustInput.className = "slider"
        dustInput.id = `${element}dustSlider`
        dustInput.oninput = (event) => {
            const gatherValue = event.target.value;
            updateGatherSlider(number, gatherValue);
        } 


        
        
        //creates dustDisplay
        const convertDustDisplay = document.createElement('div');
        convertDustDisplay.className = "convertDustDisplay";
        convertDustDisplay.id = `convertDustDisplay${i}`
        convertDustDisplay.textContent = "0";

        //appends elements for convertDustDisplay and slider together
        dustSlider.appendChild(dustInput);
        dustSliderContainer.appendChild(dustSlider);
        dustSliderContainer.appendChild(convertDustDisplay)


        //Creates gathermenu
        const gatherMenu = document.createElement('div');
        gatherMenu.className = "gatherMenu"
        gatherMenu.id = `gatherMenu${element}`;


        //Creates formationMenu
        const formationMenu = document.createElement('div');
        formationMenu.className = "formationMenu"
        formationMenu.id = `formationMenu${element}`;
        //Commenting this out, it just adds text to formation menu with element name
        //formationMenu.textContent = `${element}`

        //Should be saved instead of set
        formationMenu.style.display = "none";

        gatherMenu.appendChild(elementNameDisplay);
        gatherMenu.appendChild(dustDisplay);
        gatherMenu.appendChild(dustProgress);
        gatherMenu.appendChild(dustSliderContainer);

        const gather = "gather";
        const formation = "formation";
        menus.cultivationSubMenus[elementName][gather] = () => {return document.getElementById(`gatherMenu${element}`)};
        menus.cultivationSubMenus[elementName][formation] = () => {return document.getElementById(`formationMenu${element}`)};


        //Appends all new elements to DOM in element display
        elementDisplay.appendChild(cultivationSubMenuSelector);
        elementDisplay.appendChild(gatherMenu);
        elementDisplay.appendChild(formationMenu);
        
        //Event listeners for gather and formation sub-submenu buttons
        gatherButton.addEventListener("click", () => {changeCultivationSubMenu(elementName, "gather")});
        formationButton.addEventListener("click", () => {changeCultivationSubMenu(elementName, "formation")});

        
        //Generates progress bars, these are appended to formationMenu
        const formationBars = document.createElement('div');
        formationBars.className = "formationBars";
        let j = 0;
        elements.tiers.forEach(tier => {

            const container = document.createElement('div');   
            container.className = "verticalProgressContainer"
            container.id = `element${i}${tier}Container`
            
            const levelDisplay = document.createElement('div');
            levelDisplay.className = "levelDisplay";
            levelDisplay.id = `${element}${tier}LevelDisplay`
            levelDisplay.textContent = "0";

            const progressContainer = document.createElement('div');
            progressContainer.className = "progessContainer"
            progressContainer.id = `${element}${tier}ProgessContainer`

            const progressBar = document.createElement('div');
            progressBar.className = "progressBarVertical"
            progressBar.id = `${element}${tier}ProgressBarVertical`;

            const tierBar = document.createElement('div');
            tierBar.className = "tierBarVertical";
            tierBar.id = `${element}${tier}TierBarVertical`

            progressContainer.appendChild(progressBar);
            progressContainer.appendChild(tierBar);
            
            const formationButton = document.createElement('div');
            formationButton.className = "verticalBarButton"
            formationButton.id = `${element}${tier}VerticalBarButton`;
            formationButton.textContent = `${elements.tierButtonLabels[j]}`

            container.appendChild(levelDisplay);
            container.appendChild(progressContainer);
            container.appendChild(formationButton);

            formationBars.appendChild(container);
      
            j++;
        });

        formationMenu.appendChild(formationBars);

        cultivationSubMenu.appendChild(elementDisplay)

        let test = playerData.playerData.elements[`element${number}`].gatherValue

        if (test) {
            dustInput.value = playerData.playerData.elements[`element${number}`].gatherValue;
            updateGatherSlider(number, playerData.playerData.elements[`element${number}`].gatherValue);
        } else {
            updateGatherSlider(number, 0);
        }
        
    })

    console.log(menus);
}

//TODO: Create
//Generates HTML elements that go inside each submenu for gameplay functionality
// export function generateSubmenuContent() { 


// }

//unlocks a new currently random element once awakening is complete
function unlockElement() {
    if (playerData.playerData.lockedElements.length === 0) {
        console.error("No Elements Left in playerData.playerData.lockedElements");
        return "Cant Unlock";
    }

    const random = Math.floor(Math.random() * playerData.playerData.lockedElements.length);
    const chosenElement = playerData.playerData.lockedElements.splice(random, 1)[0];
    playerData.playerData.unlockedElements.push(chosenElement);

    // playerData.playerData.unlockedElements = elements.unlockedElements; 
    // playerData.playerData.lockedElements = elements.lockedElements;
    saveGame();
    console.log(playerData.playerData.unlockedElements);
    console.log(playerData.playerData.lockedElements);
    updateAwakeningCostDisplay();
    generateSubmenus();

    console.log(`Unlocked element ${chosenElement}`);
}

//Sets up inital event listeners for cultivation
export function setupEventListeners() {
    updateAwakeningCostDisplay();
    awakeningButton.addEventListener('click', awakening);
}

//Updates the display for how much it costs to awaken based off of how many elements have already been unlocked
export function updateAwakeningCostDisplay() {
    awakenCostDisplay.textContent = `${cultivationConstants.awakeningCosts[playerData.playerData.unlockedElements.length]}`;
}

//Run when awakening button is clicked, sets up gameState for awakening if have enough MP
function awakening() {

    //If magicPower gte the cost of next element
    if (!gameState.awakeningRunning) {
        const currentCost = cultivationConstants.awakeningCosts[playerData.playerData.unlockedElements.length];
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

//function to handle changing the gathering slider
export function updateGatherSlider(elementValue, gatherValue) {
    //Grab the new data, how much MP used per gather
    // console.log(gatherValue);
    // console.log(elementValue);

    const dustDisplay = document.getElementById(`convertDustDisplay${elementValue}`)
    dustDisplay.textContent = `${gatherValue}`;
    //Save this information to playerData
    playerData.playerData.elements[`element${elementValue}`].gatherValue = gatherValue;
    if (gatherValue > 0) {
        //console.log(`gameState[element${elementValue}].gatherRunning`)
        if (!gameState[`element${elementValue}`].gatherRunning) {
            //calculateMagicDustGain(`element${elementValue}`);
            //if (playerData.playerData.elements[`element${elementValue}`].magicDustGain.gte(playerData.playerData.magicPower)) {
                gameState[`element${elementValue}`].gatherRunning = true;
                gameState[`element${elementValue}`].gatherStart = Date.now();
            //}
            
        }
    } else {
        gameState[`element${elementValue}`].gatherRunning = false;
        gameState[`element${elementValue}`].gatherOn = true;
    }

    //Possibly a call to updateDisplay


}

export function gather() {

}

export function gatherComplete(element) {
    //console.log(`Gather complete for: ${element}`)
    playerData.increaseDust(element);
    gameState[`${element}`].gatherOn = false;

}


//Remove hardcoded value


//Like updateProgressBars except for a circle :p
export function updateProgressCircles() {
    if (gameState.awakeningRunning) {
        let awakeningFinished = gameState.awakeningStart + gameState.awakeningLength;
        const awakeningProgress = Math.min(100, Math.round((Date.now() - gameState.awakeningStart) / (awakeningFinished - gameState.awakeningStart)* 100));
        updateProgressCircle(awakeningProgress, awakeningProgressCircle);
    }

    // if (gameState.trainingRunning) {
    //         let trainingFinished = gameState.trainingStart + gameState.trainingLength;
    //         const trainingProgress = Math.min(100, Math.round((Date.now() - gameState.trainingStart) / (trainingFinished - gameState.trainingStart)* 100));
    //         updateProgressBar(trainingProgress, trainingProgressBar);
    // }

    let i = 1;

    while (i <= 5) {
        if (gameState[`element${i}`].gatherRunning || gameState[`element${i}`].gatherOn) {
            let gatherFinished = gameState[`element${i}`].gatherStart + playerData.playerData.elements[`element${i}`].gatherLength;
            const gatherProgress = Math.round((Date.now() - gameState[`element${i}`].gatherStart) / (gatherFinished - gameState[`element${i}`].gatherStart)* 1000) / 10;
            const progressCenter = document.getElementById(`progressCenter${i}`);
            const color = elements.elementColors[playerData.playerData.unlockedElements[(i - 1)]];
            if (gatherProgress < 100) {
                updateDustSquare(gatherProgress, progressCenter, color)
            } else {
                updateDustSquare(0, progressCenter, color)
            }
        }
        i++;
    }
    

    // if (gameState.element1.gatherRunning || gameState.element1.gatherOn) {
    //     let gatherFinished = gameState.element1.gatherStart + playerData.playerData.elements.element1.gatherLength;
    //     const gatherProgress = Math.round((Date.now() - gameState.element1.gatherStart) / (gatherFinished - gameState.element1.gatherStart)* 1000) / 10;
    //     //console.log("updated");
    //     const progressCenter = document.getElementById(`progressCenter1`);
    //     const color = elements.elementColors[playerData.playerData.unlockedElements[0]];
    //     if (gatherProgress < 100) {
    //         updateDustSquare(gatherProgress, progressCenter, color)
    //     } else {
    //         updateDustSquare(0, progressCenter, color)
    //     }
    // }


    
    
    
    
}

//unlocks an element when awakening progress is finished
export function awakeningComplete() {
    console.log("awakening Complete");
    updateProgressCircle(0, awakeningProgressCircle);
    unlockElement();
    checkFormationMilestones();
}

//setup for cultivation on load/start
export function setupCultivation() {
   generateSubmenus();
   updateAwakeningCostDisplay();
}



