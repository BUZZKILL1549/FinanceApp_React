import React from 'react';
import './Investments.css';

function Investments() {
  const investmentsData = [
    {
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
    },
    {
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
    },
    {
      financialOrganization: 'PQR Investments',
      financialInstitution: 'PQR Finance Ltd.',
      branchAddress: '789 Oak St, Gotham',
      typeOfInvestment: 'Recurring Deposit',
      investmentNumber: 'RD345678',
      investmentHolder: 'Alice Johnson',
      nominee: 'Tom Johnson',
      nomineeGuardian: 'N/A',
      investmentAmount: '$5,000',
      rateOfInvestment: '6%',
      investmentDate: '2023-03-01',
      investmentDuration: '3 years',
      maturityDate: '2026-03-01',
      maturityAmount: '$5,955',
    },
    {
      financialOrganization: 'LMN Financials',
      financialInstitution: 'LMN Credit Union',
      branchAddress: '321 Pine St, Star City',
      typeOfInvestment: 'Stock Market',
      investmentNumber: 'SM567890',
      investmentHolder: 'Robert Brown',
      nominee: 'Emily Brown',
      nomineeGuardian: 'N/A',
      investmentAmount: '$15,000',
      rateOfInvestment: '15%',
      investmentDate: '2021-11-01',
      investmentDuration: '7 years',
      maturityDate: '2028-11-01',
      maturityAmount: '$37,177',
    },
    {
      financialOrganization: 'EFG Capital',
      financialInstitution: 'EFG Wealth Management',
      branchAddress: '654 Cedar St, Central City',
      typeOfInvestment: 'Bond',
      investmentNumber: 'BO901234',
      investmentHolder: 'Chris Green',
      nominee: 'Laura Green',
      nomineeGuardian: 'N/A',
      investmentAmount: '$50,000',
      rateOfInvestment: '4%',
      investmentDate: '2020-09-01',
      investmentDuration: '10 years',
      maturityDate: '2030-09-01',
      maturityAmount: '$60,744',
    },
  ];

  return (
    <>
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
          {investmentsData.map((investment, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
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
        <button>Add More</button>
        <button>Download as CSV</button>
        <button>Download as PDF</button>
      </div>
    </>
  );
}

export default Investments;
