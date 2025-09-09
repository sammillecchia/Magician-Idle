//concurrent stat handling
//THESE SHOULD BE BREAKINFINFINITY (decimal)

//Object for handling players data or stats
export const playerData = {
    //Training
    magicPower: new Decimal(),
    trainingLength: 1000,
    gain: new Decimal(),  //Should be decimal

    increaseLevel: 0,
    increaseCost: new Decimal(1),
    increaseLength: 1000,

    intensifyLevel: 0,
    intensifyCost: new Decimal(1),
    intensifyLength: 1000,

    duplicateLevel: 0,
    duplicateCost: new Decimal(1),
    duplicateLength: 1000,

    multiplyLevel: 0,
    multiplyCost: new Decimal(1),
    multiplyLength: 1000,

    //Cultivation
    unlockedElements: []
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
export function increaseMagicPower(times = 1) {
    calculateGain();


    playerData.magicPower = playerData.magicPower.plus(playerData.gain.times(times));
    

    
    // //console.log(playerData.magicPower.toString());
}


//IMPORTANT, CALCULATES HOW MP YOU GET PER TRAINING
export function calculateGain() {
    playerData.gain = new Decimal(1 + 
        playerData.increaseLevel + 
        playerData.intensifyLevel ** 2 + 
        playerData.duplicateLevel * 3 + 
        playerData.multiplyLevel * 5); 
        //placeholders for duplicate and multiply
}

//1, 4, 9, 16, 25
//1, 3, 5, 7, 9


export function decreaseMagicPower(value) {
    playerData.magicPower = playerData.magicPower.minus(value);
    //console.log(playerData.magicPower.toString());
}

export function incrementIncreaseLevel() {
    playerData.increaseLevel++;
    console.log(`increaseLevel: ${playerData.increaseLevel}`);
    calculateGain();
}

export function incrementIncreaseCost() {
    playerData.increaseCost = playerData.increaseCost.plus(1); //should be more complex
    console.log(`increaseCost: ${playerData.increaseCost}`);
}

export function incrementIntensifyLevel() {
    playerData.intensifyLevel++;
    console.log(`intensifyLevel: ${playerData.intensifyLevel}`);
    calculateGain();
}

export function incrementIntensifyCost() {
    playerData.intensifyCost = playerData.intensifyCost.plus(1); //should be more complex
    console.log(`increaseCost: ${playerData.intensifyCost}`);
}

export function incrementDuplicateLevel() {
    playerData.duplicateLevel++;
    console.log(`duplicateLevel: ${playerData.duplicateLevel}`);
    calculateGain();
}

export function incrementDuplicateCost() {
    playerData.duplicateCost = playerData.duplicateCost.plus(1); //should be more complex
    console.log(`increaseCost: ${playerData.duplicateCost}`);
}

export function incrementMultiplyLevel() {
    playerData.multiplyLevel++;
    console.log(`multiplyLevel: ${playerData.multiplyLevel}`);
    calculateGain();
}

export function incrementMultiplyCost() {
    playerData.multiplyCost = playerData.multiplyCost.plus(1); //should be more complex
    console.log(`increaseCost: ${playerData.multiplyCost}`);
}


//TBA
// export let starDust = 0
// export let stars = 0
// export let starPaths = 0
// export let starMaps = 0
// export let starConstellations = 0
// export let starPalaces = 0
