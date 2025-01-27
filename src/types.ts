export interface Bible {
  id: string;
  name: string;
  language: {
    id: string;
    name: string;
  };
  description?: string;
  abbreviation?: string;
}

export interface VerseResponse {
  data: {
    id: string;
    orgId: string;
    bibleId: string;
    bookId: string;
    chapterIds: string[];
    reference: string;
    content: string;
    verseCount: number;
    copyright: string;
  };
}

export interface BiblesResponse {
  data: Bible[];
}