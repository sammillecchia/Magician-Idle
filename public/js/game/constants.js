//constant values for game
//should also include initial gameState and playerData values

export const initialGameState = {
    lastTimePlayed: null,
    
    trainingLength: 1000,   //Time = int (ms), should be in playerData?
    trainingRunning: false, //Running = Boolean
    trainingAuto: false, //Looping = Boolean
    trainingStart: null,     //Start = Date

    increaseUnlocked: false,
    increaseLength: 1000, //ms placeholder
    increaseRunning: false,
    increaseStart: null,

    intensifyLength: 1000, //ms placeholder
    intensifyUnlocked: false,
    intensifyRunning: false,
    intensifyStart: null,
    
    duplicateLength: 1000, //ms placeholder
    duplicateUnlocked: false,
    duplicateRunning: false,
    duplicateStart: null,

    multiplyLength: 1000, //ms placeholder
    multiplyUnlocked: false,
    multiplyRunning: false,
    multiplyStart: null,

    awakeningLength: 10000, //ms placeholder
    awakeningUnlocked: false,
    awakeningRunning: false,
    awakeningStart: null  
}

export const initialPlayerData = {
    magicPower: new Decimal(), 
    trainingLength: 1000,
    gain: 1,

    increaseLevel: 0,
    increaseCost: 1,
    increaseLength: 1000,

    intensifyLevel: 0,
    intensifyCost: 1,
    intensifyLength: 1000,

    duplicateLevel: 0,
    duplicateCost: 1,
    duplicateLength: 1000,

    multiplyLevel: 0,
    multiplyCost: 1,
    multiplyLength: 1000
}
