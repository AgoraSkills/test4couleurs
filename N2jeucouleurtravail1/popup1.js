import { missions } from './missions.js';

let currentMissionIndex = 0;
let timerInterval;
let timeRemaining = 90;

// Affichage du popup d'introduction
function showPopup() {
    const popupContainer = document.getElementById('popup-container');
    popupContainer.innerHTML = `
        <div class="popup">
            <div class="popup-content">
                <h2>Bienvenue dans "La Couleur des Actions"</h2>
                <p>Vous allez devoir classer les missions selon qu'elles représentent une action ou une analyse. Vous avez 90 secondes. Bonne chance !</p>
                <button id="start-btn">Commencer</button>
            </div>
        </div>
    `;

    document.getElementById('start-btn').addEventListener('click', startGame);
}

// Fonction pour démarrer le jeu
function startGame() {
    // Cache le popup
    document.getElementById('popup-container').innerHTML = '';
    
    // Démarre le jeu en mettant à jour la première carte
    updateCard();
    
    // Lance le timer
    startTimer();
}

// Fonction pour mettre à jour la mission affichée
function updateCard() {
    const cardStack = document.getElementById('card-stack');
    const mission = missions[currentMissionIndex];
    
    cardStack.innerHTML = `
        <div class="card" draggable="true" id="card-${mission.numero}">
            <p>${mission.nom}</p>
            <p>${mission.description}</p>
        </div>
    `;

    const card = document.getElementById(`card-${mission.numero}`);
    card.addEventListener('dragstart', dragStart);
}

// Fonction pour démarrer le timer
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = `Temps: ${timeRemaining}`;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Fonction appelée à la fin du jeu
function endGame() {
    alert("Le temps est écoulé ! Le jeu est terminé.");
    // On pourra ajouter une logique complexe ici pour gérer la fin de partie
}

// Fonction pour le drag & drop
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

// Configuration des zones de dépôt
function setupDropZones() {
    const analyseZone = document.getElementById('analyse-zone');
    const actionZone = document.getElementById('action-zone');

    analyseZone.addEventListener('dragover', allowDrop);
    actionZone.addEventListener('dragover', allowDrop);

    analyseZone.addEventListener('drop', handleDrop);
    actionZone.addEventListener('drop', handleDrop);
}

// Fonction pour autoriser le drop
function allowDrop(e) {
    e.preventDefault();
}

// Fonction pour gérer le drop
function handleDrop(e) {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text');
    const cardElement = document.getElementById(cardId);
    
    // Détermination de la zone correcte
    const correctZone = determineCorrectZone(cardElement.textContent);
    
    // On pourrait garder une trace ici de la réussite ou non, mais pas d'affichage immédiat
    e.target.appendChild(cardElement);

    // On passe immédiatement à la mission suivante sans afficher de popup
    currentMissionIndex++;
    if (currentMissionIndex < missions.length) {
        updateCard();
    } else {
        endGame();
    }
}

// Fonction pour déterminer la zone correcte
function determineCorrectZone(description) {
    const keywordsAction = ['faire', 'exécuter', 'action'];
    for (let keyword of keywordsAction) {
        if (description.includes(keyword)) {
            return 'action-zone';
        }
    }
    return 'analyse-zone';
}

// Initialisation des zones de dépôt dès le chargement de la page
setupDropZones();
showPopup();
