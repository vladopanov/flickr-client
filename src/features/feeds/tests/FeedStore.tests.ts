import { SafeModeService } from '@services/SafeModeService';
import { FeedService } from '@services/FeedService';
import { Feed } from '@models/Feed';
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
  const feed = {
    authorFlickrLink: 'authorFlickrLink',
    authorName: 'authorName',
    description: 'description',
    imageFlickrLink: 'imageFlickrLink',
    imageTitle: 'imageTitle',
    imageUrl: 'imageUrl',
    tags: ['tag']
  } as Feed;
  const feeds = new Map().set(feed.imageUrl, feed);

  beforeEach(() => {
    store = new FeedStore(feedService, safeModeService);
  });

  afterEach(() => {
    store = null;
  });

  it('on store initialized isSafe should return false', function(): void {
    expect(store.isSafe).toBe(false);
  });

  it('on store initialized feeds() should return empty array', function(): void {
    expect(store.feeds).toEqual([]);
  });

  it('toggleSafeMode() should invoke safeModeService.turnOnSafeMode() and store.loadMoreFeeds()', function(): void {
    spyOn(safeModeService, 'turnOnSafeMode');
    spyOn(store, 'loadMoreFeeds');
    spyOn(feedService, 'fetchFeeds');
    store.toggleSafeMode();
    expect(safeModeService.turnOnSafeMode).toHaveBeenCalled();
    expect(store.loadMoreFeeds).toHaveBeenCalled();
  });

  it('loadMoreFeeds() should invoke feedService.fetchFeeds() with args and fill store.feeds with one feed', function(done): void {
    spyOn(feedService, 'fetchFeeds').and.returnValue([feeds]);
    store.loadMoreFeeds()
      .then(() => {
        expect(feedService.fetchFeeds).toHaveBeenCalledWith('', false);
        expect(store.feeds.length).toEqual(1);
        done();
      });
  });

  it('should invoke setTags() swith args and set store tags', function(): void {
    spyOn(store, 'loadMoreFeeds');
    store.setTags('tag');
    expect(store.loadMoreFeeds).toHaveBeenCalled();
  });
});