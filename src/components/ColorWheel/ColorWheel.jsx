import { useState, useEffect } from "react";
import { oneOfType, string, func, object, instanceOf } from "prop-types";
import Wheel from "@uiw/react-color-wheel";
import { hsvaToRgba, rgbaToHsva } from "@uiw/color-convert";
import tinycolor from "tinycolor2";
import "./ColorWheel.css";

const ColorWheel = ({ color: inputColor, onChange: onColorChange }) => {
  const color = (
    inputColor instanceof tinycolor ? inputColor : tinycolor(inputColor)
  ).toRgb();
  const [wheelSize, setWheelSize] = useState(300);
  const hsvaColor = rgbaToHsva(color);
  const wheelColor = {
    h: hsvaColor.h,
    s: hsvaColor.s,
    v: 100,
    a: 1,
  };

  useEffect(() => {
    const updateSize = () => {
      const size = window.innerWidth < 768 ? 250 : 300;
      setWheelSize(size);
    };

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleColorChange = (value) => {
    onColorChange({ ...hsvaToRgba(value.hsva), a: color.a });
  };

  return (
    <div
      className="color-wheel w-full flex flex-col items-center"
      id="color-wheel"
    >
      <Wheel
        width={wheelSize}
        height={wheelSize}
        color={wheelColor}
        onChange={handleColorChange}
      />
    </div>
  );
};
ColorWheel.propTypes = {
  color: oneOfType([string, object, instanceOf(tinycolor)]).isRequired,
  onChange: func.isRequired,
};

export default ColorWheel;
