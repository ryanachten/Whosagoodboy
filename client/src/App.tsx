import React, { useCallback, useContext, useEffect, useState } from "react";
import ClassificationImage from "./components/ClassificationImage";
import { ClassificationContext } from "./services/ClassificationService";
import PhotoService from "./services/PhotoService";

function App() {
  const classificationContext = useContext(ClassificationContext);

  const [photos, setPhotos] = useState<Array<string>>([]);

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    await classificationContext.init();

    const photoService = new PhotoService();
    const res = await photoService.getRandomPhotos(10);
    setPhotos(res);
  }, []);

  return (
    <div>
      {photos.map((src, i) => {
        return <ClassificationImage key={i} imageUri={src} />;
      })}
    </div>
  );
}

export default App;
