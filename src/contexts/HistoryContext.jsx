import { createContext, useState, useEffect } from 'react';
import { node, element, oneOfType } from 'prop-types';
import tinycolor from 'tinycolor2';

const ColorHistoryContext = createContext();

const STORAGE_KEY = 'copiedColorHistory';

// Helper function to load color history from local storage
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    // Filter out invalid colors during load
    return parsed
      .map(item => ({
        color: tinycolor(item.color),
        timestamp: item.timestamp,
      }))
      .filter(item => item.color.isValid());
  } catch (error) {
    console.error('Failed to load color history from local storage:', error);
    return [];
  }
};

// Helper function to save color history to local storage
const saveToLocalStorage = colorHistory => {
  try {
    const serialized = colorHistory.map(item => ({
      color: item.color.toHexString(),
      timestamp: item.timestamp,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Failed to save color history to local storage:', error);
  }
};

export const ColorHistoryProvider = ({ children }) => {
  const [colorHistory, setColorHistory] = useState(loadFromLocalStorage);

  // Save to local storage whenever color history changes
  useEffect(() => {
    saveToLocalStorage(colorHistory);
  }, [colorHistory]);

  const addToHistory = color => {
    const tinyColor = color instanceof tinycolor ? color : tinycolor(color);

    // Validate color before adding
    if (!tinyColor.isValid()) {
      console.warn('Invalid color provided to addToHistory:', color);
      return;
    }

    setColorHistory(prevColors => {
      if (
        prevColors.length !== 0 &&
        prevColors.some(({ color: c }) => tinycolor.equals(c, tinyColor))
      ) {
        console.info('Color already exists in history');
        return prevColors;
      }
      const newHistory = [
        { color: tinyColor, timestamp: Date.now().toString() },
        ...prevColors.map(colorObj => ({
          color: colorObj.color.clone(),
          timestamp: colorObj.timestamp,
        })),
      ];
      return newHistory.slice(0, 20); // Keep only the last 20 colors
    });
  };

  const removeFromHistory = timestamp => {
    setColorHistory(prevColors =>
      prevColors.filter(item => item.timestamp !== timestamp)
    );
  };

  const clearHistory = () => {
    setColorHistory([]);
  };

  return (
    <ColorHistoryContext.Provider
      value={{ colorHistory, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </ColorHistoryContext.Provider>
  );
};

ColorHistoryProvider.propTypes = {
  children: oneOfType([node, element]).isRequired,
};

export default ColorHistoryContext;
