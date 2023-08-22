import { Swiper, SwiperSlide } from 'swiper/react'
import BlinkMessage from '@/components/BlinkMessage'
import styles from './styles.module.css'
import clsx from 'clsx'
import { EffectFade, Navigation } from 'swiper/modules'
import ProductTexts from '../../CustomDescription'
import { IProduct } from '@/interfaces/products'

const ProductImages = ({ product }: { product: IProduct }) => {
  return (
    product && (
      <section className={clsx(styles['card-container'])}>
        <section className={clsx(styles['card-content'])}>
          <section
            className={clsx(styles['card-item'], styles['first-card-item'])}
            key={product.token}
          >
            <section className={clsx(styles['card-image'])}>
              <Swiper
                modules={[Navigation, EffectFade]}
                navigation={true}
                effect={'fade'}
                loop={true}
                className="mySwiper"
                centeredSlides={false}
              >
                {product &&
                  product?.images.length &&
                  typeof product.images === 'object' &&
                  product.images.map((image, index) => (
                    <SwiperSlide key={`${image}-${index}`}>
                      <img
                        src={image}
                        loading="lazy"
                        height="290px"
                        width="100%"
                        alt={product.name}
                        style={{ objectFit: 'cover' }}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </section>
            <ProductTexts product={product} />
          </section>
        </section>
      </section>
    )
  )
}

export default ProductImages
