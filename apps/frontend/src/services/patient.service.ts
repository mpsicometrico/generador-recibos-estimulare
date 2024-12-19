import { Entities } from '../constants/entities'
import { GenericService } from './generic.service'

export class PatientService extends GenericService {
  constructor() {
    super(Entities.Patient)
  }
}
