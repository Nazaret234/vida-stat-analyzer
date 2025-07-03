
import React from 'react';
import { Heart, TrendingUp, CheckCircle, Activity } from 'lucide-react';
import { HealthResults } from '@/types/health';
import ClusterComparison from './ClusterComparison';

interface ResultsDisplayProps {
  results: HealthResults;
  onNewAnalysis: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, onNewAnalysis }) => {
  const getIMCColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'overweight': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'obese': return 'text-red-600 bg-red-50 border-red-200';
      case 'underweight': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getClassificationColor = (category: string) => {
    switch (category) {
      case 'Excelente': return 'text-green-600 bg-green-50 border-green-200';
      case 'Buena': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Necesita mejoras': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-green-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            VidaStat
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-4">
          Tu análisis personalizado de salud
        </p>
        <button
          onClick={onNewAnalysis}
          className="text-blue-600 hover:text-blue-800 underline text-sm"
        >
          ← Realizar nuevo análisis
        </button>
      </div>

      {/* IMC y Puntaje General */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMC Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-semibold text-gray-800">Índice de Masa Corporal</h3>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {results.imc.value.toFixed(1)}
            </div>
            <div className={`inline-block px-4 py-2 rounded-full border font-semibold ${getIMCColor(results.imc.status)}`}>
              {results.imc.category}
            </div>
          </div>
        </div>

        {/* Puntaje de Salud */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-semibold text-gray-800">Puntaje de Salud</h3>
          </div>
          
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${getHealthScoreColor(results.healthScore)}`}>
              {results.healthScore}/100
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${results.healthScore >= 80 ? 'bg-green-500' : 
                  results.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${results.healthScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold text-gray-800">Recomendaciones Personalizadas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-green-800 leading-relaxed">{recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Análisis Predictivo con IA */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-semibold text-gray-800">Análisis Predictivo con IA</h3>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-700 mb-4">Clasificación de Salud</h4>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`px-6 py-3 rounded-full border font-semibold text-lg ${getClassificationColor(results.aiAnalysis.classification.category)}`}>
              {results.aiAnalysis.classification.category}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Confianza:</span>
                <span className="text-sm font-bold text-gray-800">
                  {(results.aiAnalysis.classification.probability * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${results.aiAnalysis.classification.probability * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparación de Clusters */}
      <ClusterComparison clustering={results.aiAnalysis.clustering} />
    </div>
  );
};

export default ResultsDisplay;
