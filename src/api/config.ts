import axios from 'axios'
import { getCookie } from '../services/utils'

export const createStaticData = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/config/create/static-data`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error(error)
  }
}

export const createCreator = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/config/create`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error(error)
  }
}
