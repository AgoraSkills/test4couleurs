// adaptation.js

import { getProfile, updateColor } from './profile.js';
import { calculateAdaptationCost, applyAdaptationCost } from './energy.js';

// Fonction pour ajuster le profil du joueur
export function adaptProfile(newRed, newYellow, newGreen, newBlue) {
    const profile = getProfile();
    let totalCost = 0;

    totalCost += calculateAdaptationCost(profile.red, newRed);
    totalCost += calculateAdaptationCost(profile.yellow, newYellow);
    totalCost += calculateAdaptationCost(profile.green, newGreen);
    totalCost += calculateAdaptationCost(profile.blue, newBlue);

    if (applyAdaptationCost(totalCost)) {
        updateColor('red', newRed);
        updateColor('yellow', newYellow);
        updateColor('green', newGreen);
        updateColor('blue', newBlue);
        return true;
    }
    return false;
}

// Fonction pour vérifier si l'adaptation est précise
export function isAdaptationPrecise(currentValue, targetValue, precisionLevel) {
    const tolerance = precisionLevel === 'precise' ? 1 : (precisionLevel === 'intermediate' ? 5 : 10);
    return Math.abs(currentValue - targetValue) <= tolerance;
}

// Fonction pour ajuster le profil avec précision
export function adaptProfilePrecisely(newRed, newYellow, newGreen, newBlue, precisionLevel) {
    const profile = getProfile();
    let totalCost = 0;

    if (!isAdaptationPrecise(profile.red, newRed, precisionLevel)) {
        totalCost += calculateAdaptationCost(profile.red, newRed);
    }
    if (!isAdaptationPrecise(profile.yellow, newYellow, precisionLevel)) {
        totalCost += calculateAdaptationCost(profile.yellow, newYellow);
    }
    if (!isAdaptationPrecise(profile.green, newGreen, precisionLevel)) {
        totalCost += calculateAdaptationCost(profile.green, newGreen);
    }
    if (!isAdaptationPrecise(profile.blue, newBlue, precisionLevel)) {
        totalCost += calculateAdaptationCost(profile.blue, newBlue);
    }

    if (applyAdaptationCost(totalCost)) {
        updateColor('red', newRed);
        updateColor('yellow', newYellow);
        updateColor('green', newGreen);
        updateColor('blue', newBlue);
        return true;
    }
    return false;
}