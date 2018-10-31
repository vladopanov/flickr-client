import { AjaxService } from '@services/AjaxService';
import { PhotoService } from '@services/PhotoService';
import { PhotosStore } from '@src/features/photos/PhotosStore';
import { CONSTANTS } from './utils/constants';
import { useMobxDevTools } from './utils/mobx-react-devtools';

export class App {
  public stores: Record<string, any> = {};

  private ajaxService: AjaxService;
  private photoService: PhotoService;

  constructor() {
  }

  public init(): void {
    this.registerServices();
    this.registerStores();

    useMobxDevTools();
  }

  private registerServices(): void {
    this.ajaxService = new AjaxService();
    this.photoService = new PhotoService(this.ajaxService);
  }

  private registerStores(): void {
    this.stores[CONSTANTS.STORE_PHOTO] = new PhotosStore(this.photoService);
  }
}