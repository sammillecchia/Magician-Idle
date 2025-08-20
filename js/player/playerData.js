//concurrent stat handling
//THESE SHOULD BE BREAKINFINFINITY (decimal)

//Object for handling players data or stats
export const playerData = {
    magicPower: new Decimal(),
    gain: 1,
    
    increaseLevel: 0,
    increaseCost: 1,
    increaseLength: 1000
}

//returns entire playerData object
export function getPlayerData() {
    return { ...playerData};
}

//sets player data object, used for loading data
export function setPlayerData(loadedData) {
    if (loadedData) {
        if (loadedData.magicPower) {
            playerData.magicPower = new Decimal(loadedData.magicPower);
        }
        if (loadedData.level) {
            playerData.level = loadedData.level;
        }
    }
}


//gets players magic power
export function getMagicPower() {
    return playerData.magicPower;
}

//Sets players magic power to value, converts to Decimal
export function setMagicPower(value) {
    playerData.magicPower = new Decimal(value);
}

//increases players magicpower, can also be used to decrease it
export function increaseMagicPower() {
    calculateGain();

    playerData.magicPower = playerData.magicPower.plus(playerData.gain);
    // //console.log(playerData.magicPower.toString());
}

function calculateGain() {
    playerData.gain = 1 + playerData.increaseLevel;
}

export function decreaseMagicPower(value) {
    playerData.magicPower = playerData.magicPower.minus(value);
    //console.log(playerData.magicPower.toString());
}

export function incrementIncreaseLevel() {
    playerData.increaseLevel++;
    console.log(`increaseLevel: ${playerData.increaseLevel}`);
}

export function incrementIncreaseCost() {
    playerData.increaseCost++; //should be more complex
    console.log(`increaseCost: ${playerData.increaseCost}`);
}



//TBA
// export let starDust = 0
// export let stars = 0
// export let starPaths = 0
// export let starMaps = 0
// export let starConstellations = 0
// export let starPalaces = 0
