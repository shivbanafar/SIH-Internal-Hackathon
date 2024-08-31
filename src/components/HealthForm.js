import React, { useState } from 'react';

const HealthForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    bmi: '',
    blood_pressure: '',
    cholesterol: '',
    smoking: '0'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="bmi">BMI:</label>
        <input type="number" id="bmi" name="bmi" step="0.1" value={formData.bmi} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="blood_pressure">Blood Pressure:</label>
        <input type="number" id="blood_pressure" name="blood_pressure" value={formData.blood_pressure} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="cholesterol">Cholesterol:</label>
        <input type="number" id="cholesterol" name="cholesterol" value={formData.cholesterol} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="smoking">Smoking:</label>
        <select id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} required>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <button type="submit">Predict Risk</button>
    </form>
  );
};

export default HealthForm;