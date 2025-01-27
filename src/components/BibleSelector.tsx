import React from 'react';
import type { Bible } from '../types';

interface BibleSelectorProps {
  bibles: Bible[];
  selectedBible: string;
  onBibleChange: (bible: string) => void;
  book: string;
  chapter: string;
  verse: string;
  onBookChange: (book: string) => void;
  onChapterChange: (chapter: string) => void;
  onVerseChange: (verse: string) => void;
}

const BibleSelector: React.FC<BibleSelectorProps> = ({
  bibles,
  selectedBible,
  onBibleChange,
  book,
  chapter,
  verse,
  onBookChange,
  onChapterChange,
  onVerseChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={selectedBible}
        onChange={(e) => onBibleChange(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        {bibles.map((bible) => (
          <option key={bible.id} value={bible.id}>
            {bible.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={book}
        onChange={(e) => onBookChange(e.target.value.toUpperCase())}
        placeholder="Book (e.g., GEN)"
        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
      />

      <input
        type="number"
        value={chapter}
        onChange={(e) => onChapterChange(e.target.value)}
        placeholder="Chapter"
        min="1"
        className="bg-gray-800 text-white px-4 py-2 rounded-lg w-24"
      />

      <input
        type="number"
        value={verse}
        onChange={(e) => onVerseChange(e.target.value)}
        placeholder="Verse"
        min="1"
        className="bg-gray-800 text-white px-4 py-2 rounded-lg w-24"
      />
    </div>
  );
};

export default BibleSelector;