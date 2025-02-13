import { arrayOf, exact, func, string } from "prop-types";

const SegmentSwitch = ({ screens, activeScreen, onScreenChange }) => {
  return (
    <div className="flex justify-center select-none" id="segment-switch">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        {screens.map((screen) => (
          <button
            key={screen.id}
            onClick={() => onScreenChange(screen.id)}
            className={`
              px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer
              ${
                activeScreen === screen.id
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }
            `}
          >
            {screen.label}
          </button>
        ))}
      </div>
    </div>
  );
};

SegmentSwitch.propTypes = {
  screens: arrayOf(
    exact({
      id: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  activeScreen: string.isRequired,
  onScreenChange: func.isRequired,
};

export default SegmentSwitch;
