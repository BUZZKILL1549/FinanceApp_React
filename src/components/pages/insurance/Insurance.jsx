import React, { useEffect, useState } from 'react';
import { initializeDatabase, addData, fetchData } from '../../../server.js';
import './Insurance.css';
import InsuranceForm from './InsuranceForm.jsx';
import jsPDF from 'jspdf';

function Insurance() {
  const [insurance, setInsurance] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      setLoading(true);
      try {
        const db = await initializeDatabase();

        const insuranceData = await fetchData(db, 'insurance');
        if (insuranceData.length === 0) {
          await addData(db, 'insurance', {
            insuranceProvider: 'ABC Insurance',
            policyNumber: '12345',
            policyName: 'Life Secure',
            policyHolder: 'John Doe',
            lifeInsured: 'John Doe',
            sumAssured: '$100,000',
            nominee: 'Jane Doe',
            policyPaymentTerm: '10 years',
            premiumPaymentFrequency: 'Annual',
            lastPremiumPaid: '2025-01-01',
            nextPremiumDue: '2026-01-01',
            maturityDate: '2035-01-01',
            maturityAmount: '$150,000',
          });

          await addData(db, 'insurance', {
            insuranceProvider: 'XYZ Insurance',
            policyNumber: '67890',
            policyName: 'Wealth Builder',
            policyHolder: 'Mary Smith',
            lifeInsured: 'Mary Smith',
            sumAssured: '$200,000',
            nominee: 'John Smith',
            policyPaymentTerm: '15 years',
            premiumPaymentFrequency: 'Semi-Annual',
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
      setLoading(false);
    };

    setupDatabase();
  }, []);

  const addInsurance = async (newPolicy) => {
    console.log('Adding insurance data:', newPolicy);

    try {
      const db = await initializeDatabase();
      const tx = db.transaction('insurance', 'readwrite');
      const store = tx.objectStore('insurance');
      const request = store.add(newPolicy);

      request.onsuccess = async () => {
        console.log('Data added successfully to IndexedDB:', newPolicy);

        const updatedData = await fetchData(db, 'insurance'); 
        console.log('Updated data:', updatedData);
        setInsurance(updatedData); 
      };

      request.onerror = (event) => {
        console.error('Error adding data to IndexedDB:', event.target.error);
      };
    } catch (error) {
      console.error('Error in addInsurance:', error);
    }
  };

  const downloadCSV = () => {
    const headers = [
      'Insurance Provider',
      'Policy Number',
      'Policy Name',
      'Policy Holder',
      'Life Insured',
      'Sum Assured',
      'Nominee',
      'Policy Payment Term',
      'Premium Payment Frequency',
      'Last Premium Paid',
      'Next Premium Due',
      'Maturity Date',
      'Maturity Amount',
    ];

    const rows = insurance.map((policy) =>
      [
        policy.insuranceProvider,
        policy.policyNumber,
        policy.policyName,
        policy.policyHolder,
        policy.lifeInsured,
        policy.sumAssured,
        policy.nominee,
        policy.policyPaymentTerm,
        policy.premiumPaymentFrequency,
        policy.lastPremiumPaid,
        policy.nextPremiumDue,
        policy.maturityDate,
        policy.maturityAmount,
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'insurance.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10; 

    doc.setFontSize(12);
    doc.text('Insurance Table', 10, y);
    y += 10;

    doc.text(
      'Insurance Provider | Policy Number | Policy Name | Policy Holder | Life Insured | Sum Assured | Nominee | Policy Payment Term | Premium Payment Frequency | Last Premium Paid | Next Premium Due | Maturity Date | Maturity Amount',
      10,
      y,
      { maxWidth: 190 }
    );
    y += 10;

    insurance.forEach((policy, index) => {
      const data = `${index + 1}. ${policy.insuranceProvider}, ${policy.policyNumber}, ${policy.policyName}, ${policy.policyHolder}, ${policy.lifeInsured}, ${policy.sumAssured}, ${policy.nominee}, ${policy.policyPaymentTerm}, ${policy.premiumPaymentFrequency}, ${policy.lastPremiumPaid}, ${policy.nextPremiumDue}, ${policy.maturityDate}, ${policy.maturityAmount}`;
      doc.text(data, 10, y, { maxWidth: 190 });
      y += 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('insurance.pdf');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

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
          {insurance.map((policy) => (
            <tr key={policy.policyNumber}>
              <td>{policy.insuranceProvider}</td>
              <td>{policy.policyNumber}</td>
              <td>{policy.policyName}</td>
              <td>{policy.policyHolder}</td>
              <td>{policy.lifeInsured}</td>
              <td>{policy.sumAssured}</td>
              <td>{policy.nominee}</td>
              <td>{policy.policyPaymentTerm}</td>
              <td>{policy.premiumPaymentFrequency}</td>
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
        <button onClick={downloadCSV}>Download as CSV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>

      {showForm && (
        <InsuranceForm
          closeForm={() => setShowForm(false)}
          addInsurance={addInsurance}
        />
      )}
    </div>
  );
}

export default Insurance;
