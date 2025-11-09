import { createContext, useState } from 'react';
import { node, element, oneOfType } from 'prop-types';
import tinycolor from 'tinycolor2';

const ColorHistoryContext = createContext();

export const ColorHistoryProvider = ({ children }) => {
  const [colorHistory, setColorHistory] = useState([]);

  const addToHistory = color => {
    const tinyColor = color instanceof tinycolor ? color : tinycolor(color);
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

  return (
    <ColorHistoryContext.Provider value={{ colorHistory, addToHistory }}>
      {children}
    </ColorHistoryContext.Provider>
  );
};

ColorHistoryProvider.propTypes = {
  children: oneOfType([node, element]).isRequired,
};

export default ColorHistoryContext;
