import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js";

const mpText = document.getElementById('mp');
const gainText = document.getElementById('gain');

const autoTrainButton = document.getElementById('autoTrain');

const increaseCostDisplay = document.getElementById('increaseCostDisplay')
const increaseLevelDisplay = document.getElementById('increaseLevel')

const intensifyCostDisplay = document.getElementById('intensifyCostDisplay')
const intensifyLevelDisplay = document.getElementById('intensifyLevel')



//Updates all text with information, since this is called every gameLoop it needs checks
//for whether the things being updated are actually visible
export function updateText() {
    // console.log('updateText');
    //Updates MP display
    mpText.innerText = playerData.getMagicPower();
    gainText.innerText = playerData.playerData.gain;
    //Updates Gain Display (per training) TODO
    increaseLevelDisplay.innerText = playerData.playerData.increaseLevel;
    increaseCostDisplay.innerText = playerData.playerData.increaseCost;

    intensifyLevelDisplay.innerText = playerData.playerData.intensifyLevel;
    intensifyCostDisplay.innerText = playerData.playerData.intensifyCost;


    if (gameState.trainingAuto) {
        autoTrainButton.style.color = 'green';
    } else {
        autoTrainButton.style.color = '#eee';
    }
}