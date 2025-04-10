import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.heading}>Finance App</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/insurance" style={styles.link}>Insurance</Link></li>
        <li><Link to="/investments" style={styles.link}>Investments</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: '#fff',
    fontFamily: 'sans-serif, Arial',
  },
  heading: {
    fontSize: '20px',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '17px',
  },
};

export default Navbar;
