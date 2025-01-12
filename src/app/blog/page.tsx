"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Импортируем компонент Link
import Image from 'next/image'; // Импортируем компонент Image
import Header from '../../components/Header'; // Импортируем компонент Header
import Footer from '../../components/Footer'; // Импортируем компонент Footer
import SideButtons from '../../components/ui/SiteButtons'; // Импортируем компонент SideButtons
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'; // Импортируем компоненты Accordion

const BlogPage = () => {
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

  const blogs = [
    {
      title: 'Blog Post 1',
      content: `
        <ul class="list-disc pl-5">
          <li><strong>This blog is written for those who are ready to discover delicious combinations of flavors.</strong></li>
          <li>I want to tell and teach you how to cook new dishes that I invent and cook in order to surprise you, and share with you ideas and flavors.</li>
          <li>For every cook, the opportunity to create from what is at hand is always amazing and wonderful. Strict recipes limit creativity. Until recently, trial and error was the only way to find out which products will go well together.</li>
          <li>And decorating the family table with your creation is double the pleasure. Something new will always be a joy for your loved ones and friends. And no matter what you get as a result, you can be firmly sure of one thing: it will always be tasty and healthy.</li>
          <li>As in any business, the ability to handle equipment and knowledge of the technological process are also important here. Cooking is no different from other crafts: your tools can be bare hands, and your utensils can be products, but it is also important to know how they should act and interact with other components.</li>
          <li>I will tell you what products I work with and what benefits they bring to us. In order not to start from scratch, you can take these recipes as a basis and create new culinary masterpieces.</li>
          <li>Are you an experienced cook or a beginner? Whoever you are, I hope this Blog will help you to reveal your talents.</li>
          <li>Add a pinch of taste science to your dish of knowledge! Let this Blog open up a world of new gastronomic Tastes to you.</li>
        </ul>
      `,
      date: '2023-10-01',
      image: '/00031.jpg'
    },
    { title: 'Blog Post 2', content: 'Content of blog post 2', date: '2023-10-02', image: '/000012.jpg' },
    { title: 'Blog Post 3', content: 'Content of blog post 3', date: '2023-10-03', image: '/000012.jpg' },
    // Добавьте остальные блоги
  ];

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
                {blogs.map((blog, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <div className="flex justify-between items-center w-full">
                        <h2 className='text-2xl font-bold'>{blog.title}</h2>
                        <span className='flex items-center'>
                          <p className='text-gray-500 dark:text-gray-400 mr-4'>{blog.date}</p>
                          <Image src={blog.image} alt={blog.title} width={100} height={75} className="rounded-lg shadow-md ml-4" />
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='text-gray-700 dark:text-gray-300' dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </main>
        <div className="flex space-x-4 mt-8">
          <Link href="/" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide bg-blue-500 text-white hover:bg-blue-700">
            Home
          </Link>
          <Link href="/page2" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide bg-blue-500 text-white hover:bg-blue-700">
            Page 2
          </Link>
          <Link href="/page3" className="px-4 py-2 rounded-full shadow-lg transition-all duration-300 text-sm font-semibold tracking-wide bg-blue-500 text-white hover:bg-blue-700">
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