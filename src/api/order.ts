import axios from 'axios'
import { getCookie } from '../services/utils'

export const createOrder = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/order/create`,
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

export const getOrderByToken = async (token) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/check/${token}`,
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

export const orderCreatePix = async (token) => {
  const data = {
    token,
  }

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/payment/create/pix/`,
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

export const getOrderByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/user/${userId}`,
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

export const trackingFacebookOrder = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/order/update-facebook-tracking`,
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

// admin
export const adminGetOrdersFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/all`,
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

export const adminAllowedOrderFetch = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/order/update-allowed-admin`,
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

export const adminExpirePayment = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/order/update-expired-admin`,
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

export const adminGetOrdersByProductSlugFetch = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/product-slug/${slug}`,
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

export const adminGetOrderByIdFetch = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/order/${id}`,
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

export const adminOrderChangeUserFetch = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/order/change-user`,
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
