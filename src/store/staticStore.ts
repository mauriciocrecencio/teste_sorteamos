import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'
import { IStaticData } from '@/interfaces/staticData'

interface GlobalState {
  staticData: IStaticData
  setStaticData: (data: IStaticData) => Promise<void>
}

export const useStaticData = createWithEqualityFn<GlobalState>()(
  immer(
    devtools((set) => ({
      staticData: null,
      setStaticData: async (data) => {
        set((state) => {
          state.staticData = data
        })
      },
    })),
  ),
  shallow,
)
