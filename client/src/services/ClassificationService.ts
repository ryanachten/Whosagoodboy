import {
  browser,
  image,
  LayersModel,
  loadLayersModel,
  reshape,
  Tensor,
  topk,
} from "@tensorflow/tfjs";
import { batchImage, cropImage, resizeImage } from "../helpers/imageHelpers";

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

  async loadAndProcessImage(img: HTMLImageElement) {
    const imageTensor = await browser.fromPixels(img);
    const croppedImage = cropImage(imageTensor);
    const resizedImage = resizeImage(croppedImage);
    const batchedImage = batchImage(resizedImage);
    return batchedImage;
  }

  async classifyImage(img: HTMLImageElement) {
    if (!this.net) return;

    const processedImage = await this.loadAndProcessImage(img);
    // const imageTensor = await browser
    //   // .fromPixels(img)
    //   // // Length corresponds with the `IMG_LEN` used during model generation
    //   // .resizeNearestNeighbor([224, 224])
    //   // .toFloat()
    //   // .expandDims();

    //   .fromPixels(img)
    //   // Length corresponds with the `IMG_LEN` used during model generation
    //   .resizeNearestNeighbor([224, 224])
    //   .toFloat()
    //   .expandDims();

    const result = (await this.net.predict(processedImage)) as Tensor;
    // const max = result.max().dataSync()[0];
    // const resultData = result.dataSync();
    // const index = resultData.indexOf(max);

    const topComponent = reshape(topk(result, 5).indices, [-1]);
    const resultData = topComponent.dataSync();

    // result.as1D().argMax().print();

    // labels not working - probably read this https://thekevinscott.com/image-classification-with-javascript/#labels
    console.log("resultData", resultData);

    // console.log("index?", index);
    resultData.forEach((result) => console.log("label", labels[result]));

    // TODO: use tidy
    result.dispose();
  }
}

export default ClassificationService;
