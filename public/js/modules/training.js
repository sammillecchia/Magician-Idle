//logic for training
import { setMagicPower, increaseMagicPower } from "../player/playerData.js";
import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js"
import { updateProgressBar } from "../utils/progressbar.js";

const trainingButton = document.getElementById('train');
const trainingProgressBar = document.getElementById('trainingBarFill'); 
const autoTrainButton = document.getElementById('autoTrain');

const increaseButton = document.getElementById('increase');
const increaseProgressBar = document.getElementById('increaseFill');

const intensifyButton = document.getElementById('intensify');
const intensifyProgressBar = document.getElementById('intensifyFill');

const duplicateButton = document.getElementById('duplicate');
const duplicateProgressBar = document.getElementById('duplicateFill');

const multiplyButton = document.getElementById('multiply');
const multiplyProgressBar = document.getElementById('multiplyFill');

export function setupEventListeners() {
    //maybe the event listeners should be in an object?
    trainingButton.addEventListener('click', training);
    autoTrainButton.addEventListener('click', autoTrain);
    
    increaseButton.addEventListener('click', increase);

    intensifyButton.addEventListener('click', intensify);

    duplicateButton.addEventListener('click', duplicate);

    multiplyButton.addEventListener('click', multiply);
}

function autoTrain() {
    if (gameState.trainingAuto) {
        console.log("gamestate trainingauto false");
        gameState.trainingAuto = false;
    } else if (!gameState.trainingAuto) {
        console.log("gamestate trainingauto true");
        gameState.trainingAuto = true;
        if (!gameState.trainingRunning) {
            training();
        }
    }
}

export function updateProgressBars() {
    
    if (gameState.trainingRunning) {
        let trainingFinished = gameState.trainingStart + gameState.trainingLength;
        const trainingProgress = Math.min(100, Math.round((Date.now() - gameState.trainingStart) / (trainingFinished - gameState.trainingStart)* 100));
        updateProgressBar(trainingProgress, trainingProgressBar);
    }

    if (gameState.increaseRunning) {
        let increaseFinished = gameState.increaseStart + gameState.increaseLength;
        const increaseProgress = Math.min(100, Math.round((Date.now() - gameState.increaseStart) / (increaseFinished - gameState.increaseStart)* 100));
        updateProgressBar(increaseProgress, increaseProgressBar);
    }

    if (gameState.intensifyRunning) {
        let intensifyFinished = gameState.intensifyStart + gameState.intensifyLength;
        const intensifyProgress = Math.min(100, Math.round((Date.now() - gameState.intensifyStart) / (intensifyFinished - gameState.intensifyStart)* 100));
        updateProgressBar(intensifyProgress, intensifyProgressBar);
    }

    if (gameState.duplicateRunning) {
        let duplicateFinished = gameState.duplicateStart + gameState.duplicateLength;
        const duplicateProgress = Math.min(100, Math.round((Date.now() - gameState.duplicateStart) / (duplicateFinished - gameState.duplicateStart)* 100));
        updateProgressBar(duplicateProgress, duplicateProgressBar);
    }

    if (gameState.multiplyRunning) {
        let multiplyFinished = gameState.multiplyStart + gameState.multiplyLength;
        const multiplyProgress = Math.min(100, Math.round((Date.now() - gameState.multiplyStart) / (multiplyFinished - gameState.multiplyStart)* 100));
        updateProgressBar(multiplyProgress, multiplyProgressBar);
    }

}


export function training() {
    
    gameState.trainingRunning = true;
    gameState.trainingStart = Date.now();
}

export function trainingComplete() {
    //Idk, either I should have this here or there should be a check in the animation
    updateProgressBar(0, trainingProgressBar);
    increaseMagicPower();
    checkUpgradeMilestones();
}

export function increase() {
    if (!gameState.increaseRunning) {
        console.log('increase')
        if (playerData.playerData.magicPower.gte(playerData.playerData.increaseCost)) {
            playerData.decreaseMagicPower(playerData.playerData.increaseCost);
            gameState.increaseRunning = true;
            gameState.increaseStart = Date.now();
        } else {
            //cant upgrade increase
            console.log('cant increase')
        }
    }
}

export function increaseComplete() {
    console.log('increaseComplete')
    updateProgressBar(0, increaseProgressBar);
    playerData.incrementIncreaseLevel();
    playerData.incrementIncreaseCost();
}

export function intensify() {
    if (!gameState.intensifyRunning) {
        console.log('intensify')
        if (playerData.playerData.magicPower.gte(playerData.playerData.intensifyCost)) {
            playerData.decreaseMagicPower(playerData.playerData.intensifyCost); //stupid
            gameState.intensifyRunning = true;
            gameState.intensifyStart = Date.now();
        } else {
            //cant upgrade intensify
            console.log('cant intensify')
        }
    }
}

export function intensifyComplete() {
    console.log("intensify complete");
    updateProgressBar(0, intensifyProgressBar);
    playerData.incrementIntensifyLevel();   
    playerData.incrementIntensifyCost();
}

export function duplicate() {
    if (!gameState.duplicateRunning) {
        console.log('duplicate')
        if (playerData.playerData.magicPower.gte(playerData.playerData.duplicateCost)) {
            playerData.decreaseMagicPower(playerData.playerData.duplicateCost); //stupid
            gameState.duplicateRunning = true;
            gameState.duplicateStart = Date.now();
        } else {
            //cant upgrade duplicate
            console.log('cant duplicate')
        }
    }
}


export function duplicateComplete() {
    console.log("duplicate complete");
    updateProgressBar(0, duplicateProgressBar);
    playerData.incrementDuplicateLevel();   
    playerData.incrementDuplicateCost();
}

export function multiply() {
    if (!gameState.multiplyRunning) {
        console.log('multiply')
        if (playerData.playerData.magicPower.gte(playerData.playerData.multiplyCost)) {
            playerData.decreaseMagicPower(playerData.playerData.multiplyCost); //stupid
            gameState.multiplyRunning = true;
            gameState.multiplyStart = Date.now();
        } else {
            //cant upgrade multiply
            console.log('cant multiply')
        }
    }
}


export function multiplyComplete() {
    console.log("multiply complete");
    updateProgressBar(0, multiplyProgressBar);
    playerData.incrementMultiplyLevel();   
    playerData.incrementMultiplyCost();
}





//THERE IS MOST DEFINITELY A BETTER WAY TO DO THIS
export function checkUpgradeMilestones() {

    //replace 1, 4, 8, 12 with [upgrade]Cost
    if (playerData.magicPower > 1) {
        console.log('increase unlocked');

    }

    if (playerData.magicPower > 4) {
        console.log('intensify unlocked');

    }

    if (playerData.magicPower > 8) {
        console.log('duplicate unlocked');

    }

    if (playerData.magicPower > 12) {
        console.log('multiply unlocked');
   
    }
}

//uuh implement?
export function trainingUIUpdate() {
    //uuh idk where this should be
}