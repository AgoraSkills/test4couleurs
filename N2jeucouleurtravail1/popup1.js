import missions from './missions.js';

function showPopup() {
    const popupContainer = document.getElementById('popup-container');

    if (popupContainer) {
        popupContainer.innerHTML = `
            <div class="popup">
                <div class="popup-content">
                    <h2>Bienvenue dans le Jeu "La Couleur des Actions"!</h2>
                    <p>Suivez les instructions et associez les cartes aux zones de couleur correspondantes pour gagner des points. Analysez bien les missions, puis glissez-les dans les zones adéquates.</p>
                    <button id="start-button">Commencer</button>
                </div>
            </div>
        `;

        const startButton = document.getElementById('start-button');
        if (startButton) {
            startButton.addEventListener('click', startGame);
        }
    }
}

function startGame() {
    const popupContainer = document.getElementById('popup-container');
    popupContainer.innerHTML = ''; // Cache le popup
    updateCard(); // Affiche la première mission
    startTimer(); // Lance le timer
}

function updateCard() {
    const cardStack = document.getElementById('card-stack');
    if (cardStack) {
        const mission = missions[Math.floor(Math.random() * missions.length)];
        cardStack.innerHTML = `
            <div class="card" draggable="true" id="current-card">
                <h3>${mission.nom}</h3>
                <p>${mission.description}</p>
            </div>
        `;

        const currentCard = document.getElementById('current-card');
        if (currentCard) {
            currentCard.addEventListener('dragstart', dragStart);
        }
    }
}

function dragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
}

function setupDropZones() {
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', dragOver);
        zone.addEventListener('drop', dropCard);
    });
}

function dragOver(event) {
    event.preventDefault();
}

function dropCard(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text');
    const cardElement = document.getElementById(cardId);

    if (cardElement) {
        const dropZone = event.target;
        dropZone.appendChild(cardElement);
        updateCard(); // Affiche la prochaine mission
    }
}

function startTimer() {
    let timeRemaining = 90; // 90 secondes pour le jeu
    const timerElement = document.getElementById('timer');

    const timerInterval = setInterval(() => {
        timeRemaining--;
        if (timerElement) {
            timerElement.textContent = `Temps: ${timeRemaining}`;
        }

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000); // Décrémente toutes les secondes
}

function endGame() {
    alert("Le temps est écoulé ! Jeu terminé.");
    // Autre logique pour afficher le score ou recommencer
}

document.addEventListener('DOMContentLoaded', () => {
    showPopup(); // Appel après le chargement complet du DOM
    setupDropZones(); // Associe les zones de dépôt aux événements
});
