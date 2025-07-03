
import React from 'react';
import HealthAnalysis from '@/components/HealthAnalysis';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <HealthAnalysis />
      </div>
    </div>
  );
};

export default Index;
