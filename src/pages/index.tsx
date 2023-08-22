import React, { useEffect } from 'react'
import { getStaticData } from '@/api/global'
import { useStaticData } from '@/store/staticStore'
import Head from 'next/head'
import { IStaticData } from '@/interfaces/staticData'
import { getProductsWinners } from '@/api/product'
import HomePageLoader from '@/components/PageLoader/HomePageLoader'
import Usability from '@/components/Usability'
import Title from '@/components/Title'
import ProductsList from '@/components/ProductComponents/ProductsList'
import WinnersList from '@/components/WinnersList'
import Faq from '@/components/Faq'
import SocialMediaButtons from '@/components/SocialMediaButtons'
import { IProduct } from '@/interfaces/products'
import { useProductStore } from '@/store/productStore'
import { IWinner } from '@/interfaces/winners'

interface Props {
  globalData: IStaticData
  winners: IWinner[]
  products: IProduct[]
}

export async function getServerSideProps() {
  const globalData = await getStaticData()
  const winners = await getProductsWinners()

  return {
    props: {
      globalData,
      winners: winners.slice(0, 3),
    },
  }
}

const Index: React.FC = ({ globalData, winners }: Props) => {
  const { setStaticData, staticData } = useStaticData((state) => state)
  const products = useProductStore((state) => state.products)
  const isLoading = false

  useEffect(() => {
    setStaticData(globalData)
  }, [])

  return (
    <>
      <Head>
        {staticData?.facebook_domain_check_id && (
          <meta
            name="facebook-domain-verification"
            content={staticData.facebook_domain_check_id}
            title="facebook-domain-verification"
          />
        )}
      </Head>
      <Head>
        {staticData?.useful && (
          <link
            rel="icon"
            href={staticData?.useful?.favicon || 'icon-default.png'}
          />
        )}
      </Head>
      {isLoading ? (
        <HomePageLoader />
      ) : (
        <>
          <Usability title={staticData?.useful?.name} />

          {staticData?.home && (
            <Title
              data={{
                title: '⚡ ' + staticData.home.title.title || '',
                sub: staticData.home.title.sub || '',
              }}
            />
          )}

          <ProductsList
            data={products.filter((product) => product?.home).slice(0, 7)}
          />

          <p style={{ marginTop: '15px' }}></p>

          {winners && winners.length > 0 && <WinnersList winners={winners} />}

          <Faq staticData={staticData} />

          {staticData?.useful.whatsapp && (
            <SocialMediaButtons linkWhatsapp={staticData.useful.whatsapp} />
          )}
        </>
      )}
    </>
  )
}

export default Index
