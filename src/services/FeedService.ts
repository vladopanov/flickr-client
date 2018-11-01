import { Feed } from '@models/Feed';

export class FeedService {
  constructor() {
  }

  public async fetchFeeds(): Promise<Feed[]> {
    const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?';
    const options = {
      url: url,
      dataType: 'jsonp'
    };
    const result = await $.ajax(options).then((data) => {
      const feeds = this.mapFeedListFromDto(data.items);
      return feeds;
    })
      .fail(err => {
        console.error(err);
      });

    return result;

    // this.ajaxService.get({
    //   url: 'https://api.flickr.com/services/rest/',
    //   params: {
    //     method: 'flickr.photos.getRecent',
    //     format: 'json',
    //     api_key: '1f734d1b47bd79590fcb6634156dedb2',
    //     nojsoncallback: 1
    //   }
    // })
    //   .then(resp => {
    //     const data = JSON.parse(resp.data);
    //     return this.mapListFrcomDto(data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  private mapFeedListFromDto(items: any[]): Feed[] {
    const feeds = [];
    items.map(item => {
      const feed = {
        authorFlickrLink: `https://www.flickr.com/people/${item.author_id}/`,
        authorName: item.author,
        description: item.description,
        imageFlickrLink: item.link,
        imageTitle: item.title,
        imageUrl: item.media.m,
        tags: item.tags.split(' ').join(', ')
      } as Feed;
      feeds.push(feed);
    });

    return feeds;
  }
}
