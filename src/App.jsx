import { useState } from 'react';
import './App.css';
import ColorPicker from './screens/ColorPicker/ColorPicker';
import History from './screens/History/History';
import SegmentSwitch from './components/SegmentSwitch';
import LogoIcon from './components/LogoIcon';
import { ColorHistoryProvider } from './contexts/HistoryContext';

const App = () => {
  const screens = [
    { id: 'color-picker', label: 'Color Picker' },
    { id: 'history', label: 'History' },
  ];
  const [screen, setScreen] = useState(screens[0].id);

  return (
    <ColorHistoryProvider>
      <div className="min-h-screen bg-gray-100 p-4 pb-10">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
          <LogoIcon className="sm:absolute left-4 top-4 max-sm:mb-6" />
          <SegmentSwitch
            activeScreen={screen}
            onScreenChange={setScreen}
            screens={screens}
          />

          {screen === 'color-picker' && <ColorPicker />}
          {screen === 'history' && <History />}
        </div>
      </div>
    </ColorHistoryProvider>
  );
};

export default App;
