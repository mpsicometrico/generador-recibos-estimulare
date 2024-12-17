import axios from 'axios'

const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_API}/patient`

const register = async (patient: any) => {
  return axios.post(baseUrl, patient)
}

export { register }
