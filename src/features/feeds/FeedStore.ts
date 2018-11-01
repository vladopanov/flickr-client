import { FeedService } from '@services/FeedService';
import { Feed } from '@models/Feed';
import { action, observable } from 'mobx';

export class FeedStore {
  @observable public feeds: Feed[];

  constructor(private feedService: FeedService) {
    this.feeds = [];
  }

  @action
  public async searchFeeds(): Promise<void> {
    const feeds = await this.feedService.fetchFeeds();
    this.setFeeds(feeds);
  }

  @action.bound
  private setFeeds(feeds: Feed[]): void {
    this.feeds = this.feeds.slice(0).concat(feeds);
  }
}