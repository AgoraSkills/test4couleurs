// energy.js

// Constantes
const MAX_ENERGY = 100;
const ENERGY_RECOVERY_FACTOR = 2;

// Variable pour stocker l'énergie actuelle
let currentEnergy = MAX_ENERGY;

// Fonction pour obtenir l'énergie actuelle
export function getCurrentEnergy() {
    return currentEnergy;
}

// Fonction pour mettre à jour l'énergie
export function updateEnergy(amount) {
    currentEnergy += amount;
    // L'énergie peut dépasser 100 pendant la journée
    return currentEnergy;
}

// Fonction pour vérifier si le joueur est en burn-out
export function isBurnout() {
    return currentEnergy <= 0;
}

// Fonction pour récupérer l'énergie à la fin de la journée
export function recoverEnergy() {
    const recoveryAmount = Math.floor((MAX_ENERGY - currentEnergy) / ENERGY_RECOVERY_FACTOR);
    currentEnergy += recoveryAmount;
    return currentEnergy;
}

// Fonction pour plafonner l'énergie au début de chaque journée
export function capEnergyForNewDay() {
    if (currentEnergy > MAX_ENERGY) {
        currentEnergy = MAX_ENERGY;
    }
    return currentEnergy;
}

// Fonction pour calculer le coût énergétique d'une adaptation
export function calculateAdaptationCost(currentValue, targetValue) {
    const difference = Math.abs(targetValue - currentValue);
    const increaseCost = Math.max(targetValue - currentValue, 0) * 2;
    const decreaseCost = Math.max(currentValue - targetValue, 0);
    return increaseCost + decreaseCost;
}

// Fonction pour appliquer le coût d'adaptation
export function applyAdaptationCost(cost) {
    if (currentEnergy >= cost) {
        currentEnergy -= cost;
        return true;
    }
    return false;
}

// Fonction pour réinitialiser l'énergie (utile pour démarrer une nouvelle partie)
export function resetEnergy() {
    currentEnergy = MAX_ENERGY;
}

// Fonction pour attribuer les récompenses d'énergie des missions
export function awardMissionEnergy(missionType, successLevel) {
    let energyReward = 0;
    
    if (successLevel === 'complete' || successLevel === 'partial') {
        switch (missionType) {
            case 'daily':
                energyReward = 40;
                break;
            case 'important':
                energyReward = 60;
                break;
            case 'vital':
                energyReward = 80;
                break;
        }
    }

    updateEnergy(energyReward);
    return energyReward;
}