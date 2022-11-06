import {createContext, useEffect, useState} from "react";
import localforage from 'localforage';

export const JournalContext = createContext({
  moodScores: [],
  insertMoodScore: (score: number, title: string, entry: string, timestamp: Date) => {},
});

export function JournalProvider({ children }) {
  const [moodScores, setMoodScores] = useState([]);

  async function insertMoodScore(score: number, title: string, entry: string, timestamp: Date) {
    const newScores = [{score, title, entry, timestamp}, ...moodScores];
    await localforage.setItem('moodScores', newScores);
    setMoodScores(newScores);
  }

  useEffect(() => {
    localforage.getItem('moodScores')
      .then((moodScores: number[] | null) => {
        setMoodScores(moodScores || []);
      });
  }, []);

  return (
    <JournalContext.Provider value={{
      moodScores,
      insertMoodScore,
    }}>
      {children}
    </JournalContext.Provider>
  );
}