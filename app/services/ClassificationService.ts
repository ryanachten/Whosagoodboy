import {
  browser,
  LayersModel,
  loadLayersModel,
  reshape,
  Tensor,
  topk,
} from "@tensorflow/tfjs";
import { createContext } from "react";
import { batchImage, cropImage, resizeImage } from "../helpers/imageHelpers";

import labels from "./dog_labels.json";

class ClassificationService {
  public setup: boolean = false;
  private model?: LayersModel;

  async init() {
    this.model = await loadLayersModel("converted_model/model.json");
    this.setup = true;
  }

  private async loadAndProcessImage(img: HTMLImageElement) {
    const imageTensor = await browser.fromPixelsAsync(img);
    const croppedImage = cropImage(imageTensor);
    const resizedImage = resizeImage(croppedImage);
    const batchedImage = batchImage(resizedImage);
    return batchedImage;
  }

  async classifyImage(img: HTMLImageElement) {
    if (!this.model) return;

    const processedImage = await this.loadAndProcessImage(img);
    const result = this.model.predict(processedImage) as Tensor;

    const topComponent = reshape(topk(result, 5).indices, [-1]);
    const resultData = topComponent.dataSync();

    const mappedLabels: string[] = [];
    resultData.forEach((result) => mappedLabels.push(labels[result]));

    result.dispose();

    return mappedLabels;
  }
}

export default ClassificationService;
export const classificationServiceInstance = new ClassificationService();
export const ClassificationContext = createContext(
  classificationServiceInstance
);
