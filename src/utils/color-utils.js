/**
 * Returns the best contrast color (either black or white) for a given color.
 * @param {Object} color - An object with properties r, g, b, and a (alpha).
 * @returns {Object} Contrast color in the same object form.
 */
function getContrastColor(color) {
  // Destructure the input color, defaulting alpha value to 1 if not provided.
  const { r, g, b, a = 1 } = color;

  // Calculate the brightness using the YIQ formula.
  // The weights (299, 587, and 114) account for human perception sensitivity.
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // If brightness is high, use black; otherwise, use white.
  // 128 is a common threshold in such calculations.
  const contrastColor =
    yiq >= 128
      ? { r: 0, g: 0, b: 0, a } // dark text (black)
      : { r: 255, g: 255, b: 255, a }; // light text (white)

  return contrastColor;
}

export { getContrastColor };
