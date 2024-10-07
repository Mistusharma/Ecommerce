// src/components/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { MdBorderColor } from 'react-icons/md';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header style={headerStyle}>
      <div style={navStyle}>
        <Link href="/home" style={linkStyle}>
          Home
        </Link>
        <Link href="/cart" style={linkStyle}>
          <FaShoppingCart size={24} />
        </Link>
      </div>

      <form onSubmit={handleSearchSubmit} style={searchFormStyle}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchInputStyle}
        />
        <button type="submit" style={searchButtonStyle}>
          Search
        </button>
      </form>
    </header>
  );
};

// Inline Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#0070f3',
  color: '#fff',
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: '20px',
  fontSize: '18px',
};

const searchFormStyle = {
  display: 'flex',
  alignItems: 'center',
  color:'black',
};

const searchInputStyle = {
  padding: '5px',
  colr:'black',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginRight: '10px',
};

const searchButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#0070f3',
  borderColor:'black',
  borderWith:'22px',
  color: 'black',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Header;
