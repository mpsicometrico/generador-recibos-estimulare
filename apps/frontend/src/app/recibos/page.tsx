'use client'

import { ListView } from '@components/index'
import { Entities } from '@constants/entities'

export default function InvoiceForm() {
  return <ListView entity={Entities.Invoice} />
}
