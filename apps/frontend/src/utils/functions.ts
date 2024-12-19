export const falsyToNull = (obj: { [k: string]: FormDataEntryValue }) => {
  return Object.keys(obj).reduce(
    (acc: { [k: string]: FormDataEntryValue | null }, key) => {
      acc[key] = obj[key] || null
      return acc
    },
    {}
  )
}
