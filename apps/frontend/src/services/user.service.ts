import axios from 'axios'
import { Entities } from '../constants/entities'
import { GenericService } from './generic.service'

export class UserService extends GenericService {
  private url: string

  constructor() {
    super(Entities.User)
    this.url = `${this.baseUrl}/${this.entity}`
  }

  // async getUserByEmail(email: string) {
  //   return await axios.get(`${this.url}?email=${email}`)
  // }
}
