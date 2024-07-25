// energy.js

import { getEnergy, setEnergy } from './profile.js';

export function updateEnergy(amount) {
    let currentEnergy = getEnergy();
    currentEnergy += amount;
    setEnergy(currentEnergy);
    return currentEnergy;
}

export function recoverEnergy() {
    let currentEnergy = getEnergy();
    const recovery = Math.floor((100 - currentEnergy) / 2);
    currentEnergy += recovery;
    setEnergy(currentEnergy);
}

export function capEnergyForNewDay() {
    let currentEnergy = getEnergy();
    if (currentEnergy > 100) {
        setEnergy(100);
    }
}

export function calculateAdaptationCost(currentValue, targetValue) {
    const difference = Math.abs(targetValue - currentValue);
    const increaseCost = Math.max(targetValue - currentValue, 0) * 2;
    const decreaseCost = Math.max(currentValue - targetValue, 0);
    return increaseCost + decreaseCost;
}