import { useEffect, useState } from "react";
import PhotoService from "../services/PhotoService";
import ClassificationImage from "./ClassificationImage";

import styles from "../styles/ImageGrid.module.css";

const ImageGrid = () => {
  const [photos, setPhotos] = useState<Array<string>>([]);
  useEffect(() => {
    const photoService = new PhotoService();
    const res = photoService.getPhotos();
    setPhotos(res);
  }, []);

  return (
    <div className={styles.grid}>
      {photos.map((src, i) => {
        return <ClassificationImage key={i} imageUri={src} />;
      })}
    </div>
  );
};

export default ImageGrid;
