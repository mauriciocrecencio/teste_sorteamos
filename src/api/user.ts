import axios from 'axios'
import { getCookie } from '../services/utils'

export const loginApi = async (phone) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/phone`,
      { phone },
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createUserApi = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/create`,
      { name: data.name, phone: data.phone },
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/all`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const updateUser = async (requestData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/update`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const loginAdmApi = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/login/auth`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const verifyAdminFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/login/auth/check`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getCookie('token') || ''}`,
        },
      },
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getByPhone = async (phone) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/phone/${phone}`,
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}
