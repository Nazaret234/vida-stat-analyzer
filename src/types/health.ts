
export interface HealthData {
  age?: number;
  weight?: number;
  height?: number;
  sleepHours?: number;
  exercise?: string;
  diet?: string;
  stress?: string;
  description: string;
}

export interface HealthResults {
  imc: {
    value: number;
    category: string;
    status: 'underweight' | 'normal' | 'overweight' | 'obese';
  };
  healthScore: number;
  recommendations: string[];
  aiAnalysis: {
    classification: {
      category: 'Excelente' | 'Buena' | 'Necesita mejoras';
      probability: number;
    };
    clustering: {
      userGroup: string;
      groupComparison: {
        group: string;
        avgAge: number;
        avgIMC: number;
        avgSleep: number;
        avgExercise: number;
        avgFastFood: number;
        avgHealthScore: number;
      }[];
    };
  };
}
