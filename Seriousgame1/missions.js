// missions.js

const MISSION_TYPES = {
    daily: { energy: 40, recognition: 1 },
    important: { energy: 60, recognition: 2 },
    vital: { energy: 80, recognition: 3 }
};

let availableMissions = [];

export function generateMissions(count) {
    availableMissions = [];
    const types = Object.keys(MISSION_TYPES);
    for (let i = 0; i < count; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        availableMissions.push({
            id: `mission-${i + 1}`,
            type: type,
            requirements: {
                red: Math.floor(Math.random() * 101),
                yellow: Math.floor(Math.random() * 101),
                green: Math.floor(Math.random() * 101),
                blue: Math.floor(Math.random() * 101)
            }
        });
    }
}

export function getAvailableMissions() {
    return [...availableMissions];
}

export function evaluateMission(mission, profile) {
    let matchingValues = 0;
    for (const color of ['red', 'yellow', 'green', 'blue']) {
        if (Math.abs(profile[color] - mission.requirements[color]) <= 10) {
            matchingValues++;
        }
    }
    if (matchingValues === 4) return 'complete';
    if (matchingValues === 3) return 'partial';
    return 'failure';
}

export function getMissionRewards(mission, result) {
    const baseReward = MISSION_TYPES[mission.type];
    if (result === 'complete') {
        return { energy: baseReward.energy, recognition: baseReward.recognition };
    } else if (result === 'partial') {
        return { energy: baseReward.energy, recognition: 0 };
    }
    return { energy: 0, recognition: 0 };
}