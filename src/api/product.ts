import axios from 'axios'
import { getCookie } from '../services/utils'

export const getProductsFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/all`,
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

export const getProductsActiveFetch = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/all/active`,
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

// admin
export const adminGetProductBySlugFetch = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/${slug}`,
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

export const getProductBySlug = async (slug) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/${slug}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token') || ''}`,
      },
    },
  )
  if (!response.data) {
    throw new Error('Produto não encontrado')
  }
  return response.data
}

export const getProductById = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie('token') || ''}`,
      },
    },
  )
  if (!response.data) {
    throw new Error('Produto não encontrado')
  }
  return response.data
}

export const adminUpdateProduct = async (requestData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/product/update`,
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

export const getProductsWinners = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/winners`,
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createProduct = async (requestData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/create`,
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
export const updateProduct = async (requestData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/product/update`,
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

export const getPublicRanking = async (productId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/publicRanking/${productId}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getProductList = async (productSlug, params) => {
  try {
    return axios.get(
      `${process.env.REACT_APP_API_URL}/product/lista/${productSlug}`,
      { params },
    )
  } catch (error) {
    console.error(error)
  }
}

export const getProductsHome = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/home`,
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getProductsDraw = async (productSlug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/draw/${productSlug}`,
    )

    return response.data
  } catch (error) {
    console.error(error)
  }
}
