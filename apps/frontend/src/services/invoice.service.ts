import { Entities } from '../constants/entities'
import { GenericService } from './generic.service'

export class InvoiceService extends GenericService {
  constructor() {
    super(Entities.Invoice)
  }
}
