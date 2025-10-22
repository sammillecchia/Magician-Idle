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




//Movable Display
const MPDisplay = document.getElementById("mpDisplay");
const RankDisplay = document.getElementById("rankDisplay");

// const Element1DustDisplay = document.getElementById("Element1DustDisplay");
// const Element2DustDisplay = document.getElementById("Element2DustDisplay");
// const Element3DustDisplay = document.getElementById("Element3DustDisplay");
// const Element4DustDisplay = document.getElementById("Element4DustDisplay");
// const Element5DustDisplay = document.getElementById("Element5DustDisplay");

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

    if (menus.currentMenu === menus.allMenus.cultivation) {
        //console.log(playerData.playerData.unlockedElements.length);
        let i = 1;
        while (i <= playerData.playerData.unlockedElements.length) {
            const dustDisplay = document.getElementById(`${i}DustDisplay`);
            dustDisplay.textContent = `DUST: ${playerData.playerData.elements[`element${i}`].magicDust}`;
            i++
        }
    }

    MPDisplay.textContent = Math.floor(playerData.getMagicPower()); 
    //RankDisplay   TBA

    let i = 1;
    while (i <= playerData.playerData.unlockedElements.length) {
        const dustDisplay = document.getElementById(`Element${i}DustDisplay`);
        dustDisplay.textContent = `${playerData.playerData.elements[`element${i}`].magicDust}`;
        i++
    }


   
}


