import React, { useState } from 'react';
import './App.css';
import HealthForm from './components/HealthForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPredictionResult(data.risk_level);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Predictive Health Analytics</h1>
      <HealthForm onSubmit={handleSubmit} />
      {predictionResult && <PredictionResult riskLevel={predictionResult} />}
    </div>
  );
}

export default App;