import { PoolService } from "@/clients/services/entry-services/pool";

export class EntryService {
  private readonly pool: PoolService;

  constructor() {
    this.pool = new PoolService();
  }

  getPool(): PoolService {
    return this.pool;
  }
}
