import { createContext } from "react";
import { createApi } from "unsplash-js";
import { Random } from "unsplash-js/dist/methods/photos/types";

export type Photo = Random;

class PhotoService {
  private server: ReturnType<typeof createApi>;

  constructor() {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (accessKey) {
      this.server = createApi({
        accessKey,
      });
    } else {
      throw new Error("Unsplash access key not defined");
    }
  }

  async getRandomPhotos(count: number): Promise<Photo[]> {
    const { response } = await this.server.photos.getRandom({
      query: "dogs",
      orientation: "squarish",
      count,
    });

    // conform random response as array
    if (!response) {
      return new Array<Photo>();
    } else if (!response.hasOwnProperty("length")) {
      return new Array<Photo>(response as Photo);
    }
    return response as Photo[];
  }
}

export default PhotoService;
export const photoService = new PhotoService();
export const PhotoServiceContext = createContext(photoService);
