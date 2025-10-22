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
    lockedElements: [],
    unlockedElements: [],

    
    elements: {
        element1: {
            magicDust: new Decimal(),
            magicDustGain: new Decimal(),
            gatherValue: 0,
            gatherLength: 5000,
            stars: 7,
            starCost: new Decimal(),
            paths: 0,
            pathCost: 7, //This probably should be in constants
            maps: 0,
            constellations: 0,
            visions: 0, //may change to palace idk though
            manifestations: 0
        },

        element2: {
            magicDust: new Decimal(),
            magicDustGain: new Decimal(),
            gatherValue: 0,
            gatherLength: 1000,
            stars: 7,
            starCost: new Decimal(),
            paths: 0,
            pathCost: 7, //This probably should be in constants
            maps: 0,
            constellations: 0,
            visions: 0, //may change to palace idk though
            manifestations: 0
        },

        element3: {
            magicDust: new Decimal(),
            magicDustGain: new Decimal(),
            gatherLength: 1000,
            stars: 7,
            starCost: new Decimal(),
            paths: 0,
            pathCost: 7, //This probably should be in constants
            maps: 0,
            constellations: 0,
            visions: 0, //may change to palace idk though
            manifestations: 0
        },

        element4: {
            magicDust: new Decimal(),
            magicDustGain: new Decimal(),
            gatherValue: 0,
            gatherLength: 1000,
            stars: 7,
            starCost: new Decimal(),
            paths: 0,
            pathCost: 7, //This probably should be in constants
            maps: 0,
            constellations: 0,
            visions: 0, //may change to palace idk though
            manifestations: 0
        },

        element5: {
            magicDust: new Decimal(),
            magicDustGain: new Decimal(),
            gatherValue: 0, //0 to 100
            gatherLength: 1000,
            stars: 7,
            starCost: new Decimal(),
            paths: 0,
            pathCost: 7, //This probably should be in constants
            maps: 0,
            constellations: 0,
            visions: 0, //may change to palace idk though
            manifestations: 0
        }
    }
}



export function increaseDust(element) {
    calculateMagicDustGain(element);
    playerData.elements[`${element}`].magicDust = playerData.elements[`${element}`].magicDust.plus(playerData.elements[`${element}`].magicDustGain);
    console.log(`New dust for ${element}: ${playerData.elements[`${element}`].magicDust}`)
}

export function calculateMagicDustGain(element) {
    playerData.elements[`${element}`].magicDustGain = new Decimal(
        playerData.elements[`${element}`].stars * 100
    );
}


//returns entire playerData object
export function getPlayerData() {
    return { ...playerData};
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




//There is probably a better way to do this
//this function returns a value according to the highest unlocked tier + the amount owned of that tier
export function calculateMagicRank(element) {
    if (element.manifestations > 0) {
        return ("6" + element.manifestations)
    } 
    else if (element.visions > 0) {
        return ("5" + element.visions)
    } 
    else if (element.constellations > 0) {
        return ("4" + element.constellations)
    } 
    else if (element.maps > 0) { 
        return ("3" + element.maps)    
    } 
    else if (element.paths > 0) {
        return ("2" + element.paths)
    } 
    else if (element.stars > 0) {
        return ("1" + element.stars)
    } 
    else {
        return ("no rank");
    }
}
