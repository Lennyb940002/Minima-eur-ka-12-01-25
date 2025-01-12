import React, { useState } from 'react';
import { modules } from './constants/modules';
import { useXPSystem } from './hooks/useXPSystem';
import { StatCard } from './StatCard';
import { Planning } from './Planning';
import { GlobalLevel } from './GlobalLevel';

const SeanceSport = () => {
    const { muscleStats, gainXP, getProgressPercentage } = useXPSystem();
    const [animateStats, setAnimateStats] = useState(false);

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <GlobalLevel muscleStats={muscleStats} animate={animateStats} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {modules.map((module) => (
                    <StatCard
                        key={module.id}
                        module={module}
                        stats={muscleStats[module.title]}
                        progressPercentage={getProgressPercentage(muscleStats[module.title])}
                        animate={animateStats}
                    />
                ))}
            </div>
            <Planning gainXP={gainXP} muscleStats={muscleStats} setAnimateStats={setAnimateStats} />
        </div>
    );
};

// Ajout de l'export par défaut
export default SeanceSport;