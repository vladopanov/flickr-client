import { Feed } from '@models/Feed';
import { CONSTANTS } from '@src/utils/constants';

export class FeedService {
  constructor() {
  }

  public async fetchFeeds(value?: string): Promise<Feed[]> {
    const url = `${CONSTANTS.FEEDS_URL}/photos_public.gne?format=json&tags=${value}&jsoncallback=?`;
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
  }

  private mapFeedListFromDto(items: any[]): Feed[] {
    const feeds = [];
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
