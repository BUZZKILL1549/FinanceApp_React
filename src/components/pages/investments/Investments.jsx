import React, { useEffect, useState } from 'react';
import { initializeDatabase, fetchData } from '../../../server.js'; 
import './Investments.css';
import InvestmentsForm from './InvestmentsForm.jsx';
import jsPDF from 'jspdf'; 

function Investments() {
  const [investments, setInvestments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [db, setDb] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const forceRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await initializeDatabase();
        setDb(database);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initDB();
    
    return () => {
      if (db) db.close();
    };
  }, []);

  useEffect(() => {
    const loadInvestments = async () => {
      if (!db) return;
      
      try {
        console.log('Attempting to fetch investments data...');
        const investmentsData = await fetchData(db, 'investments');
        console.log('Raw investments data received:', investmentsData);
        
        if (!Array.isArray(investmentsData)) {
          console.error('Received non-array data:', typeof investmentsData, investmentsData);
          setInvestments([]);
          return;
        }
        
        console.log('Setting investments state with data length:', investmentsData.length);
        setInvestments(investmentsData);
      } catch (error) {
        console.error('Error fetching investments:', error);
      }
    };

    loadInvestments();
  }, [db, showForm, refreshTrigger]);

  const downloadCSV = () => {
    const getDateTime = () => {
      const now = new Date();
      
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      return `${year}_${month}_${day}-${hours}_${minutes}`;
    };

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
      'Rate of Interest', 
      'Investment Date',
      'Investment Duration',
      'Maturity Date',
      'Maturity Amount',
    ];

    const rows = investments.map((investment) =>
      [
        investment.financialOrganization,
        investment.nameOfFinancialInstitution, 
        investment.branchAddress,
        investment.typeOfInvestment,
        investment.investmentNumber,
        investment.investmentHolder,
        investment.nominee,
        investment.nomineeGuardian,
        investment.investmentAmount,
        investment.rateOfInterest, 
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
    const filename = 'investments_' + getDateTime() + '.csv';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const getDateTime = () => {
      const now = new Date();
      
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      
      return `${year}_${month}_${day}-${hours}_${minutes}`;
    };

    const doc = new jsPDF();
    let y = 10; 

    doc.setFontSize(12);
    doc.text('Investments Table', 10, y);
    y += 10;

    doc.text('Investment Details', 10, y);
    y += 10;

    investments.forEach((investment, index) => {
      const data = `${index + 1}. ${investment.financialOrganization}, ${investment.nameOfFinancialInstitution}, ${investment.typeOfInvestment}, ${investment.investmentAmount}, ${investment.maturityDate}`;
      doc.text(data, 10, y, { maxWidth: 190 });
      y += 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });
    
    const filename = 'investments_' + getDateTime() + '.pdf';
    doc.save(filename);
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
            <th>Rate of Interest</th>
            <th>Investment Date</th>
            <th>Investment Duration</th>
            <th>Maturity Date</th>
            <th>Maturity Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(investments) && investments.length > 0 ? (
            investments.map((investment, index) => (
              <tr key={index}>
                <td>{investment.financialOrganization}</td>
                <td>{investment.nameOfFinancialInstitution}</td>
                <td>{investment.branchAddress}</td>
                <td>{investment.typeOfInvestment}</td>
                <td>{investment.investmentNumber}</td>
                <td>{investment.investmentHolder}</td>
                <td>{investment.nominee}</td>
                <td>{investment.nomineeGuardian}</td>
                <td>{investment.investmentAmount}</td>
                <td>{investment.rateOfInterest}</td>
                <td>{investment.investmentDate}</td>
                <td>{investment.investmentDuration}</td>
                <td>{investment.maturityDate}</td>
                <td>{investment.maturityAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14">No investments found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="buttonCluster">
        <button onClick={() => setShowForm(true)}>Add More</button>
        <button onClick={downloadCSV}>Download as CSV</button>
        <button onClick={downloadPDF}>Download as PDF</button>
      </div>

      {showForm && (
        <InvestmentsForm 
          db={db} 
          closeForm={() => {
            setShowForm(false);
            forceRefresh();
          }} 
        />
      )}
    </div>
  );
}

export default Investments;
