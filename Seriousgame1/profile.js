// profile.js

// Objet représentant le profil du joueur
let playerProfile = {
    red: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    energy: 100,
    recognition: 0,
    adaptationPrecision: 'intermediate'
};

// Fonction pour créer un nouveau profil
export function createProfile(red, yellow, green, blue, adaptationPrecision = 'intermediate') {
    playerProfile.red = red;
    playerProfile.yellow = yellow;
    playerProfile.green = green;
    playerProfile.blue = blue;
    playerProfile.adaptationPrecision = adaptationPrecision;
    playerProfile.energy = 100;
    playerProfile.recognition = 0;
    return playerProfile;
}

// Fonction pour obtenir le profil actuel
export function getProfile() {
    return { ...playerProfile };
}

// Fonction pour mettre à jour une couleur du profil
export function updateColor(color, value) {
    if (color in playerProfile && value >= 0 && value <= 100) {
        playerProfile[color] = value;
        return true;
    }
    return false;
}

// Fonction pour calculer le coût d'adaptation
export function calculateAdaptationCost(currentValue, targetValue) {
    const difference = Math.abs(targetValue - currentValue);
    const increaseCost = Math.max(targetValue - currentValue, 0) * 2;
    const decreaseCost = Math.max(currentValue - targetValue, 0);
    return increaseCost + decreaseCost;
}

// Fonction pour adapter le profil
export function adaptProfile(newRed, newYellow, newGreen, newBlue) {
    let totalCost = 0;
    totalCost += calculateAdaptationCost(playerProfile.red, newRed);
    totalCost += calculateAdaptationCost(playerProfile.yellow, newYellow);
    totalCost += calculateAdaptationCost(playerProfile.green, newGreen);
    totalCost += calculateAdaptationCost(playerProfile.blue, newBlue);

    if (playerProfile.energy >= totalCost) {
        playerProfile.red = newRed;
        playerProfile.yellow = newYellow;
        playerProfile.green = newGreen;
        playerProfile.blue = newBlue;
        playerProfile.energy -= totalCost;
        return true;
    }
    return false;
}

// Fonction pour ajouter des points de reconnaissance
export function addRecognition(points) {
    playerProfile.recognition += points;
}

// Fonction pour mettre à jour l'énergie
export function updateEnergy(amount) {
    playerProfile.energy += amount;
    if (playerProfile.energy > 100) {
        playerProfile.energy = 100;
    }
    return playerProfile.energy;
}

// Fonction pour vérifier si le joueur est en burn-out
export function isBurnout() {
    return playerProfile.energy <= 0;
}

// Fonction pour récupérer l'énergie à la fin de la journée
export function recoverEnergy() {
    const recovery = Math.floor((100 - playerProfile.energy) / 2);
    playerProfile.energy += recovery;
    if (playerProfile.energy > 100) {
        playerProfile.energy = 100;
    }
    return playerProfile.energy;
}