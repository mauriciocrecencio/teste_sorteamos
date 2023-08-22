import { IOrder } from '@/interfaces/order'
import CustomSection from '../CustomSection'
import CustomDescription from '../CustomDescription'

const OrderList = ({ orders }) => {
  return orders.map((order: IOrder) => (
    <CustomSection
      image={JSON.parse(order.product_images)[0]}
      imageName={order.product_name}
      pathname={`/order/${order.order_token}`}
      key={order.order_token}
    >
      <CustomDescription order={order} />
    </CustomSection>
  ))
}

export default OrderList
