import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js";
import { menus } from "../game/menus.js";

const mpText = document.getElementById('mp');
const gainText = document.getElementById('gain');

const autoTrainButton = document.getElementById('autoTrain');

const increaseCostDisplay = document.getElementById('increaseCostDisplay')
const increaseLevelDisplay = document.getElementById('increaseLevel')

const intensifyCostDisplay = document.getElementById('intensifyCostDisplay')
const intensifyLevelDisplay = document.getElementById('intensifyLevel')

const duplicateCostDisplay = document.getElementById('duplicateCostDisplay')
const duplicateLevelDisplay = document.getElementById('duplicateLevel')

const multiplyCostDisplay = document.getElementById('multiplyCostDisplay')
const multiplyLevelDisplay = document.getElementById('multiplyLevel')


//Updates all text with information, since this is called every gameLoop it needs checks
//for whether the things being updated are actually visible
export function updateText() {
    // console.log('updateText');
    //Updates MP display
    
    if (menus.currentMenu === menus.allMenus.training) {
        mpText.innerText = Math.floor(playerData.getMagicPower());
        gainText.innerText = playerData.playerData.gain;

        increaseLevelDisplay.innerText = playerData.playerData.increaseLevel;
        increaseCostDisplay.innerText = playerData.playerData.increaseCost;

        intensifyLevelDisplay.innerText = playerData.playerData.intensifyLevel;
        intensifyCostDisplay.innerText = playerData.playerData.intensifyCost;

        duplicateLevelDisplay.innerText = playerData.playerData.duplicateLevel;
        duplicateCostDisplay.innerText = playerData.playerData.duplicateCost;

        multiplyLevelDisplay.innerText = playerData.playerData.multiplyLevel;
        multiplyCostDisplay.innerText = playerData.playerData.multiplyCost;


        if (gameState.trainingAuto) {
            autoTrainButton.style.color = 'green';
        } else {
            autoTrainButton.style.color = '#eee';
        }
    }
}