import {
  browser,
  LayersModel,
  loadLayersModel,
  Tensor,
} from "@tensorflow/tfjs";

import labels from "./dog_labels.json";

class ClassificationService {
  net?: LayersModel;
  constructor() {
    this.init();
  }

  async init() {
    this.net = await loadLayersModel("converted_model/model.json");
    const img = document.querySelector("img");
    if (img) {
      this.classifyImage(img);
    }
  }

  async classifyImage(img: HTMLImageElement) {
    if (!this.net) return;

    const imageTensor = await browser
      .fromPixels(img)
      // Length corresponds with the `IMG_LEN` used during model generation
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .expandDims();

    const result = (await this.net.predict(imageTensor)) as Tensor;
    const max = result.max().dataSync()[0];
    const resultData = result.dataSync();
    const index = resultData.indexOf(max);

    // labels not working - probably read this https://thekevinscott.com/image-classification-with-javascript/#labels
    console.log("resultData", resultData);

    console.log("index?", index);

    console.log("label?", labels[index]);

    // TODO: use tidy
    result.dispose();
  }
}

export default ClassificationService;
