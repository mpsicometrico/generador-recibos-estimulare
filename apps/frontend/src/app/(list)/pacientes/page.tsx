'use client'

import { registerPatient } from '@actions/patient/register'
import { Form, Input } from '@components/fields/index'
import Select from '@components/fields/select'
import ListView from '@components/loader/list-view'
import { Entities } from '@constants/entities'

export default function PatientHome() {
  return <ListView />
}
