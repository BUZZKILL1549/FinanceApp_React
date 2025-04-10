import React, { useEffect, useState } from 'react';
import { initializeDatabase, addData, fetchData } from '../../../server.js';
import './Insurance.css';
import InsuranceForm from './InsuranceForm.jsx';

function Insurance() {
  const [insurance, setInsurance] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await initializeDatabase();

        const insuranceData = await fetchData(db, 'insurance');
        if (insuranceData.length === 0) {
          await addData(db, 'insurance', {
            provider: 'ABC Insurance',
            policyNumber: '12345',
            policyName: 'Life Secure',
            policyHolder: 'John Doe',
            lifeInsured: 'John Doe',
            sumAssured: '$100,000',
            nominee: 'Jane Doe',
            paymentTerm: '10 years',
            paymentFrequency: 'Annual',
            lastPremiumPaid: '2025-01-01',
            nextPremiumDue: '2026-01-01',
            maturityDate: '2035-01-01',
            maturityAmount: '$150,000',
          });

          await addData(db, 'insurance', {
            provider: 'XYZ Insurance',
            policyNumber: '67890',
            policyName: 'Wealth Builder',
            policyHolder: 'Mary Smith',
            lifeInsured: 'Mary Smith',
            sumAssured: '$200,000',
            nominee: 'John Smith',
            paymentTerm: '15 years',
            paymentFrequency: 'Semi-Annual',
            lastPremiumPaid: '2024-12-01',
            nextPremiumDue: '2025-06-01',
            maturityDate: '2040-12-01',
            maturityAmount: '$300,000',
          });
        }

        setInsurance(await fetchData(db, 'insurance'));
      } catch (error) {
        console.error('Error setting up the database:', error);
      }
    };

    setupDatabase();
  }, []);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Insurance Provider</th>
            <th>Policy Number</th>
            <th>Policy Name</th>
            <th>Policy Holder</th>
            <th>Life Insured</th>
            <th>Sum Assured</th>
            <th>Nominee</th>
            <th>Policy Payment Term</th>
            <th>Premium Payment Frequency</th>
            <th>Last Premium Paid</th>
            <th>Next Premium Due</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
          </tr>
        </thead>
        <tbody>
          {insurance.map((policy, index) => (
            <tr key={index}>
              <td>{policy.provider}</td>
              <td>{policy.policyNumber}</td>
              <td>{policy.policyName}</td>
              <td>{policy.policyHolder}</td>
              <td>{policy.lifeInsured}</td>
              <td>{policy.sumAssured}</td>
              <td>{policy.nominee}</td>
              <td>{policy.paymentTerm}</td>
              <td>{policy.paymentFrequency}</td>
              <td>{policy.lastPremiumPaid}</td>
              <td>{policy.nextPremiumDue}</td>
              <td>{policy.maturityDate}</td>
              <td>{policy.maturityAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonCluster">
        <button onClick={() => setShowForm(true)}>Add More</button>
        <button>Download as CSV</button>
        <button>Download as PDF</button>
      </div>

      {showForm && <InsuranceForm closeForm={() => setShowForm(false)} />}
    </div>
  );
}

export default Insurance;
