import { Entities } from '../constants/entities'
import { GenericService } from './generic.service'

export class PsychologistService extends GenericService {
  constructor() {
    super(Entities.Psychologist)
  }
}
