import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

import {
  getOrderByToken,
  orderCreatePix,
  trackingFacebookOrder,
} from '../../api/order'
import CheckIcon from '@mui/icons-material/Check'

import { useProductStore } from '../../store/productStore'
import Title from './Title'
import { mphone, priceFormated, timeFormatted } from '../../services/utils'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactPixel from 'react-facebook-pixel'

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { useUserStore } from '../../store/userStore'
import GeneratingQRCODE from '@/components/GeneratingQRCode'
import Usability from '../../components/Usability'
import { useStaticData } from '../../store/staticStore'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import { toast } from 'react-toastify'
import Link from 'next/link'
import ProductTexts from '../CustomDescription'
import SocialMediaButtons from '../SocialMediaButtons'
import { PaymentStatus } from '@/constants'

let timer
let startTimer = false
let interval
let isTimerEnded = false

const secondsToCheckPayment = 60

const Order = ({ token }) => {
  const products = useProductStore((state) => state.products)
  const user = useUserStore((state) => state.user)

  const data = useStaticData((state) => state.staticData)

  const [copySucess, setCopySucess] = useState(false)
  const [initiatedCheckout, setInitiatedCheckout] = useState(false)
  const [showAsAdmin, setShowAsAdmin] = useState(false)
  const [timeToPay, setTimeToPay] = useState('00:00')
  const [order, setOrder] = useState(null)
  const [product, setProduct] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [counter, setCounter] = useState(secondsToCheckPayment)

  const [minutes, seconds] = timeToPay.split(':')

  const checkOrderApi = async () => {
    const orderApi = await getOrderByToken(token)
    setOrder({
      ...orderApi,
      ...(orderApi?.payment ? { payment: JSON.parse(orderApi.payment) } : {}),
    })

    checkTime(orderApi)
    return orderApi
  }

  const updateTrackingFacebook = async () => {
    await trackingFacebookOrder({
      token: order.token,
    })
  }

  const createPixApi = async () => {
    const orderApi = await orderCreatePix(token)

    setOrder({
      ...orderApi,
      ...(orderApi?.payment ? { payment: JSON.parse(orderApi.payment) } : {}),
    })

    checkTime(orderApi)

    return orderApi
  }

  const findProductInStore = () => {
    const finded = products.find((p) => p.slug === order?.product_slug)
    setProduct(finded)
  }

  const checkTime = (orderApi) => {
    if (orderApi?.expiration_date_pix && !startTimer) {
      startTimer = true
      clearInterval(timer)

      timer = setInterval(function () {
        calculeTime(orderApi.expiration_date_pix)
      }, 1000)
    }
  }

  const calculeTime = async (expirationTime) => {
    const expiration = new Date(expirationTime)
    const now = new Date()

    const diff = expiration.getTime() - now.getTime()

    if (diff <= 0) {
      clearInterval(timer)
    } else {
      let seconds = Math.floor(diff / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      const days = Math.floor(hours / 24)

      hours %= 24
      minutes %= 60
      seconds %= 60

      const time = `${minutes > 9 ? minutes : `0${minutes}`}:${
        seconds > 9 ? seconds : `0${seconds}`
      }`

      setTimeToPay(time)
    }
  }

  const apiCallGetOrder = async () => {
    await checkOrderApi()
  }

  useEffect(() => {
    if (!order) return
    const orderIdExists = localStorage.getItem(`ORDER_ID_${order?.id}`)

    if (!orderIdExists) {
      order?.status === 'pending' && !order?.payment && createPixAndSetOrderId()
    }
    if (!order?.facebook_tracking && order?.status === 'paid' && product?.id) {
      updateTrackingFacebook()
      // TODO: verificar
      // ReactPixel.track('Purchase', {
      //   content_ids: [product.id],
      //   content_type: 'product',
      //   contents: [
      //     {
      //       id: product.id,
      //       quantity: order.order_quantity,
      //     },
      //   ],
      //   value: order.payment_price,
      //   currency: 'BRL',
      // })
    }

    if (
      !initiatedCheckout &&
      !order?.facebook_tracking &&
      order?.token &&
      product?.id
    ) {
      setInitiatedCheckout(true)
      // ReactPixel.track('InitiateCheckout', {
      //   content_ids: [product.id],
      //   content_type: 'product',
      //   contents: [
      //     {
      //       id: product.id,
      //       quantity: order.order_quantity,
      //     },
      //   ],
      //   value: order.payment_price,
      //   currency: 'BRL',
      // })
    }

    !product?.id && findProductInStore()
  }, [order])

  useEffect(() => {
    startTimer = false
    apiCallGetOrder()
    findProductInStore()

    return () => {
      clearTimeout(interval)
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    findProductInStore()
  }, [products])

  async function handleButton() {
    setCounter(secondsToCheckPayment)
    setIsDisabled(true)
    const res = await checkOrderApi()
    if (res.status === 'pending') {
      toast.warning('Ainda não identificamos o pagamento', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
    setTimeout(() => {
      setIsDisabled(false)
    }, 30000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        counter === 0 &&
        order.status !== 'paid' &&
        order.status !== 'expired'
      ) {
        checkOrderApi()
        setCounter(secondsToCheckPayment)
      } else {
        setCounter((prevCounter) => prevCounter - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [counter])

  isTimerEnded = Number(minutes) + Number(seconds) <= 0

  const createPixAndSetOrderId = async (retryAttempts = 1) => {
    localStorage.setItem(`ORDER_ID_${order?.id}`, 'true')

    const createdPixData = await createPixApi()

    if (createdPixData) {
      setOrder({
        ...createdPixData,
        ...(createdPixData?.payment
          ? { payment: JSON.parse(createdPixData.payment) }
          : {}),
      })

      checkTime(createdPixData)
    } else {
      if (retryAttempts < 3) {
        setTimeout(() => {
          createPixAndSetOrderId(retryAttempts + 1)
        }, 1000)
      } else {
        console.log('Falha ao criar o PIX após 3 tentativas.')
      }
    }
  }

  return (
    <>
      <Usability
        title={`Checkout ${data?.useful?.name ? `- ${data.useful.name}` : ''}`}
        robots="noindex"
      />

      {order?.token && (
        <section>
          <Title data={PaymentStatus[order.status]} />

          {order?.status === 'pending' ? (
            !isTimerEnded ? (
              <p className="time-to-pay">
                Você tem <span>{timeToPay}</span> para pagar
              </p>
            ) : (
              ''
            )
          ) : (
            ''
          )}

          {order.status === 'pending' ? (
            !isTimerEnded ? (
              order?.payment && order?.payment.qrcode ? (
                <section className={styles['order-pix-payment-container']}>
                  <section className={styles['order-pix-payment-content']}>
                    <section className={styles['pix-instructions']}>
                      <section className={styles['infos-pix']}>
                        <p className={styles['info-number']}>1</p>
                        <p className={styles['info-text']}>
                          Copie o código PIX abaixo.
                        </p>
                      </section>

                      <section className={styles['pix-block-copy']}>
                        <p className={styles['pix-code']}>
                          {order?.payment?.code}{' '}
                        </p>
                        <CopyToClipboard
                          text={order?.payment?.code}
                          onCopy={() => {
                            setCopySucess(true)
                            setTimeout(() => {
                              setCopySucess(false)
                            }, 5000)
                          }}
                        >
                          <button className="btn-copy">Copiar</button>
                        </CopyToClipboard>
                      </section>

                      <section className="infos-pix">
                        <p className="info-number">2</p>
                        <p className="info-text">
                          Abra o app do seu banco e escolha a opção PIX, como se
                          fosse fazer uma transferência.
                        </p>
                      </section>
                      <section className="infos-pix">
                        <p className="info-number">3</p>
                        <p className="info-text">
                          Selecione a opção PIX copia e cola, cole a chave
                          copiada e confirme o pagamento.
                        </p>
                      </section>
                      <button
                        className={`button-item join check-payment-button ${
                          isDisabled && 'check-payment-button-disabled'
                        }`}
                        type="submit"
                        onClick={() => handleButton()}
                        disabled={isDisabled}
                      >
                        <span className="icon-text">
                          JÁ EFETUEI O PAGAMENTO
                        </span>
                      </button>
                    </section>
                    <section className="pix-payment">
                      <section className="pix-image">
                        <img src={order?.payment.qrcode} alt="Red dot" />
                      </section>

                      <h3 className="title-qr-code">QR Code</h3>
                      <p className="subtitle-qr-code">
                        Acesse o APP do seu banco e escolha a opção pagar com QR
                        Code, escaneie o código acima e confirme o pagamento.
                      </p>
                    </section>
                  </section>
                </section>
              ) : (
                <section className="qrcode-generator-container">
                  <GeneratingQRCODE />
                </section>
              )
            ) : (
              <section className="qrcode-generator-container">
                <GeneratingQRCODE />
              </section>
            )
          ) : (
            ''
          )}

          {product?.slug && order && (
            <Link
              href={`/sorteio/${product.slug}`}
              className={`card-item card-flag separate-cards`}
              key={product.token}
            >
              <section className="card-image">
                <img
                  src={product.images[0]}
                  height="90px"
                  width="100%"
                  loading="lazy"
                  alt={product.name}
                />
              </section>
              <ProductTexts product={product} />
            </Link>
          )}

          {order.status === 'paid' && product.ebook && (
            <section className="ebook-download-container">
              <a
                className={`button-item join`}
                href={product.ebook}
                target="_blank"
                download={`${product.slug}.${
                  product.ebook.split('.').reverse()[0]
                }`}
              >
                Baixar E-book
              </a>
            </section>
          )}
          <section className="order-detail-container">
            <section className="order-detail-content">
              <section className="order-detail-header">
                <section className="order-detail-header-info">
                  <InfoOutlinedIcon />
                  <p>Detalhes da sua compra </p>
                </section>
                <section className="order-detail-header-token">
                  {order.token}
                </section>
              </section>
              <section className="order-detail-item userName">
                <p>Comprador:</p>
                <span>{order.name_user}</span>
              </section>
              <section className="order-detail-item">
                <p>Telefone:</p>
                <span>
                  {order.id_user === user.id || showAsAdmin
                    ? mphone(order?.phone_user)
                    : mphone(order?.phone_user).replace(/./g, (c, i) =>
                        i >= 11 ? '*' : c,
                      )}

                  {user?.id &&
                    user?.role === 'super' &&
                    order.id_user !== user.id && (
                      <p onClick={() => setShowAsAdmin(!showAsAdmin)}>
                        {showAsAdmin ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </p>
                    )}
                </span>
              </section>
              <section className="order-detail-item">
                <p>Pedido:</p>
                <span>#{order.id}</span>
              </section>
              <section className="order-detail-item">
                <p>Data/horário:</p>
                <span>{timeFormatted(order.createdAt)}</span>
              </section>
              {order.status !== 'paid' && (
                <section className="order-detail-item">
                  <p>Expira em:</p>
                  <span>{timeFormatted(order.expiration_date)}</span>
                </section>
              )}
              <section className="order-detail-item">
                <p>Situação:</p>
                <span>{PaymentStatus[order.status].title}</span>
              </section>
              <section className="order-detail-item">
                <p>Quantidade:</p>
                <span>{order.order_quantity}</span>
              </section>
              <section className="order-detail-item">
                <p>Total:</p>
                <span>
                  {priceFormated(order.payment_price)} {order.fee_message}
                </span>
              </section>
              {order.status !== 'expired' ? (
                <>
                  <section className="order-detail-item">
                    <p>{data?.texts?.checkout_pay?.title || ''}:</p>

                    {order.status === 'paid' && order?.numbers ? (
                      <section className="order-page-numbers custom-scrollbar">
                        {order.numbers.sort().map((number) => (
                          <span
                            className="blink-bg-success order-number"
                            key={number}
                          >
                            {number}
                          </span>
                        ))}
                      </section>
                    ) : (
                      <span>{data?.texts?.checkout_pay?.sub || ''}</span>
                    )}
                  </section>
                </>
              ) : (
                ''
              )}
            </section>
          </section>
        </section>
      )}

      {copySucess && (
        <section className="sucess-copy">
          <p className="text-sucess-copy">
            <span>
              <CheckIcon sx={{ fill: '#fff' }} />
            </span>
            Código copiado com sucesso!
          </p>
        </section>
      )}
      {data?.useful?.whatsapp && (
        <SocialMediaButtons linkWhatsapp={data.useful.whatsapp} />
      )}
    </>
  )
}

export default Order
