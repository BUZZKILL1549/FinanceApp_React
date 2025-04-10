import React, { useState } from 'react';
import './InsuranceForm.css';

function InsuranceForm({ closeForm }) {
  const [formData, setFormData] = useState({
    provider: '',
    policyNumber: '',
    policyName: '',
    policyHolder: '',
    lifeInsured: '',
    sumAssured: '',
    nominee: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    closeForm(); // Close the popup after submission
  };

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Add Insurance</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Provider: </label>
            <input
              type="text"
              name="provider"
              value={formData.provider}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Number: </label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Name: </label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Policy Holder: </label>
            <input
              type="text"
              name="policyHolder"
              value={formData.policyHolder}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Life Insured: </label>
            <input
              type="text"
              name="lifeInsured"
              value={formData.lifeInsured}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Sum Assured: </label>
            <input
              type="text"
              name="sumAssured"
              value={formData.sumAssured}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nominee: </label>
            <input
              type="text"
              name="nominee"
              value={formData.nominee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="popup-buttons">
            <button type="submit">Add</button>
            <button type="button" onClick={closeForm}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InsuranceForm;
