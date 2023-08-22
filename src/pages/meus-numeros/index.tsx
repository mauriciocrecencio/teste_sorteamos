import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'

import { getUserOrders } from '../../services/actions'

import { shallow } from 'zustand/shallow'
import { useOrdersStore } from '../../store/ordersStore'
import Title from '@/components/Title'
import Usability from '../../components/Usability'
import { useStaticData } from '../../store/staticStore'
import ListLoader from '../../components/PageLoader/ListLoader'
import Link from 'next/link'
import OrderList from '@/components/OrdersList'
import { GetServerSideProps } from 'next'
import SocialMediaButtons from '@/components/SocialMediaButtons'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = context.req.cookies.user
  if (!user) {
    return {
      redirect: {
        destination: '/login',
      },
      props: {},
    }
  }

  return { props: { loggedUser: JSON.parse(user) } }
}

const MeusNumeros = ({ loggedUser }) => {
  const [isLoading, setIsLoading] = useState(true)

  const { orders, setOrders } = useOrdersStore((state) => state)

  const staticData = useStaticData((state) => state.staticData)

  const apiCall = async () => {
    const orders = await getUserOrders(loggedUser.id)
    setOrders(orders)
    setIsLoading(false)
  }

  // useEffect(() => {
  // }, [orders])

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <>
      {isLoading ? (
        <>
          <ListLoader />
        </>
      ) : (
        <>
          <Usability
            title={`Meus Números ${
              staticData?.useful?.name ? `- ${staticData.useful.name}` : ''
            }`}
          />

          <Title
            data={{
              title: '⚡ ' + staticData?.texts?.my_numbers?.title || '',
              sub: staticData?.texts?.my_numbers?.sub || '',
            }}
          />

          {orders.length ? (
            <section className="card-container">
              <section className="card-content">
                <OrderList orders={orders} />
              </section>
            </section>
          ) : (
            <section className={styles['first-buy-container']}>
              <section className={styles['first-buy-content']}>
                <Link href="/sorteios">
                  Faça sua primeira compra clicando aqui!
                </Link>
              </section>
            </section>
          )}
        </>
      )}
      {staticData?.useful?.whatsapp && (
        <SocialMediaButtons linkWhatsapp={staticData.useful.whatsapp} />
      )}
    </>
  )
}

export default MeusNumeros
