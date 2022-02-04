import { useContext, useState, useEffect, useCallback } from "react";
import { ClassificationContext } from "../services/ClassificationService";

const MIN_LOADING_PERIOD = 2000;

const useClassificationSetup = () => {
  const classificationContext = useContext(ClassificationContext);
  const [loading, setLoading] = useState(true);
  const [shouldShowLoading, setShouldShowLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = useCallback(async () => {
    setTimeout(() => {
      setShouldShowLoading(false);
    }, MIN_LOADING_PERIOD);

    if (!classificationContext.setup) {
      await classificationContext.init();
    }

    setLoading(false);
  }, []);

  return loading || shouldShowLoading;
};

export default useClassificationSetup;
