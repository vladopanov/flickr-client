import { FeedService } from '@services/FeedService';
import { Feed } from '@models/Feed';
import { action, observable, computed } from 'mobx';
import { SafeModeService } from '@services/SafeModeService';

export class FeedStore {
  @observable private feedsCollection: Map<string, Feed>;
  @observable private tags: string;

  constructor(private feedService: FeedService, private safeMode: SafeModeService) {
    this.resetFeeds();
    this.resetTags();
  }

  @computed
  public get isSafe(): boolean {
    return this.safeMode.isSafe;
  }

  @computed
  public get feeds(): Feed[] {
    return Array.from(this.feedsCollection.values()).slice(0);
  }

  @action
  public toggleSafeMode(): void {
    this.isSafe ? this.safeMode.turnOffSafeMode() : this.safeMode.turnOnSafeMode();

    this.resetFeeds();
    this.loadMoreFeeds();
  }

  @action
  public async loadMoreFeeds(): Promise<void> {
    const feeds = await this.feedService.fetchFeeds(this.tags);
    this.setFeeds(feeds);
  }

  @action
  public setTags(value: string): void {
    this.tags = value;
    this.resetFeeds();
    this.loadMoreFeeds();
  }

  @action.bound
  private resetFeeds(): void {
    this.feedsCollection = new Map();
  }

  @action.bound
  private resetTags(): void {
    this.tags = '';
  }

  @action.bound
  private setFeeds(feeds: Feed[]): void {
    // This mapping is used in order not to have repeating feeds.
    feeds.map(feed => {
      this.feedsCollection.set(feed.imageUrl, feed);
    });
  }
}