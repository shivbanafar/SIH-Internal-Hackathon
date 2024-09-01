import React, { useState } from 'react';
import './App.css';
import HealthForm from './components/HealthForm';
import PredictionResult from './components/PredictionResult';

function App() {
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setError(null);

      // Call USDA FoodData Central API to get nutritional info
      const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=LCsiWx8zF9fWAyepHqpvGAB5ipY5GhHZIn6DwgnG&query=apple`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming we're using the first result
      const foodItem = data.foods[0];
      const calories = foodItem.foodNutrients.find(nutrient => nutrient.nutrientName === "Energy")?.value || 0;

      // Calculate health score
      const healthScore = calculateHealthScore(formData, calories);

      setPredictionResult(healthScore);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while making the prediction. Please try again.');
      setPredictionResult(null);
    }
  };

  const calculateHealthScore = (formData, calories) => {
    const ageScore = 100 - formData.age;
    const bmiScore = formData.bmi < 25 ? 100 : (30 - formData.bmi) * 10;
    const calorieScore = 100 - calories;
    const averageScore = (ageScore + bmiScore + calorieScore) / 3;

    let riskLevel;
    if (averageScore > 80) riskLevel = 'Low Risk';
    else if (averageScore > 60) riskLevel = 'Moderate Risk';
    else riskLevel = 'High Risk';

    return {
      score: averageScore.toFixed(2),
      riskLevel: riskLevel,
      details: {
        ageScore: ageScore.toFixed(2),
        bmiScore: bmiScore.toFixed(2),
        calorieScore: calorieScore.toFixed(2)
      }
    };
  };

  return (
    <div className="App">
      <h1>Health Score Calculator</h1>
      <HealthForm onSubmit={handleSubmit} />
      {error && <p className="error">{error}</p>}
      {predictionResult && <PredictionResult result={predictionResult} />}
    </div>
  );
}

export default App;




// import React, { useState } from 'react';
// import './App.css';
// import HealthForm from './components/HealthForm';
// import PredictionResult from './components/PredictionResult';

// function App() {
//   const [predictionResult, setPredictionResult] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (formData) => {
//     try {
//       setError(null);
      
//       // Call Nutritionix API to get nutritional info for a sample food
//       const response = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-app-id': '8a828233',  // Replace with your Nutritionix App ID
//           'x-app-key': '330773f120093a02fcbcd9557ebdcecf	— '  // Replace with your Nutritionix API Key
//         },
//         body: JSON.stringify({
//           query: 'apple'  // We're using 'apple' as a sample query
//         })
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
      
//       // Calculate a simple "health score" based on the nutritional info and form data
//       const calories = data.foods[0].nf_calories;
//       const healthScore = calculateHealthScore(formData, calories);
      
//       setPredictionResult(healthScore);
//     } catch (error) {
//       console.error('Error:', error);
//       setError('An error occurred while making the prediction. Please try again.');
//       setPredictionResult(null);
//     }
//   };

//   const calculateHealthScore = (formData, calories) => {
//     // This is a very simplistic calculation and should not be used for real health advice
//     const ageScore = 100 - formData.age;
//     const bmiScore = formData.bmi < 25 ? 100 : (30 - formData.bmi) * 10;
//     const calorieScore = 100 - calories;
//     const averageScore = (ageScore + bmiScore + calorieScore) / 3;
    
//     if (averageScore > 80) return 'Low Risk';
//     if (averageScore > 60) return 'Moderate Risk';
//     return 'High Risk';
//   };

//   return (
//     <div className="App">
//       <h1>Health Score Calculator</h1>
//       <HealthForm onSubmit={handleSubmit} />
//       {error && <p style={{color: 'red'}}>{error}</p>}
//       {predictionResult && <PredictionResult riskLevel={predictionResult} />}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import './App.css';
// import HealthForm from './components/HealthForm';
// import PredictionResult from './components/PredictionResult';

// function App() {
//   const [predictionResult, setPredictionResult] = useState(null);

//   const handleSubmit = async (formData) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       setPredictionResult(data.risk_level);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Predictive Health Analytics</h1>
//       <HealthForm onSubmit={handleSubmit} />
//       {predictionResult && <PredictionResult riskLevel={predictionResult} />}
//     </div>
//   );
// }

// export default App;