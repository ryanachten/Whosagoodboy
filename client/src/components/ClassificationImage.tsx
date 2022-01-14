import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { ClassificationContext } from "../services/ClassificationService";

export interface IClassificationImageProps {
  imageUri: string;
}

const ResponsiveImage = styled.img`
  height: 50%;
  object-fit: cover;
  width: 100%;
`;

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
      <ResponsiveImage ref={imageRef} src={imageUri} alt="" />
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
