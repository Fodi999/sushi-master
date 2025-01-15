"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем компонент Link
import Image from 'next/image'; // Импортируем компонент Image
import Header from '../../components/Header'; // Импортируем компонент Header
import Footer from '../../components/Footer'; // Импортируем компонент Footer
import SideButtons from '../../components/ui/SiteButtons'; // Импортируем компонент SideButtons
import MobileButtons from '../../components/ui/MobileButtons'; // Импортируем компонент MobileButtons
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp'; // Импортируем компонент InputOTP
import { Button } from '@/components/ui/button'; // Импортируем компонент Button

interface Recipe {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  correctOtp: string;
  content: string[];
  ingredients: { product: string; cookingTechnology: string; weight: number }[];
  verifyButtonText: string;
  hiddenContentText: string;
  tableHeaders: {
    product: string;
    cookingTechnology: string;
    weight: string;
  };
  pageTitle: string;
}

interface RecipesData {
  recipes: Recipe[];
  buttons: {
    home: string;
    blog: string;
    language: string;
    myRecipes: string;
    lightMode: string;
    darkMode: string;
  };
}

const RecipesPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [otpValues, setOtpValues] = useState<{ [key: number]: string }>({});
  const [visibleRecipes, setVisibleRecipes] = useState<{ [key: number]: boolean }>({});
  const [language, setLanguage] = useState('en');
  const [currentData, setCurrentData] = useState<RecipesData | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    loadLanguageData(savedLanguage || 'en');
    loadButtonsData(savedLanguage || 'en');
  }, []);

  const loadLanguageData = async (lang: string) => {
    try {
      const data = await import(`../../data/${lang}/recipes.json`);
      if (data.default) {
        setCurrentData((prevData) => ({
          ...prevData,
          recipes: data.default.recipes,
          buttons: prevData?.buttons || {
            home: '',
            blog: '',
            language: '',
            myRecipes: '',
            lightMode: '',
            darkMode: '',
          },
        }));
      } else {
        console.error("Data format is incorrect:", data);
      }
    } catch (error) {
      console.error("Error loading language data:", error);
    }
  };

  const loadButtonsData = async (lang: string) => {
    try {
      const data = await import(`../../data/${lang}/buttons.json`);
      if (data.default) {
        setCurrentData((prevData) => ({
          ...prevData,
          buttons: data.default,
          recipes: prevData?.recipes || [],
        }));
      } else {
        console.error("Data format is incorrect:", data);
      }
    } catch (error) {
      console.error("Error loading buttons data:", error);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'pl' : language === 'pl' ? 'ru' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    loadLanguageData(newLanguage);
    loadButtonsData(newLanguage);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!currentData || !Array.isArray(currentData.recipes)) {
    return <div>Loading...</div>;
  }

  const { buttons } = currentData;

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
      <MobileButtons
        buttons={buttons}
        toggleLanguage={toggleLanguage}
        toggleRecipes={toggleRecipes}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
      {/* Ваш контент */}
      <div className="flex flex-col items-center flex-grow px-4 sm:px-6 lg:px-8">
        <main className='flex flex-col items-center justify-center w-full max-w-6xl py-24'>
          <div className='w-full'>
            <h1 className='text-4xl md:text-5xl font-semibold leading-tight text-center'>
              <span>{currentData.recipes[0]?.pageTitle || "Recipes"}</span>
            </h1>
            <div className='mt-8 space-y-8'>
              {currentData.recipes.map((recipe) => (
                <div key={recipe.id} className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-300 dark:border-gray-700 py-4">
                  <div className="w-full md:w-1/2 md:pr-4 flex justify-center md:justify-start mb-4 md:mb-0">
                    <Image src={recipe.image} alt={recipe.title} width={200} height={150} className="rounded-lg shadow-md" style={{ width: 'auto', height: 'auto' }} />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-4">
                    <h2 className='text-2xl font-bold'>{recipe.title}</h2>
                    <p className='text-gray-500 dark:text-gray-400'>{recipe.date}</p>
                    <p className='text-gray-700 dark:text-gray-300'>{recipe.description}</p>
                    {!visibleRecipes[recipe.id] && (
                      <div className="flex items-center space-x-4 mt-4">
                        <InputOTP value={otpValues[recipe.id] || ''} onChange={(otp) => handleOtpChange(recipe.id, otp)} maxLength={6}>
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, idx) => (
                              <InputOTPSlot key={idx} index={idx} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        <Button
                          onClick={() => verifyOtp(recipe.id, recipe.correctOtp)}
                          className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
                        >
                          {recipe.verifyButtonText}
                        </Button>
                      </div>
                    )}
                    <div className={`mt-4 ${!visibleRecipes[recipe.id] ? "blur-sm" : ""}`}>
                      <p>
                        {recipe.hiddenContentText}
                      </p>
                      <ul className="list-disc list-inside mt-2">
                        {recipe.content.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                      {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <table className="table-fixed mt-4 w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2">{recipe.tableHeaders?.product || "Product"}</th>
                              <th className="px-4 py-2">{recipe.tableHeaders?.cookingTechnology || "Cooking Technology"}</th>
                              <th className="px-4 py-2">{recipe.tableHeaders?.weight || "Weight (g)"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recipe.ingredients.map((ingredient, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2">{ingredient.product}</td>
                                <td className="border px-4 py-2">{ingredient.cookingTechnology}</td>
                                <td className="border px-4 py-2">{ingredient.weight}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
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
