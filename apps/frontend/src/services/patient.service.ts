import axios, { AxiosResponse } from "axios";
import { Entities } from "../constants/entities";
import { GenericService } from "./generic.service";

export class PatientService extends GenericService {
  private url: string;

  constructor() {
    super(Entities.Patient);
    this.url = `${this.baseUrl}/${this.entity}`;
  }

  async getDebt(id: number): Promise<AxiosResponse<number>> {
    return await axios.get(`${this.url}/obtain-debt/${id}`);
  }
}
