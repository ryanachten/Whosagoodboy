import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { ClassificationContext } from "../services/ClassificationService";

export interface IClassificationImageProps {
  imageUri: string;
}

const ClassificationImage = ({ imageUri }: IClassificationImageProps) => {
  const classificationContext = useContext(ClassificationContext);
  const imageRef = useRef<HTMLImageElement>(null);
  const [classificationResults, setClassificationResults] = useState<string[]>(
    []
  );

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      image.onload = () => getClassificationResults(image);
    }
  }, [imageRef.current]);

  const getClassificationResults = useCallback(
    async (image: HTMLImageElement) => {
      const results = await classificationContext.classifyImage(image);
      results && setClassificationResults(results);
    },
    []
  );

  return (
    <div>
      <img ref={imageRef} src={imageUri} alt="" />
      {classificationResults &&
        classificationResults.map((label, j) => (
          <p key={label}>{formatDisplayLabel(label)}</p>
        ))}
    </div>
  );
};

export default ClassificationImage;
