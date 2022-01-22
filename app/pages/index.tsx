import type { NextPage } from "next";
import { useContext, useState, useEffect, useCallback } from "react";
import FileUpload from "../components/FileUpload";
import ImageGrid from "../components/ImageGrid";
import { ClassificationContext } from "../services/ClassificationService";

const Home: NextPage = () => {
  const classificationContext = useContext(ClassificationContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    await classificationContext.init();
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <FileUpload />
      <ImageGrid />
    </>
  );
};

export default Home;
