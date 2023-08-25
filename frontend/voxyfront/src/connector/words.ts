import { Text } from '@chakra-ui/react';

const STORAGE_HISTORY_KEY = 'voxyTestHistory';

export type WordsHistory = {
  id: string | number;
  text: string;
  wordsQtd: number;
}

export const getFrontWords = (): WordsHistory[] => {
  const storageItems = localStorage.getItem(STORAGE_HISTORY_KEY);
  if(storageItems) {
    const items: WordsHistory[] = JSON.parse(storageItems);
    if(items) {
      items.sort((a,b) => Number(b.id) - Number(a.id))
      return items;
    }
  }
  return [];
}

export const getBackWords = async (): Promise<WordsHistory[]> => {
  const res = await fetch('api/words', { method: 'GET' });
  const data = await res.json();
  return data['results'] || [];
}

function countWords(str: string) {
  const arr = str.split(' ');
  return arr.filter(word => word !== '' && word.length > 0).length;
}

export const clearFrontWord = async (): Promise<null> => {
  localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify([]));
  return null;
}

export const clearBackWord = async (): Promise<null> => {
  await fetch('api/words', { method: 'DELETE' });
  return null;
}

export const newFrontWord = async (text: string): Promise<WordsHistory> => {
  const items = getFrontWords();
  const nextId = items.length + 1;
  const newItem = {text, id: nextId, wordsQtd: countWords(text)};
  items.push(newItem);

  localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(items));
  return newItem;
}

export const newBackWord = async (text:string): Promise<WordsHistory> => {
  const res = await fetch('api/words', { method: 'POST', body: JSON.stringify({text})});
  const data = await res.json();
  return data;
}