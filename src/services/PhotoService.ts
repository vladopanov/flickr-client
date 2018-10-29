import { AjaxService } from '@services/AjaxService';
import { Photo } from '@models/Photo';

export class PhotoService {
  public photos: [] = [];

  constructor(private ajaxService: AjaxService) {
  }

  public fetchPhotos(): any {
    this.ajaxService.get({
      url: 'https://api.flickr.com/services/rest/',
      params: {
        method: 'flickr.photos.getRecent',
        format: 'json',
        api_key: '1f734d1b47bd79590fcb6634156dedb2',
        nojsoncallback: 1
      }
    })
      .then(resp => {
        const data = JSON.parse(resp.data);
        return this.mapListFrcomDto(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  private mapListFrcomDto(data: any): Photo[] {
    const photos = [];
    data.photos.photo.forEach(p => {
      const photo = {

      } as Photo;
      photos.push(photo);
    });

    return photos;
  }
}
