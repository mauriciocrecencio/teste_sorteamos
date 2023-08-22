export interface IProgress {
  paids: number
  reserveds: number
  availables: number
}

export interface IQuantitySelect {
  quantity: number
  best_seller: boolean
}

export interface IRules {
  maximum: number
  minimum: number
}

export interface IDiscount {
  quantity: number
  value: number
}

export interface IProduct {
  id: number
  active: boolean
  token: string
  name: string
  name_sub: string
  slug: string
  images: string[]
  ebook: string
  seae: string
  short_message: string
  home: boolean
  date: null | string
  price: number
  total: number
  description: string
  rules: IRules
  progress_bar: boolean
  createdIn: Date
  discounts: IDiscount[] | null
  quantity_select: IQuantitySelect[]
  winner_user: null
  winner_number: null
  whatsapp_group: string
  telegram_group: string
  show_public_ranking: boolean
  show_public_ranking_daily: boolean
  priority: number
  certificate: string
  show_entrants_list: boolean
  status: string
  quantity: number
  progress: IProgress
}
