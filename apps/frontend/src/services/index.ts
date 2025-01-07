import { GenericService } from './generic.service'
import { PsychologistService } from './psychologist.service'
import { PatientService } from './patient.service'
import { InvoiceService } from './invoice.service'
import { Entities } from '../constants/entities'
import { UserService } from './user.service'

export const psychologistService = new PsychologistService()
export const patientService = new PatientService()
export const invoiceService = new InvoiceService()
export const userService = new UserService()

export const services: Record<string, GenericService> = {
  [Entities.Psychologist]: psychologistService,
  [Entities.Patient]: patientService,
  [Entities.Invoice]: invoiceService,
  [Entities.User]: userService
}
