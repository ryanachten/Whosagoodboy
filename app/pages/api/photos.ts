import type { NextApiRequest, NextApiResponse } from "next";
import { Photo, photoService } from "../../services/PhotoService";

export type PhotoResponse = {
  photos: Photo[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotoResponse>
) {
  // TODO: pass photo count via req headers
  const photos = await photoService.getRandomPhotos(10);

  res.status(200).json({ photos });
}
