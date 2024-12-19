import { GenericService } from './generic.service'
import { PsychologistService } from './psychologist.service'
import { PatientService } from './patient.service'
import { InvoiceService } from './invoice.service'
import { Entities } from '../constants/entities'

export const psychologistService = new PsychologistService()
export const patientService = new PatientService()
export const invoiceService = new InvoiceService()

export const services: Record<string, GenericService> = {
  [Entities.Psychologist]: psychologistService,
  [Entities.Patient]: patientService,
  [Entities.Invoice]: invoiceService
}
