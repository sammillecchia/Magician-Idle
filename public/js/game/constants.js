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

    awakeningLength: 1000, //ms placeholder
    awakeningUnlocked: false,
    awakeningRunning: false,
    awakeningStart: null  
}

export const initialPlayerData = {
    magicPower: new Decimal(), 
    trainingLength: 1000,
    gain: new Decimal(),

    increaseLevel: 0,
    increaseCost: new Decimal(),
    increaseLength: 1000,

    intensifyLevel: 0,
    intensifyCost: new Decimal(),
    intensifyLength: 1000,

    duplicateLevel: 0,
    duplicateCost: new Decimal(),
    duplicateLength: 1000,

    multiplyLevel: 0,
    multiplyCost: new Decimal(),
    multiplyLength: 1000,

    awakeningLevel: 0,
    awakeningCost: new Decimal(),
    awakeningLength: 1000
}


export const cultivationConstants = {
    awakeningCosts: [100, 200, 300, 400, 500, Infinity],
    
    elements: {
        1: "Fire",
        2: "Ice",
        3: "Earth",
        4: "Water",
        5: "Wind",
        6: "Lightning"
    }

    
}