class PhotoService {
  getPhotos(): string[] {
    const baseUri = "test-images";
    const numberOfDogImages = 6;
    const uris = [];
    for (let index = 1; index <= numberOfDogImages; index++) {
      uris.push(`${baseUri}/Dog${index}.jpg`);
    }
    return uris;
  }
}

export default PhotoService;
