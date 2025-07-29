//todo move all training logic here
import updateProgressBar from "../utils/progressbar.js";
import { magicalPower, addMagicalPower, setMagicalPower } from "../player/stats.js";
import { displayMenu } from "../main.js"
import { updateStatDisplays } from "../player/stats.js";

export function setupTraining() {
    //dawg wtf is this even for
}


const intensifyingLayer = document.getElementById("intensifyingLayer");
const multiplicationLayer = document.getElementById("multiplicationLayer");

let magicalTrainingLevel = 1; 
let magicalIntensifyingLevel = 0;
let magicalMultiplicationLevel = 0;

const trainingMenuButton = document.getElementById("trainingMenuButton");
const statMenuButton = document.getElementById("statMenuButton");
const cultivationMenuButton = document.getElementById("cultivationMenuButton");

trainingMenuButton.addEventListener("click", () => displayMenu(trainingMenu));
statMenuButton.addEventListener("click", () => displayMenu(statsMenu));
cultivationMenuButton.addEventListener("click", () => displayMenu(cultivationMenu));

const trainingMenu = document.getElementById("trainingMenu");
const statsMenu = document.getElementById("statsMenu");
const cultivationMenu = document.getElementById("cultvationMenu")

let trainingRunning = 0;
const trainingTextElement = document.getElementById('trainingBarText');
const trainingFill = document.getElementById('trainingBarFill');
const trainingButton = document.getElementById('train');
trainingButton.addEventListener("click", startTraining);
const autoTrainButton = document.getElementById("autoTrain");
let autoTrainEnabled = 0;
let autoTrainRunning = 0;

autoTrainButton.addEventListener("click", doAutoTrain)

let intensifyCost = 5; 
let intensifyRunning = 0;
const intensifyingTextElement = document.getElementById('intensifyingBarText');
const intensifyingFill = document.getElementById('intensifyingBarFill');
const intensifyButton = document.getElementById('intensify');
intensifyButton.addEventListener("click", startIntensifying);

let multiplicationCost = 100;
let multiplicationRunning = 0;
const multiplicationTextElement = document.getElementById('multiplicationBarText');
const multiplicationFill = document.getElementById('multiplicationBarFill');
const multiplicationButton = document.getElementById('multiplication');


const mpText = document.getElementById("mp");
const gainText = document.getElementById("gain");
const intensifyCostDisplay = document.getElementById('intensifyCost');
const intensifyLevelDisplay = document.getElementById('ilvl');
const multiplicationLevelDisplay = document.getElementById('mlvl');
const multiplicationCostDisplay = document.getElementById('multiplicationCost');
multiplicationButton.addEventListener("click", startMultiplication);



function doAutoTrain() {
    if (autoTrainEnabled == 0) {
        console.log(autoTrainEnabled);
        autoTrainButton.style.color = "#11EE11";
        autoTrainEnabled = 1
        startTraining(); 
    } else if (autoTrainEnabled == 1) {
        console.log(autoTrainEnabled);
        autoTrainButton.style.color = "";
        autoTrainEnabled = 0;
    }
}

let gain = 1;
function calculateGain() {
    gain = 1 //base 
        + 1 * magicalIntensifyingLevel //intensify bonus
        + magicalMultiplicationLevel ** 1.3 //multiplication bonus, I don't think this is expon
}

function calcTrainTime() {
    trainingTime = 1 + magicalIntensifyingLevel * 0.05 + magicalMultiplicationLevel * 0.1
}

let autoTrainReduction = 0.7 //0.7 is 30% reduction
function trainingComplete() {
    calculateGain();
    
    trainingRunning = 0;
    if (autoTrainRunning == 0) {
        addMagicalPower(gain);
    } else if (autoTrainRunning == 1 && autoTrainEnabled == 1) {
        addMagicalPower(gain * autoTrainReduction);
        startTraining();
    }
    trainingUnlocks();

    updateText();
}


let trainingTime = 1; 
function startTraining() {
    if (trainingRunning == 0) {
        if (autoTrainEnabled == 0) {
            autoTrainRunning = 0;
        } else if (autoTrainEnabled == 1) {
            autoTrainRunning = 1;
        }
        trainingRunning = 1;
        calcTrainTime();
        updateProgressBar(trainingTime, trainingFill, trainingTextElement, trainingComplete, 0); 
    }    
}

let intensifyUnlocked = 0;
let multiplicationUnlocked = 0;

function trainingUnlocks() {
    if (magicalPower.gte(5) && intensifyUnlocked == 0) {
        unlockIntensify();
    }
    if (magicalPower.gte(100) && multiplicationUnlocked == 0) {
        unlockMultiplication();
    }

}

function unlockIntensify() {
    console.log("intensify unlock")
    intensifyingLayer.style.display = "flex"
    intensifyUnlocked = 1;
}

function unlockMultiplication() {
    console.log("mult unlokc")
    multiplicationLayer.style.display = "flex"
    multiplicationUnlocked = 1;
}

let intensifyTime = 5;
function startIntensifying() {
    if (intensifyCost <= magicalPower && intensifyRunning == 0) {
        intensifyRunning = 1
        addMagicalPower((-1 * intensifyCost));
        intensifyCost = 5 * ((1.1) ** (magicalIntensifyingLevel));
        updateText();
        updateProgressBar(intensifyTime, intensifyingFill, intensifyingTextElement, intensifyComplete, 0)
    }
}

function intensifyComplete() {
    magicalIntensifyingLevel++;
    intensifyRunning = 0;
    updateText();
}


let multiplicationTime = 5;
function startMultiplication() {
    if (multiplicationCost <= magicalPower && multiplicationRunning == 0) {
        multiplicationRunning = 1
        addMagicalPower((-1 * multiplicationCost));
        multiplicationCost = 100 * ((1.1) ** (magicalMultiplicationLevel)); 
        updateText();
        updateProgressBar(multiplicationTime, multiplicationFill, multiplicationTextElement, multiplicationComplete, 0)
    }
}

function multiplicationComplete() {
    magicalMultiplicationLevel++;
    multiplicationRunning = 0;
    updateText();
}

export function updateText() {
    updateStatDisplays();

    mpText.textContent = Math.trunc(magicalPower);
    gainText.textContent = Math.trunc(gain);
    intensifyCostDisplay.textContent = Math.trunc(intensifyCost);
    intensifyLevelDisplay.textContent = Math.trunc(magicalIntensifyingLevel);
    multiplicationCostDisplay.textContent = Math.trunc(multiplicationCost);
    multiplicationLevelDisplay.textContent = Math.trunc(magicalMultiplicationLevel);

    if (trainingRunning == 0) {
        calcTrainTime()
        trainingTextElement.textContent = `${Math.trunc(trainingTime * 100) / 100}s`; 
    }

    if (intensifyRunning == 0) {
        intensifyingTextElement.textContent = `${Math.trunc(intensifyTime * 100) / 100}s`; 
    }

    if (multiplicationRunning == 0) {
        multiplicationTextElement.textContent = `${Math.trunc(multiplicationTime * 100) / 100}s`; 
    }
}
