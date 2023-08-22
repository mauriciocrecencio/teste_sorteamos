import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { getProductsActiveFetch, getProductsFetch } from '../api/product'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { IProduct } from '@/interfaces/products'
import { parseProductFields } from '@/services/utils'

interface ProductState {
  products: IProduct[]
  productsAdmin: any[]
  callGetProducts: () => Promise<void>
  callGetProductsAdmin: () => Promise<void>
  setProducts: (data: IProduct[]) => Promise<void>
}

export const useProductStore = createWithEqualityFn<ProductState>()(
  immer(
    devtools((set) => ({
      products: [],
      productsAdmin: [],
      setProducts: async (products: IProduct[]) => {
        const parsedProducts = products.map((product) =>
          parseProductFields(product),
        )
        set((state) => {
          state.products = parsedProducts
        })
      },
      callGetProducts: async () => {
        const products = await getProductsActiveFetch()
        set(async (state) => {
          state.setProducts(products)
        })
      },
      callGetProductsAdmin: async () => {
        const responseProducts = await getProductsFetch()

        set((state) => {
          state.productsAdmin = responseProducts || []
        })
      },
    })),
  ),
  shallow,
)
