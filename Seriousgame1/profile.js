// profile.js

let playerProfile = {
    red: 40,
    yellow: 20,
    green: 15,
    blue: 25,
    energy: 100,
    recognition: 0,
    adaptationPrecision: 'intermediate'
};

export function getProfile() {
    return { ...playerProfile };
}

export function updateProfile(red, yellow, green, blue) {
    playerProfile.red = red;
    playerProfile.yellow = yellow;
    playerProfile.green = green;
    playerProfile.blue = blue;
}

export function addRecognition(points) {
    playerProfile.recognition += points;
}

export function getRecognition() {
    return playerProfile.recognition;
}

export function setEnergy(energy) {
    playerProfile.energy = energy;
}

export function getEnergy() {
    return playerProfile.energy;
}