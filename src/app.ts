// import { AjaxService } from '@services/AjaxService';
import { FeedService } from '@services/FeedService';
import { CONSTANTS } from './utils/constants';
import { useMobxDevTools } from './utils/mobx-react-devtools';
import { FeedStore } from './features/feeds/FeedStore';

export class App {
  public stores: Record<string, any> = {};

  // private ajaxService: AjaxService;
  private photoService: FeedService;

  constructor() {
  }

  public init(): void {
    this.registerServices();
    this.registerStores();

    useMobxDevTools();
  }

  private registerServices(): void {
    // this.ajaxService = new AjaxService();
    this.photoService = new FeedService();
  }

  private registerStores(): void {
    this.stores[CONSTANTS.STORE_FEED] = new FeedStore(this.photoService);
  }
}