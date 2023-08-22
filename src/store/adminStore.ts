import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { adminGetOrdersFetch } from '../api/order'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

export const useAdminrStore = createWithEqualityFn(
  immer(
    devtools((set) => ({
      raffles: [],
      callRaffles: async () => {
        // const responseProducts = await getProductsFetch();
        // set((state) => {
        // state.raffles = responseProducts || [];
        // });
      },
      orders: [],
      callOrders: async () => {
        const orders = await adminGetOrdersFetch()

        set((state) => {
          state.orders = orders || []
        })
      },
    })),
  ),
  shallow,
)
