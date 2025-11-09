import { oneOfType, string, object, instanceOf } from 'prop-types';
import tinycolor from 'tinycolor2';

const ColorPreview = ({ color: inputColor }) => {
  // Check if the color is a tinycolor instance
  // If not, convert it to a tinycolor instance
  const backgroundColor = (
    inputColor instanceof tinycolor ? inputColor : tinycolor(inputColor)
  ).toRgbString();
  const previewStyle = {
    backgroundColor,
  };

  return (
    <div className="w-full h-24 rounded-lg shadow-inner" style={previewStyle}>
      <div
        className="w-full h-full rounded-lg"
        style={{
          background: 'repeating-comb-4x4 #e5e7eb #ffffff',
        }}
      />
    </div>
  );
};

ColorPreview.propTypes = {
  color: oneOfType([string, object, instanceOf(tinycolor)]).isRequired,
};

export default ColorPreview;
