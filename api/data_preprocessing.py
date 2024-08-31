import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def generate_sample_data(n_samples=1000):
    np.random.seed(42)
    data = {
        'age': np.random.randint(18, 90, n_samples),
        'bmi': np.random.uniform(18.5, 40, n_samples),
        'blood_pressure': np.random.randint(90, 180, n_samples),
        'cholesterol': np.random.randint(120, 300, n_samples),
        'smoking': np.random.choice([0, 1], n_samples),
        'chronic_condition': np.random.choice([0, 1], n_samples)
    }
    return pd.DataFrame(data)

def preprocess_data():
    # Generate sample data instead of loading from CSV
    data = generate_sample_data()
    
    X = data.drop('chronic_condition', axis=1)
    y = data['chronic_condition']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler

# If you want to save the generated data to a CSV file, uncomment the following lines:
if __name__ == "__main__":
    data = generate_sample_data()
    data.to_csv("api/data/patient_data.csv", index=False)
    print("Sample data saved to api/data/patient_data.csv")