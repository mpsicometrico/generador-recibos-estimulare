import { Injectable } from '@nestjs/common';

@Injectable()
export class GenericService {
  constructor() {}

  async getAll(): Promise<any[]> {
    return [];
  }
}
