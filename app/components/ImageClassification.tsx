import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { requestWikipediaInfo } from "../helpers/wikipediaHelpers";
import { ClassificationContext } from "../services/ClassificationService";

import styles from "../styles/ImageClassification.module.css";

export interface IImageClassificationProps {
  requestImageAlt: string;
  requestImageUri: string;
}

const INIT_SUMMARY_LENGTH = 300;

const ImageClassification = ({
  requestImageAlt,
  requestImageUri,
}: IImageClassificationProps) => {
  const classificationContext = useContext(ClassificationContext);

  const [classificationResults, setClassificationResults] = useState<string[]>(
    []
  );
  const [selectedResult, setSelectedResult] = useState("");

  const [resultTitle, setResultTitle] = useState("");
  const [resultSummary, setResultSummary] = useState("");
  const [resultImage, setResultImage] = useState("");

  useEffect(() => {
    getResultInfo(selectedResult);
  }, [selectedResult]);

  const getResultInfo = useCallback(async (query: string) => {
    // dog labels such as "boxer" don't return relevant results
    // - suffix with "dog" to ensure that results pertain to dogs
    const dogQuery = query.includes("dog") ? query : `${query} dog`;
    const result = await requestWikipediaInfo(dogQuery);
    if (result) {
      setResultTitle(result.title);
      setResultSummary(result.summary);
      setResultImage(result.imageUri);
    }
  }, []);

  const getClassificationResults = useCallback(
    async (image: HTMLImageElement) => {
      const results = await classificationContext.classifyImage(image);
      results && setClassificationResults(results);
      results && setSelectedResult(formatDisplayLabel(results[0]));
    },
    []
  );

  return (
    <section>
      <div className={styles.imageWrapper}>
        <Image
          alt={requestImageAlt}
          height={500}
          width={500}
          layout="responsive"
          objectFit="cover"
          onLoad={(e) => getClassificationResults(e.target as HTMLImageElement)}
          src={requestImageUri}
        />
        {resultImage && (
          <Image
            alt={resultTitle}
            src={resultImage}
            height={500}
            width={500}
            layout="responsive"
            objectFit="cover"
          />
        )}
      </div>
      {resultTitle && <b>{resultTitle}</b>}
      {classificationResults && (
        <ol>
          {classificationResults.map((label, j) => {
            const formattedLabel = formatDisplayLabel(label);
            return (
              <li key={label}>
                <button onClick={() => setSelectedResult(formattedLabel)}>
                  {formattedLabel}
                </button>
              </li>
            );
          })}
        </ol>
      )}
      {resultSummary && (
        <p>
          {resultSummary.length > INIT_SUMMARY_LENGTH
            ? `${resultSummary.slice(0, INIT_SUMMARY_LENGTH)}...`
            : resultSummary}
        </p>
      )}
    </section>
  );
};

export default ImageClassification;
