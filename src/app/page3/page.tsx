"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем компонент Link
import Header from '../../components/Header'; // Импортируем компонент Header
import Footer from '../../components/Footer'; // Импортируем компонент Footer
import { Carousel, CarouselPrevious, CarouselContent, CarouselItem, CarouselNext } from '../../components/ui/carousel'; // Импортируем компоненты Carousel
import Image from 'next/image'; // Импортируем компонент Image
import { Button } from '../../components/ui/button'; // Импортируем компонент Button
import SideButtons from '../../components/ui/SiteButtons'; // Импортируем компонент SideButtons

const Page3 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

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

  const buttons = {
    home: 'Home',
    blog: 'Blog',
    language: 'Language',
    myRecipes: 'My Recipes',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
  };

  const pages = [
    { image: '/00029.jpg', title: 'Image 1' },
    { image: '/00030.jpg', title: 'Image 2' },
    { image: '/00031.jpg', title: 'Image 3' },
    // Добавьте остальные страницы
  ];

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col dark:bg-black dark:text-white">
      <Header
        title="Sushi Master - Page 3"
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
        <main className='flex flex-col md:flex-row items-center justify-center w-full max-w-6xl py-24'>
          <div className='flex-1 text-center md:text-left'>
            <div className='max-w-md mx-auto md:mx-0'>
              <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                <span>Sushi Master Dima Fomin - Page 3</span>
              </h1>
              <div className={`text-gray-500 text-lg mt-2 transition-opacity duration-300 ${isExpanded ? 'max-h-full' : 'max-h-20 overflow-hidden'}`}>
                <p className='block whitespace-pre-line'>About myself: I have been professionally involved in products for 20 years now, I have worked in different countries, I have seen many technologies on how to work and create new products.</p>
              </div>
              <Button
                onClick={toggleText}
                className="mt-4 px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide bg-gray-800 text-white hover:bg-gray-900"
              >
                {isExpanded ? 'Close' : 'Read More'}
              </Button>
            </div>
          </div>
          <div className='flex-1 mt-10 md:mt-0 relative w-full max-w-md mx-auto'>
            <Carousel>
              <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
              <CarouselContent>
                {pages.map((page, index) => (
                  <CarouselItem key={index}>
                    <Image
                      src={page.image}
                      alt={page.title}
                      width={400}
                      height={400}
                      className="rounded-lg object-cover"
                      priority
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 md:right-36" />
            </Carousel>
          </div>
        </main>
        <div className="flex space-x-8 mt-8">
          <Link href="/" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Page 1
          </Link>
          <Link href="/page2" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Page 2
          </Link>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Page3;