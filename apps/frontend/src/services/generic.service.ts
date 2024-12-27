import axios from "axios";

export class GenericService {
  baseUrl = `${process.env.NEXT_PUBLIC_SERVER_API}`;
  entity: string;

  constructor(entity: string) {
    this.entity = entity;
  }

  register(payload: any) {
    return axios.post(`${this.baseUrl}/${this.entity}`, payload);
  }

  getSelectOptions() {
    return axios.get(`${this.baseUrl}/${this.entity}/select/options`);
  }
}
