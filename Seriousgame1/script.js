document.addEventListener('DOMContentLoaded', function() {
    const profileForm = document.getElementById('profile-form');
    const userForm = document.getElementById('user-form');
    const gameContainer = document.getElementById('game-container');

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const red = document.getElementById('red').value;
        const yellow = document.getElementById('yellow').value;
        const green = document.getElementById('green').value;
        const blue = document.getElementById('blue').value;

        // Cacher le formulaire et afficher le jeu
        userForm.style.display = 'none';
        gameContainer.style.display = 'block';

        // Générer le contenu du jeu
        generateGameContent(firstname, lastname, red, yellow, green, blue);
    });

    function generateGameContent(firstname, lastname, red, yellow, green, blue) {
        gameContainer.innerHTML = `
            <div class="game-container">
                <div class="left-panel">
                    <h2>Progression du Jeu</h2>
                    <div class="calendar">
                        <div class="calendar-day completed">1</div>
                        <div class="calendar-day">2</div>
                        <div class="calendar-day">3</div>
                        <div class="calendar-day">4</div>
                        <div class="calendar-day">5</div>
                        <div class="calendar-day">6</div>
                        <div class="calendar-day">7</div>
                        <div class="calendar-day">8</div>
                        <div class="calendar-day">9</div>
                        <div class="calendar-day">10</div>
                    </div>
                    <h2>Missions Disponibles</h2>
                    <div class="missions">
                        <div class="mission mission-quotidienne">
                            Mission 1: Organiser une réunion
                            <div class="mission-description">
                                Planifiez et dirigez une réunion d'équipe importante. Vous devrez préparer l'ordre du jour, gérer le temps efficacement, faciliter les discussions et assurer que tous les participants sont engagés. Cette mission teste vos compétences en communication et en leadership.
                            </div>
                        </div>
                        <div class="mission mission-importante">
                            Mission 2: Gérer un projet
                            <div class="mission-description">
                                Prenez en charge un projet complexe du début à la fin. Vous devrez définir les objectifs, créer un plan détaillé, allouer les ressources, suivre les progrès et résoudre les problèmes qui surviennent. Cette mission évalue vos compétences en gestion de projet et en résolution de problèmes.
                            </div>
                        </div>
                        <div class="mission mission-vitale">
                            Mission 3: Résoudre un conflit
                            <div class="mission-description">
                                Intervenez pour résoudre un conflit entre deux membres de l'équipe. Vous devrez écouter les deux parties, identifier les causes sous-jacentes du conflit, et trouver une solution qui satisfait tout le monde. Cette mission teste vos compétences en médiation et en intelligence émotionnelle.
                            </div>
                        </div>
                        <div class="mission mission-quotidienne">
                            Mission 4: Présenter un rapport
                            <div class="mission-description">
                                Préparez et présentez un rapport détaillé sur les performances de l'entreprise à la direction. Vous devrez analyser des données complexes, créer des visualisations claires, et communiquer efficacement les résultats et recommandations. Cette mission évalue vos compétences en analyse et en présentation.
                            </div>
                        </div>
                        <div class="mission mission-importante">
                            Mission 5: Former une équipe
                            <div class="mission-description">
                                Concevez et menez une session de formation pour une nouvelle équipe. Vous devrez identifier les besoins de formation, créer du matériel pédagogique engageant, et animer la session de manière interactive. Cette mission teste vos compétences en formation et en développement d'équipe.
                            </div>
                        </div>
                    </div>
                    <h2>Adaptation du Profil</h2>
                    <div class="adaptation-slider">
                        <label>R:</label> 
                        <div class="natural-value-marker"></div>
                        <input type="range" min="0" max="100" value="${red}" data-natural="${red}"> 
                        <span>${red}</span>
                    </div>
                    <div class="adaptation-slider">
                        <label>J:</label> 
                        <div class="natural-value-marker"></div>
                        <input type="range" min="0" max="100" value="${yellow}" data-natural="${yellow}"> 
                        <span>${yellow}</span>
                    </div>
                    <div class="adaptation-slider">
                        <label>V:</label> 
                        <div class="natural-value-marker"></div>
                        <input type="range" min="0" max="100" value="${green}" data-natural="${green}"> 
                        <span>${green}</span>
                    </div>
                     <div class="adaptation-slider">
                        <label>B:</label> 
                        <div class="natural-value-marker"></div>
                        <input type="range" min="0" max="100" value="${blue}" data-natural="${blue}"> 
                        <span>${blue}</span>
                    </div>
                    <div class="effort-value">Effort d'adaptation total : 0</div>
                    <h2>Profil Naturel de ${firstname} ${lastname}</h2>
                    <div class="profile-circle">
                        <img src="cerveau multi.jpg" alt="Cerveau multi">
                        <div class="profile-value red">R: ${red}</div>
                        <div class="profile-value yellow">J: ${yellow}</div>
                        <div class="profile-value green">V: ${green}</div>
                        <div class="profile-value blue">B: ${blue}</div>
                    </div>
                </div>
                <div class="right-panel">
                    <h2>Niveau d'Énergie</h2>
                    <div class="energy-bar">
                        <div class="energy-level"></div>
                        <span class="energy-label">50/100</span>
                    </div>
                    <h2>Reconnaissance Professionnelle</h2>
                    <p>Points accumulés: 0</p>
                    <h2>Zone de Challenge</h2>
                    <div class="challenge-zone">Glissez une mission ici pour la tenter</div>
                    <h2>Résultats</h2>
                    <div class="results-zone">Les résultats de votre mission s'afficheront ici</div>
                    <div class="button-container">
                        <button class="button-3d button-morning">Matin</button>
                        <button class="button-3d button-afternoon">Après-midi</button>
                        <button class="button-3d button-next-day">Passer au jour suivant</button>
                    </div>
                    <div class="colleagues-container">
                        <div class="colleague">
                            <img src="nvrouge.png" alt="Athara">
                            <div>Athara</div>
                        </div>
                        <div class="colleague">
                            <img src="nvjaune.png" alt="Philon">
                            <div>Philon</div>
                        </div>
                        <div class="colleague">
                            <img src="nvvert.png" alt="Elara">
                            <div>Elara</div>
                        </div>
                        <div class="colleague">
                            <img src="nvbleu.png" alt="Héraklios">
                            <div>Héraklios</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const sliders = document.querySelectorAll('.adaptation-slider input');
        const effortValue = document.querySelector('.effort-value');

        function updateSliderAndMarker(slider) {
            const natural = parseInt(slider.dataset.natural);
            const current = parseInt(slider.value);
            const effort = Math.abs(current - natural);

            slider.nextElementSibling.textContent = current;

            // Calculer la position du marqueur
            const sliderWidth = slider.offsetWidth;
            const adjustedNatural = Math.min(Math.max(natural + 8, 0), 100); // Ajouter 8 unités, en restant dans la plage 0-100
            const markerPosition = (adjustedNatural / 100) * sliderWidth;

            const marker = slider.previousElementSibling;
            marker.style.left = `${markerPosition}px`;

            return effort;
        }

        function updateEffort() {
            let totalEffort = 0;
            sliders.forEach(slider => {
                totalEffort += updateSliderAndMarker(slider);
            });
            effortValue.textContent = `Effort d'adaptation total : ${totalEffort}`;
        }

        sliders.forEach(slider => {
            slider.addEventListener('input', updateEffort);
        });

        // Attendre que le DOM soit complètement chargé avant de positionner les marqueurs
        setTimeout(updateEffort, 0);
    }
});