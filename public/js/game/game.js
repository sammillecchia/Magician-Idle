import * as training from "../modules/training.js";
import * as cultivation from "../modules/cultivation.js";
import * as playerData from "../player/playerData.js";
import { loadGame, saveGame } from "./saveload.js";
import { updateText } from "../utils/updateText.js";
import { setupMenuButtons } from "../ui/events.js";
import { offlineSetup } from "./offlineProgress.js";
import { setupCultivation } from "../modules/cultivation.js";
import { makeDraggable } from "../utils/draggable.js";

//this is dumb idk
let lastUpdateTime = Date.now();
let lastSaveTime = Date.now();
let loopDate = Date.now();

//object for handling everything in the game state
export const gameState = {
    // lastTimePlayed: null, 
    
    // //trainingLength: 1000,   //Time = int (ms), should be in playerData?
    // trainingRunning: false, //Running = Boolean
    // trainingAuto: false, //Looping = Boolean
    // trainingStart: null,     //Start = Date
    
    // //increaseLength: 1000, //ms placeholder
    // increaseUnlocked: false,
    // increaseRunning: false,
    // increaseStart: null,

    // //intensifyLength: 1000, //ms placeholder
    // intensifyUnlocked: false,
    // intensifyRunning: false,
    // intensifyStart: null,

    // //duplicateLength: 1000, //ms placeholder
    // duplicateUnlocked: false,
    // duplicateRunning: false,
    // duplicateStart: null,
    
    // //multiplyLength: 1000, //ms placeholder
    // multiplyUnlocked: false,
    // multiplyRunning: false,
    // multiplyStart: null,

    // //awakeningLength: 1000, //ms placeholder
    // awakeningUnlocked: false,
    // awakeningRunning: false,
    // awakeningStart: null,

    // element1: {
    //     gatherUnlocked: false,
    //     gatherRunning: false,
    //     gatherStart: null,
    //     starRunning: false,
    //     pathRunning: false,
    //     mapRunning: false,
    //     constellationRunning: false,
    //     visionRunning: false,
    //     manifestationRunning: false

    // }
    
}

let e = gameState.multiplyLength;

//sets event listeners, for one-time initalization logic
//things were breaking when this was in main.js uuh maybe fix that idk
export function startGame() {
    
    training.setupEventListeners();
    cultivation.setupEventListeners();
    loadGame();
    makeDraggable(document.getElementById('statsDisplay'));
    setupCultivation();
    setupMenuButtons();
    requestAnimationFrame(gameLoop);
}

//Game loop, things that needs to be called every game update
function gameLoop() {
    loopDate = Date.now();

    //Saves current game data
    saveLoop();

    //handles updates for training
    trainingLoop();

    //handles updates for cultivation
    cultivationLoop();

    //updates animations, progress bars, based on player data
    animationLoop();

    //loops on next frame
    requestAnimationFrame(gameLoop);
}

function saveLoop() {
    if (loopDate - 10000 >= lastSaveTime) {
        saveGame();
        lastSaveTime = Date.now();
    }
}

function cultivationLoop() {
    if (gameState.awakeningRunning) {
       if (loopDate - playerData.playerData.awakeningLength >= gameState.awakeningStart) {
            gameState.awakeningRunning = false;
            cultivation.awakeningComplete();
            
        } 
    }


    let i = 1;

    while (i <= 5) {
        if (gameState[`element${i}`].gatherRunning || gameState[`element${i}`].gatherOn) {
            if (loopDate - playerData.playerData.elements[`element${i}`].gatherLength >= gameState[`element${i}`].gatherStart) {
                cultivation.gatherComplete([`element${i}`]);
                gameState[`element${i}`].gatherStart = gameState[`element${i}`].gatherStart + playerData.playerData.elements[`element${i}`].gatherLength
            }
        }
    i++;
    }

    // if (gameState.element1.gatherRunning || gameState.element1.gatherOn) {
    //     if (loopDate - playerData.playerData.elements.element1.gatherLength >= gameState.element1.gatherStart) {
    //         cultivation.gatherComplete("element1");
    //         gameState.element1.gatherStart = gameState.element1.gatherStart + playerData.playerData.elements.element1.gatherLength
    //     }
    // }

    // if (gameState.element2.gatherRunning || gameState.element2.gatherOn) {
    //     if (loopDate - playerData.playerData.elements.element2.gatherLength >= gameState.element2.gatherStart) {
    //         cultivation.gatherComplete("element2");
    //         gameState.element2.gatherStart = gameState.element2.gatherStart + playerData.playerData.elements.element2.gatherLength
    //     }
    // }

    // if (gameState.element3.gatherRunning || gameState.element3.gatherOn) {
    //     if (loopDate - playerData.playerData.elements.element3.gatherLength >= gameState.element3.gatherStart) {
    //         cultivation.gatherComplete("element3");
    //         gameState.element3.gatherStart = gameState.element3.gatherStart + playerData.playerData.elements.element3.gatherLength
    //     }
    // }

    // if (gameState.element4.gatherRunning || gameState.element4.gatherOn) {
    //     if (loopDate - playerData.playerData.elements.element4.gatherLength >= gameState.element4.gatherStart) {
    //         cultivation.gatherComplete("element4");
    //         gameState.element4.gatherStart = gameState.element4.gatherStart + playerData.playerData.elements.element4.gatherLength
    //     }
    // }

    // if (gameState.element5.gatherRunning || gameState.element5.gatherOn) {
    //     if (loopDate - playerData.playerData.elements.element5.gatherLength >= gameState.element5.gatherStart) {
    //         cultivation.gatherComplete("element5");
    //         gameState.element5.gatherStart = gameState.element5.gatherStart + playerData.playerData.elements.element5.gatherLength
    //     }
    // }

}

//handles training
function trainingLoop() {

    //if training is running, check until its complete
    if (gameState.trainingRunning) {
        //console.log('training is running')

        if (loopDate - gameState.trainingLength >= gameState.trainingStart) {
            //console.log('training is done')

            training.trainingComplete();

            if (gameState.trainingAuto) {
                gameState.trainingRunning = false;
                training.training();
            } else {
                gameState.trainingRunning = false;
            }
        }
    }

    //logic for increasing
    if (gameState.increaseRunning) {
        if (loopDate - playerData.playerData.increaseLength >= gameState.increaseStart) {
            training.increaseComplete();
            gameState.increaseRunning = false;
        }
    }


    //logic for intensify
    if (gameState.intensifyRunning) {
        if (loopDate - playerData.playerData.intensifyLength >= gameState.intensifyStart) {
            training.intensifyComplete();
            gameState.intensifyRunning = false;
        }
    }

    //logic for duplicate
    if (gameState.duplicateRunning) {
        if (loopDate - playerData.playerData.duplicateLength >= gameState.duplicateStart) {
            training.duplicateComplete();
            gameState.duplicateRunning = false;
        }
    }

    //logic for duplicate
    if (gameState.multiplyRunning) {
        if (loopDate - playerData.playerData.multiplyLength >= gameState.multiplyStart) {
            training.multiplyComplete();
            gameState.multiplyRunning = false;
        }
    }

}





function animationLoop() {
    training.updateProgressBars();
    cultivation.updateProgressCircles();

    updateText();
}






