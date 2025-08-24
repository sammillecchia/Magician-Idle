//logic for cultivation
import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js"
import { updateProgressCircle } from "../utils/progressbar.js";

const awakeningButton = document.getElementById('awakening');
const awakeningProgressCircle = document.getElementById('awakeningProgressCircle');

export function setupEventListeners() {
    awakeningButton.addEventListener('click', awakening);
}

function awakening() {
    console.log("testawakening");
    gameState.awakeningRunning = true;
    gameState.awakeningStart = Date.now();
}

export function updateProgressCircles() {
    if (gameState.awakeningRunning) {
        let awakeningFinished = gameState.awakeningStart + gameState.awakeningLength;
        const awakeningProgress = Math.min(100, Math.round((Date.now() - gameState.awakeningStart) / (awakeningFinished - gameState.awakeningStart)* 100));
        updateProgressCircle(awakeningProgress, awakeningProgressCircle);
    }
}

export function awakeningComplete() {
    console.log("awakening Complete");
    updateProgressCircle(0, awakeningProgressCircle);
}



