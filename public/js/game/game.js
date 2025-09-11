import * as training from "../modules/training.js";
import * as cultivation from "../modules/cultivation.js";
import * as playerData from "../player/playerData.js";
import { loadGame, saveGame } from "./saveload.js";
import { updateText } from "../utils/updateText.js";
import { setupMenuButtons } from "../ui/events.js";
import { offlineSetup } from "./offlineProgress.js";
import { setupCultivation } from "../modules/cultivation.js";

//this is dumb idk
let lastUpdateTime = Date.now();
let lastSaveTime = Date.now();
let loopDate = Date.now();

//object for handling everything in the game state
export const gameState = {
    lastTimePlayed: null, 
    
    //trainingLength: 1000,   //Time = int (ms), should be in playerData?
    trainingRunning: false, //Running = Boolean
    trainingAuto: false, //Looping = Boolean
    trainingStart: null,     //Start = Date
    
    //increaseLength: 1000, //ms placeholder
    increaseUnlocked: false,
    increaseRunning: false,
    increaseStart: null,

    //intensifyLength: 1000, //ms placeholder
    intensifyUnlocked: false,
    intensifyRunning: false,
    intensifyStart: null,

    //duplicateLength: 1000, //ms placeholder
    duplicateUnlocked: false,
    duplicateRunning: false,
    duplicateStart: null,
    
    //multiplyLength: 1000, //ms placeholder
    multiplyUnlocked: false,
    multiplyRunning: false,
    multiplyStart: null,

    //awakeningLength: 1000, //ms placeholder
    awakeningUnlocked: false,
    awakeningRunning: false,
    awakeningStart: null
}

let e = gameState.multiplyLength;

//sets event listeners, for one-time initalization logic
//things were breaking when this was in main.js uuh maybe fix that idk
export function startGame() {
    training.setupEventListeners();
    cultivation.setupEventListeners();
    loadGame();
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

function cultivationLoop() {
    if (gameState.awakeningRunning) {
       if (loopDate - playerData.playerData.awakeningLength >= gameState.awakeningStart) {
            cultivation.awakeningComplete();
            gameState.awakeningRunning = false;
        } 
    }
}



function animationLoop() {
    training.updateProgressBars();
    cultivation.updateProgressCircles();

    updateText();
}






