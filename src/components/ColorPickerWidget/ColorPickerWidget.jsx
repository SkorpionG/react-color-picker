import { oneOf, oneOfType, object, string, func, instanceOf } from 'prop-types';
import { RgbaColorPicker } from 'react-colorful';
import tinycolor from 'tinycolor2';
import './ColorPickerWidget.css';

const COLOR_PICKER_TYPES = {
  HUE: 'hue',
  SATURATION: 'saturation',
  ALPHA: 'alpha',
};

const ColorPickerWidget = ({
  type: colorPickerType,
  id,
  className,
  color: inputColor,
  onChange: onColorChange,
}) => {
  const colorPickerTypes = Object.values(COLOR_PICKER_TYPES);
  const color = (
    inputColor instanceof tinycolor ? inputColor : tinycolor(inputColor)
  ).toRgb();

  return (
    <div
      className={`color-widget color-widget-${
        colorPickerTypes.includes(colorPickerType)
          ? colorPickerType
          : colorPickerTypes[0]
      } w-full rounded-lg ${className || ''}`}
      id={id}
    >
      <RgbaColorPicker color={color} onChange={onColorChange} />
    </div>
  );
};
ColorPickerWidget.propTypes = {
  type: oneOf(Object.values(COLOR_PICKER_TYPES)).isRequired,
  id: string,
  className: string,
  color: oneOfType([string, object, instanceOf(tinycolor)]).isRequired,
  onChange: func.isRequired,
};

export default ColorPickerWidget;
