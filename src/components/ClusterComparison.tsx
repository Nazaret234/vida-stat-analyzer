
import React from 'react';
import { Users, TrendingUp, Activity, Clock } from 'lucide-react';
import { HealthResults } from '@/types/health';

interface ClusterComparisonProps {
  clustering: HealthResults['aiAnalysis']['clustering'];
}

const ClusterComparison: React.FC<ClusterComparisonProps> = ({ clustering }) => {
  const getGroupColor = (group: string) => {
    const colors = {
      'Atlético': 'bg-green-500',
      'Promedio': 'bg-blue-500',
      'Sedentario': 'bg-orange-500',
      'Riesgo': 'bg-red-500'
    };
    return colors[group as keyof typeof colors] || 'bg-gray-500';
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'exercise': return <Activity className="w-4 h-4" />;
      case 'sleep': return <Clock className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const formatMetric = (key: string, value: number) => {
    switch (key) {
      case 'avgAge': return `${value} años`;
      case 'avgIMC': return value.toFixed(1);
      case 'avgSleep': return `${value}h`;
      case 'avgExercise': return `${value} días/sem`;
      case 'avgFastFood': return `${value} veces/sem`;
      case 'avgHealthScore': return `${value}/100`;
      default: return value.toString();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-purple-500" />
        <h3 className="text-xl font-semibold text-gray-800">Análisis de Grupos</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-4 h-4 rounded-full ${getGroupColor(clustering.userGroup)}`}></div>
          <span className="font-semibold text-gray-800">Tu grupo: {clustering.userGroup}</span>
        </div>
        <p className="text-sm text-gray-600 ml-7">
          Te hemos clasificado en este grupo basado en tus hábitos y características de salud.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-700">Grupo</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Edad</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">IMC</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Sueño</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Ejercicio</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Comida Rápida</th>
              <th className="text-center py-3 px-2 font-semibold text-gray-700">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {clustering.groupComparison.map((group, index) => (
              <tr 
                key={group.group} 
                className={`border-b border-gray-100 ${group.group === clustering.userGroup ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getGroupColor(group.group)}`}></div>
                    <span className={`font-medium ${group.group === clustering.userGroup ? 'text-blue-800' : 'text-gray-700'}`}>
                      {group.group}
                    </span>
                    {group.group === clustering.userGroup && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Tú</span>
                    )}
                  </div>
                </td>
                <td className="text-center py-3 px-2 text-gray-600">{formatMetric('avgAge', group.avgAge)}</td>
                <td className="text-center py-3 px-2 text-gray-600">{formatMetric('avgIMC', group.avgIMC)}</td>
                <td className="text-center py-3 px-2 text-gray-600">{formatMetric('avgSleep', group.avgSleep)}</td>
                <td className="text-center py-3 px-2 text-gray-600">{formatMetric('avgExercise', group.avgExercise)}</td>
                <td className="text-center py-3 px-2 text-gray-600">{formatMetric('avgFastFood', group.avgFastFood)}</td>
                <td className="text-center py-3 px-2">
                  <span className={`font-semibold ${
                    group.avgHealthScore >= 80 ? 'text-green-600' :
                    group.avgHealthScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {formatMetric('avgHealthScore', group.avgHealthScore)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClusterComparison;
