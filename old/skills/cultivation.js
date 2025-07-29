import updateProgressBar from "../utils/progressbar.js";
import { magicalPower, addMagicalPower, setMagicalPower } from "../player/stats.js";
//these should be constants
let elements = ["Fire", "Lightning", "Earth", "Wind", "Ice", "Water", "Light"];
let elementColors = ["cc0000", "#cc00cc", "#cc9900", "#33cc33", "#33cccc", "#006699", "#ffcc00"];

//For later on when making it so that you are unable to have two of the same elements
// let possibleElements
// let possibleElementColors

let currentElements = [];
let currentElementColors = [];
let currentAwakeningLevel = 0; //later






let awakeningFill, awakeningText;

export function setupAwakening() {
    const awakeningMenu = document.getElementById("awakeningMenuButton");
    const awakening = document.getElementById("awakening");
    awakening.addEventListener("click", runAwakening);
    const awakeningDisplay = document.getElementById("awakeningDisplay");
    awakeningFill = document.getElementById("awakeningBarFill");
    awakeningText = document.getElementById("awakeningBarText");
    const element1Display = document.getElementById("element1Display");
    const element1MenuButton = document.getElementById("element1MenuButton");
}



let awakeningRunning = 0;
let awakeningTime = 1; //should be ~10s
function runAwakening() { 
    if (awakeningRunning == 0 && magicalPower >= 1000) {
        awakeningRunning = 1;
        addMagicalPower(-1000);
        updateProgressBar(awakeningTime, awakeningFill, awakeningText, awakeningComplete, 0);
    }
}

function awakeningComplete() {
    console.log("awakening done");
    calculateElement();
    awakeningCheck();
    awakeningRunning = 0;
}

function calculateElement() { //make it so that this function is also unable to regenerate the same elemnts
    if (currentElements.length == 0) {
        let temp = Math.floor(Math.random() * 2);
        currentElements[currentAwakeningLevel]  = elements[temp];
        currentElementColors[currentAwakeningLevel] = elementColors[temp];

    } else if (currentElements.length == 1) {
        console.log("2")
    }
    unlockElements();
    console.log(currentElements[currentAwakeningLevel] )
}


function awakeningCheck() {
    //checks if you can use awakening again

}

const awakeningMenuButton = document.getElementById("awakeningMenuButton");

const awakeningDisplay = document.getElementById("awakeningDisplay");

const element1Display = document.getElementById("element1Display");

const element1MenuButton = document.getElementById("element1MenuButton");

element1MenuButton.addEventListener("click", () => {swapCultivationMenu(element1Display)});
awakeningMenuButton.addEventListener("click", () => {swapCultivationMenu(awakeningDisplay)});

function unlockElements() {
    element1MenuButton.textContent = currentElements[0];
    element1MenuButton.style.backgroundColor = `#${currentElementColors[0]}`;
    element1MenuButton.style.display = "flex";

    console.log(`${elementColors[0]}`);
}

let lastCultivationMenu = awakeningDisplay;
function swapCultivationMenu(cultivationMenu) {
    lastCultivationMenu.style.display = "none"
    cultivationMenu.style.display = "flex"
    cultivationMenu.style.placeItems = "center";
    lastCultivationMenu = cultivationMenu;
}