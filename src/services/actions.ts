import { useUserStore } from '../store/userStore'
import { useOrdersStore } from '../store/ordersStore'

import {
  createUserApi,
  loginAdmApi,
  loginApi,
  verifyAdminFetch,
} from '../api/user'
import { getOrderByUserId } from '../api/order'
import { eraseCookie, getCookie, setCookie } from './utils'

export const login = async (phone) => {
  let getUser

  if (phone) {
    getUser = await loginApi(phone)

    if (getUser?.token && getUser?.user?.id) {
      useUserStore.getState().setUser(getUser.user)
      useUserStore.getState().setIsLogged(true)

      setCookie('user', JSON.stringify(getUser.user), 365)
      setCookie('isLogged', true, 365)
      setCookie('token', getUser.token, 365)
      return true
    } else {
      return false
    }
  }

  return false
}

export const loginAdm = async (data) => {
  let getUser

  if (data.phone && data.token) {
    getUser = await loginAdmApi(data)

    if (getUser?.token && getUser?.user?.id) {
      useUserStore.getState().setUser(getUser.user)
      useUserStore.getState().setIsLogged(true)

      setCookie('user', JSON.stringify(getUser.user), 365)
      setCookie('isLogged', true, 365)
      setCookie('token', getUser.token, 365)
      return true
    }
  }

  return false
}

export const verifyAdmin = async () => {
  const adm = await verifyAdminFetch()

  return adm
}

export const loginFromCreate = async (data) => {
  if (data?.token && data?.user?.id) {
    useUserStore.getState().setUser(data.user)
    useUserStore.getState().setIsLogged(true)

    setCookie('user', JSON.stringify(data.user), 365)
    setCookie('isLogged', true, 365)
    setCookie('token', data.token, 365)
  }
}

export const logout = async () => {
  window.localStorage.clear()

  await useUserStore.getState().setUser({})
  await useUserStore.getState().setIsLogged(false)

  const user = eraseCookie('user')
  const logged = eraseCookie('isLogged')
  const token = eraseCookie('token')

  if (!user?.id && !logged && !token) {
    return true
  }
}

export const createUser = async (data) => {
  const create = await createUserApi(data)
  if (create?.user?.id && create?.token) {
    await loginFromCreate(create)

    return { status: true, data: create }
  }

  return { status: false }
}

export const getUserOrders = async (id: number) => {
  const orders = await getOrderByUserId(id)

  if (orders.length) {
    return orders
  }

  return false
}
