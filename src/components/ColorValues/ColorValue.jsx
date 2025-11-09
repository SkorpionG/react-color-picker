import { string, func, bool, oneOfType, node, element } from 'prop-types';
import tinycolor from 'tinycolor2';
import Copy from '../Copy';
import Dropdown from '../Dropdown/Dropdown';

const ColorValue = ({
  label,
  colorString,
  onCopy,
  dropdownMenu,
  colorPreview = true,
}) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    }

    const test = tinycolor(colorString);
    console.info(test.toHex8String()); // No issue transform to other color formats
    console.info(test.toHexString()); // No issue transform to other color formats
    console.info(test.toRgbString()); // No issue transform to other color formats
    console.info(test.toPercentageRgbString()); // Have issue transform to rgb and hex
    console.info(test.toHslString()); // Have issue sometimes when transform to other color formats except hsv.
    console.info(test.toHsvString()); // Have issue sometimes when transform to other color formats except hsl.
  };

  const copy = (
    <Copy
      label={label}
      value={colorString}
      onCopy={handleCopy}
      className={dropdownMenu ? 'shadow-none bg-transparent' : ''}
    />
  );

  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 rounded select-none">
      <div className="flex items-center">
        {colorPreview && (
          <span
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: tinycolor(colorString).toHex8String() }}
          ></span>
        )}
        <span className="text-sm font-medium mr-2">{label}:</span>
      </div>
      {dropdownMenu ? <Dropdown label={copy}>{dropdownMenu}</Dropdown> : copy}
    </div>
  );
};

ColorValue.propTypes = {
  label: string.isRequired,
  colorString: string.isRequired,
  onCopy: func,
  dropdownMenu: oneOfType([element, node]),
  colorPreview: bool,
};

export default ColorValue;
