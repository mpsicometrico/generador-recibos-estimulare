import axios from 'axios'

export class GenericService {
  private baseUrl = `${process.env.NEXT_PUBLIC_SERVER_API}`
  private entity: string

  constructor(entity: string) {
    this.entity = entity
  }

  register(patient: any) {
    return axios.post(`${this.baseUrl}/${this.entity}`, patient)
  }

  getSelectOptions() {
    return axios.get(`${this.baseUrl}/${this.entity}/select/options`)
  }
}
