import { useCallback, useEffect, useState } from "react";
import { Photo } from "../services/PhotoService";
import ClassificationImage from "./ClassificationImage";

import styles from "../styles/ImageGrid.module.css";
import { ROUTES } from "../constants/routes";

const ImageGrid = () => {
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = useCallback(async () => {
    const res = await fetch(ROUTES.photos);
    const json = await res.json();
    const { photos, errors } = json;

    if (res.ok && photos) {
      setPhotos(photos);
    } else {
      console.error("Error fetching photos from photo service", errors);
    }
  }, []);

  return (
    <div className={styles.grid}>
      {photos.map(({ urls, alt_description }, i) => {
        return (
          <ClassificationImage
            key={i}
            alt={alt_description ?? ""}
            imageUri={urls.regular}
          />
        );
      })}
    </div>
  );
};

export default ImageGrid;
