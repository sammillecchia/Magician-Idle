import * as training from "../modules/training.js";
import * as playerData from "../player/playerData.js";
import { loadGame, saveGame } from "./saveload.js";

let loaded = false;

//TODO: MOVE TO ANOTHER CLASS FOR TEXT UPDATES
let mpText = document.getElementById('mp');
const autoTrainButton = document.getElementById('autoTrain');
const increaseCostDisplay = document.getElementById('increaseCostDisplay')
const increaseLevelDisplay = document.getElementById('increaseLevel')

//this is dumb
let lastUpdateTime = Date.now();
let lastSaveTime = Date.now();
let loopDate = Date.now();

//object for handling everything in the game state
export const gameState = {
    lastTimePlayed: null,
    
    trainingLength: 1000,   //Time = int (ms), should be in playerData?
    trainingRunning: false, //Running = Boolean
    trainingAuto: false, //Looping = Boolean
    trainingStart: null,     //Start = Date

    increaseUnlocked: false,
    increaseLength: 1000, //ms placeholder
    increaseRunning: false,
    increaseStart: null,
    
}

//sets event listeners, for one-time initalization logic
//things were breaking when this was in main.js uuh maybe fix that idk
export function startGame() {
    training.setupEventListeners();

    requestAnimationFrame(gameLoop);
}

//Game loop, things that needs to be called every game update
function gameLoop() {
    loopDate = Date.now();

    //Saves current game data
    saveLoop();


    //handles updates for training
    trainingLoop();

    //updates animations, progress bars, based on player data
    animationLoop();

    //loops on next frame
    requestAnimationFrame(gameLoop);
}

function saveLoop() {
    if (!loaded) {
        loadGame();
        loaded = true;
    }
    if (loopDate - 10000 >= lastSaveTime) {
        saveGame();
        lastSaveTime = Date.now();
        console.log("saved to localStorage");
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
        if (loopDate - gameState.increaseLength >= gameState.increaseStart) {
            training.increaseComplete();
            gameState.increaseRunning = false;
        }
    }

    //


}

function cultivationLoop() {

}



function animationLoop() {
    training.updateProgressBars();
    
    updateText()
}

//Updates all text with information, since this is called every gameLoop it needs checks
//for whether the things being updated are actually visible
function updateText() {
    // console.log('updateText');
    //Updates MP display
    mpText.innerText = playerData.getMagicPower();
    //Updates Gain Display (per training) TODO
    increaseLevelDisplay.innerText = playerData.playerData.increaseLevel;
    increaseCostDisplay.innerText = playerData.playerData.increaseCost;



    if (gameState.trainingAuto) {
        autoTrainButton.style.color = 'green';
    } else {
        autoTrainButton.style.color = '#eee';
    }
}





