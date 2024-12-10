export async function registerPatient(previousState: unknown, formData: FormData) {
  const {patient, father, mother, school, psychologist} = Object.fromEntries(formData)

  console.log({patient, father, mother, school, psychologist})
}