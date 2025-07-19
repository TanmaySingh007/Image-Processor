Image Processor
🚀 Project Overview
The Image Processor is a client-side web application built with Next.js and Tailwind CSS that allows users to upload images and apply various image processing filters directly in their browser. This project demonstrates proficiency in frontend development, client-side image manipulation using the HTML Canvas API, and building responsive user interfaces.

It was developed as a hands-on coding challenge, focusing on core image processing concepts and UI/UX enhancements.

✨ Features
Image Upload: Easily upload images using a file input.

Original & Smoothed Display: View the original image alongside the processed (smoothed) image on separate canvases.

Grayscale Conversion: Option to convert the image to grayscale before applying the smoothing filter.

Variable Smoothing Kernel: Dynamically adjust the neighborhood size (e.g., 3x3, 5x5, 7x7, 9x9) for the average smoothing filter.

Pixel Information on Hover: Hover over the original image to see the real-time RGBA values of the pixel under the cursor.

Image Download: Download the processed image as a PNG file.

Responsive Design: Optimized for various screen sizes using Tailwind CSS.

Intuitive UI: Clear controls, loading indicators, and error messages for a smooth user experience.

Reset Functionality: Easily clear all data and reset the application.

🛠️ Technologies Used
Next.js: React framework for building performant web applications.

React: Frontend JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid and custom styling.

HTML Canvas API: For client-side image loading, pixel manipulation (getImageData, putImageData), and rendering.

JavaScript/TypeScript: Core programming languages.

🌐 Live Demo
Experience the Image Processor live: https://image-processor-eta.vercel.app/

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (LTS version recommended)

npm or Yarn

Installation
Clone the repository:

git clone https://github.com/TanmaySingh007/Image-Processor.git
cd Image-Processor

Install dependencies:

npm install
# or
yarn install

Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 in your browser to see the application.

💡 Usage
Upload Image: Click the "Choose File" button to select an image from your device. The original image will appear on the left canvas.

Grayscale Option: Check the "Convert to Grayscale First" box to apply grayscale conversion before smoothing.

Neighborhood Size: Select a neighborhood size (e.g., 3x3, 5x5) from the dropdown to control the intensity of the smoothing filter.

Apply Filter: Click the "Apply Filter" button to process the image. The smoothed image will appear on the right canvas. (Note: The filter automatically applies on image load and option changes).

Pixel Info: Hover your mouse over the original image canvas to see the RGBA values of the pixel directly under your cursor.

Download: Click "Download Smoothed Image" to save the processed image.

Reset: Click "Reset" to clear the canvases and all options.

📂 Project Structure
.
├── public/                     # Static assets
├── src/
│   ├── pages/                  # Next.js pages (e.g., index.tsx for the main page)
│   │   ├── _app.tsx            # Custom App component for global styles/layout
│   │   └── index.tsx           # Main application page
│   ├── components/             # Reusable React components
│   │   ├── ActionButton.js
│   │   ├── FilterControls.js
│   │   ├── ImageDisplay.js
│   │   └── ImageUpload.js
│   ├── hooks/                  # Custom React hooks for logic encapsulation
│   │   └── useImageProcessing.js
│   ├── styles/                 # Global CSS (Tailwind imports)
│   │   └── globals.css
│   └── utils/                  # Utility functions for image/canvas operations
│       ├── canvasUtils.js
│       └── imageProcessing.js
├── tailwind.config.js          # Tailwind CSS configuration
├── next.config.js              # Next.js configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md

📈 Future Enhancements
More Filter Types: Implement additional image processing filters (e.g., Gaussian blur, sharpen, edge detection, sepia).

Real-time Sliders: Add sliders for filter parameters (e.g., blur intensity) for dynamic, real-time adjustments.

Performance Optimization: For very large images, explore using Web Workers to offload heavy image processing tasks from the main thread.

Undo/Redo History: Implement a history system to allow users to revert changes.

Drag-and-Drop Upload: Enhance the image upload experience with drag-and-drop functionality.

Image Cropping/Resizing: Add basic image manipulation tools.

Visual Comparison Tools: Implement an interactive slider to compare original and processed images on a single canvas.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
