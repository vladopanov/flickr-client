import { FeedService } from '@services/FeedService';
import { Feed } from '@models/Feed';
import { action, observable } from 'mobx';

export class FeedStore {
  @observable public feeds: Feed[];
  @observable private tag: string;

  constructor(private feedService: FeedService) {
    this.feeds = [];
    this.tag = '';
  }

  @action
  public async searchFeeds(): Promise<void> {
    const feeds = await this.feedService.fetchFeeds(this.tag);
    this.setFeeds(feeds);
  }

  @action
  public setTag(value: string) {
    this.tag = value;
  }

  @action.bound
  private setFeeds(feeds: Feed[]): void {
    this.feeds = this.feeds.slice(0).concat(feeds);
  }
}