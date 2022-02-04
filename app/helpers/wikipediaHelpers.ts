import wiki from "wikipedia";

export interface IResultInfo {
  title: string;
  summary: string;
  imageUri: string;
  pageUri: string;
}

export const requestWikipediaInfo = async (
  query: string
): Promise<IResultInfo | undefined> => {
  // dog labels such as "boxer" don't return relevant results
  // - suffix with "dog" to ensure that results pertain to dogs
  let dogQuery = query.includes("dog") ? query : `${query} dog`;
  try {
    const { results } = await wiki.search(dogQuery);

    // take the page from the first result as this is the most relevant
    const page = await wiki.page(results[0].title);
    const { title, extract, originalimage, content_urls } =
      await page.summary();

    return {
      title,
      summary: extract,
      imageUri: originalimage.source,
      pageUri: content_urls.desktop.page,
    };
  } catch (error) {
    console.log("error fetching wikipedia info for", query, error);
  }
};
