import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import wiki from "wikijs";

export interface IResultDialogueProps {
  query: string;
}

const INIT_SUMMARY_LENGTH = 300;

const ResultDialogue = ({ query }: IResultDialogueProps) => {
  const [pageTitle, setPageTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    requestWikipediaInfo(query);
  }, [query]);

  const requestWikipediaInfo = useCallback(async (query: string) => {
    // dog labels such as "boxer" don't return relevant results
    // - suffix with "dog" to ensure that results pertain to dogs
    let dogQuery = query.includes("dog") ? query : `${query} dog`;
    try {
      const { results } = await wiki().search(dogQuery);
      // take the page from the first result as this is the most relevant
      const pageTitle = results[0];
      const page = await wiki().page(pageTitle);
      const pageSummary = await page.summary();
      const mainImage = await page.mainImage();

      setPageTitle(pageTitle);
      setSummary(pageSummary);
      setMainImage(mainImage);
    } catch (error) {
      console.log("error fetching wikipedia info for", query, error);
    }
  }, []);

  return (
    <div>
      {pageTitle && <p>{pageTitle}</p>}
      {mainImage && (
        <Image
          alt={mainImage}
          src={mainImage}
          height={500}
          width={500}
          layout="responsive"
          objectFit="cover"
        />
      )}
      {summary && (
        <p>
          {summary.length > INIT_SUMMARY_LENGTH
            ? `${summary.slice(0, INIT_SUMMARY_LENGTH)}...`
            : summary}
        </p>
      )}
    </div>
  );
};

export default ResultDialogue;
