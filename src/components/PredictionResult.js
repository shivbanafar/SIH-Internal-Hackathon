import React from 'react';

function PredictionResult({ result }) {
  return (
    <div className="prediction-result">
      <h2>Health Score Prediction</h2>
      <p>Overall Score: {result.score}</p>
      <p>Risk Level: {result.riskLevel}</p>
      <h3>Score Breakdown:</h3>
      <ul>
        <li>Age Score: {result.details.ageScore}</li>
        <li>BMI Score: {result.details.bmiScore}</li>
        <li>Calorie Score: {result.details.calorieScore}</li>
      </ul>
      <p>Note: This is a simplified calculation and should not be used for actual health advice.</p>
    </div>
  );
}

export default PredictionResult;