import { Feed } from '@models/Feed';
import { CONSTANTS } from '@src/utils/constants';

export class FeedService {
  constructor() {
  }

  public async fetchFeeds(): Promise<Feed[]> {
    const url = `${CONSTANTS.FEEDS_URL}/photos_public.gne?format=json&tagMode=safe&jsoncallback=?`;
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
    // const name = 'nobody@flickr.com ("filistinhaberajansı")';
    items.map(item => {
      const feed = {
        authorFlickrLink: `https://www.flickr.com/people/${item.author_id}/`,
        authorName: item.author.match(/\("(.*)"\)/i)[1],
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
