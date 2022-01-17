import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { ClassificationContext } from "../services/ClassificationService";

export interface IClassificationImageProps {
  alt: string;
  imageUri: string;
}

const ClassificationImage = ({ alt, imageUri }: IClassificationImageProps) => {
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
        alt={alt}
        height={500}
        width={500}
        layout="responsive"
        objectFit="cover"
        onLoad={(e) => getClassificationResults(e.target as HTMLImageElement)}
        src={imageUri}
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
