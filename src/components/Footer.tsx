"use client";

export default function Footer() {
  return (
    <footer className="w-full text-center py-4 flex flex-wrap justify-center items-center">
      <div className="border-t border-gray-700 w-full md:w-1/3"></div>
      <div className="text-sm px-4 whitespace-nowrap">
        web sushi master <a href="https://www.facebook.com/dima.fomin" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Dima Fomin</a>
      </div>
      <div className="border-t border-gray-700 w-full md:w-1/3"></div>
    </footer>
  );
}