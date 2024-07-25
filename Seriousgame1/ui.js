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
}

// Fonction pour mettre à jour la barre d'énergie
export function updateEnergyBar() {
    const energy = getCurrentEnergy();
    const energyBar = document.getElementById('energy-bar');
    energyBar.style.height = `${energy}%`;
    energyBar.textContent = energy;
}

// Fonction pour mettre à jour la liste des missions disponibles
export function updateAvailableMissions() {
    const missions = getAvailableMissions();
    const missionsContainer = document.getElementById('available-missions');
    missionsContainer.innerHTML = ''; // Clear previous missions

    missions.forEach(mission => {
        const missionElement = document.createElement('div');
        missionElement.className = 'mission';
        missionElement.textContent = `Mission ${mission.id}: R:${mission.requirements.red}, J:${mission.requirements.yellow}, V:${mission.requirements.green}, B:${mission.requirements.blue}`;
        missionsContainer.appendChild(missionElement);

        // Add event listener for drag and drop
        missionElement.draggable = true;
        missionElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', mission.id);
        });
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
    calendarCell.classList.add('completed');
}

// Fonction pour initialiser l'interface utilisateur
export function initializeUI() {
    updateProfileCircle();
    updateEnergyBar();
    updateAvailableMissions();
}

// Ajouter des écouteurs d'événements pour les interactions utilisateur
document.getElementById('next-day').addEventListener('click', () => {
    // Logique pour passer au jour suivant
    // Appeler les fonctions nécessaires pour récupérer l'énergie, mettre à jour le calendrier, etc.
    const currentDay = parseInt(document.getElementById('current-day').textContent, 10);
    const newDay = currentDay + 1;
    updateCalendar(newDay);
    document.getElementById('current-day').textContent = newDay;
    // Autres mises à jour nécessaires...
});

// Initialiser l'interface utilisateur au chargement de la page
document.addEventListener('DOMContentLoaded', initializeUI);