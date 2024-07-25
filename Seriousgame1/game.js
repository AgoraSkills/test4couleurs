// game.js

import { getProfile, addRecognition } from './profile.js';
import { updateEnergy, recoverEnergy, capEnergyForNewDay } from './energy.js';
import { generateMissions, evaluateMission, getMissionRewards } from './missions.js';
import { adaptProfile } from './adaptation.js';
import { updateProfileCircle, updateEnergyBar, updateAvailableMissions, displayMissionResult, updateRecognitionPoints, updateCalendar, initializeUI } from './ui.js';

let currentDay = 1;
const totalDays = 8;

export function initializeGame() {
    initializeUI();
    startNewDay();
}

function startNewDay() {
    if (currentDay > totalDays) {
        endGame();
        return;
    }
    
    capEnergyForNewDay();
    generateMissions(5);
    updateAvailableMissions();
    updateCalendar(currentDay);
    updateEnergyBar();
}

export function attemptMission(mission, adaptedProfile) {
    const success = adaptProfile(adaptedProfile.red, adaptedProfile.yellow, adaptedProfile.green, adaptedProfile.blue);
    
    if (!success) {
        displayMissionResult("Échec : Énergie insuffisante pour l'adaptation");
        return;
    }
    
    const result = evaluateMission(mission, getProfile());
    const rewards = getMissionRewards(mission, result);
    
    updateEnergy(rewards.energy);
    addRecognition(rewards.recognition);
    displayMissionResult(result);
    updateProfileCircle();
    updateEnergyBar();
    updateRecognitionPoints();
}

export function nextDay() {
    recoverEnergy();
    currentDay++;
    startNewDay();
}

function endGame() {
    const finalScore = getProfile().recognition;
    displayMissionResult(`Jeu terminé ! Points de reconnaissance totaux : ${finalScore}`);
}

document.addEventListener('DOMContentLoaded', initializeGame);

document.getElementById('next-day').addEventListener('click', nextDay);

document.getElementById('challenge-zone').addEventListener('drop', (event) => {
    event.preventDefault();
    const missionData = event.dataTransfer.getData('text/plain');
    const mission = JSON.parse(missionData);
    const adaptedProfile = {
        red: parseInt(document.getElementById('red-slider').value),
        yellow: parseInt(document.getElementById('yellow-slider').value),
        green: parseInt(document.getElementById('green-slider').value),
        blue: parseInt(document.getElementById('blue-slider').value)
    };
    attemptMission(mission, adaptedProfile);
});