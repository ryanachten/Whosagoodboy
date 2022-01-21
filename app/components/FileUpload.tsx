import { ChangeEvent, useCallback, useState } from "react";
import ImageClassification from "./ImageClassification";

import styles from "../styles/FileUpload.module.css";

const FileUpload = () => {
  const [image, setImage] = useState("");

  const onFileChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.files && target.files[0]) {
        const url = URL.createObjectURL(target.files[0]);
        setImage(url);
      }
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <label htmlFor="file-upload">Choose dog image to classify</label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      {image && (
        <ImageClassification
          requestImageAlt="File to be classified"
          requestImageUri={image}
        />
      )}
    </div>
  );
};

export default FileUpload;
