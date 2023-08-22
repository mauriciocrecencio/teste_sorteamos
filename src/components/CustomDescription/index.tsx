import clsx from 'clsx'
import styles from './styles.module.css'
import BlinkMessage from '@/components/BlinkMessage'
import { IProduct } from '@/interfaces/products'
import { IOrder } from '@/interfaces/order'
import { statusDecorator, timeFormatted } from '@/services/utils'

interface Props {
  product?: IProduct
  order?: IOrder
}

export default function CustomDescription({ order, product }: Props) {
  if (order) {
    const orderNumbers = Object.values(order.numbers)
    return (
      <section
        className={clsx(
          styles['card-texts'],
          styles['card-texts-orders'],
          styles['my-numbers-page'],
        )}
      >
        <p>{timeFormatted(order.order_created)}</p>
        <h2>{order.product_name}</h2>
        {order?.product_seae && <p>{order.product_seae}</p>}
        <p>{statusDecorator(order.status)}</p>
        <section className={clsx(styles['order-page-numbers'])}>
          {order.status === 'paid' && orderNumbers.length > 0
            ? orderNumbers.sort().map((number: number, index) => (
                <span key={index} className={styles['order-number']}>
                  {number}
                </span>
              ))
            : ''}
        </section>
      </section>
    )
  } else if (product) {
    return (
      <section className={styles['card-texts']}>
        <h2>{product.name}</h2>
        <p>{product.name_sub}</p>
        {product.seae && <p>{product.seae}</p>}
        <BlinkMessage props={product} />
      </section>
    )
  }
}
