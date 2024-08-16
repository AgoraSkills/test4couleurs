import missions from './missions.js';

let currentMissionIndex = 0;
let score = 0;
let timeLeft = 90;
let timerInterval;
let placedMissions = [];

function showPopup() {
    const popupContainer = document.getElementById('popup-container');
    const popupContent = `
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
                <button onclick="startGame()">GO</button>
            </div>
        </div>
    `;
    popupContainer.innerHTML = popupContent;
}

function startGame() {
    document.getElementById('popup-container').innerHTML = '';
    updateCard();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateCard() {
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
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('timer').textContent = `Temps: ${timeLeft}`;
    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function endGame() {
    calculateScore();
    alert(`Temps écoulé! Votre score final est: ${score}`);
}

function calculateScore() {
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

// Afficher le popup au chargement de la page
showPopup();