import { gameState } from "./game.js";
import { playerData } from "../player/playerData.js";
import { initialGameState, initialPlayerData } from "./constants.js";
//handling of player data saving and loading, may want to move to player dir but idk

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);

export function saveGame() {
    //localStorage.removeItem('gameData');
    localStorage.setItem('gameData', JSON.stringify(gameState));
    localStorage.setItem('playerData', JSON.stringify(playerData))
}

//loads data from localstorage, mainly gameStata and playerData
export function loadGame() {
    
    const savedGameData = localStorage.getItem('gameData');
    const savedPlayerData = localStorage.getItem('playerData');

    if (savedGameData) {
        const loadedGameData = JSON.parse(savedGameData);

        Object.assign(gameState, loadedGameData);

        //Json doesnt save dates like JS does, use this to convert it back:
        if (loadedGameData.lastTimePlayed) {
            gameState.lastTimePlayed = new Date(loadedState.lastTimePlayed);
        }

     

    }

    if (savedPlayerData) {
        
        const loadedPlayerData = JSON.parse(savedPlayerData);

        Object.assign(playerData, loadedPlayerData);
        
        playerData.magicPower = new Decimal(loadedPlayerData.magicPower);
        playerData.level = loadedPlayerData.level;
        
    }



    //TODO: add offline progress 
}

function resetGame() {
    //gameState
    Object.assign(gameState, initialGameState);

    //playerData
    Object.assign(playerData, initialPlayerData);
        
    playerData.magicPower = new Decimal(loadedPlayerData.magicPower);
    playerData.level = loadedPlayerData.level;
}

function calculateOffline() {

}