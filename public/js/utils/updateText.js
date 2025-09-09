"use strict"
import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js";
import { menus } from "../game/menus.js";
import { cultivationConstants } from "../game/constants.js";
import { elements } from "../modules/cultivation.js";

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

const awakenCostDisplay = document.getElementById('awakenCost');

//Updates all text with information, since this is called every gameLoop it needs checks
//for whether the things being updated are actually visible
export function updateText() {
    // console.log('updateText');
    //Updates MP display
    
    if (menus.currentMenu === menus.allMenus.training) {
        mpText.textContent = Math.floor(playerData.getMagicPower());
        gainText.textContent = Math.floor(playerData.playerData.gain);

        increaseLevelDisplay.textContent = playerData.playerData.increaseLevel;
        increaseCostDisplay.textContent = playerData.playerData.increaseCost;

        intensifyLevelDisplay.textContent = playerData.playerData.intensifyLevel;
        intensifyCostDisplay.textContent = playerData.playerData.intensifyCost;

        duplicateLevelDisplay.textContent = playerData.playerData.duplicateLevel;
        duplicateCostDisplay.textContent = playerData.playerData.duplicateCost;

        multiplyLevelDisplay.textContent = playerData.playerData.multiplyLevel;
        multiplyCostDisplay.textContent = playerData.playerData.multiplyCost;


        if (gameState.trainingAuto) {
            autoTrainButton.style.color = 'green';
        } else {
            autoTrainButton.style.color = '#eee';
        }
    }

   
}


