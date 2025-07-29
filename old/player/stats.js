let elements = ["Fire", "Lightning"] //should be in a constants file maybe


export let magicalPower = new Decimal(999);

export function addMagicalPower(value) {
    magicalPower = Decimal.add(magicalPower, value)
}

export function setMagicalPower(value) {
    magicalPower = new Decimal(value)
}

const mpDisplay = document.getElementById('mpDisplay');
const spDisplay = document.getElementById('spDisplay');
const rankDisplay = document.getElementById('rankDisplay');

export function updateStatDisplays() {
    mpDisplay.textContent = magicalPower
}

