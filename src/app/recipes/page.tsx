"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем компонент Link
import Image from 'next/image'; // Импортируем компонент Image
import Header from '../../components/Header'; // Импортируем компонент Header
import Footer from '../../components/Footer'; // Импортируем компонент Footer
import SideButtons from '../../components/ui/SiteButtons'; // Импортируем компонент SideButtons
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp'; // Импортируем компонент InputOTP
import { Button } from '@/components/ui/button'; // Импортируем компонент Button

const RecipesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [otpValues, setOtpValues] = useState<{ [key: number]: string }>({});
  const [visibleRecipes, setVisibleRecipes] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleLanguage = () => {
    // Логика переключения языка
  };

  const toggleRecipes = () => {
    // Логика переключения рецептов
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleOtpChange = (index: number, otp: string) => {
    setOtpValues({ ...otpValues, [index]: otp });
  };

  const verifyOtp = (index: number, correctOtp: string) => {
    if (otpValues[index] === correctOtp) {
      setVisibleRecipes({ ...visibleRecipes, [index]: true });
      alert("Access granted! Enjoy the recipe.");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  const buttons = {
    home: 'Home',
    blog: 'Blog',
    language: 'Language',
    myRecipes: 'My Recipes',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
  };

  const recipes = [
    {
      title: 'Recipe 1',
      description: 'This is a description of Recipe 1.',
      date: '2023-10-01',
      image: '/000012.jpg',
      correctOtp: '123456'
    },
    {
      title: 'Recipe 2',
      description: 'This is a description of Recipe 2.',
      date: '2023-10-02',
      image: '/000012.jpg',
      correctOtp: '654321'
    },
    {
      title: 'Recipe 3',
      description: 'This is a description of Recipe 3.',
      date: '2023-10-03',
      image: '/000012.jpg',
      correctOtp: '111111'
    },
    // Добавьте остальные рецепты
  ];

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col dark:bg-black dark:text-white">
      <Header
        title="Sushi Master - Recipes"
        buttons={buttons}
        toggleLanguage={toggleLanguage}
        toggleRecipes={toggleRecipes}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      <SideButtons
        buttons={buttons}
        toggleLanguage={toggleLanguage}
        toggleRecipes={toggleRecipes}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      {/* Ваш контент */}
      <div className="flex flex-col items-center flex-grow px-4 sm:px-6 lg:px-8">
        <main className='flex flex-col items-center justify-center w-full max-w-6xl py-24'>
          <div className='w-full'>
            <h1 className='text-4xl md:text-5xl font-semibold leading-tight text-center'>
              <span>My Recipes</span>
            </h1>
            <div className='mt-8 space-y-8'>
              {recipes.map((recipe, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-300 dark:border-gray-700 py-4">
                  <div className="w-full md:w-1/2 md:pr-4 flex justify-center md:justify-start mb-4 md:mb-0">
                    <Image src={recipe.image} alt={recipe.title} width={200} height={150} className="rounded-lg shadow-md" style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-4">
                    <h2 className='text-2xl font-bold'>{recipe.title}</h2>
                    <p className='text-gray-500 dark:text-gray-400'>{recipe.date}</p>
                    <p className='text-gray-700 dark:text-gray-300'>{recipe.description}</p>
                    {!visibleRecipes[index] && (
                      <div className="flex items-center space-x-4 mt-4">
                        <InputOTP value={otpValues[index] || ''} onChange={(otp) => handleOtpChange(index, otp)} maxLength={6}>
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, idx) => (
                              <InputOTPSlot key={idx} index={idx} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        <Button
                          onClick={() => verifyOtp(index, recipe.correctOtp)}
                          className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
                        >
                          Verify
                        </Button>
                      </div>
                    )}
                    <div className={`mt-4 ${!visibleRecipes[index] ? "blur-sm" : ""}`}>
                      <p>
                        Here is the rest of the recipe content that was hidden before. Follow these steps to make the dish:
                      </p>
                      <ul className="list-disc list-inside mt-2">
                        <li>Step 1: Prepare the ingredients.</li>
                        <li>Step 2: Mix the ingredients together.</li>
                        <li>Step 3: Cook the mixture over medium heat.</li>
                        <li>Step 4: Serve and enjoy your meal!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <div className="flex space-x-8 mt-8">
          <Link href="/" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Home
          </Link>
          <Link href="/blog" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Blog
          </Link>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default RecipesPage;