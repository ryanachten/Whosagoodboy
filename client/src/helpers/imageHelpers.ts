import { Rank, scalar, Tensor } from "@tensorflow/tfjs";

export const cropImage = (img: Tensor<Rank>) => {
  const width = img.shape[0];
  const height = img.shape[1];

  if (!width || !height) return img;

  console.log("cropping?");

  // use the shorter side as the size to which we will crop
  const shorterSide = Math.min(width, height);

  // calculate beginning and ending crop points
  const startingHeight = Math.floor((height - shorterSide) / 2);
  const startingWidth = Math.floor((width - shorterSide) / 2);

  const endingHeight = startingHeight + shorterSide;
  const endingWidth = startingWidth + shorterSide;

  // return image data cropped to those points
  return img.slice(
    [startingWidth, startingHeight, 0],
    [endingWidth, endingHeight, 3]
  );
};

export const resizeImage = (image: Tensor<Rank>) => {
  return image.resizeBilinear([224, 224]);
};

export const batchImage = (image: Tensor<Rank>) => {
  // Expand our tensor to have an additional dimension, whose size is 1
  const batchedImage = image.expandDims(0);

  // Turn pixel data into a float between -1 and 1.
  return batchedImage.toFloat().div(scalar(127)).sub(scalar(1));
};
