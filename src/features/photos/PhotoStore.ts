import { PhotoService } from '@services/PhotoService';
import { Photo } from '@models/Photo';

export class PhotoStore {
  public photos: Photo[];

  constructor(private photoService: PhotoService) {
    this.fetchPhotos();
  }

  private fetchPhotos() {
    this.photoService.fetchPhotos();
  }
}