import React, { useEffect, useState } from 'react';
import { initializeDatabase, addData, fetchData } from '../../../server.js';
import './Investments.css';
import InvestmentsForm from './InvestmentsForm.jsx';
import jsPDF from 'jspdf'; 

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        const db = await initializeDatabase();

        const investmentsData = await fetchData(db, 'investments');
        if (investmentsData.length === 0) {
          await addData(db, 'investments', {
            financialOrganization: 'ABC Financials',
            financialInstitution: 'ABC Bank',
            branchAddress: '123 Main St, Springfield',
            typeOfInvestment: 'Fixed Deposit',
            investmentNumber: 'FD123456',
            investmentHolder: 'John Doe',
            nominee: 'Jane Doe',
            nomineeGuardian: 'N/A',
            investmentAmount: '$10,000',
            rateOfInvestment: '5%',
            investmentDate: '2025-01-01',
            investmentDuration: '5 years',
            maturityDate: '2030-01-01',
            maturityAmount: '$12,762',
          });

          await addData(db, 'investments', {
            financialOrganization: 'XYZ Financials',
            financialInstitution: 'XYZ Bank',
            branchAddress: '456 Elm St, Metropolis',
            typeOfInvestment: 'Mutual Fund',
            investmentNumber: 'MF789012',
            investmentHolder: 'Mary Smith',
            nominee: 'John Smith',
            nomineeGuardian: 'N/A',
            investmentAmount: '$20,000',
            rateOfInvestment: '8%',
            investmentDate: '2024-06-15',
            investmentDuration: '10 years',
            maturityDate: '2034-06-15',
            maturityAmount: '$43,178',
          });
        }

        setInvestments(await fetchData(db, 'investments'));
      } catch (error) {
        console.error('Error setting up the database:', error);
      }
    };

    setupDatabase();
  }, []);

  const downloadCSV = () => {
    const headers = [
      'Financial Organization',
      'Name of Financial Institution',
      'Branch Address',
      'Type of Investment',
      'Investment Number',
      'Investment Holder',
      'Nominee',
      'Nominee Guardian',
      'Investment Amount',
      'Rate of Investment',
      'Investment Date',
      'Investment Duration',
      'Maturity Date',
      'Maturity Amount',
    ];

    const rows = investments.map((investment) =>
      [
        investment.financialOrganization,
        investment.financialInstitution,
        investment.branchAddress,
        investment.typeOfInvestment,
        investment.investmentNumber,
        investment.investmentHolder,
        investment.nominee,
        investment.nomineeGuardian,
        investment.investmentAmount,
        investment.rateOfInvestment,
        investment.investmentDate,
        investment.investmentDuration,
        investment.maturityDate,
        investment.maturityAmount,
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'investments.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    let y = 10; // Vertical position in the PDF

    doc.setFontSize(12);
    doc.text('Investments Table', 10, y);
    y += 10;

    // table headers
    doc.text(
      'Financial Organization | Name of Financial Institution | Branch Address | Type of Investment | Investment Number | Investment Holder | Nominee | Nominee Guardian | Investment Amount | Rate of Investment | Investment Date | Investment Duration | Maturity Date | Maturity Amount',
      10,
      y,
      { maxWidth: 190 }
    );
    y += 10;

    // table rows
    investments.forEach((investment, index) => {
      const data = `${index + 1}. ${investment.financialOrganization}, ${investment.financialInstitution}, ${investment.branchAddress}, ${investment.typeOfInvestment}, ${investment.investmentNumber}, ${investment.investmentHolder}, ${investment.nominee}, ${investment.nomineeGuardian}, ${investment.investmentAmount}, ${investment.rateOfInvestment}, ${investment.investmentDate}, ${investment.investmentDuration}, ${investment.maturityDate}, ${investment.maturityAmount}`;
      doc.text(data, 10, y, { maxWidth: 190 });
      y += 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('investments.pdf');
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Financial Organization</th>
            <th>Name of Financial Institution</th>
            <th>Branch Address</th>
            <th>Type of Investment</th>
            <th>Investment Number</th>
            <th>Investment Holder</th>
            <th>Nominee</th>
            <th>Nominee Guardian</th>
            <th>Investment Amount</th>
            <th>Rate of Investment</th>
            <th>Investment Date</th>
            <th>Investment Duration</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
          </tr>
        </thead>
        <tbody>
          {investments.map((investment, index) => (
            <tr key={index}>
              <td>{investment.financialOrganization}</td>
              <td>{investment.financialInstitution}</td>
              <td>{investment.branchAddress}</td>
              <td>{investment.typeOfInvestment}</td>
              <td>{investment.investmentNumber}</td>
              <td>{investment.investmentHolder}</td>
              <td>{investment.nominee}</td>
              <td>{investment.nomineeGuardian}</td>
              <td>{investment.investmentAmount}</td>
              <td>{investment.rateOfInvestment}</td>
              <td>{investment.investmentDate}</td>
              <td>{investment.investmentDuration}</td>
              <td>{investment.maturityDate}</td>
              <td>{investment.maturityAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttonCluster">
        <button onClick={() => setShowForm(true)}>Add More</button>
        <button onClick={downloadCSV}>Download as CSV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>

      {showForm && <InvestmentsForm closeForm={() => setShowForm(false)} />}
    </div>
  );
}

export default Investments;
