'use client';

import { useState, useCallback } from 'react';
import { Checkbox } from './ui/Checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Button } from './ui/Button';
import { Settings, Play, Pause } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

/**
 * ControlPanel Component
 * Contains all filter controls and settings
 */
const ControlPanel = ({
  isGrayscale,
  setIsGrayscale,
  neighborhoodSize,
  setNeighborhoodSize,
  onProcessImage,
  isProcessing
}) => {
  const [manualProcessing, setManualProcessing] = useState(false);

  /**
   * Handles manual processing trigger
   */
  const handleManualProcess = () => {
    setManualProcessing(true);
    onProcessImage();
    setTimeout(() => setManualProcessing(false), 1000);
  };

  /**
   * Handles grayscale toggle with state management
   */
  const handleGrayscaleChange = useCallback((checked) => {
    console.log('Grayscale changed to:', checked);
    setIsGrayscale(checked);
  }, [setIsGrayscale]);

  /**
   * Handles neighborhood size change with validation
   */
  const handleNeighborhoodSizeChange = useCallback((value) => {
    const newSize = parseInt(value);
    console.log('Neighborhood size changed to:', newSize);
    if (newSize && newSize !== neighborhoodSize) {
      setNeighborhoodSize(newSize);
    }
  }, [neighborhoodSize, setNeighborhoodSize]);

  /**
   * Available neighborhood sizes for the smoothing filter
   */
  const neighborhoodSizes = [
    { value: 3, label: '3×3 (Subtle)', description: 'Light smoothing' },
    { value: 5, label: '5×5 (Moderate)', description: 'Medium smoothing' },
    { value: 7, label: '7×7 (Strong)', description: 'Heavy smoothing' },
    { value: 9, label: '9×9 (Extreme)', description: 'Very heavy smoothing' }
  ];

  return (
    <div className="space-y-6">
      {/* Grayscale Option */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Color Processing
        </label>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="grayscale"
            checked={isGrayscale}
            onCheckedChange={handleGrayscaleChange}
            className="checkbox-animation"
          />
          <label
            htmlFor="grayscale"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Convert to grayscale first
          </label>
        </div>
        <p className="text-xs text-gray-500">
          {isGrayscale 
            ? 'Image will be converted to grayscale before applying the smoothing filter'
            : 'Smoothing filter will be applied to the color image'
          }
        </p>
      </div>

      {/* Neighborhood Size Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Filter Neighborhood Size
        </label>
        <Select
          value={neighborhoodSize.toString()}
          onValueChange={handleNeighborhoodSizeChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select neighborhood size" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoodSizes.map(({ value, label, description }) => (
              <SelectItem key={value} value={value.toString()}>
                <div className="flex flex-col">
                  <span className="font-medium">{label}</span>
                  <span className="text-xs text-gray-500">{description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500">
          Larger neighborhoods create stronger smoothing effects but may blur important details.
        </p>
      </div>

      {/* Filter Information */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          Current Filter Settings
        </h4>
        <div className="space-y-1 text-xs text-blue-700">
          <p>• Neighborhood: {neighborhoodSize}×{neighborhoodSize} pixels</p>
          <p>• Color mode: {isGrayscale ? 'Grayscale' : 'Color'}</p>
          <p>• Processing: Manual</p>
          <p>• Total pixels per filter: {neighborhoodSize * neighborhoodSize}</p>
        </div>
      </div>

      {/* Process Button */}
      <Button
        onClick={handleManualProcess}
        disabled={isProcessing || manualProcessing}
        className="w-full btn-hover"
      >
        {isProcessing || manualProcessing ? (
          <LoadingSpinner size="small" text="Processing..." />
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            Apply Filter
          </>
        )}
      </Button>
    </div>
  );
};

export default ControlPanel;