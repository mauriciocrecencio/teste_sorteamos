import { IProduct } from '@/interfaces/products'
import MD5 from 'crypto-js/md5'

export const validateEmail = (email) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  )
  return regex.test(email)
}

export const onlyNumbers = (number: string) => number.replace(/\D/g, '')

export const onlyLetters = (text: string) => {
  text = text.toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃáãâà]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊéêĔ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎí]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕóõô]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛúü]', 'gi'), 'u')
  text = text.replace(new RegExp('[Çç]', 'gi'), 'c')
  text = text.replace(new RegExp('[Ÿ]', 'gi'), 'y')
  text = text.replace(/[^\w ]/g, '')
  text = text.replace(/[0-9]/g, '')

  return text
}

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string) => {
  const data = JSON.parse(localStorage.getItem(key) || '{}')

  return data
}

export const setCookie = (name: string, value: string, days: number) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }

  if (typeof document !== 'undefined') {
    document.cookie = name + '=' + (value || '') + expires + '; path=/'
  }
}

export const getCookie = (name: string) => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

export const eraseCookie = (name: string) => {
  if (typeof document === 'undefined') return
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const statusDecorator = (status: string) => {
  let getStatus = ''

  const types = {
    expired: 'Compra Expirada',
    checking: 'Pagamento em Análise',
    pending: 'Aguardando Pagamento',
    paid: 'Compra Aprovada',
  }

  getStatus = types[status]

  return getStatus
}

export const statusDecoratorAdminList = (status) => {
  let getStatus = ''

  const types = {
    expired: 'Expirado',
    checking: 'Verificando',
    pending: 'Pendente',
    paid: 'Pago',
  }

  getStatus = types[status]

  return getStatus
}

export const timeFormatted = (date: sting, seconds = false) => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: seconds ? 'numeric' : undefined,
  })

  return formatter.format(new Date(date))
}

export const priceFormated = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price)
}

export const adminDecorators = ['super', 'atendimento']

export const mphone = (v: string) => {
  let r = ''
  if (v) {
    r = v.replace(/\D/g, '')
    r = r.replace(/^0/, '')
    if (r.length > 10) {
      r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3')
    } else if (r.length > 5) {
      r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3')
    } else if (r.length > 2) {
      r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2')
    } else {
      r = r.replace(/^(\d*)/, '($1')
    }
    return r
  }

  return r
}

export const removeAccents = (text: string) => {
  text = text.toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃáãâà]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊéêĔ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎí]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕóõô]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛúü]', 'gi'), 'u')
  text = text.replace(new RegExp('[Çç]', 'gi'), 'c')
  text = text.replace(new RegExp('[Ÿ]', 'gi'), 'y')
  text = text.replace(/[^\w ]/g, '')
  text = text.replace(/[0-9]/g, '')

  return text
}

export const removeSlugAccents = (text: string) => {
  text = text.toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃáãâà]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊéêĔ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎí]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕóõô]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛúü]', 'gi'), 'u')
  text = text.replace(new RegExp('[Çç]', 'gi'), 'c')
  text = text.replace(new RegExp('[Ÿ]', 'gi'), 'y')
  text = text.replace(new RegExp('[\'\\!@#$%¨&*()=".,/?;:~^´`]', 'gi'), '')

  return text
}

export const capitalizeFirstLetter = (str: string) => {
  if (str) {
    const arr = str.split(' ')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(' ')
  }

  return str
}

export function replaceNullsWithEmptyStrings(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === null) {
        obj[prop] = ''
      }
    }
  }
}

export function convertStringsToLowerCase(obj) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'string') {
        obj[prop] = obj[prop].toLowerCase()
      }
    }
  }
}

export function cloneObjectDeep(obj) {
  const clone = {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        clone[key] = cloneObjectDeep(obj[key])
      } else {
        clone[key] = obj[key]
      }
    }
  }

  return clone
}

export const md5 = () => {
  return MD5(process.env.REACT_APP_API_URL!).toString().slice(0, 10)
}

export const decoratorExpirationProductTimeOptions = [
  {
    label: '2 Horas',
    value: 7200000,
  },
  {
    label: '1 Hora',
    value: 3600000,
  },
  {
    label: '40 Minutos',
    value: 2400000,
  },
  {
    label: '30 Minutos',
    value: 1800000,
  },
  {
    label: '20 Minutos',
    value: 1200000,
  },
  {
    label: '15 Minutos',
    value: 900000,
  },
  {
    label: '10 Minutos',
    value: 600000,
  },
]

export const decoratorShortMessagesOptions = {
  messageOne: {
    label: 'Aguarde o sorteio.',
    setClass: 'blink-bg-done',
  },
  messageTwo: {
    label: 'Adquira já!',
    setClass: 'blink-bg-success blink',
  },
  messageThree: {
    label: 'Corre que ta acabando!',
    setClass: 'blink-bg-done',
  },
  messageFour: {
    label: 'Falta menos de 10%',
    setClass: 'blink-bg-done',
  },
  messageFive: {
    label: 'Últimos números!',
    setClass: 'blink-bg-done',
  },
  messageSix: {
    label: 'Concluído.',
    setClass: 'blink-bg-done',
  },
}

export const decoratorStatusOptions = [
  {
    label: 'Ativo',
    value: 'open',
  },
  {
    label: 'Aguardando sorteio',
    value: 'onhold',
  },
  {
    label: 'Concluído',
    value: 'done',
  },
]

export const getPercentage = (percent: number, total: number) => {
  return total - (percent / 100) * total
}

export const calculePriceWithDiscount = (
  price: number | undefined,
  orderQuantity: number,
  discounts: { quantity: number; value: number }[] | undefined | null,
) => {
  let discountValue = 0.0
  let quantity = orderQuantity

  price = price || 0.0

  if (discounts && discounts.length) {
    discounts.forEach((item) => {
      if (quantity >= item.quantity) {
        do {
          quantity = quantity - item.quantity
          discountValue += item.value
        } while (quantity >= item.quantity)
      }
    })
  }

  return Number(orderQuantity * price - discountValue).toFixed(2)
}

export function parseProductFields(product: IProduct): IProduct {
  const parseField = (fieldName: keyof IProduct) =>
    product[fieldName]
      ? { [fieldName]: JSON.parse(String(product[fieldName])) }
      : {}

  const parsedProduct = {
    ...product,
    ...parseField('images'),
    ...parseField('discounts'),
    ...parseField('rules'),
    ...parseField('quantity_select'),
  }

  if (parsedProduct?.date) {
    parsedProduct.date = timeFormatted(parsedProduct.date)
  }
  if (parsedProduct?.discounts?.length > 0) {
    parsedProduct.discounts = parsedProduct.discounts.sort(
      (a, b) => a.quantity - b.quantity,
    )
  }

  return parsedProduct
}
