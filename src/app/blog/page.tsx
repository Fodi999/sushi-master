"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем компонент Link
import Image from 'next/image'; // Импортируем компонент Image
import Header from '../../components/Header'; // Импортируем компонент Header
import Footer from '../../components/Footer'; // Импортируем компонент Footer
import SideButtons from '../../components/ui/SiteButtons'; // Импортируем компонент SideButtons
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Импортируем компоненты Accordion

interface Blog {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
}

interface Button {
  href: string;
  label: string;
}

interface BlogsData {
  blogs: Blog[];
  buttons: Button[];
}

const BlogPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currentData, setCurrentData] = useState<BlogsData | null>(null);
  const [buttons, setButtons] = useState<{
    home: string;
    blog: string;
    language: string;
    myRecipes: string;
    lightMode: string;
    darkMode: string;
  } | null>(null);

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
    const data = await import(`../../data/${lang}/blogs.json`);
    setCurrentData(data.default);
  };

  const loadButtonsData = async (lang: string) => {
    const data = await import(`../../data/${lang}/buttons.json`);
    setButtons(data.default);
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

  if (!currentData || !buttons) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col dark:bg-black dark:text-white">
      <Header
        title="Sushi Master - Blog"
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
              <span>My Blog</span>
            </h1>
            <div className='mt-8 space-y-8'>
              <Accordion type="single" collapsible>
                {currentData.blogs.map((blog) => (
                  <AccordionItem key={blog.id} value={`item-${blog.id}`}>
                    <AccordionTrigger>
                      <div className="flex justify-between items-center w-full">
                        <h2 className='text-2xl font-bold'>{blog.title}</h2>
                        <span className='flex items-center'>
                          <p className='text-gray-500 dark:text-gray-400 mr-4'>{blog.date}</p>
                          <Image src={blog.image} alt={blog.title} width={100} height={75} className="rounded-lg shadow-md ml-4" style={{ width: 'auto', height: 'auto' }} priority />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='text-gray-700 dark:text-gray-300' dangerouslySetInnerHTML={{ __html: blog.content }} />
                      <div className="border-b-2 border-gray-300 my-4"></div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>
        <div className="flex space-x-4 mt-8">
          <Link href="/" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Page 1
          </Link>
          <Link href="/page2" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Page 2
          </Link>
          <Link href="/page3" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide"
            style={{ backgroundColor: 'var(--button-bg)', color: 'var(--button-text)', textTransform: 'uppercase', opacity: 0.7 }}>
            Page 3
          </Link>
        </div>
      </div>
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPage;