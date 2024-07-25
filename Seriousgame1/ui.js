// ui.js

import { getProfile } from './profile.js';
import { getCurrentEnergy } from './energy.js';
import { getAvailableMissions } from './missions.js';

// Fonction pour mettre à jour le cercle coloré représentant le profil
export function updateProfileCircle() {
    const profile = getProfile();
    document.getElementById('red-value').textContent = profile.red;
    document.getElementById('yellow-value').textContent = profile.yellow;
    document.getElementById('green-value').textContent = profile.green;
    document.getElementById('blue-value').textContent = profile.blue;

    // Mise à jour du gradient du cercle
    const circle = document.getElementById('profile-circle');
    circle.style.background = `conic-gradient(
        red 0deg ${profile.red * 3.6}deg,
        yellow ${profile.red * 3.6}deg ${(profile.red + profile.yellow) * 3.6}deg,
        green ${(profile.red + profile.yellow) * 3.6}deg ${(profile.red + profile.yellow + profile.green) * 3.6}deg,
        blue ${(profile.red + profile.yellow + profile.green) * 3.6}deg 360deg
    )`;
}

// Fonction pour mettre à jour la barre d'énergie
export function updateEnergyBar() {
    const energy = getCurrentEnergy();
    const energyBar = document.getElementById('energy-bar');
    const energyValue = document.getElementById('energy-value');
    energyBar.style.height = `${Math.min(energy, 100)}%`;
    energyValue.textContent = energy;
}

// Fonction pour mettre à jour la liste des missions disponibles
export function updateAvailableMissions() {
    const missions = getAvailableMissions();
    const missionsContainer = document.getElementById('available-missions');
    missionsContainer.innerHTML = ''; // Clear previous missions

    missions.forEach(mission => {
        const missionElement = document.createElement('div');
        missionElement.className = 'mission';
        missionElement.textContent = `Mission ${mission.type}: R:${mission.requirements.red}, J:${mission.requirements.yellow}, V:${mission.requirements.green}, B:${mission.requirements.blue}`;
        missionElement.draggable = true;
        missionElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', JSON.stringify(mission));
        });
        missionsContainer.appendChild(missionElement);
    });
}

// Fonction pour afficher les résultats de la mission
export function displayMissionResult(result) {
    const resultsZone = document.getElementById('mission-result');
    resultsZone.textContent = `Résultat de la mission: ${result}`;
}

// Fonction pour mettre à jour les points de reconnaissance professionnelle
export function updateRecognitionPoints(points) {
    const recognitionElement = document.getElementById('points');
    recognitionElement.textContent = points;
}

// Fonction pour mettre à jour le calendrier
export function updateCalendar(day) {
    const calendarCell = document.getElementById(`day-${day}`);
    if (calendarCell) {
        calendarCell.classList.add('completed');
    }
}

// Fonction pour initialiser l'interface utilisateur
export function initializeUI() {
    updateProfileCircle();
    updateEnergyBar();
    updateAvailableMissions();
    updateRecognitionPoints(0);

    // Initialiser les sliders d'adaptation
    const profile = getProfile();
    ['red', 'yellow', 'green', 'blue'].forEach(color => {
        const slider = document.getElementById(`${color}-slider`);
        const effort = document.getElementById(`${color}-effort`);
        slider.value = profile[color];
        slider.addEventListener('input', () => {
            const diff = slider.value - profile[color];
            effort.textContent = Math.abs(diff) * (diff > 0 ? 2 : 1);
        });
    });

    // Configurer la zone de défi pour le drop
    const challengeZone = document.getElementById('challenge-zone');
    challengeZone.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    challengeZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const missionData = event.dataTransfer.getData('text/plain');
        const mission = JSON.parse(missionData);
        document.getElementById('current-challenge').textContent = `Mission en cours: ${mission.type}`;
    });
}

// Initialiser l'interface utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', initializeUI);