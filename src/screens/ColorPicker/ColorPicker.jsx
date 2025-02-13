import { useState, useEffect } from "react";
import { styled } from "styled-components";
import tinycolor from "tinycolor2";
import ColorWheel from "../../components/ColorWheel/ColorWheel";
import ColorValues from "../../components/ColorValues/ColorValues";
import ColorPreview from "../../components/ColorPreview";
import ColorPickerWidget from "../../components/ColorPickerWidget/ColorPickerWidget";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const AppTitle = styled.h1`
  background: linear-gradient(40deg, #ea00ff, #ea00ff, #03fbff, #03fffb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState(
    tinycolor({ r: 255, g: 255, b: 255, a: 1 })
  );
  const [isVertical, setIsVertical] = useState(false);

  const handleColorChange = (color) => {
    setSelectedColor(tinycolor(color));
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 640); // Tailwind sm breakpoint
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AppTitle
        className="text-4xl font-bold mt-6 mb-10 text-center"
        id="app-title"
      >
        Color Picker
      </AppTitle>
      <PanelGroup
        direction={isVertical ? "vertical" : "horizontal"}
        className="flex gap-6"
        autoSaveId={"color-picker"}
        style={{ overflow: "visible" }}
      >
        <Panel
          className="flex flex-col gap-6"
          style={{ overflow: "visible" }}
          defaultSize={50}
          minSize={40}
          maxSize={60}
        >
          <ColorWheel color={selectedColor} onChange={handleColorChange} />
          <ColorPickerWidget
            type="saturation"
            color={selectedColor}
            onChange={handleColorChange}
            id="saturation-picker"
          />
          <ColorPickerWidget
            type="alpha"
            color={selectedColor}
            onChange={handleColorChange}
            id="alpha-picker"
          />
        </Panel>
        {!isVertical && (
          <PanelResizeHandle
            className="w-2 hover:bg-gray-200 transition"
            disabled={isVertical}
          />
        )}
        <Panel
          className="flex flex-col gap-6"
          style={{ overflow: "visible" }}
          defaultSize={50}
        >
          <ColorPreview color={selectedColor} />

          <ColorValues color={selectedColor} />
        </Panel>
      </PanelGroup>
    </>
  );
};

export default ColorPicker;
