import { SafeModeService } from '@services/SafeModeService';
import { FeedService } from '@services/FeedService';
// import { Feed } from '@models/Feed';
import { FeedStore } from '../FeedStore';

describe('FeedStore', function(): void {
  const safeModeService: SafeModeService = {
    isSafe: false,
    turnOffSafeMode: () => null,
    turnOnSafeMode: () => null
  };
  const feedService = {
    fetchFeeds: (value: string, isSafe: boolean) => null,
  } as FeedService;
  let store: FeedStore;
  // const feed = {
  //   authorFlickrLink: 'authorFlickrLink',
  //   authorName: 'authorName',
  //   description: 'description',
  //   imageFlickrLink: 'imageFlickrLink',
  //   imageTitle: 'imageTitle',
  //   imageUrl: 'imageUrl',
  //   tags: ['tag']
  // } as Feed;
  // const feeds = new Map().set(feed.imageUrl, feed);

  beforeEach(() => {
  });

  afterEach(() => {
    store = null;
  });

  it('on store initialized isSafe should return false', function(): void {
    store = new FeedStore(feedService, safeModeService);
    expect(store.isSafe).toBe(false);
  });
});