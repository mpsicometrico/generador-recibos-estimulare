import { useEffect, useRef, useState } from 'react'

import { services } from '@services/index'
import { Option, SelectProps } from '@type/components/select'
import { toast } from 'sonner'

export default function Select({
  id,
  label,
  className,
  entity,
  props
}: SelectProps) {
  const service = useRef(services[entity]!)
  const [options, setOptions] = useState<Option[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await service.current.getSelectOptions()
        setOptions(data)
      } catch (e) {
        toast.error(`Ocurrió un error al cargar las opciones: ${e}`)
      }
    }

    void fetchOptions()
  }, [service])

  return (
    <div className='flex flex-col'>
      <label className='cursor-pointer' htmlFor={id}>
        {label}
      </label>
      <select
        className={`border-solid border-2 border-black rounded-md px-2 py-0.5 ${className}`}
        id={id}
        name={id}
        {...props}
      >
        <option value='0'>Seleccione una opción</option>
        {options.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
