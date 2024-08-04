// rapportGenerator.js

// Fonction pour récupérer les données du localStorage
function getDataFromLocalStorage(key) {
    return localStorage.getItem(key);
}

// Fonction pour déterminer la catégorie (faible, moyen, fort) selon la nouvelle échelle
function getCategory(value) {
    if (value <= 10) return "faible";
    if (value <= 30) return "moyen";
    return "fort";
}

// Textes prédéfinis
const textes = {
    rouge: {
        naturel: {
            faible: "Votre score naturel en rouge est faible, ce qui indique une tendance à éviter la confrontation et à préférer un environnement harmonieux.",
            moyen: "Votre score naturel en rouge est moyen, suggérant un équilibre entre l'assertivité et la coopération.",
            fort: "Votre score naturel en rouge est élevé, révélant une forte propension à la prise de décision et à l'action directe."
        },
        adapte: {
            faible: "Votre score adapté en rouge est faible, indiquant que vous ajustez votre comportement pour être moins directif dans votre environnement actuel.",
            moyen: "Votre score adapté en rouge est moyen, suggérant que vous maintenez un équilibre entre l'assertivité et l'adaptation dans votre contexte actuel.",
            fort: "Votre score adapté en rouge est élevé, montrant que vous adoptez une approche plus directive et orientée vers l'action dans votre situation actuelle."
        }
    },
    vert: {
        naturel: {
            faible: "Votre score naturel en vert est faible, ce qui suggère une préférence pour le changement et la variété plutôt que pour la stabilité.",
            moyen: "Votre score naturel en vert est moyen, indiquant un équilibre entre le besoin de stabilité et l'ouverture au changement.",
            fort: "Votre score naturel en vert est élevé, révélant une forte préférence pour la stabilité, la fiabilité et la cohérence."
        },
        adapte: {
            faible: "Votre score adapté en vert est faible, suggérant que vous vous ajustez pour être plus flexible et ouvert au changement dans votre environnement actuel.",
            moyen: "Votre score adapté en vert est moyen, indiquant que vous maintenez un équilibre entre stabilité et flexibilité dans votre contexte actuel.",
            fort: "Votre score adapté en vert est élevé, montrant que vous adoptez une approche plus stable et structurée dans votre situation actuelle."
        }
    },
    jaune: {
        naturel: {
            faible: "Votre score naturel en jaune est faible, ce qui indique une tendance à être plus réservé et à préférer des interactions plus formelles.",
            moyen: "Votre score naturel en jaune est moyen, suggérant un équilibre entre sociabilité et réserve dans vos interactions.",
            fort: "Votre score naturel en jaune est élevé, révélant une forte propension à la sociabilité et à l'enthousiasme dans vos interactions."
        },
        adapte: {
            faible: "Votre score adapté en jaune est faible, indiquant que vous ajustez votre comportement pour être plus réservé et formel dans votre environnement actuel.",
            moyen: "Votre score adapté en jaune est moyen, suggérant que vous maintenez un équilibre entre sociabilité et réserve dans votre contexte actuel.",
            fort: "Votre score adapté en jaune est élevé, montrant que vous adoptez une approche plus sociable et enthousiaste dans votre situation actuelle."
        }
    },
    bleu: {
        naturel: {
            faible: "Votre score naturel en bleu est faible, ce qui suggère une préférence pour l'action rapide et l'intuition plutôt que pour l'analyse détaillée.",
            moyen: "Votre score naturel en bleu est moyen, indiquant un équilibre entre l'analyse et l'action dans votre approche.",
            fort: "Votre score naturel en bleu est élevé, révélant une forte tendance à l'analyse, à la précision et à l'attention aux détails."
        },
        adapte: {
            faible: "Votre score adapté en bleu est faible, suggérant que vous vous ajustez pour être plus intuitif et moins analytique dans votre environnement actuel.",
            moyen: "Votre score adapté en bleu est moyen, indiquant que vous maintenez un équilibre entre analyse et action dans votre contexte actuel.",
            fort: "Votre score adapté en bleu est élevé, montrant que vous adoptez une approche plus analytique et précise dans votre situation actuelle."
        }
    }
};

// Fonction pour détecter les anomalies
function detecterAnomalies(profilsNaturels, profilsAdaptes) {
    const anomalies = [];
    const couleursValides = ['rouge', 'vert', 'jaune', 'bleu'];
    const sommeAttendue = 100;

    // Vérification des valeurs extrêmes ou non réalistes
    couleursValides.forEach(couleur => {
        const naturel = profilsNaturels[couleur];
        const adapte = profilsAdaptes[couleur];

        if (naturel === 0 || naturel === 100 || adapte === 0 || adapte === 100) {
            anomalies.push(`Valeur extrême détectée pour ${couleur}: Naturel=${naturel}, Adapté=${adapte}`);
        }
    });

    // Vérification de la distribution inhabituelle
    const sommeNaturelle = couleursValides.reduce((sum, couleur) => sum + profilsNaturels[couleur], 0);
    const sommeAdaptee = couleursValides.reduce((sum, couleur) => sum + profilsAdaptes[couleur], 0);

    if (Math.abs(sommeNaturelle - sommeAttendue) > 1 || Math.abs(sommeAdaptee - sommeAttendue) > 1) {
        anomalies.push(`Distribution inhabituelle: Somme naturelle=${sommeNaturelle}, Somme adaptée=${sommeAdaptee}`);
    }

    // Vérification des profils incomplets ou manquants
    couleursValides.forEach(couleur => {
        if (profilsNaturels[couleur] === null || profilsAdaptes[couleur] === null) {
            anomalies.push(`Données manquantes pour ${couleur}`);
        }
    });

    // Vérification des profils identiques ou répétitifs
    const profilsIdentiques = couleursValides.every(couleur => profilsNaturels[couleur] === profilsAdaptes[couleur]);
    if (profilsIdentiques) {
        anomalies.push("Profils naturel et adapté identiques");
    }

    // Vérification de la somme des adaptations
    const sommeAdaptations = couleursValides.reduce((sum, couleur) => 
        sum + (profilsAdaptes[couleur] - profilsNaturels[couleur]), 0);

    // Vérification des incohérences entre profil naturel et adapté
    if (Math.abs(sommeAdaptations) > 0.1) { // Utilisation d'une petite marge d'erreur
        couleursValides.forEach(couleur => {
            const ecart = profilsAdaptes[couleur] - profilsNaturels[couleur];
            if (ecart < 0) {
                anomalies.push(`Écart négatif pour ${couleur}: ${ecart}`);
            }
        });
    }

    return anomalies;
}

// Fonction pour analyser l'effort d'adaptation
function analyserEffortAdaptation(effort) {
    let message = '';
    if (effort === 0) {
        message = "Aucun effort d'adaptation détecté. Vérifiez l'exactitude des données.";
    } else if (effort <= 100) {
        message = `Effort d'adaptation léger (${effort}): Les ajustements nécessaires sont minimes, suggérant une adaptation relativement facile.`;
    } else if (effort <= 200) {
        message = `Effort d'adaptation modéré (${effort}): Des ajustements significatifs ont été effectués, mais restent dans une plage gérable.`;
    } else {
        message = `Effort d'adaptation intense (${effort}): Des ajustements considérables ont été nécessaires, impliquant des modifications importantes dans les comportements ou les compétences.`;
    }
    return message;
}

// Fonction pour analyser la modification de forme de la gemme
function analyserModificationForme(profilsNaturels, profilsAdaptes) {
    const couleursValides = ['rouge', 'vert', 'jaune', 'bleu'];
    const ecartTypeNaturel = calculerEcartType(couleursValides.map(c => profilsNaturels[c]));
    const ecartTypeAdapte = calculerEcartType(couleursValides.map(c => profilsAdaptes[c]));

    if (ecartTypeAdapte < ecartTypeNaturel) {
        return {
            modification: "s'élargit et devient plus carrée",
            interpretation: "un développement de compétences dans plusieurs domaines, vous permettant de vous adapter à une variété de situations. Cette transformation reflète une capacité accrue à intégrer différents traits comportementaux, ce qui peut être bénéfique dans des environnements dynamiques et changeants."
        };
    } else {
        return {
            modification: "s'effile et pointe plus franchement dans une direction",
            interpretation: "une spécialisation accrue dans un domaine particulier. Votre profil comportemental montre une forte orientation vers une couleur spécifique, indiquant une concentration sur les traits et compétences associés à cette couleur. Cette transformation reflète une focalisation sur vos forces principales, ce qui peut être avantageux dans des rôles nécessitant une expertise ou une compétence particulière."
        };
    }
}

function calculerEcartType(valeurs) {
    const moyenne = valeurs.reduce((a, b) => a + b) / valeurs.length;
    const variance = valeurs.reduce((a, b) => a + Math.pow(b - moyenne, 2), 0) / valeurs.length;
    return Math.sqrt(variance);
}

// Fonction pour analyser les impacts significatifs
function analyserImpactsSignificatifs(profilsNaturels, profilsAdaptes) {
    const couleursValides = ['rouge', 'vert', 'jaune', 'bleu'];
    let maxEcartAbs = 0;
    let couleurMaxEcart = '';
    let ecartMaxReel = 0;

    couleursValides.forEach(couleur => {
        const ecart = profilsAdaptes[couleur] - profilsNaturels[couleur];
        if (Math.abs(ecart) > maxEcartAbs) {
            maxEcartAbs = Math.abs(ecart);
            couleurMaxEcart = couleur;
            ecartMaxReel = ecart;
        }
    });

    const direction = ecartMaxReel > 0 ? "plus" : "moins";

    switch(couleurMaxEcart) {
        case 'rouge':
            return {
                couleur: 'Rouge',
                interpretation: `vous devenez ${direction} assertif et orienté vers l'action dans votre environnement actuel, ${ecartMaxReel > 0 ? "prenant davantage" : "réduisant la prise"} d'initiatives et de décisions rapides.`
            };
        case 'jaune':
            return {
                couleur: 'Jaune',
                interpretation: `vous devenez ${direction} communicatif et sociable, ${ecartMaxReel > 0 ? "cherchant davantage à" : "réduisant votre tendance à"} établir et maintenir des relations avec les autres.`
            };
        case 'vert':
            return {
                couleur: 'Vert',
                interpretation: `vous devenez ${direction} stable et fiable, ${ecartMaxReel > 0 ? "mettant davantage l'accent sur" : "réduisant votre focus sur"} la cohérence et la constance dans vos actions.`
            };
        case 'bleu':
            return {
                couleur: 'Bleu',
                interpretation: `vous devenez ${direction} analytique et attentif aux détails, ${ecartMaxReel > 0 ? "privilégiant davantage" : "réduisant votre tendance à privilégier"} une approche méthodique et réfléchie.`
            };
        default:
            return {
                couleur: '',
                interpretation: ''
            };
    }
}

// Fonction pour générer la conclusion
function genererConclusion(effortAdaptation, profilsNaturels, profilsAdaptes) {
    const couleursValides = ['rouge', 'vert', 'jaune', 'bleu'];
    
    // Déterminer le niveau d'adaptation
    let niveauAdaptation;
    if (effortAdaptation <= 100) {
        niveauAdaptation = "légère";
    } else if (effortAdaptation <= 200) {
        niveauAdaptation = "modérée";
    } else {
        niveauAdaptation = "importante";
    }

    // Identifier le changement le plus significatif
    let maxEcart = 0;
    let couleurMaxEcart = '';
    couleursValides.forEach(couleur => {
        const ecart = Math.abs(profilsAdaptes[couleur] - profilsNaturels[couleur]);
        if (ecart > maxEcart) {
            maxEcart = ecart;
            couleurMaxEcart = couleur;
        }
    });

    // Déterminer la direction du changement
    const directionChangement = profilsAdaptes[couleurMaxEcart] > profilsNaturels[couleurMaxEcart] ? "plus" : "moins";

    // Générer la description de la tendance
    let tendance;
    if (maxEcart > 10) {
        tendance = `devenir ${directionChangement} ${couleurMaxEcart}`;
    } else {
        tendance = "maintenir un équilibre proche de votre profil naturel";
    }

    // Générer l'observation
    let observation;
    switch (niveauAdaptation) {
        case "légère":
            observation = "des ajustements mineurs dans votre comportement";
            break;
        case "modérée":
            observation = "des changements notables dans votre approche";
            break;
        case "importante":
            observation = "une transformation significative de votre comportement";
            break;
    }

    // Générer la recommandation
    let recommandation;
    if (maxEcart > 10) {
        recommandation = `l'intégration de cette nouvelle approche ${couleurMaxEcart} tout en restant conscient de vos tendances naturelles`;
    } else {
        recommandation = "le maintien de votre équilibre actuel tout en restant attentif aux exigences spécifiques de votre environnement";
    }

    // Assembler la conclusion
    return `L'analyse de votre profil révèle une adaptation ${niveauAdaptation} à votre environnement actuel. ` +
           `Votre tendance à ${tendance} démontre ${observation} en réponse aux exigences perçues. ` +
           `Pour optimiser votre efficacité, vous pourriez vous concentrer sur ${recommandation}.`;
}

function getCaracteristiquesDominante(couleur) {
    switch(couleur) {
        case "rouge":
            return "prendre des décisions rapides et à agir avec détermination";
        case "jaune":
            return "communiquer avec enthousiasme et à établir des relations";
        case "vert":
            return "maintenir la stabilité et à travailler de manière constante";
        case "bleu":
            return "analyser en profondeur et à porter attention aux détails";
        default:
            return "";
    }
}

// Fonction principale pour générer le rapport
function genererRapport() {
    const profilsNaturels = {};
    const profilsAdaptes = {};
    const couleurs = ["rouge", "vert", "jaune", "bleu"];
    let sommeEffortsAjustes = 0;

    couleurs.forEach(couleur => {
        const naturel = parseInt(getDataFromLocalStorage(`${couleur}Naturel`));
        const adapte = parseInt(getDataFromLocalStorage(`${couleur}Adapte`));
        profilsNaturels[couleur] = naturel;
        profilsAdaptes[couleur] = adapte;

        const ecart = adapte - naturel;
        let effortAjuste = ecart > 0 ? 2 * Math.pow(ecart, 2) : Math.pow(ecart, 2);
        sommeEffortsAjustes += effortAjuste;
    });

    const effortAdaptationFinal = Math.ceil(10 * Math.sqrt(sommeEffortsAjustes));

    const dominanteNaturelle = couleurs.reduce((a, b) => profilsNaturels[a] > profilsNaturels[b] ? a : b);
    const dominanteAdaptee = couleurs.reduce((a, b) => profilsAdaptes[a] > profilsAdaptes[b] ? a : b);

    const anomalies = detecterAnomalies(profilsNaturels, profilsAdaptes);
    const analyseEffort = analyserEffortAdaptation(effortAdaptationFinal);
    const analyseForme = analyserModificationForme(profilsNaturels, profilsAdaptes);
    const analyseImpacts = analyserImpactsSignificatifs(profilsNaturels, profilsAdaptes);
    const conclusion = genererConclusion(effortAdaptationFinal, profilsNaturels, profilsAdaptes);

    return {
        date: new Date().toLocaleDateString(),
        nom: getDataFromLocalStorage("nom"),
        prenom: getDataFromLocalStorage("prenom"),
        email: getDataFromLocalStorage("email"),
        profilsNaturels,
        profilsAdaptes,
        effortAdaptationFinal,
        dominanteNaturelle,
        dominanteAdaptee,
        anomalies,
        analyseEffort,
        analyseForme,
        analyseImpacts,
        conclusion
    };
}

// Exporter la fonction principale
export { genererRapport };