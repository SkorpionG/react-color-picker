import { useColorHistory } from '../../hooks/useColorHistory';
import HistoryItem from './components/HistoryItem';

const History = () => {
  const { colorHistory, clearHistory } = useColorHistory();

  return (
    <div className="mt-6">
      {colorHistory.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No copied colors.</div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              onClick={clearHistory}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-3">
            {colorHistory.map(({ color, timestamp }) => (
              <HistoryItem
                key={timestamp}
                color={color}
                timestamp={timestamp}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
