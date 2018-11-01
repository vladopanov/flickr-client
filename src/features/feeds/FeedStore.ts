import { FeedService } from '@services/FeedService';
import { Feed } from '@models/Feed';
import { action, runInAction, observable } from 'mobx';

export class FeedStore {
  @observable public feeds: Feed[];

  constructor(private feedService: FeedService) {
    this.feeds = [];
    this.searchFeeds();
  }

  @action
  public async searchFeeds(): Promise<void> {
    const feeds = await this.feedService.fetchFeeds();
    runInAction(() => {
      this.feeds = feeds;
    });
  }
}