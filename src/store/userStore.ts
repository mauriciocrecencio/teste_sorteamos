import { devtools } from 'zustand/middleware'

import { immer } from 'zustand/middleware/immer'
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

interface UserState {
  user: any
  isLogged: boolean
  setUser: (user) => Promise<void>
  setIsLogged: (type) => Promise<void>
}

export const useUserStore = createWithEqualityFn<UserState>()(
  immer(
    devtools((set) => ({
      user: {},
      isLogged: false,
      setUser: async (user) => {
        set((state) => {
          state.user = user
        })
      },
      setIsLogged: async (type) => {
        set((state) => {
          state.isLogged = type
        })
      },
    })),
  ),
  shallow,
)
