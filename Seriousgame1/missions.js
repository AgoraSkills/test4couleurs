// missions.js

// Types de missions et leurs récompenses
const MISSION_TYPES = {
    daily: { energy: 40, recognition: 1 },
    important: { energy: 60, recognition: 2 },
    vital: { energy: 80, recognition: 3 }
};

// Liste des missions disponibles
let availableMissions = [];

// Fonction pour générer une mission aléatoire
export function generateMission(type) {
    const mission = {
        id: generateId(),
        type: type,
        requirements: {
            red: getRandomInt(0, 100),
            yellow: getRandomInt(0, 100),
            green: getRandomInt(0, 100),
            blue: getRandomInt(0, 100)
        },
        rewards: MISSION_TYPES[type]
    };
    availableMissions.push(mission);
    return mission;
}

// Fonction pour générer plusieurs missions
export function generateMissions(count) {
    const types = Object.keys(MISSION_TYPES);
    for (let i = 0; i < count; i++) {
        const type = types[getRandomInt(0, types.length - 1)];
        generateMission(type);
    }
}

// Fonction pour obtenir les missions disponibles
export function getAvailableMissions() {
    return availableMissions;
}

// Fonction pour évaluer une mission
export function evaluateMission(mission, playerProfile) {
    const { red, yellow, green, blue } = playerProfile;
    const { requirements } = mission;

    const withinRange = (value, requirement) => value >= requirement - 10 && value <= requirement + 10;

    const success = withinRange(red, requirements.red)
        && withinRange(yellow, requirements.yellow)
        && withinRange(green, requirements.green)
        && withinRange(blue, requirements.blue);

    const partialSuccess = [red, yellow, green, blue].filter((value, index) => {
        const requirement = Object.values(requirements)[index];
        return withinRange(value, requirement);
    }).length >= 3;

    if (success) {
        return 'complete';
    } else if (partialSuccess) {
        return 'partial';
    } else {
        return 'failure';
    }
}

// Fonction pour obtenir les récompenses d'une mission
export function getMissionRewards(mission, successLevel) {
    if (successLevel === 'complete') {
        return mission.rewards;
    } else if (successLevel === 'partial') {
        return { energy: mission.rewards.energy, recognition: 0 };
    } else {
        return { energy: 0, recognition: 0 };
    }
}

// Fonction pour générer un ID unique pour chaque mission
function generateId() {
    return 'mission-' + Math.random().toString(36).substr(2, 9);
}

// Fonction pour générer un nombre entier aléatoire entre min et max (inclus)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fonction pour réinitialiser les missions disponibles (utile pour démarrer une nouvelle partie)
export function resetMissions() {
    availableMissions = [];
}