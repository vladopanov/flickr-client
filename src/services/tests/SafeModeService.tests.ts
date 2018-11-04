import { SafeModeService } from '@services/SafeModeService';

describe('SafeModeService', function(): void {
  let service: SafeModeService;

  beforeEach(() => {
    service = new SafeModeService();
  });

  afterEach(() => {
    service = null;
  });

  afterAll(() => {
    service = null;
  });

  it('on service initialized isSafe should return false', function(): void {
    expect(service.isSafe).toBeFalsy();
  });

  it('on turnOnSafeMode() isSafe should return true', function(): void {
    service.turnOnSafeMode();
    expect(service.isSafe).toBeTruthy();
  });

  it('on turnOffSafeMode() isSafe should return false', function(): void {
    service.turnOffSafeMode();
    expect(service.isSafe).toBeFalsy();
  });
});