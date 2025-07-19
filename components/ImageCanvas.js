'use client';

import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

/**
 * ImageCanvas Component
 * Displays images on canvas with optional pixel hover functionality
 */
const ImageCanvas = forwardRef(({
  image,
  imageData,
  onPixelHover,
  onPixelLeave,
  isInteractive = false
}, ref) => {
  const canvasRef = useRef(null);

  // Expose canvas ref to parent component
  useImperativeHandle(ref, () => canvasRef.current);

  /**
   * Handles mouse move events for pixel hovering
   */
  const handleMouseMove = (event) => {
    if (!isInteractive || !onPixelHover) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    
    onPixelHover(x, y);
  };

  /**
   * Handles mouse leave events
   */
  const handleMouseLeave = () => {
    if (onPixelLeave) {
      onPixelLeave();
    }
  };

  /**
   * Draws image on canvas when image prop changes
   */
  useEffect(() => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate optimal canvas size maintaining aspect ratio
    const maxWidth = 400;
    const maxHeight = 300;
    
    let { width, height } = image;
    
    // Scale image to fit within max dimensions
    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (width > height) {
        width = maxWidth;
        height = maxWidth / aspectRatio;
      } else {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }
    }
    
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas and draw image
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    
    console.log('Canvas updated with image:', width, 'x', height);
  }, [image]);

  /**
   * Draws image data on canvas when imageData prop changes
   */
  useEffect(() => {
    if (!imageData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Calculate optimal canvas size maintaining aspect ratio
    const maxWidth = 400;
    const maxHeight = 300;
    
    let { width, height } = imageData;
    
    // Scale canvas to fit within max dimensions
    let canvasWidth = width;
    let canvasHeight = height;
    
    if (width > maxWidth || height > maxHeight) {
      const aspectRatio = width / height;
      if (width > height) {
        canvasWidth = maxWidth;
        canvasHeight = maxWidth / aspectRatio;
      } else {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * aspectRatio;
      }
    }
    
    // Set canvas dimensions
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    // Create temporary canvas for the image data
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;
    
    // Put processed image data on temporary canvas
    tempCtx.putImageData(imageData, 0, 0);
    
    // Draw scaled image on main canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight);
    
    console.log('Canvas updated with processed image data:', canvasWidth, 'x', canvasHeight);
  }, [imageData]);

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          max-w-full h-auto border border-gray-200 rounded-lg shadow-sm
          ${isInteractive ? 'cursor-crosshair hover:shadow-md' : ''}
          transition-all duration-300
        `}
        style={{
          imageRendering: 'auto',
        }}
      />
      
      {isInteractive && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          Hover over the image to see pixel values
        </div>
      )}
    </div>
  );
});

ImageCanvas.displayName = 'ImageCanvas';

export default ImageCanvas;