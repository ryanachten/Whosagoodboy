import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { ClassificationContext } from "../services/ClassificationService";

import styles from "../styles/ClassificationImage.module.css";

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
      <Image
        height={500}
        width={500}
        layout="responsive"
        onLoad={(e) => getClassificationResults(e.target as HTMLImageElement)}
        src={imageUri}
        alt=""
      />
      {classificationResults && (
        <ol>
          {classificationResults.map((label, j) => (
            <li key={label}>{formatDisplayLabel(label)}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default ClassificationImage;
