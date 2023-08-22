import ProductPageLoader from '@/components/PageLoader/ProductPageLoader'
import ProductImages from '@/components/ProductComponents/ProductImages'
import Usability from '@/components/Usability'
import { calculePriceWithDiscount } from '@/services/utils'
import { useStaticData } from '@/store/staticStore'
import { useProductStore } from '@/store/productStore'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Title from '@/components/Title'

import { Grid } from '@mui/material'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import axios from 'axios'
import WinnersList from '@/components/WinnersList'
import ProductProgressBar from '@/components/ProductProgressBar'
import PublicRanking from '@/components/PublicRanking'
import SocialMediaButtons from '@/components/SocialMediaButtons'
import Buy from '@/components/Dialog/Buy'
import ResultShare from '@/components/ResultShare'
import { IProduct } from '@/interfaces/products'
import { Status } from '@/constants'
import { getProductsActiveFetch } from '@/api/product'
import { getStaticData } from '@/api/global'

export async function getServerSideProps() {
  const fetchedProducts = await getProductsActiveFetch()
  const fetchedStaticData = await getStaticData()
  return {
    props: {
      fetchedProducts,
      fetchedStaticData,
    },
  }
}

export default function Product({ fetchedProducts, fetchedStaticData }) {
  const { setProducts, products } = useProductStore((state) => state)
  const { staticData, setStaticData } = useStaticData((state) => state)

  useEffect(() => {
    setStaticData(fetchedStaticData)
    setProducts(fetchedProducts)
  }, [fetchedProducts])

  const { query, push } = useRouter()

  const [selectedProduct, setSelectedProduct] = useState<IProduct>(null)
  const [price, setPrice] = useState<string | number>(0.0)
  const [quantity, setQuantity] = useState(1)
  const [userWinner, setUserWinner] = useState(null)
  const [verifyTime, setVerifyTime] = useState(false)
  const [isOpenBuyDialog, setIsOpenBuyDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // TODO: adicionar meta og:type para ter preview da imagem quando compartilhar link

  const slug = query.slug

  const minQtd = selectedProduct?.rules.minimum
  const maxQtd = selectedProduct?.rules.maximum

  useEffect(() => {
    findSelectedProductInStore()
  }, [slug, products])

  const findSelectedProductInStore = () => {
    if (!slug || products.length === 0) return
    const selectedProductUnformatted = products.find((p) => p.slug === slug)
    setSelectedProduct(selectedProductUnformatted)
  }

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= minQtd && newQuantity <= maxQtd) {
      setQuantity(newQuantity)
    } else if (newQuantity < minQtd) {
      setQuantity(minQtd)
    } else {
      setQuantity(maxQtd)
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/${id}`,
      )
      setUserWinner(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const calculePrice = () => {
    const getPrice = calculePriceWithDiscount(
      selectedProduct?.price,
      quantity,
      selectedProduct?.discounts,
    )

    setPrice(
      new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(Number(getPrice))
        .split('R$')[1]
        .trim(),
    )
  }

  const openDialog = () => {
    document.body.classList.add('remove-scroll')
    setIsOpenBuyDialog(true)
  }

  const closeBuyDialog = () => {
    document.body.classList.remove('remove-scroll')
    setIsOpenBuyDialog(false)
  }

  useEffect(() => {
    if (!selectedProduct) return
    if (selectedProduct?.date) {
      const endTime = new Date(selectedProduct?.date).getTime()
      const timeNow = new Date().getTime()
      setVerifyTime(timeNow < endTime)
    } else {
      setVerifyTime(true)
    }

    if (selectedProduct?.winner_user) {
      getUserById(selectedProduct?.winner_user)
    }

    if (selectedProduct?.id) {
      setIsLoading(false)
    }

    calculePrice()
    setQuantity(selectedProduct.rules.minimum)
  }, [selectedProduct])

  useEffect(() => {
    calculePrice()
  }, [quantity])

  return (
    <>
      {isLoading ? (
        <ProductPageLoader />
      ) : (
        <>
          <ProductImages product={selectedProduct} />
          <Usability
            title={`${selectedProduct?.name || 'Sorteio'} ${
              staticData?.useful?.name ? `- ${staticData.useful.name}` : ''
            }`}
            description={selectedProduct?.description || ''}
            image={selectedProduct?.images?.find(Boolean) || ''}
          />

          {selectedProduct?.price && (
            <section className={clsx(styles['price-container'])}>
              <section className={clsx(styles['price-content'])}>
                <p className={clsx(styles['price-item'])}>
                  POR APENAS{' '}
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(selectedProduct.price)}
                  </span>
                </p>
              </section>
            </section>
          )}

          {userWinner && selectedProduct?.winner_number && (
            <div style={{ paddingBottom: '20px' }}>
              <WinnersList
                winners={[
                  {
                    winner_image: userWinner.image,
                    product_name: selectedProduct.name,
                    product_total: selectedProduct.total,
                    winner_number: selectedProduct.winner_number,
                    product_images: JSON.stringify(selectedProduct.images),
                    winner_name: userWinner.name,
                  },
                ]}
              />
            </div>
          )}

          {selectedProduct && (
            <ResultShare
              formattedDate={selectedProduct.date}
              productName={selectedProduct.name}
            />
          )}

          {selectedProduct?.id &&
          selectedProduct?.discounts &&
          selectedProduct?.quantity &&
          verifyTime &&
          selectedProduct.status === Status.OPEN ? (
            <>
              <Title
                data={{ title: '📣 Promoção', sub: 'Compre mais barato!' }}
              />
              <section className={clsx(styles['discount-container'])}>
                <section className={clsx(styles['discount-content'])}>
                  {selectedProduct?.discounts.map((discount) => (
                    <section
                      key={discount.quantity}
                      className={clsx(styles['discount-item'])}
                      onClick={() => {
                        setQuantity(
                          discount.quantity < selectedProduct.quantity
                            ? discount.quantity
                            : selectedProduct.quantity,
                        )
                        openDialog()
                      }}
                    >
                      <p>
                        {discount.quantity} por{' '}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(
                          selectedProduct.price * discount.quantity -
                            discount.value,
                        )}
                      </p>
                    </section>
                  ))}
                </section>
              </section>
            </>
          ) : (
            ''
          )}

          {selectedProduct?.certificate && (
            <section className={clsx(styles['certificate-container'])}>
              <section className={clsx(styles['certificate-content'])}>
                <a
                  className={clsx(styles['certificate-link'])}
                  href={selectedProduct.certificate}
                  target="_blank"
                  rel="noreferrer"
                >
                  Clique aqui para ver o regulamento
                </a>
              </section>
            </section>
          )}

          <Title
            data={{
              title: '⚡ ' + staticData?.page_product?.quotas?.title || '',
              sub: staticData?.page_product?.quotas?.sub || '',
            }}
          />

          <Grid container sx={{ mb: 1 }} spacing={1}>
            <Grid
              item
              xs={12}
              md={selectedProduct?.show_public_ranking ? 6 : 12}
            >
              <button
                className="button-item"
                onClick={() => push('/meus-numeros')}
              >
                <ShoppingBagOutlinedIcon />{' '}
                {staticData?.page_product?.view_numbers || ''}
              </button>
            </Grid>
            {selectedProduct?.show_public_ranking && (
              <Grid item xs={12} md={6}>
                {selectedProduct?.name && (
                  <PublicRanking
                    productName={selectedProduct.name}
                    productId={selectedProduct.id}
                  />
                )}
              </Grid>
            )}

            {selectedProduct?.show_entrants_list && (
              <Grid item xs={12}>
                <button
                  className="button-item"
                  onClick={() => push(`/sorteio/lista/${selectedProduct.slug}`)}
                >
                  <TextSnippetIcon /> Ver Lista de Participantes
                </button>
              </Grid>
            )}

            {selectedProduct.progress_bar && (
              <Grid container paddingTop={1} style={{ paddingLeft: '8px' }}>
                <ProductProgressBar
                  paid={selectedProduct.progress.paids}
                  reserved={selectedProduct.progress.reserveds}
                />
              </Grid>
            )}
          </Grid>

          {selectedProduct?.quantity > 0 &&
          verifyTime &&
          selectedProduct.status === Status.OPEN ? (
            <>
              <section className={clsx(styles.controls)}>
                <section className={clsx(styles['product-buttons-container'])}>
                  <section>
                    <p className={clsx(styles['select-quantity'])}>
                      {staticData?.page_product?.select || ''}
                    </p>
                  </section>
                  <section className={clsx(styles['container-quantity'])}>
                    {selectedProduct?.quantity_select &&
                      selectedProduct.quantity_select.map((item, i) => (
                        <section
                          key={`${item.quantity}-${i}`}
                          className={clsx(
                            styles['content-quantity'],
                            item.best_seller && styles['most-popular'],
                          )}
                          onClick={(e) =>
                            updateQuantity(quantity + item.quantity)
                          }
                        >
                          <h3 className={clsx(styles['number-select'])}>
                            <small>+</small>
                            {item.quantity}
                          </h3>
                          <p>SELECIONAR</p>
                        </section>
                      ))}
                  </section>
                  <section className={clsx(styles['product-buttons-content'])}>
                    <section
                      className={clsx(styles['product-buttons-base'])}
                      onClick={(e) => updateQuantity(quantity - 1)}
                    >
                      <RemoveCircleOutlineOutlinedIcon
                        sx={{ cursor: 'pointer' }}
                      />
                    </section>
                    <section className={clsx(styles['product-buttons-input'])}>
                      <input
                        type="number"
                        readOnly
                        placeholder={String(quantity)}
                        min={minQtd}
                        max={maxQtd}
                      />
                    </section>
                    <section
                      className={clsx(styles['product-buttons-base'])}
                      onClick={(e) => updateQuantity(quantity + 1)}
                    >
                      <AddCircleOutlineOutlinedIcon
                        sx={{ cursor: 'pointer' }}
                      />
                    </section>
                  </section>
                </section>
              </section>

              <section className={clsx(styles['button-container'])}>
                <section>
                  <button className="button-item join" onClick={openDialog}>
                    <span className="icon-text">
                      <TaskAltOutlinedIcon />
                      {staticData?.page_product?.button || ''}
                    </span>
                    <span className={clsx(styles['calculed-price'])}>
                      <small>R$</small> {price}
                    </span>
                  </button>
                </section>
              </section>

              {selectedProduct?.description && (
                <>
                  {staticData?.page_product?.description?.title && (
                    <Title
                      data={{
                        title:
                          '📋 ' +
                            staticData?.page_product?.description?.title || '',
                        sub: staticData?.page_product?.description?.sub || '',
                      }}
                    />
                  )}
                  <section className={clsx(styles['description-container'])}>
                    <div
                      className={clsx(
                        styles['scroll-description'],
                        styles['custom-scrollbar'],
                      )}
                      dangerouslySetInnerHTML={{
                        __html: selectedProduct?.description,
                      }}
                    />
                  </section>
                </>
              )}
            </>
          ) : selectedProduct?.quantity === 0 ? (
            <section
              className={clsx(styles['info-form-text'], styles.lightyellow)}
            >
              <InfoOutlinedIcon /> {staticData?.page_product?.wo_stock || ''}
            </section>
          ) : (
            ''
          )}

          <Buy
            isOpen={isOpenBuyDialog}
            onClose={closeBuyDialog}
            selectedProduct={selectedProduct}
            price={price}
            quantity={quantity}
          />
          <SocialMediaButtons
            linkWhatsapp={selectedProduct?.whatsapp_group}
            linkTelegram={selectedProduct?.telegram_group}
            productSlug={selectedProduct?.slug}
          />
        </>
      )}
    </>
  )
}
