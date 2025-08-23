//logic for cultivation
import * as playerData from "../player/playerData.js";
import { gameState } from "../game/game.js"
import { updateProgressBar } from "../utils/progressbar.js";

const awakeningButton = document.getElementById('awakening');
const awakeningProgressCircle = document.getElementById('progressCircle');

export function setupEventListeners() {
    awakeningButton.addEventListener('click', awakening);
}

function awakening() {

}

export function updateProgressCircles() {
    if (gameState.awakeningRunning) {
        let awakeningFinished = gameState.awakeningStart + gameState.awakeningLength;
        const awakeningProgress = Math.min(100, Math.round((Date.now() - gameState.awakeningStart) / (awakeningFinished - gameState.awakeningStart)* 100));
        updateProgressBar(awakeningProgress, awakeningProgressCircle);
    }
}

export function awakeningComplete() {
    
}