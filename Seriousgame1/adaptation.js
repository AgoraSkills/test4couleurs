// adaptation.js

import { getProfile, updateProfile } from './profile.js';
import { calculateAdaptationCost, updateEnergy } from './energy.js';

export function adaptProfile(newRed, newYellow, newGreen, newBlue) {
    const currentProfile = getProfile();
    let totalCost = 0;

    totalCost += calculateAdaptationCost(currentProfile.red, newRed);
    totalCost += calculateAdaptationCost(currentProfile.yellow, newYellow);
    totalCost += calculateAdaptationCost(currentProfile.green, newGreen);
    totalCost += calculateAdaptationCost(currentProfile.blue, newBlue);

    if (updateEnergy(-totalCost) >= 0) {
        updateProfile(newRed, newYellow, newGreen, newBlue);
        return true;
    }
    return false;
}
