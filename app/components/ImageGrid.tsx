import { useCallback, useEffect, useRef, useState } from "react";
import { Photo } from "../services/PhotoService";

import styles from "../styles/ImageGrid.module.scss";
import { ROUTES } from "../constants/routes";
import ImageClassification from "./ImageClassification";

const ImageGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  useEffect(() => {
    fetchPhotos();

    // Add horizontal scrolling to image grid wrapper
    if (gridRef.current) {
      gridRef.current.addEventListener("wheel", (e) => {
        e.preventDefault();
        gridRef!.current!.scrollLeft += e.deltaY;
      });
    }
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
    <div ref={gridRef} className={styles.grid}>
      {photos.map(({ urls, alt_description, user }, i) => {
        return (
          <ImageClassification
            key={i}
            requestImageAlt={alt_description ?? ""}
            requestImageUri={urls.regular}
            requestImageUser={user}
          />
        );
      })}
    </div>
  );
};

export default ImageGrid;
