# 🖼️ Image Processor

## 🚀 Project Overview
The **Image Processor** is a client-side web application built with **Next.js** and **Tailwind CSS** that allows users to upload images and apply various image processing filters directly in their browser. This project demonstrates proficiency in frontend development, client-side image manipulation using the HTML Canvas API, and building responsive user interfaces.

It was developed as a hands-on coding challenge, focusing on core image processing concepts and UI/UX enhancements.

---

## ✨ Features

- **🖼️ Image Upload**: Easily upload images using a file input.
- **🧪 Original & Smoothed Display**: View the original image alongside the processed (smoothed) image on separate canvases.
- **🖤 Grayscale Conversion**: Option to convert the image to grayscale before applying the smoothing filter.
- **📐 Variable Smoothing Kernel**: Dynamically adjust the neighborhood size (e.g., 3x3, 5x5, 7x7, 9x9) for the average smoothing filter.
- **🔍 Pixel Information on Hover**: See real-time RGBA values of the pixel under the cursor.
- **📥 Image Download**: Download the processed image as a PNG file.
- **📱 Responsive Design**: Optimized for various screen sizes using Tailwind CSS.
- **🧠 Intuitive UI**: Clear controls, loading indicators, and error messages for a smooth user experience.
- **🔄 Reset Functionality**: Easily clear all data and reset the application.

---

## 🛠️ Technologies Used

- **Next.js** – React framework for building performant web apps
- **React** – JavaScript library for building UIs
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **HTML Canvas API** – Pixel manipulation via `getImageData`, `putImageData`
- **JavaScript/TypeScript** – Core application logic

---

## 🌐 Live Demo

🔗 [Try it live on Vercel](https://image-processor-eta.vercel.app/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or Yarn

### Installation

```bash
git clone https://github.com/TanmaySingh007/Image-Processor.git
cd Image-Processor
npm install # or yarn install
npm run dev # or yarn dev
```

Open `http://localhost:3000` in your browser.

---

## 💡 Usage

1. **Upload Image**: Click the "Choose File" button to select an image.
2. **Grayscale Option**: Check "Convert to Grayscale First" if desired.
3. **Neighborhood Size**: Choose from 3x3, 5x5, etc. to set filter strength.
4. **Apply Filter**: The filter applies automatically on changes.
5. **Pixel Info**: Hover over the original image to see RGBA values.
6. **Download**: Click "Download Smoothed Image".
7. **Reset**: Clear all settings and canvases with "Reset".

---

## 📂 Project Structure

```
.
├── public/                     # Static assets
├── src/
│   ├── pages/
│   │   ├── _app.tsx           # Global styles/layout
│   │   └── index.tsx          # Main application page
│   ├── components/            # UI Components
│   │   ├── ActionButton.js
│   │   ├── FilterControls.js
│   │   ├── ImageDisplay.js
│   │   └── ImageUpload.js
│   ├── hooks/                 # Custom React hooks
│   │   └── useImageProcessing.js
│   ├── styles/                # Tailwind global styles
│   │   └── globals.css
│   └── utils/                 # Image and canvas utilities
│       ├── canvasUtils.js
│       └── imageProcessing.js
├── tailwind.config.js
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📈 Future Enhancements

- 🎨 More filters (Gaussian blur, sharpen, edge detection, sepia)
- 🎚️ Real-time sliders for filter intensity
- ⚙️ Web Worker support for large images
- ↩️ Undo/Redo support
- 🖱️ Drag-and-drop upload
- ✂️ Cropping/Resizing features
- 🔍 Image comparison slider

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo, open issues, or submit pull requests.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

