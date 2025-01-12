import { calculateExerciseXP } from '../utils/trainingUtils';

export const trainingData = [
    {
        jour: "Lundi",
        exercices: [
            { nom: "Élévations latérales à la poulie", groupe: "Épaules", series: "3 x 12" },
            { nom: "Pec deck inversé", groupe: "Épaules", series: "3 x 12" },
            { nom: "Développé militaire", groupe: "Épaules", series: "3 x 8" },
            { nom: "Développé couché", groupe: "Pectoraux", series: "4 x 8" },
            { nom: "Écartés à la poulie vis-à-vis", groupe: "Pectoraux", series: "3 x 12" },
            { nom: "Développé couché haltères", groupe: "Pectoraux", series: "3 x 10" },
            { nom: "Pec-deck", groupe: "Pectoraux", series: "3 x 12" },
        ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
    },
    {
        jour: "Mardi",
        exercices: [
            { nom: "Tirage horizontal à la poulie", groupe: "Dos", series: "4 x 12" },
            { nom: "Tirage vertical prise serrée", groupe: "Dos", series: "4 x 10" },
            { nom: "Rowing à la barre", groupe: "Dos", series: "3 x 8" },
            { nom: "Crunch", groupe: "Abdos", series: "2 min" },
            { nom: "Planche", groupe: "Abdos", series: "1.5 min" },
        ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
    },
    {
        jour: "Mercredi",
        exercices: [
            { nom: "Squat", groupe: "Quadriceps", series: "3 x 8" },
            { nom: "Presse à cuisses inclinée", groupe: "Quadriceps", series: "3 x 12" },
            { nom: "Leg Curl", groupe: "Isquio", series: "3 x 12" },
            { nom: "Fentes bulgares", groupe: "Fessiers", series: "3 x 12" },
            { nom: "Hip Thrust", groupe: "Fessiers", series: "3 x 10" },
        ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
    },
    {
        jour: "Jeudi",
        exercices: [
            { nom: "Curl Biceps", groupe: "Biceps", series: "3 x 12" },
            { nom: "Curl Marteau", groupe: "Avant-Bras", series: "3 x 12" },
            { nom: "Extension à la corde", groupe: "Triceps", series: "3 x 12" },
            { nom: "Crunch", groupe: "Abdos", series: "2 min" },
            { nom: "Planche", groupe: "Abdos", series: "1.5 min" },
        ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
    },
    {
        jour: "Vendredi",
        exercices: [
            { nom: "Élévations latérales à la poulie", groupe: "Épaules", series: "3 x 12" },
            { nom: "Développé militaire", groupe: "Épaules", series: "3 x 8" },
            { nom: "Développé couché", groupe: "Pectoraux", series: "4 x 8" },
            { nom: "Écartés à la poulie vis-à-vis", groupe: "Pectoraux", series: "3 x 12" },
            { nom: "Extension des avant-bras", groupe: "Avant-Bras", series: "3 x 12" },
        ].map(ex => ({ ...ex, xp: calculateExerciseXP(ex) })),
    },
];
