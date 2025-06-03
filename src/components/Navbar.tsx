import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '15px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            API Keys
          </button>
        </li>
        <li style={{ marginRight: '15px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            Scopes
          </button>
        </li>
        {/* Add more placeholder links as needed */}
      </ul>
    </nav>
  );
};

export default Navbar;