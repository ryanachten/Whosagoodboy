/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { requestWikipediaInfo } from "../helpers/wikipediaHelpers";
import { ClassificationContext } from "../services/ClassificationService";

import styles from "../styles/ImageClassification.module.scss";

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
  const requestImageRef = useRef<HTMLImageElement>(null);

  const [classificationResults, setClassificationResults] = useState<string[]>(
    []
  );
  const [selectedResult, setSelectedResult] = useState<{
    index: number;
    resultQuery: string;
  } | null>();

  const [resultTitle, setResultTitle] = useState("");
  const [resultSummary, setResultSummary] = useState("");
  const [resultImage, setResultImage] = useState("");

  useEffect(() => {
    const image = requestImageRef.current;
    if (image) {
      image.onload = () => getClassificationResults(image);
    }
  }, [requestImageRef.current]);

  useEffect(() => {
    selectedResult && getResultInfo(selectedResult.resultQuery);
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
      results &&
        setSelectedResult({
          index: 0,
          resultQuery: formatDisplayLabel(results[0]),
        });
    },
    []
  );

  return (
    <section className={styles.container}>
      <div className={styles.imageRow}>
        <img
          className={styles.image}
          alt={requestImageAlt}
          ref={requestImageRef}
          src={requestImageUri}
          crossOrigin="anonymous"
        />
        {resultImage && (
          <img className={styles.image} alt={resultTitle} src={resultImage} />
        )}
      </div>
      {resultTitle && selectedResult && (
        <div className={styles.header}>
          <p>{`Matching doggo! Top result #${selectedResult.index + 1}`}</p>
          <h3>{resultTitle}</h3>
        </div>
      )}
      {resultSummary && (
        <p>
          {resultSummary.length > INIT_SUMMARY_LENGTH
            ? `${resultSummary.slice(0, INIT_SUMMARY_LENGTH)}...`
            : resultSummary}
        </p>
      )}
      {classificationResults && (
        <div className={styles.results}>
          <b>Other matching doggos</b>
          <ol>
            {classificationResults.map((label, i) => {
              const formattedLabel = formatDisplayLabel(label);
              return (
                <li key={label}>
                  <button
                    className={styles.resultItem}
                    onClick={() =>
                      setSelectedResult({
                        index: i,
                        resultQuery: formattedLabel,
                      })
                    }
                  >
                    {formattedLabel}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}
    </section>
  );
};

export default ImageClassification;
