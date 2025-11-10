import { useState } from 'react';
import { string, oneOfType, object, number, instanceOf } from 'prop-types';
import ColorValue from '../../../components/ColorValues/ColorValue';
import { ChevronDownIcon, TrashIcon } from '../../../assets/icons';
import tinycolor from 'tinycolor2';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { useColorHistory } from '../../../hooks/useColorHistory';

const DropdownActionList = ({ color, transparency, className }) => {
  return (
    <div className={className || ''}>
      <ColorValue
        label="HEX"
        colorString={
          transparency < 100 ? color.toHex8String() : color.toHexString()
        }
      />
      <ColorValue label="RGB" colorString={color.toRgbString()} />
      <ColorValue label="RGB %" colorString={color.toPercentageRgbString()} />
      <ColorValue label="HSL" colorString={color.toHslString()} />
      <ColorValue label="HSV" colorString={color.toHsvString()} />
    </div>
  );
};

const HistoryItem = ({ color: inputColor, timestamp }) => {
  const color =
    inputColor instanceof tinycolor ? inputColor : tinycolor(inputColor);
  const { removeFromHistory } = useColorHistory();
  const [isOpen, setIsOpen] = useState(false);
  const backgroundColor = color.toRgbString();
  const transparency = color.getAlpha() * 100;

  const handleDelete = e => {
    e.stopPropagation();
    removeFromHistory(timestamp);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-3">
        <div
          className="w-10 h-10 rounded-lg mr-3 shadow-sm"
          style={{ backgroundColor }}
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between flex-1 text-left sm:hidden"
        >
          <span className="font-medium">Copy</span>
          <ChevronDownIcon
            className={`w-5 h-5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <div className="flex items-center gap-2">
          <Dropdown
            onToggle={() => setIsOpen(!isOpen)}
            className="max-sm:hidden"
          >
            <DropdownActionList
              color={color}
              transparency={transparency}
              // className="z-100 min-w-80 bg-white rounded-sm shadow-lg flex flex-col gap-0.5 p-0.5 top-12 right-0 hover:cursor-default"
            />
          </Dropdown>

          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
            aria-label="Delete color"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isOpen && (
        <DropdownActionList
          color={color}
          transparency={transparency}
          className="p-3 bg-gray-50 space-y-2 sm:hidden"
        />
      )}
    </div>
  );
};

DropdownActionList.propTypes = {
  color: instanceOf(tinycolor).isRequired,
  transparency: number.isRequired,
  className: string,
};

HistoryItem.propTypes = {
  color: oneOfType([string, object, instanceOf(tinycolor)]).isRequired,
  timestamp: string.isRequired,
};

export default HistoryItem;
