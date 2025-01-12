import React from 'react';
import Link from 'next/link';
import { Button } from './button'; // Импортируем компонент Button

interface MobileButtonsProps {
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
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileButtons: React.FC<MobileButtonsProps> = ({ buttons, toggleLanguage, toggleRecipes, toggleTheme, isDarkMode, isMenuOpen, toggleMenu }) => {
  return (
    <>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white bg-opacity-90 dark:bg-black dark:bg-opacity-90 text-black dark:text-white flex justify-center py-4 z-50">
          <div className="flex space-x-2">
            <Link href="/">
              <Button
                className="px-2 py-1 rounded-full transition text-sm"
                style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', opacity: 0.7 }}
                onClick={toggleMenu}
              >
                {buttons.home}
              </Button>
            </Link>
            <Link href="/recipes">
            <Button
              onClick={toggleRecipes}
              className="px-2 py-1 rounded-full transition text-sm"
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', opacity: 0.7 }}
            >
              {buttons.myRecipes}
            </Button>
            </Link>
            <Button
              onClick={toggleLanguage}
              className="px-2 py-1 rounded-full transition text-sm"
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', opacity: 0.7 }}
            >
              {buttons.language}
            </Button>
            <Link href="/blog">
              <Button
                className="px-2 py-1 rounded-full transition text-sm"
                style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', opacity: 0.7 }}
                onClick={toggleMenu}
              >
                {buttons.blog}
              </Button>
            </Link>
            <button
              className="px-2 py-1 rounded-full transition text-sm"
              style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', opacity: 0.7 }}
              onClick={() => { toggleTheme(); toggleMenu(); }}
            >
              {isDarkMode ? buttons.lightMode : buttons.darkMode}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileButtons;