
import React, { useState } from 'react';
import HealthInput from './HealthInput';
import ResultsDisplay from './ResultsDisplay';
import { HealthResults } from '@/types/health';

const HealthAnalysis: React.FC = () => {
  const [results, setResults] = useState<HealthResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateAPICall = (description: string): Promise<HealthResults> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulación de datos basados en la descripción
        const mockResults: HealthResults = {
          imc: {
            value: 22.9,
            category: 'Peso normal',
            status: 'normal'
          },
          healthScore: 78,
          recommendations: [
            'Mantén tu rutina de ejercicio actual, es excelente para tu salud cardiovascular',
            'Intenta reducir el consumo de comida rápida a 1-2 veces por semana',
            'Considera añadir técnicas de manejo del estrés como meditación o yoga',
            'Trata de mantener un horario de sueño más consistente para mejorar la calidad del descanso',
            'Incluye más proteínas magras en tu dieta para complementar tu rutina de ejercicios',
            'Considera tomar descansos regulares durante el trabajo para reducir el estrés'
          ],
          aiAnalysis: {
            classification: {
              category: 'Buena',
              probability: 0.84
            },
            clustering: {
              userGroup: 'Atlético',
              groupComparison: [
                {
                  group: 'Atlético',
                  avgAge: 29,
                  avgIMC: 23.1,
                  avgSleep: 7.2,
                  avgExercise: 4.8,
                  avgFastFood: 1.3,
                  avgHealthScore: 82
                },
                {
                  group: 'Promedio',
                  avgAge: 32,
                  avgIMC: 25.8,
                  avgSleep: 6.8,
                  avgExercise: 2.1,
                  avgFastFood: 3.2,
                  avgHealthScore: 65
                },
                {
                  group: 'Sedentario',
                  avgAge: 35,
                  avgIMC: 28.3,
                  avgSleep: 6.2,
                  avgExercise: 0.8,
                  avgFastFood: 4.7,
                  avgHealthScore: 48
                },
                {
                  group: 'Riesgo',
                  avgAge: 38,
                  avgIMC: 31.2,
                  avgSleep: 5.9,
                  avgExercise: 0.3,
                  avgFastFood: 6.1,
                  avgHealthScore: 32
                }
              ]
            }
          }
        };
        resolve(mockResults);
      }, 2000);
    });
  };

  const handleSubmit = async (description: string) => {
    setIsLoading(true);
    try {
      const analysisResults = await simulateAPICall(description);
      setResults(analysisResults);
    } catch (error) {
      console.error('Error analyzing health data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResults(null);
  };

  if (results) {
    return <ResultsDisplay results={results} onNewAnalysis={handleNewAnalysis} />;
  }

  return <HealthInput onSubmit={handleSubmit} isLoading={isLoading} />;
};

export default HealthAnalysis;
