/**
 * Image Processing Utilities
 * Contains all image manipulation functions for the smoothing filter application
 */

/**
 * Applies a neighborhood averaging filter to image data
 * @param {ImageData} imageData - The source image data
 * @param {number} kernelSize - Size of the neighborhood (e.g., 3 for 3x3)
 * @returns {ImageData} - Processed image data
 */
export function applyImageFilter(imageData, kernelSize = 3) {
  if (!imageData || !imageData.data) {
    throw new Error('Invalid image data provided');
  }
  
  const { data, width, height } = imageData;
  const newData = new Uint8ClampedArray(data.length);
  
  // Calculate the offset from center to edge of kernel
  const offset = Math.floor(kernelSize / 2);
  
  console.log(`Applying ${kernelSize}x${kernelSize} filter to ${width}x${height} image`);
  
  // Process each pixel
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * 4;
      
      // Initialize accumulators for RGBA channels
      let rSum = 0, gSum = 0, bSum = 0, aSum = 0;
      let count = 0;
      
      // Sample neighborhood pixels
      for (let ky = -offset; ky <= offset; ky++) {
        for (let kx = -offset; kx <= offset; kx++) {
          const sampleY = y + ky;
          const sampleX = x + kx;
          
          // Check if sample position is within image bounds
          if (sampleY >= 0 && sampleY < height && sampleX >= 0 && sampleX < width) {
            const sampleIndex = (sampleY * width + sampleX) * 4;
            
            rSum += data[sampleIndex];     // Red
            gSum += data[sampleIndex + 1]; // Green
            bSum += data[sampleIndex + 2]; // Blue
            aSum += data[sampleIndex + 3]; // Alpha
            count++;
          }
        }
      }
      
      // Calculate average values and store in new data array
      if (count > 0) {
        newData[pixelIndex] = Math.round(rSum / count);     // Red
        newData[pixelIndex + 1] = Math.round(gSum / count); // Green
        newData[pixelIndex + 2] = Math.round(bSum / count); // Blue
        newData[pixelIndex + 3] = Math.round(aSum / count); // Alpha
      } else {
        // Fallback to original pixel if no valid neighbors
        newData[pixelIndex] = data[pixelIndex];
        newData[pixelIndex + 1] = data[pixelIndex + 1];
        newData[pixelIndex + 2] = data[pixelIndex + 2];
        newData[pixelIndex + 3] = data[pixelIndex + 3];
      }
    }
  }
  
  // Create and return new ImageData object
  return new ImageData(newData, width, height);
}

/**
 * Converts image data to grayscale using luminance formula
 * @param {ImageData} imageData - The source image data
 * @returns {ImageData} - Grayscale image data
 */
export function convertToGrayscale(imageData) {
  if (!imageData || !imageData.data) {
    throw new Error('Invalid image data provided');
  }
  
  const { data, width, height } = imageData;
  const newData = new Uint8ClampedArray(data.length);
  
  console.log(`Converting ${width}x${height} image to grayscale`);
  
  for (let i = 0; i < data.length; i += 4) {
    // Calculate luminance using standard formula
    // Y = 0.299*R + 0.587*G + 0.114*B
    const gray = Math.round(
      data[i] * 0.299 +     // Red
      data[i + 1] * 0.587 + // Green
      data[i + 2] * 0.114   // Blue
    );
    
    // Set RGB channels to the same gray value
    newData[i] = gray;         // Red
    newData[i + 1] = gray;     // Green
    newData[i + 2] = gray;     // Blue
    newData[i + 3] = data[i + 3]; // Preserve alpha
  }
  
  console.log('Grayscale conversion complete');
  return new ImageData(newData, width, height);
}

/**
 * Downloads a canvas as an image file
 * @param {HTMLCanvasElement} canvas - The canvas to download
 * @param {string} filename - The desired filename
 */
export function downloadCanvas(canvas, filename = 'processed-image.png') {
  try {
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    
    // Convert canvas to data URL
    const dataURL = canvas.toDataURL('image/png');
    link.href = dataURL;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading canvas:', error);
    throw new Error('Failed to download image');
  }
}

/**
 * Validates image file type and size
 * @param {File} file - The file to validate
 * @param {number} maxSize - Maximum file size in bytes (default: 10MB)
 * @returns {Object} - Validation result with success and message
 */
export function validateImageFile(file, maxSize = 10 * 1024 * 1024) {
  if (!file) {
    return { success: false, message: 'No file provided' };
  }
  
  if (!file.type.startsWith('image/')) {
    return { 
      success: false, 
      message: 'Invalid file type. Please upload an image file.' 
    };
  }
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return { 
      success: false, 
      message: `File is too large. Maximum size is ${maxSizeMB}MB.` 
    };
  }
  
  return { success: true, message: 'File is valid' };
}