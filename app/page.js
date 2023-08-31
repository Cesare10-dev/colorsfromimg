"use client";

import DisplayImage from "@/components/DisplayImg";
import styles from "./page.module.css";
import { useState } from "react";
import ColorThief from "colorthief";
import { FcGallery } from "react-icons/fc";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [colorPalette, setColorPalette] = useState(null);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const img = new Image();

      // Wait for image to load
      img.onload = () => {
        const colorThief = new ColorThief();
        const colorPalette = colorThief.getPalette(img, 6);
        setUploadedImage(event.target.result);
        setColorPalette(colorPalette);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <header>
        <h1>Colors from IMG</h1>

        <div className="input">
          <label htmlFor="file">
            <FcGallery />
            Upload Image
          </label>
          <input type="file" id="file" hidden onChange={uploadImage} />
        </div>
      </header>

      <main className={styles.main}>
        <DisplayImage
          uploadedImage={uploadedImage}
          colorPalette={colorPalette}
        />
      </main>
    </>
  );
}
