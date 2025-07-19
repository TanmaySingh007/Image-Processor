'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Head from 'next/head';
import ImageUploader from '../components/ImageUploader';
import ImageCanvas from '../components/ImageCanvas';
import ControlPanel from '../components/ControlPanel';
import PixelInfo from '../components/PixelInfo';
import LoadingSpinner from '../components/LoadingSpinner';
import { applyImageFilter, convertToGrayscale, downloadCanvas } from '../utils/imageProcessing';
import { debounce } from '../lib/utils';
import { Upload, Download, RotateCcw, Image as ImageIcon, Zap } from 'lucide-react';

export default function Home() {
  // State management for the application
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImageData, setProcessedImageData] = useState(null);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [neighborhoodSize, setNeighborhoodSize] = useState(3);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [pixelInfo, setPixelInfo] = useState(null);

  // Canvas references for direct manipulation
  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);
  const processingTimeoutRef = useRef(null);

  /**
   * Handles the image upload process
   * Validates file type and size, then loads the image
   */
  const handleImageUpload = useCallback(async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file is too large. Please upload an image smaller than 10MB.');
      return;
    }

    setIsLoading(true);
    setError('');
    setPixelInfo(null);
    setProcessedImageData(null);

    try {
      const img = new Image();
      img.onload = () => {
        console.log('Image loaded successfully:', img.width, 'x', img.height);
        setOriginalImage(img);
        setIsLoading(false);
      };
      img.onerror = () => {
        setError('Failed to load the image. Please try with a different image.');
        setIsLoading(false);
      };
      img.src = URL.createObjectURL(file);
    } catch (err) {
      console.error('Error loading image:', err);
      setError('An error occurred while loading the image.');
      setIsLoading(false);
    }
  }, []);

  /**
   * Processes the image with the current filter settings
   * Applies grayscale conversion and smoothing filter
   */
  const processImageInternal = useCallback(async (imageToProcess = originalImage) => {
    if (!imageToProcess) {
      console.log('No image to process');
      return;
    }

    // Clear any existing timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    console.log('Starting image processing...', {
      isGrayscale,
      neighborhoodSize,
      imageSize: `${imageToProcess.width}x${imageToProcess.height}`
    });

    setIsProcessing(true);
    setError('');

    try {
      // Use requestAnimationFrame for smoother UI updates
      processingTimeoutRef.current = setTimeout(() => {
        try {
          const canvas = originalCanvasRef.current;
          if (!canvas) {
            throw new Error('Original canvas not found');
          }

          const ctx = canvas.getContext('2d');
          
          // Set canvas dimensions to match image
          canvas.width = imageToProcess.width;
          canvas.height = imageToProcess.height;
          
          // Draw original image
          ctx.drawImage(imageToProcess, 0, 0);
          
          // Get image data for processing
          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          console.log('Got image data:', imageData.width, 'x', imageData.height);
          
          // Apply grayscale conversion if enabled
          if (isGrayscale) {
            console.log('Converting to grayscale...');
            imageData = convertToGrayscale(imageData);
          }
          
          // Apply smoothing filter
          console.log('Applying smoothing filter with size:', neighborhoodSize);
          const smoothedData = applyImageFilter(imageData, neighborhoodSize);
          
          console.log('Processing complete, setting processed image data');
          setProcessedImageData(smoothedData);
          
          setIsProcessing(false);
        } catch (err) {
          console.error('Processing error:', err);
          setError('Failed to process the image. Please try again.');
          setIsProcessing(false);
        }
      }, 50);
    } catch (err) {
      console.error('Error during image processing:', err);
      setError('An error occurred during image processing.');
      setIsProcessing(false);
    }
  }, [originalImage, isGrayscale, neighborhoodSize]);

  // Rename processImageInternal to processImage for simplicity
  const processImage = processImageInternal;

  /**
   * Handles pixel hover events on the original image
   * Displays RGBA values of the pixel under cursor
   */
  const handlePixelHover = useCallback((x, y) => {
    if (!originalCanvasRef.current) return;

    try {
      const canvas = originalCanvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Ensure coordinates are within bounds
      const clampedX = Math.max(0, Math.min(x, canvas.width - 1));
      const clampedY = Math.max(0, Math.min(y, canvas.height - 1));
      
      const imageData = ctx.getImageData(clampedX, clampedY, 1, 1);
      const [r, g, b, a] = imageData.data;

      setPixelInfo({
        x: Math.floor(clampedX),
        y: Math.floor(clampedY),
        r, g, b, a: Math.round((a / 255) * 100) / 100
      });
    } catch (err) {
      console.error('Error getting pixel info:', err);
    }
  }, []);

  /**
   * Clears pixel info when mouse leaves the canvas
   */
  const handlePixelLeave = useCallback(() => {
    setPixelInfo(null);
  }, []);

  /**
   * Downloads the processed image
   */
  const handleDownload = useCallback(() => {
    if (!processedCanvasRef.current) {
      setError('No processed image available for download.');
      return;
    }

    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `smoothed-image-${timestamp}.png`;
      downloadCanvas(processedCanvasRef.current, filename);
    } catch (err) {
      console.error('Download error:', err);
      setError('Failed to download the image. Please try again.');
    }
  }, []);

  /**
   * Resets all state to initial values
   */
  const handleReset = useCallback(() => {
    // Clear any pending processing
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }
    
    setOriginalImage(null);
    setProcessedImageData(null);
    setIsGrayscale(false);
    setNeighborhoodSize(3);
    setIsProcessing(false);
    setIsLoading(false);
    setError('');
    setPixelInfo(null);

    // Clear canvases
    if (originalCanvasRef.current) {
      const ctx = originalCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, originalCanvasRef.current.width, originalCanvasRef.current.height);
    }
    if (processedCanvasRef.current) {
      const ctx = processedCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, processedCanvasRef.current.width, processedCanvasRef.current.height);
    }
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Image Smoothing Filter - Professional Image Processing</title>
        <meta name="description" content="Advanced image smoothing with customizable filters, grayscale conversion, and real-time pixel analysis" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full mr-4">
                <ImageIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                Image Smoothing Filter
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional image processing with customizable neighborhood averaging filters, 
              grayscale conversion, and real-time pixel analysis.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg animate-fade-in">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Upload Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-blue-600" />
                  Upload Image
                </h2>
                <ImageUploader 
                  onImageUpload={handleImageUpload}
                  isLoading={isLoading}
                />
              </div>

              {/* Control Panel */}
              {originalImage && (
                <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Filter Settings
                  </h2>
                  <ControlPanel
                    isGrayscale={isGrayscale}
                    setIsGrayscale={setIsGrayscale}
                    neighborhoodSize={neighborhoodSize}
                    setNeighborhoodSize={setNeighborhoodSize}
                    onProcessImage={() => processImage()}
                    isProcessing={isProcessing}
                  />
                </div>
              )}

              {/* Pixel Information */}
              {pixelInfo && (
                <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                  <PixelInfo pixelInfo={pixelInfo} />
                </div>
              )}

              {/* Action Buttons */}
              {originalImage && (
                <div className="space-y-3 animate-fade-in">
                  <button
                    onClick={handleDownload}
                    disabled={!processedImageData || isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center btn-hover"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Smoothed Image
                  </button>
                  
                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center btn-hover"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Reset All
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Image Display */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
                  <LoadingSpinner size="large" text="Loading your image..." />
                </div>
              ) : originalImage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Original Image */}
                  <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4 text-center">Original Image</h3>
                    <ImageCanvas
                      ref={originalCanvasRef}
                      image={originalImage}
                      onPixelHover={handlePixelHover}
                      onPixelLeave={handlePixelLeave}
                      isInteractive={true}
                    />
                  </div>

                  {/* Processed Image */}
                  <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                    <h3 className="text-lg font-semibold mb-4 text-center">
                      Smoothed Image
                      {isProcessing && (
                        <span className="ml-2 text-sm text-gray-500">(Processing...)</span>
                      )}
                    </h3>
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-64">
                        <LoadingSpinner size="medium" text="Applying filter..." />
                      </div>
                    ) : processedImageData ? (
                      <ImageCanvas
                        ref={processedCanvasRef}
                        imageData={processedImageData}
                        isInteractive={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-500">Processed image will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center animate-fade-in">
                  <div className="max-w-md mx-auto">
                    <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No Image Selected
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Upload an image to start applying smoothing filters with customizable settings.
                    </p>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>• Supports JPEG, PNG, GIF and other image formats</p>
                      <p>• Maximum file size: 10MB</p>
                      <p>• Pixel analysis on hover</p>
                      <p>• Manual processing with customizable filters</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}