import { useState } from 'react'
import styles from './styles.module.css'
import TelefoneBrasileiroInput from '../../TelefoneBrasileiroInput'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { IconButton } from '@mui/material'
import { createOrder } from '../../../api/order'
import { useUserStore } from '../../../store/userStore'
import { shallow } from 'zustand/shallow'
import {
  onlyLetters,
  setCookie,
  getCookie,
  validateEmail,
} from '../../../services/utils'
import { login, createUser } from '../../../services/actions'
import { useProductStore } from '../../../store/productStore'
import { useStaticData } from '../../../store/staticStore'
import ReactPixel from 'react-facebook-pixel'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import UserInputLogin from '../../UserInputLogin'
import clsx from 'clsx'
import { IProduct } from '@/interfaces/products'

interface Props {
  isOpen: boolean
  onClose: () => void
  quantity: number
  price: number | string
  selectedProduct: IProduct
}

const Buy = ({ isOpen, onClose, price, quantity, selectedProduct }: Props) => {
  const navigate = useRouter().push

  const urlParams = new URLSearchParams(window.location.search)
  let affiliateId = ''

  if (urlParams.has('affiliate_id')) {
    affiliateId = urlParams.get('affiliate_id')

    setCookie('affiliate_id', affiliateId, 365)
  } else if (getCookie('affiliate_id')) {
    affiliateId = getCookie('affiliate_id')
  }

  const user = useUserStore((state) => state.user)

  // const { getProducts } = useProductStore(
  //   (state) => ({
  //     getProducts: state.callGetProducts,
  //   }),
  //   shallow,
  // )

  const staticData = useStaticData((state) => state.staticData)

  const [phone, setPhone] = useState('')
  const [errorPhone, setErrorPhone] = useState('')
  const [email, setEmail] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [confirmPhone, setConfirmPhone] = useState('')
  const [errorConfirmPhone, setErrorConfirmPhone] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState('')
  const [name, setName] = useState('')
  const [buttonStep1, setButtonStep1] = useState('Continuar')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [step, setStep] = useState(user?.id ? 2 : 1)

  const buttonStep2 = 'Concluir reserva'
  const buttonStep3 = 'Concluir cadastro e pagar'

  const order = async () => {
    const creatingOrder = await createOrder({
      product_slug: selectedProduct.slug,
      order_quantity: quantity,
      affiliate_id: affiliateId || null,
      facebook_pixel:
        localStorage.getItem('pxID') ||
        staticData?.facebook_pixel_id?.toString() ||
        'sem-pixel',
      google_tracking:
        staticData?.google_analytics_id?.toString() || 'sem-google-analytics',
    })

    // await getProducts()

    if (creatingOrder?.token) {
      document.body.classList.remove('remove-scroll')

      navigate(`/order/${creatingOrder.token}`)
    } else {
      console.log(creatingOrder)
      setShowErrorMessage(creatingOrder?.message || '')
    }
  }

  const onSubmitVerifyUser = async (event) => {
    setSubmitLoading(true)
    event.preventDefault()
    setButtonStep1('Consultando cadastro')

    if (phone.length === 14 || phone.length === 15) {
      setErrorPhone('')

      const hasLogin = await login(phone)

      if (hasLogin) {
        setStep(2)
      } else {
        setStep(3)
      }
    } else {
      setErrorPhone('o telefone precisa estar no formato (00) 90000-0000')
    }

    setSubmitLoading(false)
  }

  const onSubmitCreateUserAndOrder = async (event) => {
    setSubmitLoading(true)
    setErrorConfirmPhone('')
    event.preventDefault()

    if (confirmPhone !== phone) {
      setErrorConfirmPhone('Número de telefone diferente')
      setSubmitLoading(false)
      return
    }

    if (staticData?.login?.email && !validateEmail(email)) {
      setErrorEmail('Verifique o email digitado.')
      setSubmitLoading(false)
      return false
    } else {
      setErrorEmail('')
    }

    if (name.length >= 5) {
      const createdUser = await createUser({ name, phone, email })

      if (createdUser.status) {
        await order()
      }
    }
  }

  const onSubmitCreateOrder = async (event) => {
    setSubmitLoading(true)
    event.preventDefault()
    await order()
    // TODO: verificar
    // ReactPixel.track('AddToCart', {
    //   contents: [
    //     {
    //       product: data.product.id,
    //       quantity: data.quantity,
    //     },
    //   ],
    //   value: Number(data.unFormatedPrice),
    //   status: 'pending',
    //   currency: 'BRL',
    // })
  }

  const backToStep1 = () => {
    setButtonStep1('Continuar')
    setStep(1)
    setPhone('')
  }

  return (
    <section
      className={clsx(
        isOpen && styles.open,
        styles['dialog-container'],
        styles['dialog-buy'],
      )}
    >
      <section className={styles['dialog-header']}>
        <h2 className={styles.title}>
          <ShoppingBagOutlinedIcon className={styles['icon-black']} />
          Checkout
        </h2>
        <IconButton onClick={close}>
          <CloseOutlinedIcon className={styles['icon-black']} />
        </IconButton>
      </section>
      <section className={styles['dialog-content']}>
        <section className={styles['action-text']}>
          {staticData?.page_product?.texts_checkout?.one || ''}{' '}
          <span>{quantity}</span>{' '}
          {staticData?.page_product?.texts_checkout?.two || ''}{' '}
          <span>{selectedProduct.name || ''}</span>,{' '}
          {staticData?.page_product?.texts_checkout?.three || ''}{' '}
        </section>

        <section className={styles['dialog-form-content']}>
          {step === 1 && (
            <form onSubmit={onSubmitVerifyUser}>
              <section className={styles['form-item']}>
                <label>
                  <p>Informe seu telefone</p>
                  <TelefoneBrasileiroInput
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    temDDD
                    separaDDD
                    required
                    minLength={14}
                    maxLength={15}
                    placeholder="(00) 90000-0000"
                  />
                  {errorPhone && (
                    <p className={styles['form-error']}>{errorPhone}</p>
                  )}
                </label>
              </section>

              <section
                className={clsx(styles['info-form-text'], styles.lightyellow)}
              >
                <InfoOutlinedIcon /> Informe seu telefone para continuar.
              </section>

              <section className={styles['button-container']}>
                <button
                  className={clsx(styles['button-item'], styles.join)}
                  type="submit"
                  disabled={submitLoading}
                >
                  <span className={styles['icon-text']}>
                    {buttonStep1}{' '}
                    {submitLoading ? (
                      <CircularProgress
                        className={styles['icon-loading-button']}
                        size="sm"
                        thickness={3}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </button>
              </section>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={onSubmitCreateOrder}>
              <UserInputLogin data={user} />

              <section className="button-container">
                <button
                  className={`button-item join ${showErrorMessage && 'error'}`}
                  type="submit"
                  disabled={submitLoading}
                >
                  <span className={`icon-text`}>
                    {!showErrorMessage ? buttonStep2 : showErrorMessage}{' '}
                    {!showErrorMessage && submitLoading && (
                      <CircularProgress
                        className="icon-loading-button"
                        size="sm"
                        thickness={3}
                      />
                    )}
                  </span>
                </button>
              </section>

              {!submitLoading && (
                <p
                  className="change-user"
                  onClick={(e) => {
                    setButtonStep1('Continuar')
                    setStep(1)
                    setPhone('')
                  }}
                >
                  Alterar Conta
                </p>
              )}
            </form>
          )}

          {step === 3 && (
            <form onSubmit={onSubmitCreateUserAndOrder}>
              <section className="form-item">
                <label>
                  <p>Informe seu telefone</p>
                  <input readOnly value={phone} />
                  {errorPhone && <p className="form-error">{errorPhone}</p>}
                </label>
              </section>
              <section className="form-item">
                <label>
                  <p>Confirme seu telefone</p>
                  <TelefoneBrasileiroInput
                    type="text"
                    value={confirmPhone}
                    onChange={(e) => setConfirmPhone(e.target.value)}
                    temDDD
                    separaDDD
                    required
                    minLength={14}
                    maxLength={15}
                    placeholder="(00) 90000-0000"
                  />
                  {errorConfirmPhone && (
                    <p className="form-error">{errorConfirmPhone}</p>
                  )}
                </label>
              </section>
              <section className="form-item">
                <label>
                  <p>Nome Completo</p>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(onlyLetters(e.target.value))}
                    required
                    placeholder="Informe seu nome e sobrenome"
                    minLength={5}
                    maxLength={30}
                  />
                  {errorPhone && <p className="form-error">{errorPhone}</p>}
                </label>
              </section>

              {staticData?.login?.email && (
                <section className="form-item">
                  <label>
                    <p>Email</p>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Informe seu email"
                      minLength={5}
                      className="email"
                    />
                    {errorEmail && <p className="form-error">{errorEmail}</p>}
                  </label>
                </section>
              )}

              <section className="info-form-text lightyellow">
                <InfoOutlinedIcon /> Informe os dados corretos para recebimento
                das premiações.
              </section>

              <section className="button-container">
                <button
                  className="button-item join"
                  type="submit"
                  disabled={submitLoading}
                >
                  <span className="icon-text">
                    {buttonStep3}{' '}
                    {submitLoading ? (
                      <CircularProgress
                        className="icon-loading-button"
                        size="sm"
                        thickness={3}
                      />
                    ) : (
                      ''
                    )}
                  </span>
                </button>
                <p
                  className={styles['change-cellphone']}
                  onClick={() => backToStep1()}
                >
                  Alterar Telefone
                </p>
              </section>
            </form>
          )}
        </section>
      </section>
    </section>
  )
}

export default Buy
