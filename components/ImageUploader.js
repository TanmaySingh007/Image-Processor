import { useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

/**
 * ImageUploader Component
 * Handles file selection and upload with drag-and-drop support
 */
const ImageUploader = ({ onImageUpload, isLoading }) => {
  const fileInputRef = useRef(null);

  /**
   * Handles file selection from input or drag-and-drop
   */
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  /**
   * Handles file input change event
   */
  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file);
  };

  /**
   * Handles drag over event to enable drop zone
   */
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /**
   * Handles file drop event
   */
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  /**
   * Opens file selection dialog
   */
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
        <LoadingSpinner size="medium" text="Loading image..." />
      </div>
    );
  }

  return (
    <div
      className="border-2 border-dashed border-gray-300 hover:border-primary rounded-lg p-8 text-center cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-gray-100 group"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={openFileDialog}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
          <Upload className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Choose an image file
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop an image here, or click to browse
          </p>
          
          <div className="text-xs text-gray-400 space-y-1">
            <p>Supported formats: JPEG, PNG, GIF, BMP, WebP</p>
            <p>Maximum size: 10MB</p>
          </div>
        </div>
        
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200 btn-hover"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          Select Image
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;