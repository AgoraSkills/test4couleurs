// game.js

import { createProfile, getProfile, addRecognition } from './profile.js';
import { getCurrentEnergy, updateEnergy, recoverEnergy, capEnergyForNewDay } from './energy.js';
import { generateMissions, evaluateMission, getMissionRewards } from './missions.js';
import { adaptProfile } from './adaptation.js';
import { updateProfileCircle, updateEnergyBar, updateAvailableMissions, displayMissionResult, updateRecognitionPoints, updateCalendar, initializeUI } from './ui.js';

let currentDay = 1;
const totalDays = 8;
let recognitionPoints = 0;

// Initialisation du jeu
export function initializeGame() {
    createProfile(40, 20, 15, 25); // Valeurs initiales du profil
    initializeUI();
    startNewDay();
}

// Démarrer une nouvelle journée
function startNewDay() {
    if (currentDay > totalDays) {
        endGame();
        return;
    }
    
    capEnergyForNewDay();
    generateMissions(5); // Générer 5 missions pour la journée
    updateAvailableMissions();
    updateCalendar(currentDay);
    updateEnergyBar();
}

// Tenter une mission
export function attemptMission(mission, adaptedProfile) {
    const success = adaptProfile(adaptedProfile.red, adaptedProfile.yellow, adaptedProfile.green, adaptedProfile.blue);
    
    if (!success) {
        displayMissionResult("Échec : Énergie insuffisante pour l'adaptation");
        return;
    }
    
    const result = evaluateMission(mission, getProfile());
    const rewards = getMissionRewards(mission, result);
    
    applyRewards(rewards);
    displayMissionResult(result);
    updateProfileCircle();
    updateEnergyBar();
}

// Appliquer les récompenses
function applyRewards(rewards) {
    recognitionPoints += rewards.recognition;
    updateEnergy(rewards.energy);
    updateRecognitionPoints(recognitionPoints);
}

// Passer au jour suivant
export function nextDay() {
    recoverEnergy();
    currentDay++;
    startNewDay();
}

// Fin du jeu
function endGame() {
    displayMissionResult(`Jeu terminé ! Points de reconnaissance totaux : ${recognitionPoints}`);
    // Afficher un récapitulatif ou proposer de recommencer
}

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', initializeGame);

// Ajouter un écouteur d'événement pour le bouton "Jour Suivant"
document.getElementById('next-day').addEventListener('click', nextDay);

// Ajouter un écouteur d'événement pour la zone de défi
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