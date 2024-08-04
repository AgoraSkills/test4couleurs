// Initialisation des contextes des graphiques
const ctxRadar = document.getElementById('radarChart').getContext('2d');
const ctxDonut = document.getElementById('donutChart').getContext('2d');
const ctxEffortBar = document.getElementById('effortBarChart').getContext('2d');

// Configuration du graphique radar
const radarLabels = ['Rouge', 'Jaune', 'Vert', 'Bleu'];

const radarChart = new Chart(ctxRadar, {
    type: 'radar',
    data: {
        labels: radarLabels,
        datasets: [
            {
                label: 'Profil Naturel',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Profil Adapté',
                data: [0, 0, 0, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 10
                }
            }
        }
    }
});

// Configuration du graphique donut
const donutChart = new Chart(ctxDonut, {
    type: 'doughnut',
    data: {
        labels: ['Rouge', 'Jaune', 'Vert', 'Bleu'],
        datasets: [{
            data: [0, 0, 0, 0], // Valeurs pour le Profil Naturel
            backgroundColor: ['#FF0000', '#FFFF00', '#00FF00', '#0000FF'],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: () => {}
                }
            }
        },
        cutout: '60%',  // Réduction de l'épaisseur du donut pour que le cercle intérieur soit plus large
        rotation: 0  // Réinitialiser le donut à 0°
    }
});

// Configuration du graphique en barres
const effortBarChart = new Chart(ctxEffortBar, {
    type: 'bar',
    data: {
        labels: radarLabels,
        datasets: [{
            label: 'Différence Adapté - Naturel',
            data: [0, 0, 0, 0],  // Valeurs initiales à zéro
            backgroundColor: ['#FF0000', '#FFFF00', '#00FF00', '#0000FF'],
            borderColor: '#000',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                min: -30, // Limite inférieure pour l'axe Y
                max: 30,  // Limite supérieure pour l'axe Y
                ticks: {
                    stepSize: 5, // Taille des intervalles
                    callback: function(value) {
                        return value + '%'; // Format des labels
                    }
                }
            }
        }
    }
});

// Fonction pour mettre à jour les graphiques et les tableaux
function updateCharts() {
    const naturelValues = [
        parseFloat(localStorage.getItem('rougeNaturel')) || 0,
        parseFloat(localStorage.getItem('jauneNaturel')) || 0,
        parseFloat(localStorage.getItem('vertNaturel')) || 0,
        parseFloat(localStorage.getItem('bleuNaturel')) || 0
    ];

    const adapteValues = [
        parseFloat(localStorage.getItem('rougeAdapte')) || 0,
        parseFloat(localStorage.getItem('jauneAdapte')) || 0,
        parseFloat(localStorage.getItem('vertAdapte')) || 0,
        parseFloat(localStorage.getItem('bleuAdapte')) || 0
    ];

    // Recalculer les pourcentages
    const sumNaturel = naturelValues.reduce((a, b) => a + b, 0);
    const sumAdapte = adapteValues.reduce((a, b) => a + b, 0);
    
    const naturelPercent = naturelValues.map(value => (sumNaturel > 0 ? (value / sumNaturel) * 100 : 0));
    const adaptePercent = adapteValues.map(value => (sumAdapte > 0 ? (value / sumAdapte) * 100 : 0));

    // Calculer les différences entre les valeurs adaptées et naturelles
    const differences = adaptePercent.map((v, i) => v - naturelPercent[i]);

    // Trouver la couleur dominante et mineure du profil naturel
    const colors = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF'];
    const labels = ['Rouge', 'Jaune', 'Vert', 'Bleu'];
    const maxIndex = naturelPercent.indexOf(Math.max(...naturelPercent));
    const minIndex = naturelPercent.indexOf(Math.min(...naturelPercent));

    document.getElementById('dominantColor').style.backgroundColor = colors[maxIndex];
    document.getElementById('dominantColorText').textContent = labels[maxIndex];

    document.getElementById('minorColor').style.backgroundColor = colors[minIndex];
    document.getElementById('minorColorText').textContent = labels[minIndex];

    // Mettre à jour les graphiques radar
    radarChart.data.datasets[0].data = naturelPercent;
    radarChart.data.datasets[1].data = adaptePercent;
    radarChart.update();

    // Mettre à jour le graphique donut avec les valeurs naturelles
    donutChart.data.datasets[0].data = naturelPercent;
    donutChart.update();

    // Mettre à jour le graphique des barres de différences
    effortBarChart.data.datasets[0].data = differences;
    effortBarChart.update();
}

// Appel initial pour mettre à jour les graphiques avec les données sauvegardées
updateCharts();