import React, { StrictMode, useEffect } from 'react'
import { AppProps } from 'next/app'
import '../styles/globals.css'
import { Montserrat } from 'next/font/google'
import Layout from '@/components/Layout'
import { getStaticData } from '@/api/global'
import { useStaticData } from '@/store/staticStore'
import { useUserStore } from '@/store/userStore'
import { Router, useRouter } from 'next/router'

const montserrat = Montserrat({ subsets: ['latin'] })

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const setStaticData = useStaticData((state) => state.setStaticData)
  const setUser = useUserStore((state) => state.setUser)
  const router = useRouter()

  useEffect(() => {
    async function fetchGlobalData() {
      try {
        if (router.route === '/sorteio/[slug]') return
        const staticData = await getStaticData()
        setStaticData(staticData)

        const user = localStorage.getItem('user')
        if (user) {
          setUser(user)
        }
      } catch (error) {
        console.error('Error fetching global data:', error)
      }
    }

    fetchGlobalData()
  }, [])

  const [isLoading, setLoading] = React.useState(false)
  React.useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <StrictMode>
      <div className={montserrat.className}>
        <Layout>
          {/* Colocar componente de Loading talvez */}
          {isLoading ? <div>loading</div> : <Component {...pageProps} />}
        </Layout>
      </div>
    </StrictMode>
  )
}

export default MyApp
