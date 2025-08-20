import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userCredentials) => {
  // console.log(`USERNAME: ${username}  PASSWORD: ${password}`)
  try {
    const response = await axios.post(baseUrl, userCredentials)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default { login }
