// adaptation.js

import { getProfile, updateProfile, getAdaptationPrecision } from './profile.js';
import { calculateAdaptationCost, updateEnergy } from './energy.js';

export function adaptProfile(newRed, newYellow, newGreen, newBlue) {
    const currentProfile = getProfile();
    let totalCost = 0;

    totalCost += calculateAdaptationCost(currentProfile.red, newRed);
    totalCost += calculateAdaptationCost(currentProfile.yellow, newYellow);
    totalCost += calculateAdaptationCost(currentProfile.green, newGreen);
    totalCost += calculateAdaptationCost(currentProfile.blue, newBlue);

    const precision = getAdaptationPrecision();
    if (precision === 'imprecise') {
        totalCost = Math.floor(totalCost * 1.2); // 20% more energy cost for imprecise adaptation
    }

    if (updateEnergy(-totalCost) >= 0) {
        updateProfile(newRed, newYellow, newGreen, newBlue);
        return true;
    }
    return false;
}
