import { Eye, Palette } from 'lucide-react';

/**
 * PixelInfo Component
 * Displays RGBA information for the pixel under cursor
 */
const PixelInfo = ({ pixelInfo }) => {
  if (!pixelInfo) return null;

  const { x, y, r, g, b, a } = pixelInfo;

  /**
   * Converts RGB to HSL for additional color information
   */
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(l * 100)
    ];
  };

  const [h, s, l] = rgbToHsl(r, g, b);
  const hexColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center">
        <Eye className="w-5 h-5 mr-2 text-primary" />
        Pixel Information
      </h3>
      
      {/* Position Information */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-1">Position</p>
        <p className="text-xs text-gray-600">X: {x}, Y: {y}</p>
      </div>

      {/* Color Preview */}
      <div className="flex items-center space-x-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm"
          style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 flex items-center">
            <Palette className="w-4 h-4 mr-1" />
            Color Values
          </p>
          <p className="text-xs text-gray-600 font-mono">{hexColor}</p>
        </div>
      </div>

      {/* RGBA Values */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
          <p className="text-xs font-medium text-red-700">Red</p>
          <p className="text-lg font-bold text-red-800">{r}</p>
          <p className="text-xs text-red-600">{Math.round((r / 255) * 100)}%</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-xs font-medium text-green-700">Green</p>
          <p className="text-lg font-bold text-green-800">{g}</p>
          <p className="text-xs text-green-600">{Math.round((g / 255) * 100)}%</p>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-700">Blue</p>
          <p className="text-lg font-bold text-blue-800">{b}</p>
          <p className="text-xs text-blue-600">{Math.round((b / 255) * 100)}%</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <p className="text-xs font-medium text-gray-700">Alpha</p>
          <p className="text-lg font-bold text-gray-800">{a}</p>
          <p className="text-xs text-gray-600">{Math.round(a * 100)}%</p>
        </div>
      </div>

      {/* HSL Values */}
      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
        <p className="text-sm font-medium text-purple-700 mb-2">HSL Values</p>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <p className="font-medium text-purple-600">Hue</p>
            <p className="text-purple-800">{h}°</p>
          </div>
          <div>
            <p className="font-medium text-purple-600">Saturation</p>
            <p className="text-purple-800">{s}%</p>
          </div>
          <div>
            <p className="font-medium text-purple-600">Lightness</p>
            <p className="text-purple-800">{l}%</p>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="text-xs text-gray-500 space-y-1 pt-2 border-t border-gray-200">
        <p>• Move your cursor over the original image to inspect pixels</p>
        <p>• RGBA values range from 0-255, Alpha from 0.0-1.0</p>
        <p>• HSL provides alternative color representation</p>
      </div>
    </div>
  );
};

export default PixelInfo;