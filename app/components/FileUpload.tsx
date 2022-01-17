import { ChangeEvent, useCallback, useState } from "react";
import ClassificationImage from "./ClassificationImage";

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
        <ClassificationImage alt="File to be classified" imageUri={image} />
      )}
    </div>
  );
};

export default FileUpload;
