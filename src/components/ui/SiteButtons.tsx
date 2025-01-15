import React from 'react';
import Link from 'next/link';
import { Button } from './button'; // Импортируем компонент Button

interface SideButtonsProps {
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

const SideButtons: React.FC<SideButtonsProps> = ({ buttons, toggleLanguage, toggleRecipes, toggleTheme, isDarkMode }) => {
  if (!buttons) {
    return null; // Возвращаем null, если buttons не определен
  }

  return (
    <div className="hidden md:flex fixed left-4 top-1/2 transform -translate-y-1/2 flex-col space-y-2 z-50">
      <Link href="/blog">
        <Button
          className="px-2 py-1 rounded-full transition text-xs font-semibold tracking-wide"
          style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}
        >
          {buttons.blog}
        </Button>
      </Link>
      <Button
        onClick={toggleLanguage}
        className="px-2 py-1 rounded-full shadow-lg transition-all duration-300 text-xs font-semibold tracking-wide"
        style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}
      >
        {buttons.language}
      </Button>
      <Link href="/recipes">
        <Button
          onClick={toggleRecipes}
          className="px-2 py-1 rounded-full shadow-lg transition-all duration-300 text-xs font-semibold tracking-wide"
          style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}
        >
          {buttons.myRecipes}
        </Button>
      </Link>
      <Button
        onClick={toggleTheme}
        className="px-2 py-1 rounded-full shadow-lg transition-all duration-300 text-xs font-semibold tracking-wide"
        style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}
      >
        {isDarkMode ? buttons.lightMode : buttons.darkMode}
      </Button>
    </div>
  );
};

export default SideButtons;