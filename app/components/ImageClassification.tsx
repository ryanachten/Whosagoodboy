import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { formatDisplayLabel } from "../helpers/labelHelpers";
import { IResultInfo, requestWikipediaInfo } from "../helpers/wikipediaHelpers";
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

  const [result, setResult] = useState<IResultInfo>();

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
      setResult(result);
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
            alt={result?.title ?? "Loading"}
            src={result?.imageUri}
            loading={!result}
            variant="matched"
          />
        </div>
      </div>
      {result && selectedResult && (
        <div className={styles.header}>
          <p className={styles.subtitle}>{`Matching doggo! Top result #${
            selectedResult.index + 1
          }`}</p>
          <h3 className={styles.title}>{result.title}</h3>
        </div>
      )}
      {result && (
        <div>
          <p className={styles.resultSummary}>
            {result.summary.length > INIT_SUMMARY_LENGTH
              ? `${result.summary.slice(0, INIT_SUMMARY_LENGTH)}...`
              : result.summary}
          </p>
          <a
            className={styles.resultLink}
            href={result.pageUri}
            target="_blank"
            rel="noreferrer"
          >
            - Wikipedia
          </a>
        </div>
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
                      className={`${styles.resultItem} ${
                        selectedResult?.index === i
                          ? styles.resultItemSelected
                          : ""
                      }`}
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
