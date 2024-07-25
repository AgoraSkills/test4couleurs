// ui.js

import { getProfile, getRecognition, getEnergy } from './profile.js';
import { getAvailableMissions } from './missions.js';

export function updateProfileCircle() {
    const profile = getProfile();
    document.getElementById('red-value').textContent = profile.red;
    document.getElementById('yellow-value').textContent = profile.yellow;
    document.getElementById('green-value').textContent = profile.green;
    document.getElementById('blue-value').textContent = profile.blue;

    const circle = document.getElementById('profile-circle');
    circle.style.background = `conic-gradient(
        red 0deg ${profile.red * 3.6}deg,
        yellow ${profile.red * 3.6}deg ${(profile.red + profile.yellow) * 3.6}deg,
        green ${(profile.red + profile.yellow) * 3.6}deg ${(profile.red + profile.yellow + profile.green) * 3.6}deg,
        blue ${(profile.red + profile.yellow + profile.green) * 3.6}deg 360deg
    )`;
}

export function updateEnergyBar() {
    const energy = getEnergy();
    const energyBar = document.getElementById('energy-bar');
    const energyValue = document.getElementById('energy-value');
    energyBar.style.width = `${Math.min(energy, 100)}%`;
    energyValue.textContent = energy;
}

export function updateAvailableMissions() {
    const missions = getAvailableMissions();
    const missionsContainer = document.getElementById('available-missions');
    missionsContainer.innerHTML = '';

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

export function displayMissionResult(result) {
    const resultsZone = document.getElementById('mission-result');
    resultsZone.textContent = `Résultat de la mission: ${result}`;
}

export function updateRecognitionPoints() {
    const recognitionElement = document.getElementById('points');
    recognitionElement.textContent = getRecognition();
}

export function updateCalendar(day) {
    const calendarCell = document.getElementById(`day-${day}`);
    if (calendarCell) {
        calendarCell.classList.add('completed');
    }
    document.getElementById('current-day').textContent = `Jour : ${day}`;
}

export function initializeUI() {
    updateProfileCircle();
    updateEnergyBar();
    updateAvailableMissions();
    updateRecognitionPoints();
    updateCalendar(1);

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

    const challengeZone = document.getElementById('challenge-zone');
    challengeZone.addEventListener('dragover', (event) => event.preventDefault());
    challengeZone.addEventListener('drop', (event) => {
        event.preventDefault();
        const missionData = event.dataTransfer.getData('text/plain');
        const mission = JSON.parse(missionData);
        document.getElementById('current-challenge').textContent = `Mission en cours: ${mission.type}`;
    });
}

export function updatePeriodButtons(currentPeriod) {
    document.getElementById('morning-btn').disabled = currentPeriod !== 'morning';
    document.getElementById('afternoon-btn').disabled = currentPeriod !== 'afternoon';
    document.getElementById('next-day').disabled = currentPeriod !== 'evening';
}