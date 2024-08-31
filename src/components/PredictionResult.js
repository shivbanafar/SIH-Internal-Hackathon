import React from 'react';

const PredictionResult = ({ riskLevel }) => {
  return (
    <div>
      <h2>Prediction Result</h2>
      <p>Predicted Risk Level: {riskLevel}</p>
    </div>
  );
};

export default PredictionResult;