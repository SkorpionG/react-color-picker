import { oneOfType, string, object, bool, instanceOf, func } from "prop-types";
import ColorValue from "./ColorValue";
import tinycolor from "tinycolor2";
import { useColorHistory } from "../../contexts/HistoryContext";
import { getContrastingColor } from "@uiw/color-convert";

const ColorDropdown = ({ color, colorPreview, onCopy }) => {
  const transparency = color.getAlpha() * 100;
  return (
    <>
      <ColorValue
        label={`HEX${transparency < 100 ? "A" : ""}`}
        colorString={
          transparency < 100 ? color.toHex8String() : color.toHexString()
        }
        colorPreview={colorPreview}
        onCopy={onCopy}
      />
      <ColorValue
        label="RGB"
        colorString={color.toRgbString()}
        colorPreview={colorPreview}
        onCopy={onCopy}
      />
      <ColorValue
        label="RGB %"
        colorString={color.toPercentageRgbString()}
        colorPreview={colorPreview}
        onCopy={onCopy}
      />
      <ColorValue
        label="HSL"
        colorString={color.toHslString()}
        colorPreview={colorPreview}
        onCopy={onCopy}
      />
      <ColorValue
        label="HSV"
        colorString={color.toHsvString()}
        colorPreview={colorPreview}
        onCopy={onCopy}
      />
    </>
  );
};

ColorDropdown.propTypes = {
  color: instanceOf(tinycolor).isRequired,
  colorPreview: bool,
  onCopy: func,
};

const ColorValues = ({ color: inputColor }) => {
  const color =
    inputColor instanceof tinycolor ? inputColor : tinycolor(inputColor);
  const colorName = color.toName();
  const { addToHistory } = useColorHistory();
  function handleCopy() {
    addToHistory(color);
  }

  const complementColor = color.complement();
  const contrastColor = tinycolor(getContrastingColor(color.toHexString()));

  return (
    <div
      className="color-values rounded-lg flex flex-col gap-1"
      id="color-values"
    >
      <ColorDropdown color={color} onCopy={handleCopy} />
      {colorName && (
        <ColorValue label="Name" colorString={colorName} onCopy={handleCopy} />
      )}
      <ColorValue
        label="Complementary"
        colorString={complementColor.toHexString()}
        dropdownMenu={<ColorDropdown color={complementColor} />}
      />
      <ColorValue
        label="Contrast"
        colorString={contrastColor.toHexString()}
        dropdownMenu={
          <ColorDropdown color={contrastColor} colorPreview={false} />
        }
      />
    </div>
  );
};
ColorValues.propTypes = {
  color: oneOfType([string, object]).isRequired,
};

export default ColorValues;
