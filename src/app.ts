import { FeedService } from '@services/FeedService';
import { CONSTANTS } from './utils/constants';
import { useMobxDevTools } from './utils/mobx-react-devtools';
import { FeedStore } from './features/feeds/FeedStore';
import { SafeModeService } from '@services/SafeModeService';

export class App {
  public stores: Record<string, any> = {};

  private safeModeService: SafeModeService;
  private photoService: FeedService;

  constructor() {
  }

  public init(): void {
    this.registerServices();
    this.registerStores();

    useMobxDevTools();
  }

  private registerServices(): void {
    this.safeModeService = new SafeModeService();
    this.photoService = new FeedService(this.safeModeService);
  }

  private registerStores(): void {
    this.stores[CONSTANTS.STORE_FEED] = new FeedStore(this.photoService, this.safeModeService);
  }
}