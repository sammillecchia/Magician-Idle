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

export function setupEventListeners() {
    //maybe the event listeners should be in an object?
    trainingButton.addEventListener('click', training);
    autoTrainButton.addEventListener('click', autoTrain);
    
    increaseButton.addEventListener('click', increase);
}

function autoTrain() {
    if (gameState.trainingAuto) {
        console.log("gamestate trainingauto false");
        gameState.trainingAuto = false;
    } else if (!gameState.trainingAuto) {
        console.log("gamestate trainingauto true");
        gameState.trainingAuto = true;
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
    console.log('increase')
    if (playerData.playerData.magicPower >= playerData.playerData.increaseCost) {
        playerData.decreaseMagicPower(playerData.playerData.increaseCost); //stupid
        gameState.increaseRunning = true;
        gameState.increaseStart = Date.now();
    } else {
        //cant upgrade increase
        console.log('cant increase')
    }
}

export function increaseComplete() {
    console.log('increaseComplete')
    updateProgressBar(0, increaseProgressBar);
    playerData.incrementIncreaseLevel();
    playerData.incrementIncreaseCost();
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