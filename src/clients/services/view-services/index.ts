import { UiPoolDataProviderService } from "@/clients/services/view-services/ui-pool-data-provider";
import { PoolService } from "@/clients/services/view-services/pool";

export class ViewService {
  private pool: PoolService;
  private uiPoolDataProvider: UiPoolDataProviderService;

  constructor() {
    this.pool = new PoolService();
    this.uiPoolDataProvider = new UiPoolDataProviderService();
  }

  public getPool(): PoolService {
    return this.pool;
  }

  public getUIPoolDataProviderService(): UiPoolDataProviderService {
    return this.uiPoolDataProvider;
  }
}
