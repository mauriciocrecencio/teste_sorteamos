import { IOrder } from '@/interfaces/order'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface OrdersState {
  orders: IOrder[]
  setOrders: (orders: IOrder[]) => Promise<void>
}

export const useOrdersStore = createWithEqualityFn<OrdersState>()(
  immer(
    devtools((set) => ({
      orders: [],
      setOrders: async (orders) => {
        set((state) => {
          state.orders =
            orders &&
            orders.filter((order) => order.product_images && order.product_name)
        })
      },
    })),
  ),
  shallow,
)
