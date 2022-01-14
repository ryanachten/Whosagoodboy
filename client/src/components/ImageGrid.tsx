import { useEffect, useState } from "react";
import styled from "styled-components";
import PhotoService from "../services/PhotoService";
import ClassificationImage from "./ClassificationImage";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const ImageGrid = () => {
  const [photos, setPhotos] = useState<Array<string>>([]);
  useEffect(() => {
    const photoService = new PhotoService();
    const res = photoService.getPhotos();
    setPhotos(res);
  }, []);

  return (
    <Grid>
      {photos.map((src, i) => {
        return <ClassificationImage key={i} imageUri={src} />;
      })}
    </Grid>
  );
};

export default ImageGrid;
