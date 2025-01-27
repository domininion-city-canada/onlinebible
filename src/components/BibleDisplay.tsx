import React from 'react';

interface BibleDisplayProps {
  verseText: string;
  reference: string;
}

const BibleDisplay: React.FC<BibleDisplayProps> = ({ verseText, reference }) => {
  // Add space after verse numbers (e.g., "1 In the beginning...")
  const formattedText = verseText.replace(/^(\d+)/, '$1 ');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black p-4">
      <div className="flex flex-col items-center">
        <p className="text-4xl md:text-6xl lg:text-7xl text-white text-center font-bold max-w-4xl mb-8 leading-tight">
          {formattedText || 'Loading...'}
        </p>
        <p className="text-2xl md:text-3xl text-gray-400 font-medium">
          {reference}
        </p>
      </div>
    </div>
  );
};

export default BibleDisplay;