// components/Planning.jsx
import { useState, useEffect } from 'react';
import { ExerciseCard } from './ExerciseCard';
import { getPastilleStyle } from './utils/styles';
import { trainingData } from './data/trainingData';

export const Planning = ({ gainXP, setAnimateStats }) => {
    const [validationCount, setValidationCount] = useState(() => {
        const saved = localStorage.getItem('validationCount');
        return saved ? JSON.parse(saved) : {};
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleValidation = async (jour, exercices) => {
        // D'abord, scroll vers le haut
        scrollToTop();

        // Attendre que le scroll soit terminé
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Déclencher les animations
        setAnimateStats(true);

        // Ajouter les points XP pour chaque exercice
        exercices.forEach((exercice) => gainXP(exercice.groupe, exercice.xp));

        // Réinitialiser l'animation après un délai
        setTimeout(() => {
            setAnimateStats(false);
        }, 2000);

        // Mettre à jour le compteur de validation
        const today = new Date().toISOString().split('T')[0];
        setValidationCount(prev => ({
            ...prev,
            [today]: {
                ...prev[today],
                [jour]: (prev[today]?.[jour] || 0) + 1
            }
        }));
    };

    useEffect(() => {
        localStorage.setItem('validationCount', JSON.stringify(validationCount));
    }, [validationCount]);

    return (
        <div className="bg-black/10 p-6 rounded-lg mt-10">
            <h2 className="text-black text-xl font-bold mb-6">Planning d'entraînement</h2>
            {trainingData.map((jour, index) => {
                const today = new Date().toISOString().split('T')[0];
                const validations = validationCount[today]?.[jour.jour] || 0;

                return (
                    <div key={index} className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="bg-black/10 pt-1 pb-1 rounded-lg font-bold text-lg text-black pl-4 flex-1">
                                {jour.jour}
                            </h3>
                            <div className="flex items-center gap-2">
                                {validations > 0 && (
                                    <span className="text-green-600 font-medium">
                                        Validé {validations} fois aujourd'hui
                                    </span>
                                )}
                                <button
                                    onClick={() => handleValidation(jour.jour, jour.exercices)}
                                    className="ml-4 px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    {validations > 0 ? 'Valider à nouveau' : 'Valider la séance'}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {jour.exercices.map((exercice, idx) => (
                                <ExerciseCard
                                    key={idx}
                                    exercice={exercice}
                                    style={getPastilleStyle(exercice.groupe)}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};