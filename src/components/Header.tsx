"use client";

import React, { useState } from 'react';
import MobileButtons from './ui/MobileButtons';

interface HeaderProps {
  title: string;
  buttons: {
    home: string;
    blog: string;
    language: string;
    myRecipes: string;
    lightMode: string;
    darkMode: string;
  };
  toggleLanguage: () => void;
  toggleRecipes: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, buttons, toggleLanguage, toggleRecipes, toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-800 relative">
      <h1 className="text-lg font-bold">{title}</h1>
      <button onClick={toggleMenu} className="md:hidden px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide bg-gray-800 text-white hover:bg-gray-900">
        Menu
      </button>
      <MobileButtons
        buttons={buttons}
        toggleLanguage={toggleLanguage}
        toggleRecipes={toggleRecipes}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

export default Header;