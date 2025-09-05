import { gameState } from "./game.js";
import { saveGame } from "./saveload.js";
import { increaseMagicPower, playerData } from "../player/playerData.js";
import { createModal } from "../ui/modal.js";

//todo add call to calculateOffline() from domContentLoaded
export function offlineSetup() {
    
    document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        console.log('visible')
        calculateOffline(); 
    } else {
        console.log('hidden')
        gameState.lastTimePlayed = Date.now();
        saveGame();  
    }

    });

    window.addEventListener('pagehide', () => {
        console.log('hidden')
        gameState.lastTimePlayed = Date.now();
        saveGame();
    })

}

//todo add call to calculateOffline() from domContentLoaded
export function calculateOffline() {

    if (isNaN(gameState.lastTimePlayed)) {
        console.error("lastTimePlayed is NaN");
        return;
    }

    let timeElapsed = Date.now() - parseInt(gameState.lastTimePlayed, 10);
    console.log(timeElapsed);
    let secondsElapsed = Math.floor(timeElapsed / 1000);
    let offlineMP;
    
    //only calculate if offline for > 50ms
    if (timeElapsed >= 50) {
    //todo add MP offline progress
    if (gameState.trainingRunning) {
    let trainingElapsed = Math.floor(timeElapsed / gameState.trainingLength);
    let trainingRemaining = Math.floor(timeElapsed % gameState.trainingLength);

    console.log(`Training Elapsed: ${trainingElapsed}`);
    console.log(`Training Remaining: ${trainingRemaining}`);

        if (trainingRemaining) {
            gameState.trainingStart = new Date(Date.now() + trainingRemaining);
        }
        if (trainingElapsed) {
            increaseMagicPower(trainingElapsed);
            offlineMP = playerData.gain * trainingElapsed;
        }
    }
    // //todo add training upgrades offline progress


    // //todo add awakening offline progress

    //     console.log("offline progress calculated");
    }

    //change to 10-30 Seconds, 1s for testing
    //displays offline progress modal if offline for more than 20 seconds
    if (secondsElapsed > 1) {
        createModal(offlineMP);
    }


    
    console.log(`time elapsed ${secondsElapsed}s`);
}