import missions from './missions.js';

function showPopup() {
    const popupContainer = document.getElementById('popup-container');

    if (popupContainer) {
        popupContainer.innerHTML = `
            <div class="popup">
                <div class="popup-content">
                    <h2>Bienvenue !</h2>
                    <p>Suivez les instructions pour accomplir chaque mission.</p>
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
            <div class="card">
                <h3>${mission.nom}</h3>
                <p>${mission.description}</p>
            </div>
        `;
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
});
