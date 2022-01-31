import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { requestWikipediaInfo } from "../helpers/wikipediaHelpers";
import { ClassificationContext } from "../services/ClassificationService";
import Image from "./Image";

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

  const [classificationLoading, setClassificationLoading] = useState(true);
  const [classificationResults, setClassificationResults] = useState<string[]>(
    []
  );
  const [selectedResult, setSelectedResult] = useState<{
    index: number;
    resultQuery: string;
  } | null>();

  const [resultLoading, setResultLoading] = useState(true);
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
      setResultLoading(false);
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
      setClassificationLoading(false);
    },
    []
  );

  return (
    <section className={styles.container}>
      <div className={styles.imageRow}>
        <div className={styles.imageWrapper}>
          <span className={`${styles.imageLabel} ${styles.imageLabelMystery}`}>
            mystery doggo
          </span>
          <Image
            alt={requestImageAlt}
            iamgeRef={requestImageRef}
            src={requestImageUri}
            loading={classificationLoading}
            variant="mystery"
          />
        </div>
        <div className={styles.imageWrapper}>
          <span className={`${styles.imageLabel} ${styles.imageLabelMatched}`}>
            matched doggo
          </span>
          <Image
            alt={resultTitle}
            src={resultImage}
            loading={resultLoading}
            variant="matched"
          />
        </div>
      </div>
      {resultTitle && selectedResult && (
        <div className={styles.header}>
          <p className={styles.subtitle}>{`Matching doggo! Top result #${
            selectedResult.index + 1
          }`}</p>
          <h3 className={styles.title}>{resultTitle}</h3>
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
        <>
          <hr className={styles.divider} />

          <div className={styles.results}>
            <b className={styles.resultsHeader}>Other matching doggos</b>
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
        </>
      )}
    </section>
  );
};

export default ImageClassification;
