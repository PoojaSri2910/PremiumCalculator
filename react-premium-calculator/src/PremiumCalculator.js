import { useState } from 'react';
import './PremiumCalculator.css';

const occupationRatings = {
  Cleaner: { rating: 'Light Manual', factor: 11.5 },
  Doctor: { rating: 'Professional', factor: 1.5 },
  Author: { rating: 'White Collar', factor: 2.25 },
  Farmer: { rating: 'Heavy Manual', factor: 31.75 },
  Mechanic: { rating: 'Heavy Manual', factor: 31.75 },
  Florist: { rating: 'Light Manual', factor: 11.5 },
  Other: { rating: 'Heavy Manual', factor: 31.75 },
};

export default function PremiumCalculator() {
  const initalData = {
    name: '',
    age: '',
    dob: '',
    occupation: '',
    deathSum: '',
  }
  const [formData, setFormData] = useState(initalData);
  const [premium, setPremium] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = (data) => {
    let error = {};

    if (!data.name.trim()) error.name = "Name is required";
    if (!data.age || data.age <= 0) error.age = "Valid age is required";
    if (!data.dob) error.dob = "Date of Birth is required";
    if (!data.occupation) error.occupation = "Please select an occupation";
    if (!data.deathSum || data.deathSum <= 0)
      error.deathSum = "Valid Death Sum Insured is required";

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      const validationErrors = validate(updated);
      setErrors(validationErrors);
      const {age, deathSum, occupation} = updated
      if (
        age &&
        deathSum &&
        occupation &&
        occupationRatings[occupation] &&
        Object.keys(validationErrors).length === 0
      ) {
        const occupationRatingFactor = occupationRatings[occupation].factor;
        const premiumValue =
          (deathSum * occupationRatingFactor * age) / 1000 * 12;

        setPremium(premiumValue.toFixed(2));
      } else {
        setPremium(null);
      }
      return updated;
    });
  };

  return (
    <div className="monthly-premium-container">
      <div className="monthly-premium-card">
        <h2>Monthly Premium Calculator</h2>

        <form className="monthly-premium-grid">
          <div className="monthly-premium-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="monthly-premium-group">
            <label>Age Next Birthday</label>
            <input
              type="number"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="monthly-premium-group">
            <label>Date of Birth(mm/yyyy)</label>
            <input
              type="month"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="monthly-premium-group">
            <label>Usual Occupation</label>
            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Select Occupation</option>
              {Object.keys(occupationRatings).map((occ) => (
                <option key={occ} value={occ}>
                  {occ} ({occupationRatings[occ].rating})
                </option>
              ))}
            </select>
            {errors.occupation && (
              <span className="error">{errors.occupation}</span>
            )}
          </div>

          <div className="monthly-premium-group">
            <label>Death Sum Insured</label>
            <input
              type="number"
              name="deathSum"
              placeholder="Enter cover amount"
              value={formData.deathSum}
              onChange={handleChange}
              required
            />
          </div>
           {errors.deathSum && (
              <span className="error">{errors.deathSum}</span>
            )}
        </form>

        <div className="premium-box">
          {premium ? (
            <p className="premium-value">💰 Monthly Premium: ₹ {premium}</p>
          ) : (
            <p className="premium-placeholder">
              Fill all the required fields to see your premium
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
