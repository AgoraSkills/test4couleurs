import missions from './missions.js';

console.log("Script popup1.js chargé"); // Debugging

let currentMissionIndex = 0;
let score = 0;
let timeLeft = 90;
let timerInterval;
let placedMissions = [];

function showPopup() {
    console.log("Affichage du popup"); // Debugging

    const popupContainer = document.getElementById('popup-container');
    popupContainer.innerHTML = `
        <div class="popup">
            <div class="popup-content">
                <h2>Phase 1 : Classement Analyse vs Action</h2>
                <p><strong>Objectif :</strong> Classer les missions selon qu'elles nécessitent principalement de l'analyse ou de l'action.</p>
                <ul>
                    <li><strong>Chronomètre :</strong> Vous avez 90 secondes pour classer toutes les missions.</li>
                    <li><strong>Drag and Drop :</strong> Classez les missions à gauche (analyse) ou à droite (action) de la boussole des couleurs.</li>
                    <li><strong>Score :</strong> Chaque choix correct augmente votre score de 1 point.</li>
                    <li><strong>Feedback :</strong> Les cartes mal placées reviennent sur la pile à la fin du chronomètre.</li>
                </ul>
                <button id="start-button">GO</button>
            </div>
        </div>
    `;

    document.getElementById('start-button').addEventListener('click', startGame);
}

function startGame() {
    console.log("Jeu démarré"); // Debugging

    document.getElementById('popup-container').style.display = 'none';
    currentMissionIndex = 0; // Réinitialiser l'index de mission pour recommencer
    score = 0;
    timeLeft = 90;
    placedMissions = []; // Réinitialiser les missions placées
    updateCard();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateCard() {
    console.log("Mise à jour de la carte", currentMissionIndex); // Debugging

    const cardStack = document.getElementById('card-stack');
    if (currentMissionIndex < missions.length) {
        const mission = missions[currentMissionIndex];
        cardStack.innerHTML = `
            <h3>Mission ${mission.numero}</h3>
            <p>${mission.nom}</p>
        `;
        cardStack.draggable = true;
    } else {
        cardStack.innerHTML = '<p>Toutes les missions sont terminées!</p>';
        cardStack.draggable = false;
        clearInterval(timerInterval); // Arrêter le chronomètre lorsque toutes les missions sont terminées
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = `Temps: ${timeLeft}`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    calculateScore();
    alert(`Temps écoulé! Votre score final est: ${score}`);
}

function calculateScore() {
    console.log("Calcul du score"); // Debugging

    score = 0;
    placedMissions.forEach(placement => {
        const mission = missions[placement.index];
        const correctSide = (mission.codeCouleur.includes('BB') || mission.codeCouleur.includes('VV')) ? 'analyse' : 'action';
        if (placement.side === correctSide) {
            score++;
        }
    });
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Ajouter la gestion du drag-and-drop
document.getElementById('card-stack').addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', currentMissionIndex);
});

['analyse-zone', 'action-zone'].forEach(zoneId => {
    const zone = document.getElementById(zoneId);
    zone.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    zone.addEventListener('drop', function(event) {
        event.preventDefault();
        const missionIndex = parseInt(event.dataTransfer.getData('text'));
        placedMissions.push({
            index: missionIndex,
            side: zoneId === 'analyse-zone' ? 'analyse' : 'action'
        });
        currentMissionIndex++;
        updateCard();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log("Document chargé"); // Debugging
    showPopup();
});
