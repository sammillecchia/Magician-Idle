const trainingLevelInfo = document.getElementById("trainingLevel");
const intensifyLevelInfo = document.getElementById("intensifyLevel");
const multiplicationLevel = document.getElementById("multiplicationLevel");

trainingLevelInfo.addEventListener("mouseover", () => {
    createInfo(0, "Placeholder Info Text For Training", trainingLevelInfo)
});


trainingLevelInfo.addEventListener("mouseout", () => {
    deleteInfo(0)
});

intensifyLevelInfo.addEventListener("mouseover", () => {
    createInfo(1, "Placeholder Info Text For INTENSIFY", intensifyLevelInfo)
});


intensifyLevelInfo.addEventListener("mouseout", () => {
    deleteInfo(1)
});

multiplicationLevel.addEventListener("mouseover", () => {
    createInfo(2, "Placeholder Info Text For mult", multiplicationLevel)
});


multiplicationLevel.addEventListener("mouseout", () => {
    deleteInfo(2)
});



const infoMap = new Map();

//The creation of an element described below needs to be made next
//This will be used for when you hover/click on a skill to open an info screen

//Creates a div that displays provided info, this will be triggered from clicking on levelup buttons
let currentVH = 0;
let currentVW = 0;
function calcViewportUnits() {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    currentVH = viewportHeight / 100;
    currentVW = viewportWidth / 100;
}

function createInfo(id, text, infoElement) {
    //let divName = "info" + id //uuh idk if I need this anymore
    const newDiv = document.createElement('div')
    newDiv.className = "info";
    newDiv.textContent = text;
    calcViewportUnits();
    let topVal = infoElement.getBoundingClientRect().top; //can consolodate these two, also 
    let leftVal = infoElement.getBoundingClientRect().left;
    newDiv.style.top = topVal - (currentVH * 25) + "px"; //offset - 10vh (height of level display)
    newDiv.style.left = leftVal - (currentVW * 2.5) + "px";
    infoMap.set(id, newDiv)
    body.appendChild(infoMap.get(id))
    //console.log("add");
}

//Deletes an info div, the id is relating to which things info you are viewing
function deleteInfo(id) {
    body.removeChild(infoMap.get(id));
    infoMap.delete(id);
    //console.log("del");
}
