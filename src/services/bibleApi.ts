import type { Bible, BiblesResponse, VerseResponse } from '../types';

const API_KEY = 'b56e1f892b3c13740964d786029f6336';
const BASE_URL = 'https://api.scripture.api.bible/v1';

const ALLOWED_BIBLE_IDS = [
  'de4e12af7f28f599-01', // King James (KJV)
  '95410db44ef800c1-01', // Amplified Bible (AMP)
  '40072c4a5aba4022-01', // New King James Version (NKJV)
];

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const fetchBibles = async (): Promise<Bible[]> => {
  try {
    const response = await fetch(`${BASE_URL}/bibles`, {
      headers: {
        'api-key': API_KEY,
      },
    });
    
    const data = await handleApiResponse<BiblesResponse>(response);
    return (data.data || []).filter(bible => ALLOWED_BIBLE_IDS.includes(bible.id));
  } catch (error) {
    console.error('Error fetching bibles:', error);
    return [];
  }
};

const formatVerseId = (book: string, chapter: string, verse: string): string => {
  // Ensure book is uppercase and remove any spaces
  const formattedBook = book.trim().toUpperCase();
  // Ensure chapter and verse are valid numbers
  const formattedChapter = chapter.replace(/[^0-9]/g, '');
  const formattedVerse = verse.replace(/[^0-9]/g, '');
  return `${formattedBook}.${formattedChapter}.${formattedVerse}`;
};

export const fetchVerse = async (bibleId: string, book: string, chapter: string, verse: string): Promise<string> => {
  try {
    if (!bibleId || !book || !chapter || !verse) {
      return 'Please select a Bible version and enter a valid reference';
    }

    if (!ALLOWED_BIBLE_IDS.includes(bibleId)) {
      return 'Invalid Bible version selected';
    }

    const verseId = formatVerseId(book, chapter, verse);
    console.log('Fetching verse:', { bibleId, verseId });
    
    const response = await fetch(
      `${BASE_URL}/bibles/${bibleId}/verses/${verseId}`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );
    
    if (response.status === 404) {
      return 'Verse not found. Please check the reference.';
    }
    
    const data = await handleApiResponse<VerseResponse>(response);
    
    if (!data.data?.content) {
      console.error('No verse content in response:', data);
      return 'Verse content not available';
    }
    
    // Remove HTML tags and clean up the content
    const cleanContent = data.data.content
      .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return cleanContent;
  } catch (error) {
    console.error('Error fetching verse:', {
      error,
      params: { bibleId, book, chapter, verse }
    });
    if (error instanceof Error) {
      return `Unable to load verse. Please try again.`;
    }
    return 'Error loading verse';
  }
};