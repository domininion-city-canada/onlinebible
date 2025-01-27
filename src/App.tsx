import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import BibleDisplay from './components/BibleDisplay';
import BibleSelector from './components/BibleSelector';
import { fetchBibles, fetchVerse } from './services/bibleApi';
import type { Bible } from './types';

function App() {
  const [bibles, setBibles] = useState<Bible[]>([]);
  const [selectedBible, setSelectedBible] = useState('');
  const [book, setBook] = useState('GEN');
  const [chapter, setChapter] = useState('1');
  const [verse, setVerse] = useState('1');
  const [verseText, setVerseText] = useState('');
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBibles = async () => {
      setIsLoading(true);
      const data = await fetchBibles();
      setBibles(data);
      if (data.length > 0) {
        setSelectedBible(data[0].id);
      }
      setIsLoading(false);
    };
    loadBibles();
  }, []);

  useEffect(() => {
    const loadVerse = async () => {
      if (selectedBible && !isLoading) {
        setVerseText('Loading...');
        const text = await fetchVerse(selectedBible, book, chapter, verse);
        setVerseText(text);
      }
    };
    loadVerse();
  }, [selectedBible, book, chapter, verse, isLoading]);

  const toggleControls = () => {
    setIsControlsVisible(!isControlsVisible);
  };

  const navigateVerse = (direction: 'prev' | 'next') => {
    const currentVerse = parseInt(verse);
    if (direction === 'prev' && currentVerse > 1) {
      setVerse((currentVerse - 1).toString());
    } else if (direction === 'next') {
      setVerse((currentVerse + 1).toString());
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {isControlsVisible && (
        <div className="fixed top-0 left-0 right-0 bg-gray-900 p-4 shadow-lg z-10">
          <BibleSelector
            bibles={bibles}
            selectedBible={selectedBible}
            onBibleChange={setSelectedBible}
            book={book}
            chapter={chapter}
            verse={verse}
            onBookChange={setBook}
            onChapterChange={setChapter}
            onVerseChange={setVerse}
          />
        </div>
      )}

      <button
        onClick={toggleControls}
        className="fixed top-4 right-4 z-20 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <Search className="w-6 h-6" />
      </button>

      <div className="fixed left-4 right-4 bottom-8 flex justify-center gap-4 z-20">
        <button
          onClick={() => navigateVerse('prev')}
          className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:hover:bg-gray-800"
          disabled={verse === '1'}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => navigateVerse('next')}
          className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <BibleDisplay
        verseText={verseText}
        reference={`${book} ${chapter}:${verse}`}
      />
    </div>
  );
}

export default App;