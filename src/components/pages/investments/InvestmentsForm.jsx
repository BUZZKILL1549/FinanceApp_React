import React, { useState } from 'react';
import { addData } from '../../../server.js'; 
import './Investments.css';

function InvestmentsForm({ db, closeForm }) {
  const [formData, setFormData] = useState({
    financialOrganization: '',
    nameOfFinancialInstitution: '',
    branchAddress: '',
    typeOfInvestment: '',
    investmentNumber: '',
    investmentHolder: '',
    nominee: '',
    nomineeGuardian: '',
    investmentAmount: '',
    rateOfInterest: '',
    investmentDate: '',
    investmentDuration: '',
    maturityDate: '',
    maturityAmount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!db) {
      console.error('Database not initialized');
      return;
    }
    
    try {
      await addData(db, 'investments', formData);
      console.log('Investment data saved successfully');
      closeForm(); 
    } catch (error) {
      console.error('Error saving investment data:', error);
    }
  }; 

  return (
    <div className="popup-overlay">
      <div className="popup-form">
        <h2>Add Investment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Financial Organization</label>
            <input
              type="text"
              name="financialOrganization"
              value={formData.financialOrganization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Name of Financial Institution: </label>
            <input
              type="text"
              name="nameOfFinancialInstitution"
              value={formData.nameOfFinancialInstitution}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Branch Address: </label>
            <input
              type="text"
              name="branchAddress"
              value={formData.branchAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Type of Investment: </label>
            <input
              type="text"
              name="typeOfInvestment"
              value={formData.typeOfInvestment}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Number: </label>
            <input
              type="text"
              name="investmentNumber"
              value={formData.investmentNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Holder: </label>
            <input
              type="text"
              name="investmentHolder"
              value={formData.investmentHolder}
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
          <div>
            <label>Nominee Guardian: </label>
            <input
              type="text"
              name="nomineeGuardian"
              value={formData.nomineeGuardian}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Amount: </label>
            <input
              type="number"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Rate of Interest (in %): </label>
            <input
              type="number"
              name="rateOfInterest"
              value={formData.rateOfInterest}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Date: </label>
            <input
              type="date"
              name="investmentDate"
              value={formData.investmentDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Investment Duration (in months): </label>
            <input
              type="text"
              name="investmentDuration"
              value={formData.investmentDuration}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Maturity Date: </label>
            <input
              type="date"
              name="maturityDate"
              value={formData.maturityDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Maturity Amount: </label>
            <input
              type="number"
              name="maturityAmount"
              value={formData.maturityAmount}
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

export default InvestmentsForm;
