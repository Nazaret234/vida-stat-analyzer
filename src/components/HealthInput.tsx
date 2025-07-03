
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Activity, Users } from 'lucide-react';

interface HealthInputProps {
  onSubmit: (description: string) => void;
  isLoading?: boolean;
}

const HealthInput: React.FC<HealthInputProps> = ({ onSubmit, isLoading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onSubmit(description);
    }
  };

  const placeholderText = `Describe tu estilo de vida y hábitos de salud en detalle. Por ejemplo:

"Tengo 28 años, peso 70kg y mido 1.75m. Duermo aproximadamente 7 horas por noche, aunque a veces menos por trabajo. Hago ejercicio 3 veces por semana, principalmente correr y algo de pesas. Mi alimentación incluye frutas y verduras, pero también como comida rápida 2-3 veces por semana. Mi nivel de estrés es moderado debido al trabajo, pero trato de relajarme los fines de semana..."

Incluye información sobre: edad, peso, altura, horas de sueño, ejercicio, alimentación, nivel de estrés, hábitos, etc.`;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Heart className="w-8 h-8 text-green-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            VidaStat
          </h1>
        </div>
        <p className="text-lg text-gray-600 mb-2">
          Análisis inteligente de tu estilo de vida
        </p>
        <p className="text-sm text-gray-500">
          Describe tus hábitos y obtén recomendaciones personalizadas con IA
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Cuéntanos sobre tu estilo de vida
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={placeholderText}
            className="min-h-[300px] text-base leading-relaxed resize-none border-gray-200 focus:border-green-400 focus:ring-green-400"
            disabled={isLoading}
          />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Users className="w-4 h-4" />
              <span>Tu información está protegida y es completamente privada</span>
            </div>
            
            <Button 
              type="submit" 
              disabled={!description.trim() || isLoading}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-2 text-base font-medium"
            >
              {isLoading ? 'Analizando...' : 'Analizar mi salud'}
            </Button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <Heart className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-800 mb-1">Análisis Personalizado</h3>
          <p className="text-sm text-green-600">IMC, puntaje de salud y recomendaciones</p>
        </div>
        
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-800 mb-1">IA Predictiva</h3>
          <p className="text-sm text-blue-600">Clasificación inteligente de tu salud</p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-purple-800 mb-1">Comparación</h3>
          <p className="text-sm text-purple-600">Ve cómo te comparas con otros grupos</p>
        </div>
      </div>
    </div>
  );
};

export default HealthInput;
