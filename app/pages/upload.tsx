import type { NextPage } from "next";
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import ImageClassification from "../components/ImageClassification";
import PageHeader from "../components/PageHeader";

import pageStyles from "../styles/Page.module.scss";
import styles from "../styles/Upload.module.scss";

const Upload: NextPage = () => {
  const [image, setImage] = useState("");

  return (
    <main className={pageStyles.wrapper}>
      <PageHeader />
      <div className={styles.content}>
        <FileUpload onImageSelected={(uri) => setImage(uri)} />
        {image && (
          <ImageClassification
            requestImageAlt="File to be classified"
            requestImageUri={image}
          />
        )}
      </div>
    </main>
  );
};

export default Upload;
