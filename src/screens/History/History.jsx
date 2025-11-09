import { useColorHistory } from '../../hooks/useColorHistory';
import HistoryItem from './components/HistoryItem';

const History = () => {
  const { colorHistory } = useColorHistory();

  return (
    <div className="mt-6">
      {colorHistory.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No copied colors.</div>
      ) : (
        <div className="space-y-3">
          {colorHistory.map(({ color, timestamp }) => (
            <HistoryItem key={timestamp} color={color} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
