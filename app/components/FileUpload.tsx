/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useCallback, useState } from "react";

import styles from "../styles/FileUpload.module.scss";
import { IconSize } from "./icons";
import DogFaceIcon from "./icons/DogFaceIcon";

export interface IFileUploadProps {
  onImageSelected: (imageUri: string) => void;
}

const FileUpload = ({ onImageSelected }: IFileUploadProps) => {
  const [image, setImage] = useState("");
  const [orientation, setOrientation] = useState<"landscape" | "portrait">(
    "portrait"
  );

  const onFileChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const url = URL.createObjectURL(file);
        onImageSelected(url);
        setImage(url);
      }
    },
    []
  );

  const onImageLoaded = useCallback(({ height, width }: HTMLImageElement) => {
    const newOrientation = width > height ? "landscape" : "portrait";
    setOrientation(newOrientation);
  }, []);

  return (
    <div className={styles.container}>
      {image && (
        <div className={styles.imageWrapper}>
          <div className={styles.imageFrameWrapper}>
            <div
              className={`${styles.imageFrame} ${
                orientation === "landscape"
                  ? styles.imageFrameLandscape
                  : styles.imageFramePortrait
              }`}
            />
          </div>
          <img
            className={styles.image}
            src={image}
            alt="Uploaded Image"
            onLoad={({ target }) => onImageLoaded(target as HTMLImageElement)}
          />
        </div>
      )}
      <label className={styles.inputLabel} htmlFor="file-upload" role="button">
        <span className={styles.inputLabelText}>
          Upload a dog image to classify
        </span>
        <DogFaceIcon size={IconSize.SMALL} />
      </label>
      <input
        id="file-upload"
        className={styles.input}
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <section className={styles.note}>
        <strong className={styles.noteHeader}>Note!</strong>
        <p>
          Photos are cropped to a square aspect ratio in order to comply with
          the machine learning model. Ensure that you have framed your photo
          accordingly!
        </p>
      </section>
    </div>
  );
};

export default FileUpload;
