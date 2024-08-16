import missions from './missions.js';

function showPopup() {
    const popupContainer = document.getElementById('popup-container');

    if (popupContainer) {
        popupContainer.innerHTML = `
            <div class="popup">
                <div class="popup-content">
                    <h2>Bienvenue dans le Jeu "La Couleur des Actions"!</h2>
                    <p>
                        Le jeu consiste à associer des cartes de mission à des zones de couleur spécifiques. 
                        Chaque carte décrit une tâche à réaliser, et vous devez l'analyser pour déterminer si elle 
                        correspond à une action (dépôt dans la zone Action) ou à une analyse (dépôt dans la zone Analyse).<br><br>

                        <strong>Règles :</strong><br>
                        - Une carte apparaît à l'écran.<br>
                        - Lisez attentivement la description et déplacez la carte dans la bonne zone (Action ou Analyse).<br>
                        - Vous gagnez des points en fonction de votre précision et de votre rapidité.<br>
                        - Le jeu se termine lorsque le temps est écoulé.<br><br>

                        <strong>Objectif :</strong><br>
                        - Atteindre le meilleur score possible en déposant correctement les cartes.<br>
                        - Chaque dépôt correct augmente votre score tandis qu'un dépôt incorrect le réduit.<br>
                        <br>
                        Cliquez sur "Commencer" pour démarrer la partie et bonne chance !
                    </p>
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
        zone.addEventListener('drop', handleDrop);
    });
}

function dragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text');
    const cardElement = document.getElementById(cardId);

    if (cardElement) {
        const zoneId = event.target.id;
        const correctZone = determineCorrectZone(cardElement);

        if (zoneId === correctZone) {
            alert('Bien joué ! Vous avez déposé la carte dans la bonne zone.');
            updateCard(); // Charger une nouvelle carte
        } else {
            alert('Oups, ce n\'était pas la bonne zone.');
        }
    }
}

function determineCorrectZone(cardElement) {
    // Logique pour déterminer la zone correcte en fonction du texte ou de critères
    // Par exemple, vous pourriez analyser les mots-clés ou catégories.
    // Cette fonction est simplifiée pour cet exemple.
    const actionKeywords = ['faire', 'exécuter', 'action'];
    const description = cardElement.querySelector('p').textContent.toLowerCase();

    for (const keyword of actionKeywords) {
        if (description.includes(keyword)) {
            return 'action-zone';
        }
    }

    return 'analyse-zone';
}

function startTimer() {
    let timeLeft = 90;
    const timerElement = document.getElementById('timer');

    const countdown = setInterval(() => {
        timeLeft--;
        if (timerElement) {
            timerElement.textContent = `Temps: ${timeLeft}`;
        }

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
}

function endGame() {
    alert("Le temps est écoulé !");
    // Autre logique pour afficher le score ou recommencer
}

document.addEventListener('DOMContentLoaded', () => {
    showPopup(); // Appel après le chargement complet du DOM
    setupDropZones(); // Associe les zones de dépôt aux événements
});
