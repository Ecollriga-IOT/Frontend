// Header.jsx
import React from 'react';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 w-full bg-[#c9dcf7] shadow-md">
      <div className="flex justify-between items-center h-12 px-8">
        <h1 className="text-3xl font-bold text-[#077eff]">
          <a href="/home">Ecollriga</a>
        </h1>
      </div>
    </div>
  );
};

export default Header;
