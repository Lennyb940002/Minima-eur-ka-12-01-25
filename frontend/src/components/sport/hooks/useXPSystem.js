// hooks/useXPSystem.js
import { useState, useEffect } from 'react';
import { modules } from '../constants/modules';
import { MUSCLE_GROUPS } from '../constants/muscleGroups';
import { calculateXPForNextLevel } from '../utils/xpCalculator';

export const useXPSystem = () => {
    const [muscleStats, setMuscleStats] = useState(() => {
        const savedStats = localStorage.getItem('muscleStats');
        if (savedStats) {
            const parsedStats = JSON.parse(savedStats);
            // Vérifier que toutes les clés nécessaires sont présentes
            const defaultStats = modules.reduce((acc, module) => {
                acc[MUSCLE_GROUPS[module.id].name] = {
                    xp: 0,
                    level: 0,
                    totalXP: 0
                };
                return acc;
            }, {});
            
            // Fusionner les stats sauvegardées avec les stats par défaut
            return { ...defaultStats, ...parsedStats };
        }

        // Initialiser avec toutes les stats à zéro
        return modules.reduce((acc, module) => {
            acc[MUSCLE_GROUPS[module.id].name] = {
                xp: 0,
                level: 0,
                totalXP: 0
            };
            return acc;
        }, {});
    });

    useEffect(() => {
        localStorage.setItem('muscleStats', JSON.stringify(muscleStats));
    }, [muscleStats]);

    const gainXP = (groupe, baseXP) => {
        setMuscleStats((prevStats) => {
            const updatedStats = { ...prevStats };
            const currentStats = updatedStats[groupe];

            if (!currentStats) {
                console.warn(`Groupe musculaire non trouvé: ${groupe}`);
                return prevStats;
            }

            let newXP = currentStats.xp + baseXP;
            let newLevel = currentStats.level;
            let newTotalXP = currentStats.totalXP + baseXP;

            while (newXP >= calculateXPForNextLevel(newLevel)) {
                newXP -= calculateXPForNextLevel(newLevel);
                newLevel += 1;
            }

            updatedStats[groupe] = {
                xp: newXP,
                level: newLevel,
                totalXP: newTotalXP
            };

            return updatedStats;
        });
    };

    const getProgressPercentage = (stats) => {
        if (!stats) return 0;
        const xpNeeded = calculateXPForNextLevel(stats.level);
        return (stats.xp / xpNeeded) * 100;
    };

    return { muscleStats, gainXP, getProgressPercentage };
};