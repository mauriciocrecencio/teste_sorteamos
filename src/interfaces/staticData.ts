export interface ILogo {
  url: string
  alt: string
}

export interface IBlinkMessage {
  one: string
  two: string
  three: string
  four: string
  five: string
  six: string
  seven: string
}

export interface IItem {
  title: string
  text: string
}

export interface ITitle {
  title: string
  sub: string
}

export interface IFAQ {
  title: ITitle
  items: IItem[]
}

export interface IFooter {
  capitalizadora: string
  beneficiario: string
  regulamentacao: string
}

export interface IHome {
  title: ITitle
}

export interface ILogin {
  email: boolean
}

export interface ITextsCheckout {
  one: string
  two: string
  three: string
}

export interface IPageProduct {
  description: ITitle
  quotas: ITitle
  promotion: ITitle
  texts_checkout: ITextsCheckout
  view_numbers: string
  select: string
  button: string
  checkout_btn: string
  wo_stock: string
}

export interface ISocial {
  title: string
  link: string
}

export interface ITexts {
  my_numbers: ITitle
  sweepstake: ITitle
  winners: ITitle
  affiliates: ITitle
  checkout_pay: ITitle
}

export interface IUseful {
  favicon: string
  logo: ILogo
  whatsapp: string
  name: string
  cnpj: string
}

export interface IStaticData {
  allowAdminProductPublicResume: boolean
  allowAdminProductButtons: boolean
  useful: IUseful
  socials: ISocial[]
  home: IHome
  faq: IFAQ
  texts: ITexts
  page_product: IPageProduct
  footer: IFooter
  login: ILogin
  blink_message: IBlinkMessage
  facebook_pixel_id: number
  google_analytics_id: number
  facebook_domain_check_id: string
}
